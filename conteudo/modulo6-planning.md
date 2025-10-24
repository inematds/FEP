# Planning & Reasoning

## O Que É

Planning & Reasoning em agentes de IA se refere a técnicas avançadas que permitem LLMs decomporem problemas complexos, planejarem sequências de ações e raciocinarem através de múltiplos steps antes de executar. Em vez de responder impulsivamente, o agente "pensa antes de agir" - criando planos, avaliando alternativas e refinando estratégias.

As principais técnicas incluem Chain-of-Thought (CoT), Tree of Thoughts (ToT), Graph of Thoughts e Skeleton-of-Thought.

## Por Que Usar

**Benefícios:**
- **Qualidade Superior**: Respostas mais pensadas e corretas
- **Problemas Complexos**: Resolver tarefas que requerem múltiplos steps
- **Transparência**: Explicar o raciocínio por trás das decisões
- **Error Reduction**: Detectar problemas no plano antes de executar
- **Adaptabilidade**: Ajustar plano baseado em feedback intermediário

**Quando usar:**
- Matemática e lógica complexas
- Debugging de código
- Strategic decision making
- Multi-step research tasks
- Planejamento de projetos

## Técnicas de Planning

### 1. Chain-of-Thought (CoT)
**Linear reasoning step-by-step**

```
Problema: Se João tem 15 maçãs e dá 1/3 para Maria, quantas maçãs ficam?

Sem CoT:
"João fica com 10 maçãs" ❌ (errado)

Com CoT:
"Vamos pensar passo a passo:
1. João tem 15 maçãs inicialmente
2. Ele dá 1/3 para Maria
3. 1/3 de 15 = 15 ÷ 3 = 5 maçãs
4. João fica com: 15 - 5 = 10 maçãs

Resposta: 10 maçãs" ✅
```

**Implementação:**
```python
cot_prompt = """
Resolva este problema passo a passo:

Problema: {problem}

Solução (pense em voz alta):
Passo 1:
Passo 2:
Passo 3:
...
Resposta Final:
"""

response = llm.invoke(cot_prompt.format(problem="Uma loja oferece 25% de desconto..."))
```

### 2. Tree of Thoughts (ToT)
**Explore múltiplos caminhos de raciocínio, backtrack se necessário**

```
                    Problema
                 /      |      \
           Thought1  Thought2  Thought3
           /    \      |
      T1.1   T1.2    T2.1
      ❌      ✅      ✅
              |       |
           [continua explorando]
```

**Implementação:**
```python
def tree_of_thoughts(problem, max_depth=3):
    def explore_path(current_thought, depth):
        if depth >= max_depth:
            return evaluate_solution(current_thought)

        # Generate multiple next thoughts
        next_thoughts = llm.invoke(f"""
        Current reasoning: {current_thought}
        Generate 3 different ways to continue this reasoning:
        1.
        2.
        3.
        """).split('\n')

        # Evaluate each thought
        scored_thoughts = []
        for thought in next_thoughts:
            score = llm.invoke(f"Rate this reasoning (0-10): {thought}")
            scored_thoughts.append((float(score), thought))

        # Explore top 2 paths
        scored_thoughts.sort(reverse=True)
        best_results = []
        for score, thought in scored_thoughts[:2]:
            if score > 5:  # Only explore promising paths
                result = explore_path(thought, depth + 1)
                best_results.append(result)

        return max(best_results, key=lambda x: x.score)

    initial_thoughts = llm.invoke(f"Generate 3 initial approaches for: {problem}")
    return explore_path(initial_thoughts, depth=0)
```

### 3. Graph of Thoughts (GoT)
**Thoughts conectados em grafo, não apenas árvore**

```
    T1 ←→ T2
    ↓  ×  ↓
    T3 ←→ T4
```

Pensamentos podem se informar mutuamente, criar loops de refinamento.

### 4. Skeleton-of-Thought
**Crie outline primeiro, depois preencha detalhes em paralelo**

```
1. Generate skeleton (high-level plan)
   - Introdução
   - Ponto 1
   - Ponto 2
   - Conclusão

2. Expand each section in parallel
   [Intro] → detailed intro
   [Point1] → detailed point 1
   [Point2] → detailed point 2
   [Conclusion] → detailed conclusion

3. Combine
```

**Implementação:**
```python
async def skeleton_of_thought(topic):
    # 1. Generate skeleton
    skeleton = llm.invoke(f"""
    Create a high-level outline for an essay about: {topic}

    Format:
    1. Section name
    2. Section name
    ...
    """)

    sections = parse_sections(skeleton)

    # 2. Expand sections in parallel
    async def expand_section(section_name):
        return await llm.invoke_async(f"""
        Write detailed content for this section:
        Section: {section_name}
        Topic: {topic}

        Content (2-3 paragraphs):
        """)

    expanded = await asyncio.gather(*[expand_section(s) for s in sections])

    # 3. Combine
    full_essay = combine_sections(skeleton, expanded)
    return full_essay
```

