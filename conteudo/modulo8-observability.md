# Observabilidade e Monitoring

## O Que É

Observabilidade para sistemas LLM é a capacidade de entender o estado interno e comportamento da sua aplicação através de logs, métricas e traces - permitindo diagnosticar problemas, otimizar performance e garantir qualidade mesmo com a natureza não-determinística dos modelos.

**Os 3 Pilares da Observabilidade:**

1. **Logs**: Eventos discretos (request, response, erros)
2. **Métricas**: Medições agregadas (latência, taxa de erro, custo)
3. **Traces**: Fluxo completo de uma requisição pelo sistema

**Por que LLMs são diferentes:**
- Respostas não-determinísticas (dificulta debugging)
- Custos variáveis por request
- Latência imprevisível
- Qualidade subjetiva (como medir "boa resposta"?)

## Por Que Usar

### Problemas Sem Observabilidade

**Cenário 1: Bug em Produção**
```
Cliente: "O chatbot deu resposta errada!"
Você: "Qual foi a pergunta?"
Cliente: "Não lembro exatamente..."
Você: 🤷 [Sem logs = impossível debugar]
```

**Cenário 2: Custos Explosivos**
```
Notificação: "Conta Anthropic: $15,000 este mês"
Você: "MAS POR QUÊ?!"
[Sem métricas = não sabe quais prompts custaram caro]
```

**Cenário 3: Degradação Silenciosa**
```
Usuários começam a reclamar de lentidão
Você: "Mas o servidor está OK..."
[Sem tracing = não vê que LLM está com latência alta]
```

### Benefícios de Boa Observabilidade

✅ **Debug Rápido**: Identifica problema em minutos, não dias
✅ **Otimização de Custos**: Vê onde está gastando e otimiza
✅ **Qualidade**: Detecta degradação de respostas
✅ **SLA**: Monitora latência, uptime, error rate
✅ **Compliance**: Audit trail para regulações

## Como Funciona

### Stack de Observabilidade para LLMs

```
┌──────────────────────────────────────────────┐
│           Visualização & Alertas              │
│  ┌──────────┐  ┌──────────┐  ┌─────────────┐│
│  │ Grafana  │  │ DataDog  │  │ LangSmith   ││
│  └──────────┘  └──────────┘  └─────────────┘│
└────────────────────┬─────────────────────────┘
                     │
┌────────────────────▼─────────────────────────┐
│            Armazenamento & Análise            │
│  ┌──────────────┐  ┌────────────────────────┐│
│  │ Prometheus   │  │ Elasticsearch/         ││
│  │ (Métricas)   │  │ CloudWatch (Logs)      ││
│  └──────────────┘  └────────────────────────┘│
└────────────────────┬─────────────────────────┘
                     │
┌────────────────────▼─────────────────────────┐
│              Instrumentação                   │
│  ┌───────────────────────────────────────┐   │
│  │ Seu código com logging/metrics        │   │
│  └───────────────────────────────────────┘   │
└──────────────────────────────────────────────┘
```

### 1. Logging Estruturado

