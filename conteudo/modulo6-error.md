# Error Handling & Recovery

## O Que É

Error Handling & Recovery em agentes de IA são estratégias e padrões para detectar, diagnosticar e se recuperar graciosamente de falhas durante execução. Em vez de crashar ou retornar outputs inválidos, agentes robustos antecipam problemas, implementam fallbacks e se auto-corrigem quando possível.

Essencial para sistemas de produção onde confiabilidade importa mais que performance perfeita.

## Por Que Usar

**Benefícios:**
- **Reliability**: Sistemas funcionam mesmo quando algo dá errado
- **User Experience**: Falhas graciosas vs crashes abruptos
- **Debuggability**: Errors informativos facilitam troubleshooting
- **Cost Efficiency**: Retry inteligente vs reprocessamento manual
- **Trust**: Usuários confiam em sistemas que lidam bem com edge cases

**Quando usar:**
- Production systems com SLA
- Multi-step workflows críticos
- Tool calling com APIs externas não-confiáveis
- Long-running tasks que não podem falhar no meio
- Customer-facing applications

## Tipos de Erros

### 1. LLM Errors
- **Hallucination**: Inventar fatos
- **Format Errors**: Output não segue formato esperado
- **Refusal**: Modelo se recusa a responder
- **Timeout**: Response demora demais
- **Rate Limit**: Too many requests

### 2. Tool Errors
- **API Failures**: External API down ou timeout
- **Invalid Parameters**: Tool chamado com params errados
- **Permission Denied**: Sem acesso a resource
- **Resource Not Found**: Tentando acessar dado inexistente

### 3. Logic Errors
- **Infinite Loops**: Agent stuck repetindo mesma ação
- **Goal Drift**: Agent perdeu o objetivo original
- **Circular Dependencies**: Tasks dependem uns dos outros circ

ularmente

## Error Handling Strategies

### 1. Retry with Exponential Backoff

```python
import time
import random

def retry_with_backoff(func, max_retries=3, base_delay=1):
    """Retry with exponential backoff"""
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise  # Last attempt, propagate error

            # Exponential backoff with jitter
            delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
            print(f"Attempt {attempt + 1} failed: {e}. Retrying in {delay:.2f}s...")
            time.sleep(delay)

# Usage
result = retry_with_backoff(lambda: llm.invoke(prompt))
```

### 2. Validation & Self-Correction

```python
def validated_llm_call(prompt, validator, max_attempts=3):
    """Call LLM with output validation"""
    for attempt in range(max_attempts):
        response = llm.invoke(prompt)

        # Validate
        is_valid, error_msg = validator(response)

        if is_valid:
            return response

        # Self-correction
        prompt += f"\n\nPrevious response was invalid: {error_msg}\nPlease fix and try again:"

    raise ValueError(f"Failed to get valid response after {max_attempts} attempts")

# Validator example
def json_validator(response):
    try:
        json.loads(response)
        return True, None
    except json.JSONDecodeError as e:
        return False, f"Invalid JSON: {str(e)}"

# Usage
result = validated_llm_call(
    "Extract user info as JSON: ...",
    validator=json_validator
)
```

### 3. Fallback Strategies

```python
class FallbackChain:
    def __init__(self, strategies):
        self.strategies = strategies  # List of functions to try

    def execute(self, *args, **kwargs):
        errors = []

        for i, strategy in enumerate(self.strategies):
            try:
                result = strategy(*args, **kwargs)
                if i > 0:  # Used fallback
                    log.warning(f"Primary failed, used fallback {i}")
                return result
            except Exception as e:
                errors.append((strategy.__name__, str(e)))
                continue

        # All strategies failed
        raise Exception(f"All strategies failed: {errors}")

# Usage
def primary_strategy(query):
    return expensive_llm.invoke(query)  # GPT-4

def fallback_strategy(query):
    return cheaper_llm.invoke(query)  # GPT-3.5

def last_resort(query):
    return "I apologize, I'm experiencing technical difficulties."

chain = FallbackChain([primary_strategy, fallback_strategy, last_resort])
response = chain.execute("What is...?")
```

### 4. Circuit Breaker Pattern

```python
from datetime import datetime, timedelta

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failures = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN

    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if datetime.now() - self.last_failure_time > timedelta(seconds=self.timeout):
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")

        try:
            result = func(*args, **kwargs)

            # Success - reset
            if self.state == "HALF_OPEN":
                self.state = "CLOSED"
            self.failures = 0

            return result

        except Exception as e:
            self.failures += 1
            self.last_failure_time = datetime.now()

            if self.failures >= self.failure_threshold:
                self.state = "OPEN"
                log.error(f"Circuit breaker opened after {self.failures} failures")

            raise e

# Usage
breaker = CircuitBreaker(failure_threshold=5, timeout=60)

def call_external_api():
    return breaker.call(api.get_data)
```

### 5. Graceful Degradation

