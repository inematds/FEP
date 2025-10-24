# Output Prefilling

## Resumo
Começar a resposta do modelo com texto pré-definido para controlar formato, ton e estrutura desde a primeira palavra.

## Técnica

**Estrutura:**
```
User: [prompt]
Assistant: [você preenche o início]
[modelo continua]
```

## Exemplos Práticos

### 1. JSON Garantido
```
User: Extraia dados
Assistant: {
```
→ Força formato JSON válido

### 2. Controle de Tom
```
User: Explique blockchain
Assistant: Em termos simples:
```
→ Resposta acessível

### 3. Estrutura Forçada
```
User: Analise prós e contras
Assistant: **ANÁLISE**

Prós:
1.
```
→ Segue formato específico

## Casos de Uso
- Garantir formatos estruturados (JSON, XML, Markdown)
- Evitar preambles desnecessários
- Controlar idioma da resposta
- Forçar Chain-of-Thought
- Aplicar templates específicos

## Implementação API
```python
response = client.messages.create(
    model="claude-3-5-sonnet",
    messages=[
        {"role": "user", "content": "Extraia dados"},
        {"role": "assistant", "content": "{"}  # Prefill
    ]
)
```

## Conclusão
Prefilling dá controle direto sobre como a resposta inicia, garantindo formato e tom consistentes.