```python
import logging
import json
from datetime import datetime
import hashlib

class LLMLogger:
    """Logger estruturado para LLM requests"""

    def __init__(self):
        self.logger = logging.getLogger("llm_requests")
        self.logger.setLevel(logging.INFO)

        # Handler para arquivo JSON
        handler = logging.FileHandler("llm_requests.jsonl")
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)

    def log_request(self, request_data):
        """Loga request completo de forma estruturada"""

        # Calcula hash do prompt (não loga prompt completo por privacidade)
        prompt_hash = hashlib.sha256(
            request_data["prompt"].encode()
        ).hexdigest()[:12]

        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "request_id": request_data.get("request_id"),
            "user_id": request_data.get("user_id"),
            "model": request_data.get("model"),
            "prompt_hash": prompt_hash,
            "prompt_length": len(request_data["prompt"]),
            "max_tokens": request_data.get("max_tokens"),
            "temperature": request_data.get("temperature"),
        }

        self.logger.info(json.dumps(log_entry))

    def log_response(self, request_id, response_data):
        """Loga response do LLM"""

        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "request_id": request_id,
            "response_length": len(response_data.get("text", "")),
            "input_tokens": response_data.get("usage", {}).get("input_tokens"),
            "output_tokens": response_data.get("usage", {}).get("output_tokens"),
            "latency_ms": response_data.get("latency_ms"),
            "cost_usd": response_data.get("cost_usd"),
            "finish_reason": response_data.get("stop_reason"),
        }

        self.logger.info(json.dumps(log_entry))

    def log_error(self, request_id, error):
        """Loga erros"""

        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "request_id": request_id,
            "level": "ERROR",
            "error_type": type(error).__name__,
            "error_message": str(error),
        }

        self.logger.error(json.dumps(log_entry))

# Uso
llm_logger = LLMLogger()

def instrumented_claude_call(prompt, user_id):
    request_id = generate_uuid()
    start_time = time.time()

    # Log request
    llm_logger.log_request({
        "request_id": request_id,
        "user_id": user_id,
        "model": "claude-sonnet-4-20250514",
        "prompt": prompt,
        "max_tokens": 1024
    })

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )

        latency_ms = (time.time() - start_time) * 1000

        # Calcula custo
        cost = calculate_cost(
            model="claude-sonnet-4-20250514",
            input_tokens=response.usage.input_tokens,
            output_tokens=response.usage.output_tokens
        )

        # Log response
        llm_logger.log_response(request_id, {
            "text": response.content[0].text,
            "usage": {
                "input_tokens": response.usage.input_tokens,
                "output_tokens": response.usage.output_tokens
            },
            "latency_ms": latency_ms,
            "cost_usd": cost,
            "stop_reason": response.stop_reason
        })

        return response.content[0].text

    except Exception as e:
        llm_logger.log_error(request_id, e)
        raise
```

### 2. Métricas com Prometheus

```python
from prometheus_client import Counter, Histogram, Gauge, Summary
import time

# Definindo métricas
llm_requests_total = Counter(
    'llm_requests_total',
    'Total number of LLM requests',
    ['model', 'status']  # Labels para filtrar
)

llm_latency_seconds = Histogram(
    'llm_latency_seconds',
    'LLM request latency in seconds',
    ['model'],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0]  # Buckets customizados
)

llm_tokens_total = Counter(
    'llm_tokens_total',
    'Total tokens consumed',
    ['model', 'type']  # type: input or output
)

llm_cost_usd_total = Counter(
    'llm_cost_usd_total',
    'Total cost in USD',
    ['model']
)

llm_active_requests = Gauge(
    'llm_active_requests',
    'Number of active LLM requests',
    ['model']
)

class MetricsCollector:
    """Coleta métricas de LLM calls"""

    def track_request(self, model, func, *args, **kwargs):
        """Wrapper que coleta métricas"""

        # Incrementa requests ativos
        llm_active_requests.labels(model=model).inc()

        start_time = time.time()
        status = "success"

        try:
            response = func(*args, **kwargs)

            # Coleta métricas de uso
            llm_tokens_total.labels(
                model=model,
                type="input"
            ).inc(response.usage.input_tokens)

            llm_tokens_total.labels(
                model=model,
                type="output"
            ).inc(response.usage.output_tokens)

            # Calcula custo
            cost = self.calculate_cost(model, response.usage)
            llm_cost_usd_total.labels(model=model).inc(cost)

            return response

        except Exception as e:
            status = "error"
            raise

        finally:
            # Latência
            latency = time.time() - start_time
            llm_latency_seconds.labels(model=model).observe(latency)

            # Total de requests
            llm_requests_total.labels(model=model, status=status).inc()

            # Decrementa requests ativos
            llm_active_requests.labels(model=model).dec()

# Uso
metrics = MetricsCollector()

def monitored_call(prompt):
    return metrics.track_request(
        model="claude-sonnet-4-20250514",
        func=lambda: client.messages.create(
            model="claude-sonnet-4-20250514",
            messages=[{"role": "user", "content": prompt}]
        )
    )

# Expor métricas para Prometheus
from prometheus_client import start_http_server

# Inicia servidor de métricas na porta 8000
start_http_server(8000)

# Prometheus pode agora scrape http://localhost:8000/metrics
```

