# Loops Agênticos (ReAct, ReWOO)

## O Que É

Loops Agênticos são padrões arquiteturais onde LLMs executam ciclos iterativos de raciocínio, ação e observação até resolver um problema. Em vez de gerar uma resposta única,

 o agente "pensa em voz alta", decide ações, executa-as, observa resultados e repete até concluir a tarefa.

**ReAct** (Reasoning + Acting) e **ReWOO** (Reasoning WithOut Observation) são dois frameworks principais que implementam esses loops de formas diferentes.

## Por Que Usar

**Benefícios:**
- **Resolução de Problemas Complexos**: Tarefas multi-step que requerem planejamento
- **Auto-Correção**: Agente pode detectar erros e tentar novamente
- **Transparência**: Loop explica raciocínio passo a passo
- **Tool Use**: Agente decide quando e quais ferramentas usar
- **Adaptabilidade**: Ajusta estratégia baseado em feedback

**Quando usar:**
- Research tasks que requerem múltiplas buscas
- Debugging de código
- Análise de dados exploratória
- Customer support multi-turn
- Tarefas que requerem validação intermediária

## ReAct Framework

### Arquitetura

```
Loop até task completada ou max iterations:
    1. THOUGHT (Raciocínio): "Preciso buscar informação sobre X"
    2. ACTION (Ação): search("X")
    3. OBSERVATION (Observação): [resultados da busca]
    4. THOUGHT: "Agora entendi, preciso calcular Y"
    5. ACTION: calculator("Y")
    6. OBSERVATION: [resultado do cálculo]
    7. THOUGHT: "Tenho info suficiente, posso responder"
    8. FINAL ANSWER: [resposta final]
```

### Exemplo Prático ReAct

```python
from langchain.agents import Tool, AgentExecutor, create_react_agent
from langchain_anthropic import ChatAnthropic
from langchain.prompts import PromptTemplate

# Define tools
tools = [
    Tool(
        name="Wikipedia",
        func=wikipedia_search,
        description="Busca informações na Wikipedia. Input: termo de busca"
    ),
    Tool(
        name="Calculator",
        func=calculator,
        description="Calcula expressões matemáticas. Input: expressão como '2+2' ou '15*7'"
    )
]

# ReAct prompt template
template = """
Answer the following question using this format:

Question: the input question
Thought: think about what to do
Action: the action to take (must be one of: {tool_names})
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer

Tools available:
{tools}

Question: {input}
{agent_scratchpad}
"""

prompt = PromptTemplate.from_template(template)

# Create ReAct agent
llm = ChatAnthropic(model="claude-3-5-sonnet-20250219")
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, max_iterations=5)

# Execute
result = agent_executor.invoke({
    "input": "Quem é o CEO da Tesla e quantos anos ele tinha em 2020?"
})
```

**Output do Loop:**
```
Thought: Preciso descobrir quem é o CEO da Tesla
Action: Wikipedia
Action Input: Tesla CEO

Observation: Elon Musk é o CEO da Tesla desde 2008...

Thought: Agora preciso descobrir a idade de Elon Musk em 2020
Action: Wikipedia
Action Input: Elon Musk nascimento

Observation: Elon Musk nasceu em 28 de junho de 1971...

Thought: Agora posso calcular a idade
Action: Calculator
Action Input: 2020 - 1971

Observation: 49

Thought: Tenho todas as informações necessárias
Final Answer: O CEO da Tesla é Elon Musk. Em 2020, ele tinha 49 anos.
```

## ReWOO Framework

### Diferença Principal

**ReAct**: Executa ações SEQUENCIALMENTE, observa resultado, decide próxima ação
**ReWOO**: PLANEJA todas as ações ANTES, executa em PARALELO quando possível

### Arquitetura ReWOO

```
1. PLANNER (Planejamento)
   - Gera PLANO COMPLETO upfront
   - Define todas as ações necessárias
   - Identifica dependências

2. WORKER (Execução)
   - Executa ações em paralelo quando possível
   - Respeita dependências

3. SOLVER (Síntese)
   - Combina resultados
   - Gera resposta final
```

### Exemplo Prático ReWOO

```python
# 1. PLANNER
plan_prompt = f"""
Question: {question}
Tools: {tools_description}

Create a plan with these steps:
Plan: #E1 = Tool[input]
Plan: #E2 = Tool[input that may reference #E1]
...

Question: Qual o PIB da França e da Alemanha em 2023? Qual a diferença?
"""

# LLM generates plan:
"""
Plan: #E1 = Wikipedia[PIB França 2023]
Plan: #E2 = Wikipedia[PIB Alemanha 2023]
Plan: #E3 = Calculator[#E1 - #E2]
"""

# 2. WORKER - Execute (E1 e E2 em paralelo!)
import asyncio

async def execute_plan(plan):
    # Parse plan
    steps = parse_plan(plan)

    # Identify parallel steps (no dependencies)
    parallel_steps = [steps[0], steps[1]]  # E1 e E2
    results = await asyncio.gather(*[execute_step(s) for s in parallel_steps])

    evidence = {
        "#E1": results[0],  # PIB França
        "#E2": results[1]   # PIB Alemanha
    }

    # Execute dependent step
    evidence["#E3"] = execute_step(steps[2], evidence)  # Calculator

    return evidence

# 3. SOLVER
solver_prompt = f"""
Question: {question}
Plan: {plan}
Evidence: {evidence}

Based on the evidence, answer the question:
"""

final_answer = llm.invoke(solver_prompt)
```