## Planning Frameworks

### ReAct Planner
```python
class ReActPlanner:
    def plan_and_execute(self, goal):
        plan = []
        context = f"Goal: {goal}"

        while not goal_achieved(context):
            # Think
            thought = llm.invoke(f"{context}\n\nWhat should I do next?")
            plan.append({"type": "thought", "content": thought})

            # Act
            action = llm.invoke(f"{context}\n{thought}\n\nWhat action to take?")
            plan.append({"type": "action", "content": action})

            # Observe
            observation = execute_action(action)
            plan.append({"type": "observation", "content": observation})

            context += f"\n{thought}\n{action}\n{observation}"

        return plan
```

### Hierarchical Task Network (HTN)
```python
class HTNPlanner:
    def __init__(self):
        self.task_library = {
            "make_dinner": {
                "subtasks": ["get_ingredients", "cook", "serve"],
                "constraints": ["ingredients_before_cook", "cook_before_serve"]
            },
            "get_ingredients": {
                "subtasks": ["check_pantry", "shop_if_needed"]
            }
        }

    def decompose(self, high_level_task):
        if high_level_task not in self.task_library:
            return [{"primitive": high_level_task}]  # Primitive task

        plan = []
        task_def = self.task_library[high_level_task]

        for subtask in task_def["subtasks"]:
            # Recursive decomposition
            plan.extend(self.decompose(subtask))

        return plan

# Usage
planner = HTNPlanner()
plan = planner.decompose("make_dinner")
# Returns: [check_pantry, shop_if_needed, cook, serve]
```

## Self-Refinement & Reflection

### Reflexion Pattern
```python
def reflexion_loop(task, max_iterations=3):
    solution = None

    for i in range(max_iterations):
        # 1. Generate solution
        solution = llm.invoke(f"Solve: {task}")

        # 2. Self-evaluate
        evaluation = llm.invoke(f"""
        Solution: {solution}
        Task: {task}

        Evaluate this solution (0-10):
        Score:
        Issues found:
        """)

        score, issues = parse_evaluation(evaluation)

        # 3. If good enough, done
        if score >= 8:
            return solution

        # 4. Reflect and improve
        reflection = llm.invoke(f"""
        Previous attempt: {solution}
        Issues: {issues}

        How can we improve this? What went wrong?
        Reflection:
        """)

        # 5. Try again with insights
        task += f"\n\nPrevious attempt failed because: {reflection}"

    return solution
```

## Monte Carlo Tree Search (MCTS) for Planning
```python
import math
import random

class MCTSNode:
    def __init__(self, state, parent=None):
        self.state = state
        self.parent = parent
        self.children = []
        self.visits = 0
        self.value = 0

    def ucb1(self, exploration=1.41):
        if self.visits == 0:
            return float('inf')
        return (self.value / self.visits) +             exploration * math.sqrt(math.log(self.parent.visits) / self.visits)

    def best_child(self):
        return max(self.children, key=lambda c: c.ucb1())

def mcts_planning(initial_state, iterations=100):
    root = MCTSNode(initial_state)

    for _ in range(iterations):
        # 1. Selection
        node = root
        while node.children:
            node = node.best_child()

        # 2. Expansion
        if node.visits > 0:
            possible_actions = get_possible_actions(node.state)
            for action in possible_actions:
                new_state = apply_action(node.state, action)
                child = MCTSNode(new_state, parent=node)
                node.children.append(child)

        # 3. Simulation (rollout)
        value = simulate_random_playouts(node.state)

        # 4. Backpropagation
        while node:
            node.visits += 1
            node.value += value
            node = node.parent

    # Return best action
    return max(root.children, key=lambda c: c.visits).state
```

## Best Practices

1. **Match Technique to Problem**:
   - CoT: Reasoning matemático, lógica
   - ToT: Problemas com múltiplas abordagens viáveis
   - Reflexion: Tarefas que beneficiam de iteração
   - Skeleton: Content generation longo

2. **Set Computation Budgets**: Limit depth, iterations, branches
3. **Implement Caching**: Avoid recomputing same subproblems
4. **Parallel When Possible**: Expand independent branches simultaneously
5. **Early Termination**: Stop if satisfactory solution found

## Recursos Adicionais

- **"Chain-of-Thought Prompting Elicits Reasoning"**: Paper original CoT
- **"Tree of Thoughts: Deliberate Problem Solving"**: ToT paper
- **"Graph of Thoughts"**: Latest advancement
- **"ReAct: Synergizing Reasoning and Acting"**: Planning + execution
- **LangChain Planning Agents**: Implementations prontas

---

**Resumo**: Planning & Reasoning transforma LLMs de responders reativos em thinkers estratégicos. Técnicas como CoT, ToT e Reflexion permitem abordar problemas complexos com pensamento deliberado e multi-step reasoning.
