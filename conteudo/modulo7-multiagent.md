# Sistemas Multi-Agente

## O Que É

Sistemas Multi-Agente são arquiteturas onde múltiplos agentes de IA (cada um potencialmente com Claude ou outros LLMs) trabalham juntos para resolver problemas complexos. Cada agente tem responsabilidades específicas, habilidades especializadas e pode se comunicar com outros agentes para completar tarefas maiores.

**Componentes principais:**
- **Agentes especializados**: Cada um focado em um domínio ou tarefa
- **Orquestração**: Sistema que coordena os agentes
- **Comunicação inter-agentes**: Protocolo de troca de mensagens
- **Estado compartilhado**: Memória ou contexto compartilhado entre agentes

**Analogia:** É como uma equipe de desenvolvimento onde há front-end devs, back-end devs, QA, DevOps - cada um especializado, mas colaborando no mesmo projeto.

## Por Que Usar

### Vantagens sobre Agente Único

1. **Especialização**
   - Cada agente é expert em seu domínio
   - Prompts otimizados por função
   - Menos ambiguidade no role

2. **Escalabilidade**
   - Processamento paralelo de tarefas
   - Adição modular de capacidades
   - Isolamento de falhas

3. **Manutenibilidade**
   - Agentes independentes são mais fáceis de testar
   - Updates isolados sem afetar o sistema todo
   - Debug mais simples

4. **Complexidade Gerenciável**
   - Decomposição natural de problemas grandes
   - Cada agente tem contexto menor e focado
   - Reduz hallucinations por over-loading

### Quando Usar

**✅ Use Multi-Agente quando:**
- Tarefa envolve múltiplos domínios de expertise
- Processamento paralelo pode acelerar execução
- Subtarefas são naturalmente independentes
- Precisão requer validação cruzada

**❌ Use Agente Único quando:**
- Tarefa é simples e unidimensional
- Overhead de coordenação não vale a pena
- Latência total é crítica
- Budget de custos é muito limitado

## Como Funciona

### Arquiteturas Comuns

#### 1. **Arquitetura Hierárquica (Supervisor)**

```
        [Supervisor Agent]
               |
    +----------+----------+
    |          |          |
[Agent A]  [Agent B]  [Agent C]
  |          |          |
Research   Code      QA/Test
```

**Implementação:**
```python
class SupervisorAgent:
    def __init__(self):
        self.research_agent = ResearchAgent()
        self.code_agent = CodeAgent()
        self.qa_agent = QAAgent()

    def execute_task(self, user_request):
        # 1. Supervisor analisa a tarefa
        plan = self.analyze_and_plan(user_request)

        # 2. Delega para agentes especializados
        if "research" in plan:
            research_result = self.research_agent.run(plan["research"])

        if "code" in plan:
            code_result = self.code_agent.run(
                plan["code"],
                context=research_result
            )

        if "qa" in plan:
            qa_result = self.qa_agent.run(code_result)

        # 3. Supervisor consolida resultados
        return self.consolidate(research_result, code_result, qa_result)

    def analyze_and_plan(self, request):
        response = client.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=2000,
            system="""Você é o supervisor de uma equipe de agentes.
            Analise a tarefa do usuário e crie um plano de execução.
            Retorne JSON com subtarefas para cada agente.""",
            messages=[{
                "role": "user",
                "content": request
            }]
        )
        return json.loads(response.content[0].text)
```

#### 2. **Arquitetura de Pipeline**

```
[Input] → [Agent 1] → [Agent 2] → [Agent 3] → [Output]
         (Process)   (Refine)    (Validate)
```

**Exemplo - Sistema de Análise de Docs:**
```python
class DocumentPipeline:
    def process(self, document):
        # Stage 1: Extraction
        extracted = self.extractor_agent.extract(document)

        # Stage 2: Structuring
        structured = self.structurer_agent.structure(extracted)

        # Stage 3: Analysis
        analyzed = self.analyzer_agent.analyze(structured)

        # Stage 4: Summarization
        summary = self.summarizer_agent.summarize(analyzed)

        return summary

# Cada agente tem seu próprio system prompt especializado
class ExtractorAgent:
    def extract(self, doc):
        return client.messages.create(
            model="claude-sonnet-4-20250514",
            system="Você é especialista em extrair dados de documentos...",
            messages=[{"role": "user", "content": doc}]
        )
```

#### 3. **Arquitetura de Debate/Validação**

