# Prompt Testing & A/B

## O Que É

Prompt Testing & A/B é a prática de testar sistematicamente diferentes versões de prompts, comparar resultados quantitativamente, e iterar baseado em dados reais. Similar a A/B testing em product development, você cria variações de prompts e mede qual performa melhor segundo métricas definidas.

## Por Que Usar

**Benefícios:**
- **Decisões Baseadas em Dados**: Não guess, teste
- **Otimização Contínua**: Melhoria incremental over time
- **ROI Comprovado**: Justificar investimentos em eng. de prompt
- **Descoberta de Edge Cases**: Encontrar falhas antes de produção
- **Confiança**: Deploy com evidência de qualidade

## Como Funciona

### Framework de Testing

**1. Define Métricas**
- Accuracy (% correto)
- Relevance (0-5 scale)
- Latência (segundos)
- Custo ($ por query)
- User satisfaction (feedback)

**2. Create Test Cases**
```python
test_cases = [
    {"input": "...", "expected_output": "...", "category": "simple"},
    {"input": "...", "expected_output": "...", "category": "edge_case"},
    {"input": "...", "expected_output": "...", "category": "ambiguous"},
]
```

**3. Run Variants**
```python
variants = {
    "A": "Prompt original...",
    "B": "Prompt com few-shot...",
    "C": "Prompt com CoT..."
}
```

**4. Collect Results**
```python
results = {
    "A": {"accuracy": 0.82, "avg_latency": 1.2, "cost": 0.05},
    "B": {"accuracy": 0.89, "avg_latency": 1.8, "cost": 0.08},
    "C": {"accuracy": 0.91, "avg_latency": 2.1, "cost": 0.10}
}
```

**5. Analyze & Decide**
```python
# B wins: melhor accuracy com custo aceitável
winner = "B"
```

## Exemplos Práticos

### Exemplo 1: A/B Test Simples

**Variante A (Baseline):**
```
Classifique este email como spam ou legítimo: [email]
```

**Variante B (Com Context):**
```
Você é um filtro de spam profissional.
Analise cuidadosamente este email e classifique:

Email: [email]

Fatores a considerar:
- Remetente suspeito?
- Links maliciosos?
- Urgência artificial?
- Erros gramaticais?

Resposta: SPAM ou LEGÍTIMO (apenas uma palavra)
```

**Test Set:** 1000 emails (500 spam, 500 legítimos)

**Resultados:**
- Variante A: 87% accuracy
- Variante B: 94% accuracy
- **Winner: B** (+7% accuracy)

### Exemplo 2: Multi-Variant Test

```python
from prompttools import PromptTestingHarness

prompts = {
    "zero_shot": "Traduza para inglês: {text}",
    "few_shot": """
        Exemplos:
        PT: Olá → EN: Hello
        PT: Obrigado → EN: Thank you

        PT: {text} → EN:
    """,
    "cot": "Pense passo a passo e traduza para inglês: {text}",
    "json_mode": "Traduza e retorne JSON: {{'original': '...', 'translation': '...'}}"
}

test_texts = ["Bom dia", "Como vai?", "Até logo", ...]

harness = PromptTestingHarness(prompts, test_texts)
results = harness.run()
harness.compare(metrics=["bleu_score", "latency", "cost"])
```

### Exemplo 3: Regression Testing

```python
# Garantir que mudanças não quebram casos existentes
def test_prompt_regression():
    test_suite = load_golden_dataset()  # Casos validados manualmente

    for case in test_suite:
        output = llm.invoke(NEW_PROMPT, case["input"])
        assert similarity(output, case["expected"]) > 0.9, \
            f"Regression em {case['id']}: esperado {case['expected']}, got {output}"
```

## Métricas Importantes

### Métricas Quantitativas
- **Accuracy/F1 Score**: Para classificação
- **BLEU/ROUGE**: Para geração de texto
- **Exact Match**: Output deve ser exatamente X
- **Latência p50/p95**: Performance time
- **Cost per Query**: Eficiência

### Métricas Qualitativas
- **Human Evaluation**: Ranking 1-5 por humanos
- **Hallucination Rate**: % de fatos inventados
- **Tone/Style Match**: Aderência ao tom desejado
- **Completeness**: Cobriu todos os pontos?

## Ferramentas

- **PromptTools**: Library Python para systematic testing
- **LangSmith**: Tracing e testing de LangChain apps
- **Weave** (W&B): Experiment tracking para prompts
- **BrainTrust**: A/B testing e evaluation platform
- **Portkey**: Prompt management com testing integrado

## Dicas Práticas

1. **Start Small**: Teste 2-3 variantes inicialmente
2. **Diverse Test Set**: Inclua casos fáceis, difíceis, edge cases
3. **Automate**: CI/CD para prompt testing
4. **Version Control**: Track prompts no Git
5. **Document Insights**: Por que variant X venceu?

## Recursos Adicionais

- **OpenAI Evals**: Framework de testing oficial
- **PromptBench**: Academic benchmark suite
- **Papers**: "Benchmarking Large Language Models"
- **Community**: Prompt Engineering Discord/Reddit

---

**Resumo**: Testing sistemático transforma prompt engineering de arte em ciência. Meça, compare, itere based on evidence.
