# Prompt Chaining - Encadeamento de Prompts

## O que é Prompt Chaining?

**Prompt Chaining** é a técnica de conectar múltiplos prompts em sequência, onde **a saída de um alimenta a entrada do próximo**. É como criar um pipeline de processamento onde cada estágio tem uma responsabilidade específica, refina e expande o trabalho anterior.

Imagine uma linha de montagem: cada estação realiza uma tarefa específica e passa o produto para a próxima. Prompt chaining funciona exatamente assim com LLMs.

---

## Chaining vs Decomposição: Qual a Diferença?

Embora relacionados, são conceitos distintos:

| Aspecto | Decomposição | Chaining |
|---------|--------------|----------|
| **Foco** | Quebrar problema complexo | Conectar prompts em pipeline |
| **Execução** | Manual (você executa cada etapa) | Pode ser automatizado via API |
| **Outputs** | Intermediários e final | Cada etapa alimenta a próxima |
| **Uso** | Planejamento e estruturação | Implementação e automação |

**Em resumo:**
- **Decomposição** = Estratégia de quebrar problemas
- **Chaining** = Técnica de implementação e automação

Você pode decompor uma tarefa E implementá-la via chaining!

---

## Por que Usar Prompt Chaining?

### Benefícios Principais

1. **Especialização**
   - Cada prompt foca em UMA coisa bem feita
   - Sem conflito de objetivos
   - Qualidade superior em cada etapa

2. **Controle Granular**
   - Ajuste fino em cada estágio
   - Temperature diferente por etapa
   - Modelos diferentes se necessário

3. **Debugging Facilitado**
   - Identifique exatamente onde falhou
   - Corrija apenas a etapa problemática
   - Teste isoladamente cada componente

4. **Automação**
   - Via API, pode rodar automaticamente
   - Escalável para milhares de operações
   - Reduz trabalho manual

5. **Reutilização**
   - Chains podem ser reutilizadas
   - Componentes modulares
   - Library de chains para diferentes tasks

---

## Anatomia de um Chain

### Componentes Essenciais

```
┌─────────────────┐
│  INPUT INICIAL  │ → Dados brutos, pergunta, contexto
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  PROMPT 1       │ → Processamento inicial
│  (Preparação)   │
└────────┬────────┘
         │ [Output 1]
         ▼
┌─────────────────┐
│  PROMPT 2       │ → Refinamento
│  (Transformação)│
└────────┬────────┘
         │ [Output 2]
         ▼
┌─────────────────┐
│  PROMPT 3       │ → Síntese
│  (Finalização)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ OUTPUT FINAL    │ → Resultado polido
└─────────────────┘
```

### Elementos de Cada Elo

1. **Input:** O que entra neste estágio
2. **Prompt:** Instruções específicas para esta etapa
3. **Processing:** LLM executa a tarefa
4. **Output:** Resultado que alimenta próximo elo
5. **Validação (opcional):** Checar se output é adequado

---

## Tipos de Chains

### 1. Chain Linear Simples

A forma mais básica: A → B → C → Resultado

```
Exemplo: Tradução e Resumo
┌────────────┐    ┌────────────┐    ┌────────────┐
│  Texto em  │ -> │  Traduzir  │ -> │  Resumir   │ -> Resumo em PT
│   inglês   │    │  para PT   │    │  em 3 pts  │
└────────────┘    └────────────┘    └────────────┘
```

**Quando usar:** Tarefas com sequência óbvia e sem ramificações.

---

### 2. Chain com Ramificações (Parallel Chains)

Uma entrada, múltiplos processamentos paralelos, depois síntese.

```
                   ┌──> [Análise Técnica] ──┐
                   │                         │
[Input] ──────────>├──> [Análise Financeira] ├──> [Síntese Final]
                   │                         │
                   └──> [Análise de Mercado]─┘
```

**Quando usar:** Análises multi-dimensionais, diferentes perspectivas.

**Exemplo prático:**
- Input: Proposta de novo produto
- Ramificação 1: Análise técnica (viabilidade)
- Ramificação 2: Análise financeira (ROI)
- Ramificação 3: Análise de mercado (demanda)
- Síntese: Decisão integrada

---

### 3. Chain com Validação (Loop Condicional)

Inclui step de validação que pode retornar para etapa anterior.

```
┌──────┐    ┌──────────┐    ┌──────────┐    ┌────────┐
│ Input│ -> │ Processar│ -> │ Validar  │ -> │ Output │
└──────┘    └──────────┘    └─────┬────┘    └────────┘
                 ▲                 │
                 │                 │ (se inválido)
                 └─────────────────┘
```