### 3. Distributed Tracing

```python
from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Setup OpenTelemetry
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

# Exporta para Jaeger/Zipkin/DataDog
otlp_exporter = OTLPSpanExporter(endpoint="localhost:4317")
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

class TracedLLMService:
    """Serviço LLM com tracing completo"""

    def process_user_request(self, user_input):
        """Processa request com trace de ponta a ponta"""

        # Span principal
        with tracer.start_as_current_span("process_user_request") as span:
            span.set_attribute("user_input_length", len(user_input))

            # Sub-span: Validação
            with tracer.start_as_current_span("validate_input"):
                if not self.validate(user_input):
                    span.set_attribute("validation_failed", True)
                    raise ValueError("Invalid input")

            # Sub-span: Cache lookup
            with tracer.start_as_current_span("cache_lookup") as cache_span:
                cached = self.cache.get(user_input)
                cache_span.set_attribute("cache_hit", cached is not None)

                if cached:
                    return cached

            # Sub-span: LLM call
            with tracer.start_as_current_span("llm_call") as llm_span:
                llm_span.set_attribute("model", "claude-sonnet-4")

                response = client.messages.create(
                    model="claude-sonnet-4-20250514",
                    messages=[{"role": "user", "content": user_input}]
                )

                llm_span.set_attribute("input_tokens", response.usage.input_tokens)
                llm_span.set_attribute("output_tokens", response.usage.output_tokens)

            # Sub-span: Post-processing
            with tracer.start_as_current_span("post_process"):
                result = self.post_process(response.content[0].text)

            # Sub-span: Cache update
            with tracer.start_as_current_span("cache_update"):
                self.cache.set(user_input, result)

            return result

# Agora você pode ver trace completo no Jaeger:
# user_request (10s total)
#   ├─ validate_input (0.1s)
#   ├─ cache_lookup (0.2s)
#   ├─ llm_call (9s) ← Gargalo identificado!
#   ├─ post_process (0.5s)
#   └─ cache_update (0.2s)
```

### 4. Qualidade de Respostas (LLM-as-Judge)

```python
class ResponseQualityMonitor:
    """Monitora qualidade das respostas usando LLM como juiz"""

    def __init__(self):
        self.judge_client = anthropic.Anthropic()
        self.quality_scores = []

    def evaluate_response(self, user_query, llm_response):
        """Avalia qualidade da resposta"""

        judge_prompt = f"""Avalie a qualidade desta resposta numa escala de 1-10:

Pergunta do usuário: {user_query}

Resposta do sistema: {llm_response}

Critérios:
- Relevância: responde a pergunta?
- Precisão: informação está correta?
- Completude: resposta é completa?
- Clareza: linguagem é clara?

Retorne apenas um número de 1-10 e breve justificativa.
Formato: SCORE: X/10 | REASON: ..."""

        evaluation = self.judge_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=200,
            messages=[{"role": "user", "content": judge_prompt}]
        )

        # Parse score
        eval_text = evaluation.content[0].text
        score = self.extract_score(eval_text)

        # Log qualidade
        self.quality_scores.append({
            "timestamp": datetime.now(),
            "score": score,
            "query": user_query[:100],
            "evaluation": eval_text
        })

        # Alerta se qualidade baixa
        if score < 5:
            self.alert_low_quality(user_query, llm_response, eval_text)

        return score

    def extract_score(self, eval_text):
        """Extrai score numérico da avaliação"""
        match = re.search(r'SCORE:\s*(\d+)', eval_text)
        if match:
            return int(match.group(1))
        return None

    def get_average_quality(self, window_minutes=60):
        """Calcula qualidade média recente"""
        cutoff = datetime.now() - timedelta(minutes=window_minutes)
        recent_scores = [
            s["score"] for s in self.quality_scores
            if s["timestamp"] > cutoff and s["score"] is not None
        ]

        if not recent_scores:
            return None

        return sum(recent_scores) / len(recent_scores)

# Uso
quality_monitor = ResponseQualityMonitor()

def monitored_chat(user_query):
    response = client.messages.create(...)
    response_text = response.content[0].text

    # Avalia qualidade (assíncrono para não bloquear resposta)
    background_task(
        quality_monitor.evaluate_response,
        user_query,
        response_text
    )

    return response_text

# Dashboard pode mostrar:
# - Qualidade média ao longo do tempo
# - Alerts quando cai abaixo de threshold
# - Exemplos de respostas de baixa qualidade
```

