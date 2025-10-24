# Production Systems

## O Que É

Production Systems para LLMs são arquiteturas robustas, escaláveis e confiáveis que levam aplicações de IA generativa do protótipo para ambientes de produção com tráfego real, SLAs rigorosos e requisitos de negócio críticos.

**Diferença entre Protótipo e Produção:**

| Aspecto | Protótipo | Produção |
|---------|-----------|----------|
| **Usuários** | Você e time | Milhares/milhões |
| **Uptime** | "Funciona na minha máquina" | 99.9%+ SLA |
| **Latência** | 10s? OK | <2s obrigatório |
| **Custos** | Não importa muito | Cada centavo conta |
| **Erros** | Refresh e tenta de novo | Graceful degradation |
| **Segurança** | API key no código | Secrets management, auth |
| **Monitoring** | `console.log()` | Observabilidade completa |

## Por Que Usar

### Riscos de Não Preparar para Produção

1. **Indisponibilidade**
   - API da Anthropic com rate limit → seu app quebra
   - Custo: usuários frustrados, perda de receita

2. **Custos Explosivos**
   - Prompt mal otimizado × 1M chamadas = 💸💸💸
   - Sem cache = pagar 10x mais que necessário

3. **Performance Ruim**
   - Latência de 15s → usuários abandonam
   - 3s de latência = 32% mais bounce rate

4. **Segurança Vulnerável**
   - API keys vazadas → conta comprometida
   - Prompt injection → dados de clientes expostos

5. **Impossibilidade de Debug**
   - Bug em produção, zero logs → "Não sei o que aconteceu"

### Benefícios de Sistema de Produção Sólido

✅ **Confiabilidade**: Funciona mesmo quando serviços externos falham
✅ **Escalabilidade**: Suporta crescimento de 100 → 1M usuários
✅ **Observabilidade**: Você sabe exatamente o que está acontecendo
✅ **Custo-eficiência**: Otimizações salvam milhares de dólares
✅ **Manutenibilidade**: Deploys seguros, rollbacks fáceis

## Como Funciona

### Arquitetura de Referência

```
┌─────────────────────────────────────────────────────────────┐
│                         Load Balancer                        │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│   API Server │ │ API Server │ │ API Server │  (Auto-scaling)
│   Instance 1 │ │ Instance 2 │ │ Instance N │
└───────┬──────┘ └─────┬──────┘ └─────┬──────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
        ┌───────────────┼───────────────────────┐
        │               │                       │
┌───────▼────────┐ ┌───▼─────────────┐ ┌──────▼───────┐
│  Cache Layer   │ │  Queue System   │ │   Database   │
│  (Redis/KV)    │ │  (SQS/RabbitMQ) │ │  (Postgres)  │
└────────────────┘ └─────────┬───────┘ └──────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Worker Processes │  (Async jobs)
                    │  (LLM calls aqui) │
                    └───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Anthropic API   │
                    └───────────────────┘
```

### Componentes Essenciais

#### 1. **Rate Limiting e Throttling**

```python
from functools import wraps
import time
from collections import deque

class RateLimiter:
    """Token bucket rate limiter"""
    def __init__(self, max_calls, time_window):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = deque()

    def allow_request(self):
        now = time.time()

        # Remove chamadas antigas
        while self.calls and self.calls[0] < now - self.time_window:
            self.calls.popleft()

        if len(self.calls) < self.max_calls:
            self.calls.append(now)
            return True

        return False

# Decorator para rate limiting
limiter = RateLimiter(max_calls=50, time_window=60)  # 50 req/min

def rate_limited(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not limiter.allow_request():
            raise Exception("Rate limit exceeded. Try again later.")
        return func(*args, **kwargs)
    return wrapper

@rate_limited
def call_claude(prompt):
    # Sua chamada para API
    ...
```

#### 2. **Retry Logic com Exponential Backoff**

```python
import backoff
import anthropic

@backoff.on_exception(
    backoff.expo,  # Exponential backoff
    (
        anthropic.RateLimitError,
        anthropic.APIConnectionError,
        anthropic.InternalServerError
    ),
    max_tries=5,
    max_time=300  # Máximo 5 minutos tentando
)
def robust_claude_call(prompt):
    client = anthropic.Anthropic()

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text

# Tenta automaticamente com delays: 1s, 2s, 4s, 8s, 16s
result = robust_claude_call("Hello")
```

#### 3. **Caching Agressivo**

