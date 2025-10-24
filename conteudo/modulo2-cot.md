## O que é Chain-of-Thought (CoT)?

Em vez de pedir apenas a resposta, você pede ao modelo para "pensar em voz alta" - explicar o raciocínio passo a passo.

### Como Funciona

**Sem CoT:**
Pergunta → Resposta

**Com CoT:**
Pergunta → Raciocínio Passo a Passo → Resposta

### Por que Usar CoT?

✅ **Melhora precisão:** Especialmente em problemas complexos
✅ **Detecta erros:** Você vê onde o raciocínio falhou
✅ **Aumenta confiabilidade:** Respostas mais pensadas
✅ **Permite debug:** Você pode corrigir etapas específicas

## Tipos de CoT

### 1. CoT Explícito
Você instrui diretamente: "Pense passo a passo"

\`\`\`
Resolva este problema passo a passo:
[problema]
\`\`\`

### 2. Few-Shot CoT
Você mostra exemplos com raciocínio

\`\`\`
Exemplo:
Pergunta: [pergunta]
Raciocínio: [passo 1], [passo 2], [passo 3]
Resposta: [resposta]

Agora resolva:
[nova pergunta]
\`\`\`

### 3. Zero-Shot CoT
Simplesmente adicione "Vamos pensar passo a passo"

## Quando Usar CoT?

- Problemas matemáticos
- Raciocínio lógico
- Análise multi-fatorial
- Decisões complexas
- Troubleshooting