## Exemplos Práticos

### Exemplo 1: Dashboard de Custos

```python
from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

class CostDashboard:
    """Dashboard de custos LLM"""

    def __init__(self, db):
        self.db = db

    def get_cost_breakdown(self, start_date, end_date):
        """Custos por modelo, usuário, feature"""

        query = """
        SELECT
            model,
            DATE(created_at) as date,
            COUNT(*) as requests,
            SUM(input_tokens) as total_input_tokens,
            SUM(output_tokens) as total_output_tokens,
            SUM(cost_usd) as total_cost_usd
        FROM llm_requests
        WHERE created_at BETWEEN %s AND %s
        GROUP BY model, date
        ORDER BY date DESC, total_cost_usd DESC
        """

        results = self.db.execute(query, (start_date, end_date))
        return pd.DataFrame(results)

    def get_top_expensive_users(self, limit=10):
        """Usuários que mais gastam"""

        query = """
        SELECT
            user_id,
            COUNT(*) as requests,
            SUM(cost_usd) as total_cost_usd
        FROM llm_requests
        WHERE created_at > NOW() - INTERVAL '30 days'
        GROUP BY user_id
        ORDER BY total_cost_usd DESC
        LIMIT %s
        """

        return self.db.execute(query, (limit,))

    def get_cost_by_feature(self):
        """Custo por feature/endpoint"""

        query = """
        SELECT
            feature_name,
            COUNT(*) as requests,
            AVG(cost_usd) as avg_cost_per_request,
            SUM(cost_usd) as total_cost_usd
        FROM llm_requests
        WHERE created_at > NOW() - INTERVAL '7 days'
        GROUP BY feature_name
        ORDER BY total_cost_usd DESC
        """

        return self.db.execute(query)

@app.route('/api/costs/breakdown')
def costs_breakdown():
    dashboard = CostDashboard(db)
    data = dashboard.get_cost_breakdown(
        start_date="2024-01-01",
        end_date="2024-01-31"
    )
    return jsonify(data.to_dict(orient='records'))

# Visualização com Grafana:
# - Linha do tempo de custos diários
# - Pizza de custos por modelo
# - Tabela de top usuários/features
```

### Exemplo 2: Alertas Automáticos

```python
from dataclasses import dataclass
import smtplib

@dataclass
class Alert:
    severity: str  # "warning", "critical"
    title: str
    message: str
    metric_value: float
    threshold: float

class AlertManager:
    """Gerencia alertas baseados em métricas"""

    def __init__(self):
        self.alert_rules = [
            {
                "name": "high_error_rate",
                "metric": lambda: self.get_error_rate(window_minutes=5),
                "threshold": 0.05,  # 5%
                "severity": "critical",
                "message": "Error rate above 5%"
            },
            {
                "name": "high_latency",
                "metric": lambda: self.get_p95_latency(window_minutes=5),
                "threshold": 5.0,  # 5 segundos
                "severity": "warning",
                "message": "P95 latency above 5 seconds"
            },
            {
                "name": "cost_spike",
                "metric": lambda: self.get_hourly_cost(),
                "threshold": 100.0,  # $100/hora
                "severity": "warning",
                "message": "Hourly cost above $100"
            },
            {
                "name": "low_quality",
                "metric": lambda: quality_monitor.get_average_quality(window_minutes=30),
                "threshold": 6.0,  # Score < 6
                "comparison": "less_than",
                "severity": "warning",
                "message": "Response quality below 6/10"
            }
        ]

    def check_alerts(self):
        """Verifica todas as regras de alerta"""

        triggered_alerts = []

        for rule in self.alert_rules:
            current_value = rule["metric"]()

            if current_value is None:
                continue

            # Comparação
            comparison = rule.get("comparison", "greater_than")
            threshold = rule["threshold"]

            triggered = (
                (comparison == "greater_than" and current_value > threshold) or
                (comparison == "less_than" and current_value < threshold)
            )

            if triggered:
                alert = Alert(
                    severity=rule["severity"],
                    title=rule["name"],
                    message=rule["message"],
                    metric_value=current_value,
                    threshold=threshold
                )
                triggered_alerts.append(alert)
                self.send_alert(alert)

        return triggered_alerts

    def send_alert(self, alert):
        """Envia alerta via email/Slack/PagerDuty"""

        if alert.severity == "critical":
            # PagerDuty para acordar o oncall
            self.send_pagerduty(alert)
        else:
            # Slack para avisos
            self.send_slack(alert)

        # Log do alerta
        logger.critical(f"ALERT: {alert.title} - {alert.message}")

# Roda em background (Celery beat, cron, etc)
import schedule

schedule.every(1).minutes.do(alert_manager.check_alerts)
```