**Quando usar:** Quando qualidade/format é crítico e erros são inaceitáveis.

**Exemplo prático:**
1. Gerar código SQL
2. Validar sintaxe
3. Se inválido → volta para step 1 com feedback
4. Se válido → prossegue

---

### 4. Chain Hierárquico (Map-Reduce)

Processa múltiplos itens individualmente, depois agrega.

```
Item 1 ──> [Processar] ──┐
Item 2 ──> [Processar] ──┤
Item 3 ──> [Processar] ──├──> [Agregar] ──> Resultado Final
Item 4 ──> [Processar] ──┤
Item 5 ──> [Processar] ──┘
```

**Quando usar:** Processar muitos documentos, reviews, etc.

**Exemplo prático:**
- Analisar sentimento de 1000 reviews
- Map: Cada review individualmente → sentimento + score
- Reduce: Agregar todos os scores → relatório geral

---

## Exemplos Práticos Completos

### Exemplo 1: Pipeline de Criação de Conteúdo SEO-Optimizado

#### Objetivo
Criar artigo de blog completo, otimizado para SEO, pronto para publicar.

---

#### **PROMPT 1 - Keyword Research**

```
Tarefa: Identificar keywords para artigo sobre "automação de marketing para e-commerce"

Output esperado (formato JSON):
{
  "keyword_principal": {
    "termo": "...",
    "volume_busca": X,
    "dificuldade": "fácil/média/difícil"
  },
  "keywords_secundarias": [
    {"termo": "...", "volume": X, "dificuldade": "..."},
    ...5 keywords
  ],
  "keywords_long_tail": [
    ...5 variações long-tail
  ]
}

Contexto:
- Público: Donos de e-commerce pequeno/médio
- Objetivo: Atrair tráfego orgânico
- Foco: Brasil
```

**Output:**
```json
{
  "keyword_principal": {
    "termo": "automação de marketing e-commerce",
    "volume_busca": 1200,
    "dificuldade": "média"
  },
  "keywords_secundarias": [
    {"termo": "email marketing automatizado", "volume": 890, "dificuldade": "média"},
    {"termo": "carrinho abandonado automação", "volume": 560, "dificuldade": "fácil"},
    ...
  ],
  ...
}
```

---

#### **PROMPT 2 - Outline Estratégico**

```
Com base nas keywords:

[COLAR OUTPUT DO PROMPT 1]

Crie outline de artigo seguindo estrutura SEO:

1. Título (H1) - deve conter keyword principal
2. Introdução (2-3 parágrafos)
   - Hook
   - Problema
   - Promessa do artigo
3. 5-7 seções (H2s) cada uma com:
   - Título com keyword secundária quando possível
   - 2-3 sub-seções (H3s)
4. Conclusão com CTA

Requisitos:
- Fluxo lógico e natural
- Keywords integradas organicamente
- Cada seção deve agregar valor claro
```

**Output:**
```markdown
# Como a Automação de Marketing Revoluciona E-commerce em 2024

## Introdução
[Hook sobre crescimento do e-commerce]
[Problema: muito manual e ineficiente]
[Promessa: guia completo de automação]

## 1. O que é Automação de Marketing para E-commerce
   ### 1.1 Definição e conceitos principais
   ### 1.2 Diferença vs marketing tradicional

## 2. Principais Ferramentas de Automação
   ### 2.1 Plataformas recomendadas
   ### 2.2 Comparativo de features
   ...

[Continue...]
```

---

#### **PROMPT 3 - Escrita do Conteúdo**

```
Seguindo este outline:

[COLAR OUTPUT DO PROMPT 2]

Escreva o artigo completo seguindo guidelines:

Estilo:
- Tom conversacional mas profissional
- Parágrafos curtos (3-4 linhas)
- Use exemplos práticos de e-commerce
- Inclua dados e estatísticas quando relevante

Estrutura:
- 1500-2000 palavras total
- Cada H2: 200-300 palavras
- Introdução: 150 palavras
- Conclusão: 100 palavras com CTA claro

SEO:
- Keyword principal: 3-5 vezes no texto
- Keywords secundárias: distribuir naturalmente
- Use sinônimos e variações
```

**Output:** Artigo completo de 1800 palavras, fluido e informativo.

---

#### **PROMPT 4 - Otimização SEO**