```
    [User Input]
         |
    [Agent A] ←→ [Agent B]
         ↓           ↓
    [Response A] [Response B]
         |           |
         +-----+-----+
               ↓
         [Validator]
               ↓
         [Final Answer]
```

**Caso de uso:** Decisões críticas que requerem múltiplas perspectivas.

```python
class DebateSystem:
    def decide(self, question):
        # Dois agentes argumentam lados opostos
        pro_agent = Agent(role="advocate")
        con_agent = Agent(role="skeptic")

        # Round 1
        pro_arg = pro_agent.argue(question, position="favor")
        con_arg = con_agent.argue(question, position="against")

        # Round 2: Rebuttal (cada um vê argumento do outro)
        pro_rebuttal = pro_agent.rebut(con_arg)
        con_rebuttal = con_agent.rebut(pro_arg)

        # Validator decide baseado em todos argumentos
        validator = ValidatorAgent()
        decision = validator.decide({
            "pro": [pro_arg, pro_rebuttal],
            "con": [con_arg, con_rebuttal]
        })

        return decision
```

#### 4. **Arquitetura de Swarm (Enxame)**

Múltiplos agentes trabalham em paralelo em subtarefas independentes.

```python
class SwarmOrchestrator:
    def __init__(self, num_workers=5):
        self.workers = [WorkerAgent(id=i) for i in range(num_workers)]

    def process_batch(self, tasks):
        # Distribui tarefas entre workers
        with ThreadPoolExecutor(max_workers=len(self.workers)) as executor:
            futures = [
                executor.submit(worker.process, task)
                for worker, task in zip(self.workers, tasks)
            ]
            results = [f.result() for f in futures]

        # Agrega resultados
        return self.aggregate(results)

# Caso de uso: Análise de 100 reviews de clientes em paralelo
swarm = SwarmOrchestrator(num_workers=10)
results = swarm.process_batch(customer_reviews)
```

## Exemplos Práticos

### Exemplo 1: Sistema de Code Review Multi-Agente

```python
class CodeReviewSystem:
    def __init__(self):
        self.security_agent = Agent(
            role="security_expert",
            system_prompt="Você é expert em segurança. Analise código buscando vulnerabilidades..."
        )
        self.performance_agent = Agent(
            role="performance_expert",
            system_prompt="Você é expert em performance. Identifique gargalos e otimizações..."
        )
        self.style_agent = Agent(
            role="code_style_expert",
            system_prompt="Você valida padrões de código, nomenclatura, estrutura..."
        )
        self.consolidator = Agent(
            role="consolidator",
            system_prompt="Você recebe múltiplas análises e cria report consolidado..."
        )

    def review(self, code_diff):
        # Análises em paralelo
        with ThreadPoolExecutor(max_workers=3) as executor:
            security_future = executor.submit(
                self.security_agent.analyze, code_diff
            )
            performance_future = executor.submit(
                self.performance_agent.analyze, code_diff
            )
            style_future = executor.submit(
                self.style_agent.analyze, code_diff
            )

            # Aguarda todos
            security_report = security_future.result()
            performance_report = performance_future.result()
            style_report = style_future.result()

        # Consolidação
        final_report = self.consolidator.consolidate({
            "security": security_report,
            "performance": performance_report,
            "style": style_report
        })

        return final_report

# Uso
reviewer = CodeReviewSystem()
report = reviewer.review(git_diff)
print(report)
```

### Exemplo 2: Sistema de Atendimento ao Cliente

```python
class CustomerSupportSystem:
    def __init__(self):
        # Agente de triagem decide qual especialista chamar
        self.triage = TriageAgent()

        # Agentes especializados
        self.billing_agent = BillingAgent()
        self.technical_agent = TechnicalAgent()
        self.sales_agent = SalesAgent()

        # Agente de escalação
        self.escalation_agent = EscalationAgent()

    def handle_ticket(self, customer_message):
        # 1. Triagem
        category = self.triage.categorize(customer_message)

        # 2. Roteamento para especialista
        if category == "billing":
            response = self.billing_agent.respond(customer_message)
        elif category == "technical":
            response = self.technical_agent.respond(customer_message)
        elif category == "sales":
            response = self.sales_agent.respond(customer_message)
        else:
            response = self.escalation_agent.handle(customer_message)

        # 3. Validação de qualidade
        if not self.quality_check(response):
            response = self.escalation_agent.handle(
                customer_message,
                failed_response=response
            )

        return response

class TriageAgent:
    def categorize(self, message):
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            system="""Categorize customer messages into:
            - billing: payment, invoice, refund
            - technical: bugs, how-to, integration
            - sales: pricing, features, demo
            - escalation: complaints, urgent issues

            Return only the category name.""",
            messages=[{"role": "user", "content": message}]
        )
        return response.content[0].text.strip()
```