```python
import hashlib
import redis
import json

class LLMCache:
    def __init__(self):
        self.redis_client = redis.Redis(host='localhost', port=6379)
        self.ttl = 86400  # 24 horas

    def _get_cache_key(self, prompt, model, max_tokens):
        """Gera chave única baseada em parâmetros"""
        key_data = f"{model}:{max_tokens}:{prompt}"
        return f"llm_cache:{hashlib.sha256(key_data.encode()).hexdigest()}"

    def get(self, prompt, model, max_tokens):
        """Busca no cache"""
        key = self._get_cache_key(prompt, model, max_tokens)
        cached = self.redis_client.get(key)

        if cached:
            print("Cache HIT!")
            return json.loads(cached)

        print("Cache MISS")
        return None

    def set(self, prompt, model, max_tokens, response):
        """Salva no cache"""
        key = self._get_cache_key(prompt, model, max_tokens)
        self.redis_client.setex(
            key,
            self.ttl,
            json.dumps(response)
        )

# Uso
cache = LLMCache()

def cached_claude_call(prompt):
    # Tenta cache primeiro
    cached = cache.get(prompt, "claude-sonnet-4", 1024)
    if cached:
        return cached

    # Cache miss - faz chamada real
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    result = response.content[0].text

    # Salva no cache
    cache.set(prompt, "claude-sonnet-4", 1024, result)

    return result

# Economiza $$ em prompts repetidos
```

#### 4. **Circuit Breaker Pattern**

```python
from enum import Enum
import time

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"          # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered

class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = CircuitState.CLOSED

    def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.timeout:
                # Tenta novamente
                self.state = CircuitState.HALF_OPEN
            else:
                raise Exception("Circuit breaker is OPEN. Service unavailable.")

        try:
            result = func(*args, **kwargs)

            # Sucesso - reset
            if self.state == CircuitState.HALF_OPEN:
                self.state = CircuitState.CLOSED
            self.failure_count = 0

            return result

        except Exception as e:
            self.failure_count += 1
            self.last_failure_time = time.time()

            if self.failure_count >= self.failure_threshold:
                self.state = CircuitState.OPEN
                print(f"Circuit breaker OPENED after {self.failure_count} failures")

            raise e

# Uso
breaker = CircuitBreaker(failure_threshold=3, timeout=30)

def protected_claude_call(prompt):
    return breaker.call(robust_claude_call, prompt)

# Se 3 chamadas falharem, próximas são rejeitadas por 30s
# Evita sobrecarregar serviço que já está com problemas
```

#### 5. **Async Processing com Filas**

```python
from celery import Celery
import anthropic

# Configuração Celery (com Redis como broker)
app = Celery('tasks', broker='redis://localhost:6379/0')

@app.task(bind=True, max_retries=3)
def process_with_claude(self, user_input):
    """Task assíncrona para processar com Claude"""
    try:
        client = anthropic.Anthropic()

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2048,
            messages=[{"role": "user", "content": user_input}]
        )

        return {
            "status": "success",
            "result": response.content[0].text
        }

    except Exception as e:
        # Retry com exponential backoff
        raise self.retry(exc=e, countdown=2 ** self.request.retries)

# API endpoint
from flask import Flask, jsonify, request

app_flask = Flask(__name__)

@app_flask.route('/api/analyze', methods=['POST'])
def analyze():
    user_input = request.json['input']

    # Enfileira tarefa (retorna imediatamente)
    task = process_with_claude.delay(user_input)

    return jsonify({
        "task_id": task.id,
        "status": "processing"
    }), 202

@app_flask.route('/api/result/<task_id>', methods=['GET'])
def get_result(task_id):
    task = process_with_claude.AsyncResult(task_id)

    if task.ready():
        return jsonify({
            "status": "completed",
            "result": task.result
        })
    else:
        return jsonify({
            "status": "processing"
        }), 202
```

## Exemplos Práticos

### Exemplo 1: API de Produção Completa