### Exemplo 3: A/B Testing de Prompts

```python
import random

class PromptABTest:
    """Framework para A/B testing de prompts"""

    def __init__(self):
        self.experiments = {}
        self.results = []

    def create_experiment(self, name, variant_a, variant_b, traffic_split=0.5):
        """Cria experimento A/B"""

        self.experiments[name] = {
            "variant_a": variant_a,
            "variant_b": variant_b,
            "traffic_split": traffic_split,
            "results_a": [],
            "results_b": []
        }

    def get_variant(self, experiment_name, user_id):
        """Seleciona variante de forma consistente por usuário"""

        experiment = self.experiments[experiment_name]

        # Consistent hashing: mesmo user sempre vê mesma variante
        hash_value = hash(f"{experiment_name}:{user_id}")
        assigned_to_a = (hash_value % 100) < (experiment["traffic_split"] * 100)

        return "a" if assigned_to_a else "b"

    def track_result(self, experiment_name, variant, metrics):
        """Registra resultado da variante"""

        experiment = self.experiments[experiment_name]

        result = {
            "timestamp": datetime.now(),
            "variant": variant,
            **metrics  # latency, cost, quality_score, user_satisfaction, etc
        }

        if variant == "a":
            experiment["results_a"].append(result)
        else:
            experiment["results_b"].append(result)

    def analyze_experiment(self, experiment_name):
        """Analisa resultados do experimento"""

        experiment = self.experiments[experiment_name]

        results_a = pd.DataFrame(experiment["results_a"])
        results_b = pd.DataFrame(experiment["results_b"])

        analysis = {
            "variant_a": {
                "count": len(results_a),
                "avg_quality": results_a["quality_score"].mean(),
                "avg_latency": results_a["latency_ms"].mean(),
                "avg_cost": results_a["cost_usd"].mean()
            },
            "variant_b": {
                "count": len(results_b),
                "avg_quality": results_b["quality_score"].mean(),
                "avg_latency": results_b["latency_ms"].mean(),
                "avg_cost": results_b["cost_usd"].mean()
            }
        }

        # Significância estatística (t-test)
        from scipy import stats
        t_stat, p_value = stats.ttest_ind(
            results_a["quality_score"],
            results_b["quality_score"]
        )

        analysis["statistical_significance"] = {
            "p_value": p_value,
            "is_significant": p_value < 0.05
        }

        return analysis

# Uso
ab_test = PromptABTest()

# Experimento: testar dois prompts de chatbot
ab_test.create_experiment(
    name="chatbot_prompt_v2",
    variant_a="You are a helpful assistant.",  # Baseline
    variant_b="You are a concise, friendly assistant.",  # Teste
    traffic_split=0.5
)

def chat(user_id, message):
    # Seleciona variante
    variant = ab_test.get_variant("chatbot_prompt_v2", user_id)
    experiment = ab_test.experiments["chatbot_prompt_v2"]

    system_prompt = (
        experiment["variant_a"] if variant == "a"
        else experiment["variant_b"]
    )

    # Faz chamada
    start_time = time.time()
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        system=system_prompt,
        messages=[{"role": "user", "content": message}]
    )

    latency_ms = (time.time() - start_time) * 1000

    # Avalia qualidade
    quality_score = quality_monitor.evaluate_response(message, response.content[0].text)

    # Registra resultado
    ab_test.track_result("chatbot_prompt_v2", variant, {
        "latency_ms": latency_ms,
        "cost_usd": calculate_cost(...),
        "quality_score": quality_score
    })

    return response.content[0].text

# Após 1000 requests, analisa
results = ab_test.analyze_experiment("chatbot_prompt_v2")
print(results)
# Decide qual variante venceu e promove para 100% do tráfego
```

