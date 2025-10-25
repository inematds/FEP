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

---

## 📋 Biblioteca de Formatos de Saída Prontos

Além de estruturar o **prompt**, é crucial especificar o **formato da resposta**. Aqui estão 15 formatos prontos para copiar e adaptar:

### 1. Lista Simples

```
Formate a resposta como lista numerada:
1. [Item 1]
2. [Item 2]
3. [Item 3]
```

**Exemplo de uso:**
```
Liste 5 benefícios de exercícios físicos regulares.

Formato:
1. [Benefício 1]
2. [Benefício 2]
...
```

---

### 2. Lista com Categorias

```
Organize em categorias com sub-itens:

**Categoria A:**
- Item A1
- Item A2

**Categoria B:**
- Item B1
- Item B2
```

**Exemplo de uso:**
```
Categorize estas tarefas por urgência:
- Responder email do cliente
- Ler documentação
- Fix bug crítico
- Atualizar README

Formato:
**Urgente:**
- [tarefa]

**Médio:**
- [tarefa]

**Baixo:**
- [tarefa]
```

---

### 3. JSON Simples

```
Retorne em formato JSON:
{
  "campo1": "valor",
  "campo2": 123,
  "campo3": true
}
```

**Exemplo de uso:**
```
Extraia informações deste texto em JSON:
"João Silva, 35 anos, mora em São Paulo, trabalha como engenheiro"

Formato:
{
  "nome": "",
  "idade": 0,
  "cidade": "",
  "profissao": ""
}
```

---

### 4. JSON Array

```
Retorne array JSON com objetos:
[
  {"id": 1, "nome": "...", "status": "..."},
  {"id": 2, "nome": "...", "status": "..."}
]
```

**Exemplo de uso:**
```
Converta estas tarefas para JSON:
- Revisar PR #123 (pendente)
- Deploy em produção (concluído)
- Escrever testes (em progresso)

Formato:
[
  {"id": 1, "tarefa": "...", "status": "..."},
  ...
]
```

---

### 5. JSON Aninhado (Nested)

```
Retorne JSON com estrutura aninhada:
{
  "usuario": {
    "nome": "...",
    "contato": {
      "email": "...",
      "telefone": "..."
    }
  },
  "preferencias": ["...", "..."]
}
```

**Exemplo de uso:**
```
Extraia dados do perfil:
"Maria Santos (maria@email.com, tel: 11-99999-9999) prefere receber emails e não ligações"

Formato JSON aninhado com: usuario{nome, contato{email, telefone}}, preferencias[]
```

---

### 6. Tabela Markdown

```
Formate como tabela:

| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor A  | Valor B  | Valor C  |
| Valor D  | Valor E  | Valor F  |
```

**Exemplo de uso:**
```
Compare Python vs JavaScript vs Go:

Critérios: Performance, Facilidade de aprender, Ecossistema

Formato de tabela markdown:
| Linguagem | Performance | Facilidade | Ecossistema |
|-----------|-------------|------------|-------------|
| ...       | ...         | ...        | ...         |
```

---

### 7. Tabela com Pontuação

```
| Item | Critério 1 (1-5) | Critério 2 (1-5) | Total |
|------|------------------|------------------|-------|
| A    | 4                | 5                | 9     |
| B    | 3                | 4                | 7     |
```

**Exemplo de uso:**
```
Avalie estas ferramentas de IA por: Custo (1-5 baixo=melhor) e Facilidade (1-5 alto=melhor):
- ChatGPT
- Claude
- Gemini

Formato: Tabela com pontuações + coluna Total
```

---

### 8. Checklist Interativo

```
- [ ] Tarefa 1 (não iniciada)
- [x] Tarefa 2 (concluída)
- [ ] Tarefa 3 (não iniciada)
```

**Exemplo de uso:**
```
Crie checklist para onboarding de desenvolvedor:

Formato:
- [ ] [Ação]
- [ ] [Ação]
...
```

---

### 9. XML Estruturado

```
<resultado>
  <item id="1">
    <titulo>...</titulo>
    <descricao>...</descricao>
    <status>...</status>
  </item>
  <item id="2">
    ...
  </item>
</resultado>
```

**Exemplo de uso:**
```
Converta estes bugs para XML:
- Bug #45: Botão não clica (crítico)
- Bug #46: Texto cortado (médio)

Formato XML com: id, titulo, severidade
```

---

### 10. CSV (Valores Separados por Vírgula)

```
Nome,Idade,Cidade,Profissão
João Silva,35,São Paulo,Engenheiro
Maria Santos,28,Rio de Janeiro,Designer
```

**Exemplo de uso:**
```
Extraia dados deste texto para CSV:
"João (35 anos, SP, engenheiro) e Maria (28 anos, RJ, designer)"

Formato: CSV com header Nome,Idade,Cidade,Profissão
```

---

### 11. YAML

```
configuracao:
  ambiente: producao
  versao: 2.1.0
  features:
    - feature_a: true
    - feature_b: false
```

**Exemplo de uso:**
```
Converta estas configurações para YAML:
- Ambiente: produção
- Versão: 2.1.0
- Features ativas: A, C
- Features desativadas: B
```

---

### 12. Comparação Lado a Lado

```
**Opção A:**
✅ Vantagem 1
✅ Vantagem 2
❌ Desvantagem 1

**Opção B:**
✅ Vantagem 1
❌ Desvantagem 1
❌ Desvantagem 2

**Recomendação:** [Escolha com justificativa]
```