```
Otimize este artigo para SEO on-page:

[COLAR ARTIGO DO PROMPT 3]

Tarefas:
1. Revisar densidade de keywords (ideal: 1-2%)
2. Criar meta description (150-160 caracteres)
3. Sugerir alt text para 5 imagens relevantes
4. Adicionar internal links (5 sugestões de anchor text)
5. Sugerir schema markup adequado

Output em seções separadas para cada task acima.
```

**Output:**
```markdown
## 1. Densidade de Keywords
Keyword principal "automação marketing e-commerce": 1.3% ✓
Ajustes sugeridos: [lista de locais para adicionar/remover]

## 2. Meta Description
"Descubra como automação de marketing transforma e-commerce:
aumente vendas, recupere carrinhos e fidelize clientes.
Guia completo 2024."

## 3. Alt Texts
- dashboard-automacao-marketing.jpg: "Dashboard de plataforma..."
...
```

---

#### **PROMPT 5 - Edição e Polimento Final**

```
Faça edição final deste artigo:

[COLAR ARTIGO + OTIMIZAÇÕES SEO]

Checklist de edição:
1. Gramática e ortografia
2. Clareza: frases complexas → simples
3. Redundâncias: remover repetições
4. Transições: melhorar fluxo entre parágrafos
5. CTAs: garantir clareza e persuasão
6. Formatting: bullets, negritos, itálicos para escaneabilidade

Output: Versão final PRONTA PARA PUBLICAR
```

**Output:** Artigo polido, otimizado, publicável.

---

### Resultado do Chain Completo

Você agora tem:
- ✅ Artigo 1800 palavras otimizado para SEO
- ✅ Keywords estrategicamente posicionadas
- ✅ Meta description e alt texts prontos
- ✅ Estrutura bem organizada e escaneável
- ✅ Conteúdo de alta qualidade, pronto para ranquear

**Tempo estimado:**
- Fazer tudo em um prompt: 1 iteração de baixa qualidade
- Com chain: 5 prompts focados = resultado profissional

---

### Exemplo 2: Pipeline de Análise de Dados

#### Objetivo
Analisar dados de vendas e gerar relatório executivo acionável.

---

#### **Chain em 4 Etapas**

**PROMPT 1: Data Cleaning**
```
Analise qualidade destes dados de vendas CSV:
[DADOS]

Identifique:
1. Valores ausentes (% por coluna)
2. Outliers (método IQR)
3. Inconsistências (datas inválidas, valores negativos)
4. Recomendações de limpeza

Output: JSON com problemas + ações
```

---

**PROMPT 2: Análise Exploratória**
```
Com dados limpos:
[DADOS LIMPOS]

Gere:
1. Estatísticas descritivas (média, mediana, desvio)
2. Top 10 produtos por receita
3. Vendas por mês (tendência)
4. Análise de sazonalidade
5. Segmentação de clientes (RFM)

Output: Relatório estruturado com números
```

---

**PROMPT 3: Insights e Padrões**
```
Baseado na análise:
[OUTPUT PROMPT 2]

Identifique:
1. 5 insights mais relevantes (não-óbvios)
2. Correlações significativas
3. Oportunidades de crescimento
4. Riscos ou sinais de alerta

Para cada insight:
- Evidência nos dados
- Implicação para negócio
- Confiança (alta/média/baixa)
```

---

**PROMPT 4: Relatório Executivo**
```
Crie relatório executivo para CEO com:

[INSIGHTS DO PROMPT 3]

Estrutura:
1. Executive Summary (5 bullets)
2. Principais Descobertas (3 seções)
3. Recomendações (3 ações priorizadas)
4. Próximos Passos

Tom: Direto, orientado a ação, sem jargão técnico
Tamanho: 1 página (500 palavras)
```

---

## Implementação Técnica

### Manual (Conversational)

1. Rode Prompt 1, copie output
2. Cole output no Prompt 2, rode
3. Repita até o fim

**Prós:** Simples, sem código
**Contras:** Trabalhoso, não escalável

---

### Automatizado (API)

```python
import anthropic

client = anthropic.Anthropic(api_key="...")

# Prompt 1
response1 = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    messages=[{"role": "user", "content": prompt1}]
)
output1 = response1.content[0].text

# Prompt 2 (usando output do prompt 1)
prompt2_with_context = f"{prompt2}\n\n{output1}"
response2 = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    messages=[{"role": "user", "content": prompt2_with_context}]
)
output2 = response2.content[0].text

# ... continue o chain
```

**Prós:** Escalável, automático, rápido
**Contras:** Requer programação, custo de tokens

---

### Frameworks Especializados