## Casos de Uso Reais

### 1. **E-commerce Chatbot (100k requests/dia)**

**Métricas rastreadas:**
- Taxa de resolução (usuário conseguiu o que queria?)
- Escalações para humano
- Tempo médio de conversa
- Satisfação (thumbs up/down)

**Alertas:**
- Taxa de escalação > 30% → investigar
- Satisfação < 70% → problematic prompts

### 2. **Geração de Código**

**Métricas rastreadas:**
- Taxa de aceitação de código gerado
- Bugs encontrados em code review
- Tempo economizado vs escrever manualmente

**A/B Tests:**
- Prompt com/sem exemplos
- Diferentes temperaturas
- Models (Opus vs Sonnet)

### 3. **Análise de Documentos Legais**

**Métricas rastreadas:**
- Precisão (validada por advogado)
- Recall (encontrou todas cláusulas relevantes?)
- Custo por documento analisado

**Compliance:**
- Audit trail de quem acessou quais documentos
- Todas análises logadas para revisão futura

## Dicas Práticas

### 1. **Start Simple, Scale Up**

```python
# Dia 1: Logging básico
logging.info(f"User {user_id} asked: {prompt[:50]}...")

# Semana 1: Logging estruturado
logger.info(json.dumps({"user_id": user_id, "prompt_hash": hash(prompt)}))

# Mês 1: Métricas + Tracing
metrics.track(...)
with tracer.span("llm_call"):
    ...

# Mês 3: Dashboards + Alertas + A/B testing
```

Não tente implementar tudo de uma vez!

### 2. **Sampled Logging para Produção**

```python
# Logga 100% em dev, 10% em produção (muito volume)
SAMPLE_RATE = 0.1 if ENV == "production" else 1.0

def should_log():
    return random.random() < SAMPLE_RATE

if should_log():
    llm_logger.log_request(...)
```

### 3. **Retention Policies**

```sql
-- Não armazene logs para sempre - custa caro

-- Logs detalhados: 30 dias
DELETE FROM llm_requests WHERE created_at < NOW() - INTERVAL '30 days';

-- Métricas agregadas: 1 ano
CREATE TABLE llm_metrics_daily AS
SELECT
    DATE(created_at) as date,
    model,
    COUNT(*) as requests,
    AVG(latency_ms) as avg_latency,
    SUM(cost_usd) as total_cost
FROM llm_requests
GROUP BY DATE(created_at), model;

-- Mantém agregados para análise histórica
```

## Recursos Adicionais

### Plataformas Especializadas
- **[LangSmith](https://www.langchain.com/langsmith)** - Observabilidade completa para LLMs
- **[Helicone](https://www.helicone.ai/)** - LLM observability & analytics
- **[Weights & Biases](https://wandb.ai/)** - Tracking de experimentos
- **[Arize AI](https://arize.com/)** - ML observability com foco em LLMs

### Ferramentas Open Source
- **[Prometheus](https://prometheus.io/)** + **[Grafana](https://grafana.com/)** - Stack clássico
- **[Jaeger](https://www.jaegertracing.io/)** - Distributed tracing
- **[OpenTelemetry](https://opentelemetry.io/)** - Padrão de instrumentação

### Guias e Best Practices
- [OpenAI Evals](https://github.com/openai/evals) - Framework de avaliação
- [LangChain Evaluation](https://python.langchain.com/docs/guides/evaluation/)
- [Anthropic Responsible Scaling Policy](https://www.anthropic.com/index/anthropics-responsible-scaling-policy)
