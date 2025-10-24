## O que são Tokens?

Tokens são como o LLM "lê" texto. Uma palavra pode ser 1 token ou vários tokens.

### Exemplos de Tokenização

- "Olá" = 1 token
- "Brasília" = 2 tokens (Bras + ília)
- "ChatGPT" = 2 tokens (Chat + GPT)
- Espaços e pontuação também são tokens!

**Regra geral:** ~4 caracteres = 1 token em português

## Context Window

O "context window" é a quantidade máxima de tokens que o modelo pode processar de uma vez.

### Tamanhos Comuns

- **Claude 3.5 Sonnet:** 200.000 tokens (~150.000 palavras)
- **GPT-4 Turbo:** 128.000 tokens (~96.000 palavras)
- **GPT-3.5:** 16.000 tokens (~12.000 palavras)

### O que Conta no Context Window?

✅ Seu prompt
✅ Todo o histórico da conversa
✅ A resposta do modelo
✅ Exemplos e contexto que você fornece

## Por que Tokens Importam?

### 1. Limites Físicos
Se você ultrapassar o context window, o modelo não funciona.

### 2. Custo
APIs cobram por token - tanto input quanto output.

### 3. Performance
Prompts muito longos podem afetar a qualidade e velocidade.