```python
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
import redis
import logging
from prometheus_client import Counter, Histogram
import time

# Métricas
llm_requests = Counter('llm_requests_total', 'Total LLM requests')
llm_latency = Histogram('llm_latency_seconds', 'LLM request latency')
llm_errors = Counter('llm_errors_total', 'Total LLM errors')

# Setup
app = FastAPI()
cache = redis.Redis(host='redis', port=6379)
logger = logging.getLogger(__name__)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em prod: lista específica
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    text: str
    analysis_type: str = "sentiment"

class AnalysisResponse(BaseModel):
    result: str
    cached: bool
    latency_ms: float

@app.post("/api/v1/analyze", response_model=AnalysisResponse)
async def analyze_text(request: AnalysisRequest):
    """Endpoint de análise com todas as práticas de produção"""

    start_time = time.time()
    llm_requests.inc()

    # 1. Validação
    if len(request.text) > 10000:
        raise HTTPException(400, "Text too long (max 10000 chars)")

    # 2. Cache lookup
    cache_key = f"analysis:{request.analysis_type}:{hash(request.text)}"
    cached_result = cache.get(cache_key)

    if cached_result:
        latency = (time.time() - start_time) * 1000
        return AnalysisResponse(
            result=cached_result.decode(),
            cached=True,
            latency_ms=latency
        )

    # 3. Rate limiting (por IP, user, etc)
    # ... implementação omitida

    # 4. LLM call com retry
    try:
        result = await call_claude_with_retry(request.text, request.analysis_type)
    except Exception as e:
        llm_errors.inc()
        logger.error(f"LLM call failed: {str(e)}")
        raise HTTPException(503, "Service temporarily unavailable")

    # 5. Cache result
    cache.setex(cache_key, 3600, result)  # 1 hora

    # 6. Métricas
    latency = (time.time() - start_time) * 1000
    llm_latency.observe(latency / 1000)

    return AnalysisResponse(
        result=result,
        cached=False,
        latency_ms=latency
    )

@app.get("/health")
async def health_check():
    """Health check para load balancer"""
    # Verifica dependencies
    try:
        cache.ping()
        # Testa Anthropic API
        client = anthropic.Anthropic()
        # Lightweight check (não gasta créditos)
        return {"status": "healthy"}
    except:
        raise HTTPException(503, "Unhealthy")

async def call_claude_with_retry(text, analysis_type):
    """Chamada robusta ao Claude"""
    # Implementação com retry, circuit breaker, etc
    ...
```

### Exemplo 2: Gerenciamento de Custos

```python
class CostTracker:
    """Rastreia e controla custos de LLM"""

    PRICING = {
        "claude-opus-4-20250514": {
            "input": 0.015,   # per 1K tokens
            "output": 0.075
        },
        "claude-sonnet-4-20250514": {
            "input": 0.003,
            "output": 0.015
        },
        "claude-haiku-3-5-20250514": {
            "input": 0.0008,
            "output": 0.004
        }
    }

    def __init__(self, budget_limit_usd=1000):
        self.budget_limit = budget_limit_usd
        self.db = Database()  # Seu DB

    def track_usage(self, model, input_tokens, output_tokens):
        """Registra uso e calcula custo"""
        pricing = self.PRICING[model]

        cost = (
            (input_tokens / 1000) * pricing["input"] +
            (output_tokens / 1000) * pricing["output"]
        )

        self.db.insert_usage({
            "model": model,
            "input_tokens": input_tokens,
            "output_tokens": output_tokens,
            "cost_usd": cost,
            "timestamp": datetime.now()
        })

        return cost

    def check_budget(self):
        """Verifica se está dentro do budget"""
        total_cost = self.db.get_monthly_cost()

        if total_cost >= self.budget_limit:
            raise BudgetExceededException(
                f"Monthly budget of ${self.budget_limit} exceeded"
            )

        # Alert se > 80%
        if total_cost >= self.budget_limit * 0.8:
            self.send_alert(f"Budget at {(total_cost/self.budget_limit)*100:.1f}%")

    def optimize_model_selection(self, task_complexity):
        """Escolhe modelo mais custo-efetivo para a tarefa"""
        if task_complexity == "low":
            return "claude-haiku-3-5-20250514"  # Mais barato
        elif task_complexity == "medium":
            return "claude-sonnet-4-20250514"
        else:
            return "claude-opus-4-20250514"  # Mais caro, só quando necessário

# Wrapper que rastreia custos
cost_tracker = CostTracker(budget_limit_usd=5000)

def cost_aware_claude_call(prompt, complexity="medium"):
    # Check budget
    cost_tracker.check_budget()

    # Escolhe modelo
    model = cost_tracker.optimize_model_selection(complexity)

    # Faz chamada
    response = client.messages.create(
        model=model,
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    # Rastreia uso
    cost_tracker.track_usage(
        model=model,
        input_tokens=response.usage.input_tokens,
        output_tokens=response.usage.output_tokens
    )

    return response.content[0].text
```

