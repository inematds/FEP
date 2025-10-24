# Formatting e Estruturação de Prompts

## Resumo
Usar delimitadores claros e hierarquia para melhorar compreensão do modelo e separar instruções de dados.

## Por que Estruturar?

**Benefícios:**
- ✅ Modelo entende melhor diferentes partes do prompt
- ✅ Separa claramente instruções vs dados vs contexto
- ✅ Reduz ambiguidade
- ✅ Facilita manutenção e reutilização

## Métodos de Estruturação

### 1. XML Tags (Preferência Claude)
```xml
<instructions>
Analise o sentimento desta review
</instructions>

<data>
"Produto excelente, recomendo!"
</data>

<format>
Retorne JSON com: sentimento, confiança, justificativa
</format>
```

### 2. Markdown Sections
```markdown
## Tarefa
Resuma este artigo em 3 bullets

## Contexto
Artigo técnico sobre IA para público executivo

## Artigo
[texto aqui]

## Formato Desejado
- Bullet 1: Principal descoberta
- Bullet 2: Implicação para negócio
- Bullet 3: Próximos passos
```

### 3. Delimitadores Triplos
```
Instruções:
"""
Traduza para inglês, mantendo tom formal
"""

Texto para traduzir:
###
Prezado cliente, informamos que...
###
```

## Melhores Práticas

### ✅ O que Fazer

**1. Use tags descritivas**
```xml
<customer_query>...</customer_query>  ✅ Claro
<input>...</input>  ❌ Vago
```

**2. Seja consistente**
Escolha um estilo (XML, Markdown, etc.) e mantenha em todo prompt.

**3. Hierarquia clara**
```xml
<task>
  <primary>Analisar dados</primary>
  <secondary>Criar visualização</secondary>
</task>
```

**4. Separe tipos de conteúdo**
```xml
<context>Background info</context>
<instructions>What to do</instructions>
<data>Input data</data>
<constraints>What NOT to do</constraints>
```

### ❌ O que Evitar

**1. Misturar estilos**
```
<instrucao>Faça isso</instrucao>
## E também faça
"""E mais isso"""
```
❌ Confuso

**2. Aninhamento excessivo**
```xml
<a><b><c><d><e>Muito profundo</e></d></c></b></a>
```
❌ Complexo demais

**3. Tags sem significado**
```xml
<div1>...</div1>
<section2>...</section2>
```
❌ Use nomes descritivos

## Exemplos Práticos

### Análise com Contexto Rico
```xml
<task>
Avalie viabilidade técnica desta feature request
</task>

<company_context>
- Stack: Python/Django + React
- Team: 3 devs backend, 2 frontend
- Sprint: 2 semanas
</company_context>

<feature_request>
Usuário pede: "Quero exportar relatórios para Excel com gráficos"
</feature_request>

<evaluation_criteria>
1. Esforço (story points)
2. Dependências externas
3. Complexidade técnica
4. Value vs effort ratio
</evaluation_criteria>

<output_format>
JSON com: viabilidade (alta/média/baixa), esforço_estimado, riscos[], recomendação
</output_format>
```

### Prompt Multi-Etapa
```markdown
# Etapa 1: Extração
Extraia todas as datas mencionadas neste email:
<email>
[conteúdo]
</email>

# Etapa 2: Formatação
Converta datas para formato ISO 8601

# Etapa 3: Validação
Verifique se datas são futuras (após 2024-01-01)

# Output Final
Lista JSON: [{"data_original": "...", "data_iso": "...", "valida": true/false}]
```

## Estruturação Específica por Modelo

### Claude (Anthropic)
**Preferência:** XML tags
```xml
<context>...</context>
<instructions>...</instructions>
```

### GPT (OpenAI)
**Flexível:** Markdown ou delimitadores
```markdown
## System
## User
## Assistant
```

### Gemini (Google)
**Funciona bem com:** Markdown estruturado

## Templates Reutilizáveis

### Template: Análise de Texto
```xml
<task>Análise de [tipo]</task>
<text>[input]</text>
<analysis_dimensions>
  <dimension1>...</dimension1>
  <dimension2>...</dimension2>
</analysis_dimensions>
<output_format>...</output_format>
```

### Template: Geração com Restrições
```markdown
# Tarefa
Gerar [o que]

# Requisitos
- [req 1]
- [req 2]

# Restrições
NÃO fazer:
- [rest 1]
- [rest 2]

# Formato
[especificação]
```

## Quando Estruturar é Crítico

1. **Prompts longos** (>500 palavras)
2. **Múltiplas seções** distintas
3. **Dados + instruções** misturados
4. **Contexto complexo**
5. **Quando reutilização** é importante
6. **APIs e automação** (parsing mais fácil)

## Checklist de Estruturação

Antes de enviar prompt complexo:

- [ ] Diferentes partes estão claramente separadas?
- [ ] Tags/seções têm nomes descritivos?
- [ ] Hierarquia é lógica e intuitiva?
- [ ] Estilo é consistente em todo prompt?
- [ ] Formato de output está especificado?

## Conclusão

Estruturação clara não é apenas "cosmética" - ela fundamentalmente melhora a compreensão do modelo e a qualidade das respostas.

**Regra de ouro:** Se SEU prompt é difícil de ler, imagine para o modelo!

**Próximo passo:** Pegue um prompt complexo seu e reestruture com XML ou Markdown. Compare os resultados.