**LangChain (Python/JS)**
```python
from langchain.chains import SequentialChain
from langchain.prompts import PromptTemplate

# Define cada etapa
prompt1 = PromptTemplate(...)
prompt2 = PromptTemplate(...)

# Crie o chain
chain = SequentialChain(
    chains=[chain1, chain2, chain3],
    input_variables=["initial_input"],
    output_variables=["final_output"]
)

# Execute
result = chain({"initial_input": data})
```

---

## Boas Práticas de Chaining

### ✅ O que Fazer

1. **Mantenha chains curtos (3-5 etapas)**
   - Chains muito longos são difíceis de debugar
   - Cada etapa adiciona latência
   - Mais etapas = mais pontos de falha

2. **Use formatos estruturados entre etapas**
   - JSON, XML para passar dados
   - Facilita parsing e validação
   - Evita ambiguidade

3. **Documente cada elo do chain**
   - Input esperado
   - Output esperado
   - Propósito desta etapa

4. **Valide outputs intermediários**
   - Cheque se formato está correto
   - Valide campos obrigatórios
   - Trate erros gracefully

5. **Considere temperature diferente por etapa**
   - Brainstorming: temp alta (0.8-0.9)
   - Análise: temp baixa (0.1-0.3)
   - Escrita: temp média (0.5-0.7)

6. **Implemente error handling**
   - O que fazer se uma etapa falhar?
   - Retry logic?
   - Fallbacks?

7. **Log tudo em produção**
   - Inputs e outputs de cada etapa
   - Tempo de execução
   - Erros e exceções

### ❌ O que Evitar

1. **Chain muito longo (10+ etapas)**
   - Difícil debugar
   - Lento
   - Frágil
   - Solução: Crie sub-chains

2. **Passar contexto desnecessário**
   - Cada etapa só precisa do relevante
   - Muito contexto = tokens desperdiçados + confusão
   - Filtre e selecione o que passar

3. **Acoplar etapas fortemente**
   - Se mudar Prompt 2, Prompt 3 quebra
   - Use interfaces claras (JSON schema)
   - Etapas devem ser modulares

4. **Ignorar custos**
   - Chains consomem muitos tokens
   - Monitore custo por execução
   - Otimize prompts para eficiência

---

## Padrões de Chain Comuns

### 1. Generate → Critique → Refine
```
1. Gere conteúdo inicial
2. Critique o conteúdo (encontre problemas)
3. Refine baseado na crítica
```

### 2. Expand → Filter → Rank
```
1. Expanda: Gere muitas opções
2. Filtre: Elimine opções inadequadas
3. Ranqueie: Ordene as melhores
```

### 3. Analyze → Synthesize → Recommend
```
1. Analise: Processe dados brutos
2. Sintetize: Extraia insights
3. Recomende: Ações baseadas em insights
```

### 4. Translate → Adapt → Localize
```
1. Traduza: Conversão linguística
2. Adapte: Ajuste cultural
3. Localize: Refinamento local
```

---

## Ferramentas e Recursos

### Frameworks

- **LangChain** (Python/JS): Framework completo para chains
- **LlamaIndex**: Especializado em RAG + chains
- **Semantic Kernel** (Microsoft): C#/Python para chains
- **Haystack** (deepset): NLP pipelines

### Monitoramento

- **LangSmith**: Debug e monitoring de chains
- **Helicone**: Analytics para LLM chains
- **Weights & Biases**: Tracking de experiments

### Inspiração

- 📖 LangChain documentation (exemplos de chains)
- 🎓 Curso "LLM Chains in Production"
- 🔗 Exemplos da comunidade no GitHub

---

## Exercício Prático

**Desafio:** Crie um chain para analisar reviews de produtos e gerar relatório de sentiment + ações.

**Chain sugerido:**
1. Classificação de sentimento (cada review)
2. Extração de temas mencionados
3. Agregação estatística
4. Identificação de problemas críticos
5. Relatório com recomendações

**Tente implementar** usando os conceitos aprendidos!

---

## Conclusão

Prompt Chaining é uma técnica poderosa para criar workflows complexos e automatizáveis com LLMs. Ao dividir processos em etapas especializadas e conectá-las inteligentemente, você obtém resultados de qualidade profissional e escalabilidade.

**Lembre-se:**
- Chains devem ser focados e modulares
- Valide outputs entre etapas
- Documente e monitore em produção
- Comece simples, evolua conforme necessário

**Próximo passo:** Identifique um processo repetitivo seu e transforme em chain automatizado!