### Exemplo 3: Graceful Degradation

```python
class RobustLLMService:
    """Serviço com fallbacks em cascata"""

    def __init__(self):
        self.primary_client = anthropic.Anthropic()
        self.cache = Cache()
        self.static_responses = self.load_static_responses()

    def process(self, user_input, context=None):
        # Nível 1: Cache (mais rápido e barato)
        cached = self.cache.get(user_input)
        if cached:
            logger.info("Served from cache")
            return cached

        # Nível 2: Primary LLM (Claude)
        try:
            result = self.call_primary_llm(user_input, context)
            self.cache.set(user_input, result)
            return result
        except anthropic.RateLimitError:
            logger.warning("Rate limited, trying fallback")
        except anthropic.APIError as e:
            logger.error(f"Primary LLM failed: {e}")

        # Nível 3: Fallback LLM (modelo mais barato/alternativo)
        try:
            result = self.call_fallback_llm(user_input, context)
            return result
        except Exception as e:
            logger.error(f"Fallback LLM failed: {e}")

        # Nível 4: Resposta estática baseada em padrões
        pattern_response = self.match_static_pattern(user_input)
        if pattern_response:
            logger.warning("Serving static response")
            return pattern_response

        # Nível 5: Erro amigável
        return {
            "error": True,
            "message": "Service temporarily unavailable. Please try again later.",
            "retry_after": 60
        }

    def call_primary_llm(self, input, context):
        # Claude call
        ...

    def call_fallback_llm(self, input, context):
        # Modelo alternativo (GPT-4, etc) ou Claude Haiku
        ...

    def match_static_pattern(self, input):
        # Regex matching para perguntas comuns
        # "Qual o horário?" → resposta estática
        ...
```

## Casos de Uso Reais

### 1. **Chatbot de Atendimento (1M+ mensagens/mês)**

**Desafios:**
- Custo: $15k/mês em LLM calls
- Latência: <2s obrigatório (SLA)
- Uptime: 99.9%

**Soluções implementadas:**
- Cache de respostas similares: -70% de custos
- Queue para non-urgent requests
- Circuit breaker para Anthropic API
- Fallback para respostas template

**Resultado:** Custo reduzido para $4k/mês, latência p95 = 1.2s

### 2. **Análise de Documentos Legais**

**Desafios:**
- Documentos de 50-200 páginas
- Processamento pode levar minutos
- Usuários não podem esperar síncrono

**Solução:**
- Async processing com Celery
- Progress updates via WebSocket
- Partial results (streaming)
- Persistent storage dos resultados

### 3. **Code Review Automation**

**Desafios:**
- PRs com 1000+ linhas de código
- Precisa rodar em CI/CD pipeline
- Budget limitado ($500/mês)

**Solução:**
- Model selection dinâmico:
  - Haiku para syntax/style (barato)
  - Sonnet para logic bugs (médio)
  - Opus só para security (crítico)
- Cache de análises de arquivos não modificados
- Parallel processing de arquivos

## Dicas Práticas

### 1. **Deployment Strategy**

```yaml
# Blue-Green Deployment
# docker-compose.yml

version: '3'
services:
  # Green (versão atual)
  api-green:
    image: myapp:v1.0
    environment:
      - VERSION=v1.0
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api.rule=Host(`api.example.com`)"
      - "traefik.http.services.api.loadbalancer.server.port=8000"
      - "traefik.http.services.api.loadbalancer.healthcheck.path=/health"

  # Blue (nova versão)
  api-blue:
    image: myapp:v1.1
    environment:
      - VERSION=v1.1
    labels:
      - "traefik.enable=false"  # Começa desabilitado

# Deploy: habilita blue, monitora, desabilita green se OK
```

### 2. **Feature Flags**

```python
from launchdarkly import LDClient, Config

ld_client = LDClient(config=Config("your-sdk-key"))

def call_llm(prompt, user_id):
    # Feature flag: testar novo modelo com 10% dos usuários
    use_new_model = ld_client.variation(
        "use-claude-opus-4",
        {"key": user_id},
        default=False
    )

    model = "claude-opus-4-20250514" if use_new_model else "claude-sonnet-4-20250514"

    response = client.messages.create(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )

    return response.content[0].text

# Rollout gradual: 10% → 50% → 100%
```

### 3. **Database Design para Logs**