### Exemplo 3: Sistema de Pesquisa e Síntese

```python
class ResearchSystem:
    def __init__(self):
        self.searcher = SearchAgent()  # Busca informações
        self.validators = [ValidatorAgent() for _ in range(3)]  # 3 validadores
        self.synthesizer = SynthesizerAgent()  # Síntese final

    def research(self, question):
        # 1. Busca em múltiplas fontes
        results = self.searcher.search_multiple_sources(question)

        # 2. Validação cruzada (3 agentes validam independentemente)
        validations = []
        for validator in self.validators:
            validation = validator.validate(results)
            validations.append(validation)

        # 3. Consenso
        consensus = self.get_consensus(validations)

        # 4. Síntese baseada em dados validados
        final_answer = self.synthesizer.synthesize(
            question=question,
            validated_data=consensus
        )

        return final_answer

    def get_consensus(self, validations):
        """Retorna apenas dados validados por maioria (2 de 3)"""
        # Implementação de voting/consenso
        ...
```

## Casos de Uso Reais

### 1. **Assistente de Desenvolvimento Full-Stack**

**Agentes:**
- Frontend Agent: React, CSS, UX
- Backend Agent: APIs, Database, Auth
- DevOps Agent: Deploy, CI/CD, Monitoring
- QA Agent: Testing, Validation

**Fluxo:**
```
User: "Criar feature de autenticação OAuth"
  ↓
Supervisor analisa e delega:
  → Backend Agent: cria endpoints /auth/login, /auth/callback
  → Frontend Agent: cria UI de login e gerencia tokens
  → DevOps Agent: configura secrets no ambiente
  → QA Agent: testa fluxo completo
  ↓
Supervisor valida integração e retorna resultado
```

### 2. **Sistema de Due Diligence Financeira**

**Agentes:**
- Document Parser: extrai dados de PDFs financeiros
- Analyst Agent: analisa métricas financeiras
- Risk Agent: identifica red flags
- Compliance Agent: valida conformidade regulatória
- Reporter: gera relatório executivo

**Vantagem:** Cada agente é especializado e pode ser auditado independentemente.

### 3. **Content Creation Pipeline**

**Agentes:**
- Researcher: pesquisa tópico
- Writer: cria primeiro draft
- Editor: revisa e melhora
- SEO Optimizer: otimiza para SEO
- Fact Checker: valida informações

### 4. **Trading Bot Multi-Estratégia**

**Agentes:**
- Technical Analysis Agent
- Fundamental Analysis Agent
- Sentiment Analysis Agent
- Risk Manager Agent
- Execution Agent

Cada um vota em ações, Risk Manager tem poder de veto.

## Dicas Práticas

### 1. **Design de Agentes**

**Princípios SOLID para Multi-Agente:**

```python
# S - Single Responsibility
class EmailAgent:
    """Apenas processa emails - nada mais"""
    def process_email(self, email): ...

# O - Open/Closed
class BaseAgent:
    """Extensível sem modificar código base"""
    def process(self, input): ...

class SpecializedAgent(BaseAgent):
    def process(self, input):
        # Especialização específica
        ...

# L - Liskov Substitution
# Qualquer agente pode ser substituído por outro do mesmo tipo

# I - Interface Segregation
class ResearchInterface:
    def research(self, topic): ...

class AnalysisInterface:
    def analyze(self, data): ...

# Agente implementa apenas interfaces que usa

# D - Dependency Inversion
class Orchestrator:
    def __init__(self, agents: List[AgentInterface]):
        self.agents = agents  # Depende de abstração, não implementação
```

### 2. **Gerenciamento de Estado Compartilhado**

```python
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class SharedContext:
    """Estado compartilhado entre agentes"""
    user_request: str
    findings: Dict[str, Any] = None
    validations: list = None
    final_output: str = None

    def update(self, agent_id: str, data: Any):
        """Agentes atualizam contexto de forma controlada"""
        if self.findings is None:
            self.findings = {}
        self.findings[agent_id] = data

class Agent:
    def run(self, context: SharedContext):
        # Lê contexto
        previous_data = context.findings

        # Processa
        result = self.process(context.user_request, previous_data)

        # Atualiza contexto
        context.update(self.id, result)

        return context
```

