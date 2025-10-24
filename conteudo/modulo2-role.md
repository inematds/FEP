## O que é Role Prompting?

Você define quem o modelo "é" antes de fazer a pergunta. Isso contextualiza a resposta.

### Estrutura Básica

\`\`\`
Você é um [papel/especialista] com [características].
[Sua tarefa/pergunta]
\`\`\`

### Por que Funciona?

O modelo foi treinado em textos de diversos especialistas. Ao definir um papel, você "ativa" padrões de linguagem, conhecimento e estilo associados a esse papel.

## Tipos de Roles

### 1. Role por Expertise
"Você é um médico especialista em cardiologia"
→ Ativa conhecimento médico, terminologia técnica

### 2. Role por Estilo
"Você é um professor explicando para crianças de 10 anos"
→ Ativa linguagem simples, analogias, paciência

### 3. Role por Perspectiva
"Você é um crítico cético analisando este argumento"
→ Ativa pensamento crítico, busca por falhas

### 4. Role por Contexto
"Você é um consultor de vendas B2B"
→ Ativa conhecimento de vendas, foco em ROI

## Elementos de um Bom Role

1. **Específico:** "Nutricionista esportiva" > "especialista em saúde"
2. **Com contexto:** "...com 15 anos de experiência"
3. **Com objetivo:** "...ajudando atletas profissionais"
4. **Com estilo:** "...conhecido por explicações práticas"