```sql
-- Tabela de logs otimizada
CREATE TABLE llm_requests (
    id BIGSERIAL PRIMARY KEY,
    request_id UUID NOT NULL,
    user_id VARCHAR(100),
    model VARCHAR(50) NOT NULL,
    prompt_hash VARCHAR(64),  -- SHA256 do prompt (não armazena prompt completo por privacidade)
    input_tokens INT,
    output_tokens INT,
    cost_usd DECIMAL(10, 6),
    latency_ms INT,
    status VARCHAR(20),  -- success, error, timeout
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para queries comuns
CREATE INDEX idx_user_id_created ON llm_requests(user_id, created_at DESC);
CREATE INDEX idx_created_at ON llm_requests(created_at DESC);
CREATE INDEX idx_model_status ON llm_requests(model, status);

-- Particionamento por mês (para volumes altos)
CREATE TABLE llm_requests_2024_01 PARTITION OF llm_requests
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
```

### 4. **Secrets Management**

```python
# NÃO FAÇA ISSO:
api_key = "sk-ant-api03-abc123..."  # ❌ Hardcoded

# FAÇA ISSO:
import os
from google.cloud import secretmanager

def get_secret(secret_name):
    """Busca secret do Google Secret Manager"""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{PROJECT_ID}/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Uso
ANTHROPIC_API_KEY = get_secret("anthropic-api-key")
client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# Ou use variáveis de ambiente (mínimo)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
if not ANTHROPIC_API_KEY:
    raise Exception("API key not configured")
```

## Erros Comuns e Como Evitar

### ❌ Erro 1: Sem Timeout

**Problema:**
```python
# Request pode travar para sempre
response = client.messages.create(...)  # Espera indefinidamente
```

### ✅ Solução: Sempre Use Timeout

```python
import httpx

# Configure timeout no client
client = anthropic.Anthropic(
    timeout=httpx.Timeout(60.0, connect=5.0)  # 60s total, 5s para conectar
)

# Ou por request
response = client.messages.create(
    ...,
    timeout=30.0  # 30 segundos
)
```

### ❌ Erro 2: Logs Inseguros

**Problema:**
```python
# Loga dados sensíveis
logger.info(f"User {user_id} asked: {prompt}")  # Prompt pode ter PII!
logger.info(f"Response: {response}")  # Response pode ter dados confidenciais
```

### ✅ Solução: Log Sanitization

```python
import hashlib

def sanitize_for_logging(text, max_length=100):
    """Remove PII e trunca para logging"""
    # Hash ao invés de texto completo
    text_hash = hashlib.sha256(text.encode()).hexdigest()[:12]

    # Log apenas metadata
    return {
        "hash": text_hash,
        "length": len(text),
        "preview": text[:max_length] + "..." if len(text) > max_length else text
    }

logger.info(f"Request: {sanitize_for_logging(prompt)}")
```

### ❌ Erro 3: Single Point of Failure

**Problema:**
```python
# Se Anthropic API cair, app inteiro para
def process(input):
    return client.messages.create(...)  # Sem fallback
```

### ✅ Solução: Redundância

```python
def process_with_redundancy(input):
    providers = [
        ("anthropic", call_claude),
        ("openai", call_gpt4),
        ("local", call_local_llm)  # Fallback final
    ]

    for provider_name, provider_func in providers:
        try:
            result = provider_func(input)
            logger.info(f"Succeeded with {provider_name}")
            return result
        except Exception as e:
            logger.warning(f"{provider_name} failed: {e}")
            continue

    raise Exception("All providers failed")
```

## Recursos Adicionais

### Ferramentas e Frameworks
- **[FastAPI](https://fastapi.tiangolo.com/)** - Framework web moderno para Python
- **[Celery](https://docs.celeryq.dev/)** - Distributed task queue
- **[Redis](https://redis.io/)** - Cache e message broker
- **[Prometheus](https://prometheus.io/)** + **[Grafana](https://grafana.com/)** - Monitoring
- **[Sentry](https://sentry.io/)** - Error tracking

### Cloud Providers
- **AWS**: Lambda + SQS + ElastiCache
- **GCP**: Cloud Run + Pub/Sub + Memorystore
- **Azure**: Functions + Service Bus + Redis

### Checklists
- [Production Readiness Checklist](https://docs.anthropic.com/claude/docs/production-readiness)
- [12 Factor App](https://12factor.net/) - Metodologia para apps cloud-native

### Exemplos
- [Claude Production Starter](https://github.com/anthropics/claude-production-starter)
- [LLM Production Patterns](https://github.com/examples/llm-production)