**Exemplo de uso:**
```
Compare banco SQL vs NoSQL para app de e-commerce.

Formato: Vantagens/Desvantagens + Recomendação fundamentada
```

---

### 13. Resposta com Código

```
**Explicação:**
[Texto explicativo]

**Implementação:**
\`\`\`python
def exemplo():
    return "código aqui"
\`\`\`

**Como usar:**
\`\`\`python
resultado = exemplo()
print(resultado)
\`\`\`
```

**Exemplo de uso:**
```
Explique e implemente função para validar CPF em Python.

Formato:
- Explicação breve
- Código da função
- Exemplo de uso
```

---

### 14. Timeline / Roadmap

```
**Q1 2024:**
- [x] Milestone 1
- [ ] Milestone 2

**Q2 2024:**
- [ ] Milestone 3
- [ ] Milestone 4

**Q3 2024:**
- [ ] Milestone 5
```

**Exemplo de uso:**
```
Crie roadmap trimestral para produto SaaS com features: Auth, Billing, Analytics, API

Formato: Timeline por trimestre com marcos
```

---

### 15. Decisão com Pros/Cons/Impacto

```
**Decisão:** [Título]

**Contexto:**
[Background em 2-3 frases]

**Opções Consideradas:**
1. Opção A
2. Opção B

**Análise:**

| Critério | Opção A | Opção B |
|----------|---------|---------|
| Custo    | Alto    | Baixo   |
| Tempo    | Rápido  | Lento   |

**Recomendação:**
[Escolha] porque [justificativa]

**Impacto:**
- Equipe: [...]
- Timeline: [...]
- Budget: [...]
```

**Exemplo de uso:**
```
Precisamos escolher framework frontend: React vs Vue.

Analise por: Curva de aprendizado, Ecossistema, Performance, Comunidade

Formate como Decision Record com contexto, análise tabular, recomendação e impacto.
```

---

## 🎯 Como Escolher o Formato Certo?

| Caso de Uso | Formato Recomendado |
|-------------|---------------------|
| Extração de dados estruturados | JSON, CSV |
| Comparação de opções | Tabela Markdown, Pros/Cons |
| Lista de tarefas | Checklist, Lista numerada |
| Documentação técnica | Markdown com código |
| Configuração de sistema | YAML, JSON |
| Análise de decisão | Decision Record |
| Dados relacionais | Tabela Markdown |
| Hierarquia de dados | JSON aninhado, XML |
| Timeline de projeto | Roadmap, Checklist temporal |
| Priorização | Tabela com pontuação |

---

## 💡 Dicas Avançadas de Formatação

### Dica 1: Combine Formatos

```
**Resumo Executivo:**
[Parágrafo de contexto]

**Dados Detalhados:**
| Métrica | Valor | Tendência |
|---------|-------|-----------|
| ...     | ...   | ...       |

**Ações Recomendadas:**
- [ ] Ação 1
- [ ] Ação 2

**JSON para API:**
{"resumo": "...", "metricas": [...], "acoes": [...]}
```

### Dica 2: Seja Específico em Detalhes

❌ **Vago:**
```
Retorne em JSON
```

✅ **Específico:**
```
Retorne JSON válido com:
- Chaves em snake_case
- Valores de texto entre aspas duplas
- Números sem aspas
- Arrays para listas
- Sem trailing commas
```

### Dica 3: Forneça Exemplo do Output

```
Extraia dados deste email para JSON.

Exemplo de output esperado:
{
  "remetente": "joao@empresa.com",
  "assunto": "Reunião Q1",
  "data": "2024-03-15",
  "prioridade": "alta"
}

Agora extraia de:
[email real]
```

---

## ✅ Checklist de Formatação de Output

Antes de enviar seu prompt:

- [ ] Especifiquei **qual formato** quero (JSON, tabela, lista)?
- [ ] Defini **estrutura exata** (nomes de campos, colunas)?
- [ ] Dei **exemplo do output** quando formato é complexo?
- [ ] Especifiquei **detalhes** (snake_case, aspas, etc)?
- [ ] Formato é **adequado** para meu caso de uso?
- [ ] Formato é **parseável** se for usar em código?

---

## 🚀 Exercícios Práticos

### Exercício 1: Transformação de Formato

**Texto de entrada:**
"Nosso app tem 3 bugs: Login falha (crítico, atribuído para João), botão lento (médio, sem dono), texto cortado (baixo, atribuído para Maria)"

**Desafio:** Peça este mesmo dado em 3 formatos diferentes:
1. Tabela Markdown
2. JSON Array
3. Checklist categorizado por severidade

Compare qual formato é melhor para cada situação (apresentação, API, gerenciamento de tarefas).

---

### Exercício 2: Criar Template Reutilizável

Crie um prompt template para sua tarefa mais frequente que:
1. Estrutura o prompt com XML/Markdown
2. Especifica formato de output detalhado
3. Inclui exemplo do output esperado
4. Pode ser reutilizado mudando apenas os dados de input

---

## Conclusão

Estruturação clara não é apenas "cosmética" - ela fundamentalmente melhora a compreensão do modelo e a qualidade das respostas.

**Regra de ouro:** Se SEU prompt é difícil de ler, imagine para o modelo!

**Próximo passo:**
1. Escolha 3 formatos de saída acima
2. Teste em suas tarefas reais
3. Salve os que funcionam melhor como templates reutilizáveis