### 3. **Tratamento de Erros em Cascata**

```python
class RobustOrchestrator:
    def execute(self, task):
        context = SharedContext(user_request=task)

        for agent in self.agents:
            try:
                context = agent.run(context)
            except AgentError as e:
                # Tenta fallback
                context = self.fallback_agent.run(context)
                self.log_error(agent.id, e)
            except CriticalError as e:
                # Falha crítica - para pipeline
                return ErrorResponse(error=str(e))

        return context.final_output
```

### 4. **Otimização de Custos**

```python
# Use modelos diferentes por agente conforme necessidade
class CostOptimizedSystem:
    def __init__(self):
        # Tarefas simples: modelo barato
        self.triage = Agent(model="claude-haiku-3-5-20250514")
        self.categorizer = Agent(model="claude-haiku-3-5-20250514")

        # Tarefas complexas: modelo avançado
        self.analyst = Agent(model="claude-opus-4-20250514")
        self.validator = Agent(model="claude-opus-4-20250514")

        # Tarefas balanceadas: modelo intermediário
        self.writer = Agent(model="claude-sonnet-4-20250514")
```

## Erros Comuns e Como Evitar

### ❌ Erro 1: Over-Engineering

**Problema:**
```python
# 10 agentes para tarefa que 1 resolveria
class OverComplexSystem:
    def __init__(self):
        self.parser = Agent()
        self.validator = Agent()
        self.cleaner = Agent()
        self.formatter = Agent()
        self.checker = Agent()
        # ... 5 agentes a mais

    def format_text(self, text):
        # Passa por 10 agentes para formatar texto simples
        ...
```

### ✅ Solução: Start Simple

```python
# Comece com 1 agente
def format_text(text):
    return single_agent.format(text)

# Adicione agentes apenas quando:
# 1. Há claro benefício (especialização, paralelismo)
# 2. Complexidade justifica overhead
# 3. Métricas provam melhoria
```

### ❌ Erro 2: Comunicação Ineficiente

**Problema:**
```python
# Cada agente faz chamada completa com todo histórico
def agent_a(full_context):  # 10k tokens
    response = client.messages.create(messages=full_context)

def agent_b(full_context):  # 10k tokens de novo
    response = client.messages.create(messages=full_context)

# Total: 20k tokens quando podia ser 12k
```

### ✅ Solução: Contexto Incremental

```python
# Passe apenas o necessário
def agent_a(task):
    response = client.messages.create(
        messages=[{"role": "user", "content": task}]
    )
    return response.summary  # Apenas resultado, não todo contexto

def agent_b(task, agent_a_result):
    response = client.messages.create(
        messages=[{
            "role": "user",
            "content": f"Tarefa: {task}\nContexto prévio: {agent_a_result}"
        }]
    )
```

### ❌ Erro 3: Falta de Orquestração

**Problema:**
```python
# Agentes não sabem quando parar ou quem falar
agent_a.run()
agent_b.run()  # Pode rodar desnecessariamente
agent_c.run()  # Pode duplicar trabalho de agent_a
```

### ✅ Solução: Orquestrador Explícito

```python
class Orchestrator:
    def run(self, task):
        # Decisão centralizada
        if self.requires_research(task):
            research = self.research_agent.run(task)
        else:
            research = None

        # Conditional execution
        if research and self.requires_validation(research):
            validated = self.validator.run(research)
        else:
            validated = research

        return validated
```

## Recursos Adicionais

### Frameworks e Bibliotecas
- **[LangGraph](https://github.com/langchain-ai/langgraph)** - Framework para multi-agent systems
- **[AutoGen](https://microsoft.github.io/autogen/)** - Microsoft's multi-agent framework
- **[CrewAI](https://www.crewai.io/)** - Framework focado em colaboração de agentes

### Artigos e Papers
- [Multi-Agent Systems in LLMs](https://arxiv.org/abs/2308.00352) - Survey acadêmico
- [Anthropic's Constitutional AI](https://www.anthropic.com/constitutional-ai) - Debate multi-agente

### Exemplos de Código
- [Multi-Agent Code Review](https://github.com/examples/multi-agent-review) - Sistema completo
- [Research Assistant](https://github.com/examples/research-agents) - Pipeline de pesquisa

### Padrões de Design
- **Supervisor Pattern**: Um agente coordena os outros
- **Pipeline Pattern**: Agentes em sequência
- **Debate Pattern**: Agentes argumentam e validador decide
- **Swarm Pattern**: Muitos agentes em paralelo