```python
class GracefulAgent:
    def process(self, query):
        try:
            # Try full feature set
            return self.full_processing(query)
        except ToolCallError:
            # Tools unavailable, use limited mode
            log.warning("Tools unavailable, using limited mode")
            return self.limited_processing(query)
        except Exception as e:
            # Complete failure, return safe default
            log.error(f"Processing failed: {e}")
            return self.safe_default_response(query)

    def full_processing(self, query):
        # Uses tools, RAG, etc
        context = self.rag.retrieve(query)
        tools_result = self.execute_tools()
        return self.llm.invoke(f"{context}\n{tools_result}\n{query}")

    def limited_processing(self, query):
        # No tools, just LLM knowledge
        return self.llm.invoke(query)

    def safe_default_response(self, query):
        return "I'm experiencing technical difficulties. Please try again later or contact support."
```

## Specific Error Handlers

### Handling Hallucinations

```python
def verify_facts(response, knowledge_base):
    """Verify factual claims against knowledge base"""
    # Extract claims
    claims = llm.invoke(f"Extract factual claims from: {response}")

    unverified = []
    for claim in parse_claims(claims):
        # Check against KB
        if not knowledge_base.verify(claim):
            unverified.append(claim)

    if unverified:
        # Regenerate without unverified claims
        return llm.invoke(f"""
        Previous response contained unverified claims: {unverified}

        Regenerate response to: {original_query}
        ONLY use verified facts from knowledge base.
        If information not available, say so explicitly.
        """)

    return response
```

### Handling Format Errors

```python
import json
from pydantic import BaseModel, ValidationError

class UserInfo(BaseModel):
    name: str
    email: str
    age: int

def parse_with_recovery(response: str, schema: BaseModel):
    """Parse LLM output with error recovery"""
    # Try 1: Direct parse
    try:
        return schema.parse_raw(response)
    except ValidationError as e:
        pass

    # Try 2: Extract JSON from markdown code block
    try:
        json_str = extract_code_block(response)
        return schema.parse_raw(json_str)
    except:
        pass

    # Try 3: Ask LLM to fix
    fix_prompt = f"""
    This JSON is invalid:
    {response}

    Error: {e}

    Please provide ONLY valid JSON matching this schema:
    {schema.schema_json()}
    """
    fixed = llm.invoke(fix_prompt)
    return schema.parse_raw(fixed)
```

### Handling Infinite Loops

```python
class LoopDetector:
    def __init__(self, window_size=3):
        self.action_history = []
        self.window_size = window_size

    def check_loop(self, action):
        self.action_history.append(action)

        if len(self.action_history) < self.window_size * 2:
            return False

        # Check if last N actions repeat previous N
        recent = self.action_history[-self.window_size:]
        previous = self.action_history[-self.window_size*2:-self.window_size]

        if recent == previous:
            return True  # Loop detected!

        return False

    def break_loop(self):
        """Strategy to break out of loop"""
        return "STOP_AND_RETHINK"  # Force agent to try different approach

# Usage
detector = LoopDetector(window_size=3)

for step in agent_loop:
    action = agent.decide_action()

    if detector.check_loop(action):
        log.warning("Loop detected! Breaking out...")
        action = detector.break_loop()

    execute(action)
```

## Monitoring & Alerting

```python
import logging
from datetime import datetime

class AgentMonitor:
    def __init__(self):
        self.metrics = {
            "total_calls": 0,
            "errors": 0,
            "retries": 0,
            "avg_latency": 0
        }

    def record_call(self, success, latency, error=None):
        self.metrics["total_calls"] += 1

        if not success:
            self.metrics["errors"] += 1
            self.alert_if_threshold_exceeded()

            # Log error details
            logging.error(f"Agent call failed: {error}")

        # Update latency
        self.metrics["avg_latency"] = (
            (self.metrics["avg_latency"] * (self.metrics["total_calls"] - 1) + latency)
            / self.metrics["total_calls"]
        )

    def alert_if_threshold_exceeded(self):
        error_rate = self.metrics["errors"] / self.metrics["total_calls"]

        if error_rate > 0.1:  # 10% error rate
            send_alert(f"High error rate: {error_rate:.2%}")

        if self.metrics["avg_latency"] > 5000:  # 5s
            send_alert(f"High latency: {self.metrics['avg_latency']}ms")
```

## Best Practices

1. **Fail Fast, Recover Gracefully**: Detect errors quickly, handle elegantly
2. **Idempotency**: Ensure operations can be safely retried
3. **Timeouts Everywhere**: Never wait indefinitely
4. **Logging**: Log all errors with context for debugging
5. **User Communication**: Tell user what happened, don't hide errors
6. **Metrics**: Track error rates, latency, retry counts
7. **Testing**: Test error paths as thoroughly as happy paths

## Recursos Adicionais

- **"Release It!" by Michael Nygard**: Patterns for production systems
- **AWS Well-Architected Framework**: Reliability pillar
- **Site Reliability Engineering**: Google's SRE book
- **Tenacity Library**: Python retry library with advanced features
- **Sentry**: Error tracking and monitoring for production

---

**Resumo**: Error Handling & Recovery transforma protótipos frágeis em sistemas production-ready. Retry strategies, validation, fallbacks e graceful degradation garantem que agents funcionem de forma confiável mesmo quando coisas dão errado.