## Comparação ReAct vs ReWOO

| Aspecto | ReAct | ReWOO |
|---------|-------|-------|
| **Planning** | Incremental (passo a passo) | Upfront (todo o plano antes) |
| **Execução** | Sequencial | Paralela quando possível |
| **Flexibilidade** | Alta (adapta com feedback) | Média (plano fixo) |
| **Velocidade** | Mais lenta | Mais rápida (paralelismo) |
| **Latência** | Alta (múltiplas chamadas LLM) | Baixa (menos chamadas) |
| **Custo** | Mais caro (mais tokens) | Mais barato |
| **Melhor Para** | Tarefas imprevisíveis, debugging | Tarefas bem definidas, busca de dados |

## Outros Padrões de Loops

### Reflexion
```
Loop:
    1. Generate solution
    2. Self-evaluate
    3. If não satisfatório: reflect on errors
    4. Try again with improvements
Until satisfactory or max attempts
```

### Tree of Thoughts (ToT)
```
For each thought:
    - Generate múltiplas alternativas
    - Evaluate cada path
    - Backtrack se necessário
    - Explore best branches
```

## Implementação Completa Simplificada

```python
class ReactAgent:
    def __init__(self, llm, tools, max_iterations=5):
        self.llm = llm
        self.tools = {tool.name: tool for tool in tools}
        self.max_iterations = max_iterations

    def run(self, question):
        scratchpad = []

        for i in range(self.max_iterations):
            # Generate thought + action
            prompt = self.build_prompt(question, scratchpad)
            response = self.llm.invoke(prompt)

            # Parse response
            thought, action, action_input = self.parse_response(response)

            scratchpad.append(f"Thought: {thought}")
            scratchpad.append(f"Action: {action}")
            scratchpad.append(f"Action Input: {action_input}")

            # Check if final answer
            if action == "Final Answer":
                return action_input

            # Execute action
            if action in self.tools:
                observation = self.tools[action].run(action_input)
                scratchpad.append(f"Observation: {observation}")
            else:
                scratchpad.append(f"Observation: Tool '{action}' not found")

        return "Max iterations reached without final answer"

    def build_prompt(self, question, scratchpad):
        return f"""
Answer: {question}

Tools: {list(self.tools.keys())}

{chr(10).join(scratchpad)}

What's your next thought and action?
"""

    def parse_response(self, response):
        # Simple parsing (production needs robust parser)
        lines = response.split('\n')
        thought = lines[0].replace("Thought:", "").strip()
        action = lines[1].replace("Action:", "").strip()
        action_input = lines[2].replace("Action Input:", "").strip()
        return thought, action, action_input
```

## Dicas Práticas

1. **Set Max Iterations**: Evite loops infinitos
   ```python
   max_iterations=10  # Limite razoável
   ```

2. **Implement Early Stopping**: Pare se stuck em loop
   ```python
   if scratchpad[-3:] == scratchpad[-6:-3]:  # Repetindo?
       break  # Stuck in loop
   ```

3. **Tool Descriptions**: Quanto mais claras, melhor agent escolhe
   ```python
   description="Search Wikipedia for factual information. Input: search term as string"
   ```

4. **Logging**: Log cada iteração para debug
   ```python
   logger.info(f"Iteration {i}: Thought={thought}, Action={action}")
   ```

5. **Cost Monitoring**: Loops podem ser caros, monitore tokens

## Erros Comuns

### ❌ Erro 1: Loop Infinito
Agent fica preso repetindo mesmas ações.

### ✅ Solução
- Implemente max_iterations
- Detecte repetições e force parada
- Improve prompts para evitar loops

### ❌ Erro 2: Tool Hallucination
Agent inventa ferramentas que não existem.

### ✅ Solução
```
Available tools (ONLY use these):
- Tool1: description
- Tool2: description

DO NOT invent tools. If task impossible with available tools, say so.
```

### ❌ Erro 3: Action Format Errado
Agent não segue formato esperado.

### ✅ Solução
- Use few-shot examples
- Strict parsing with error feedback
- Output prefilling para forçar formato

## Recursos Adicionais

- **ReAct Paper**: "ReAct: Synergizing Reasoning and Acting in Language Models"
- **ReWOO Paper**: "ReWOO: Decoupling Reasoning from Observations"
- **LangChain Agents**: Implementações prontas
- **AutoGPT**: Exemplo famoso de agent autônomo
- **BabyAGI**: Loop agêntico simplificado e educacional

---

**Resumo**: Loops Agênticos transformam LLMs de responders passivos em problem-solvers ativos que podem raciocinar, agir e adaptar. ReAct é flexível mas lento; ReWOO é eficiente mas rígido. Escolha baseado no seu use case.
