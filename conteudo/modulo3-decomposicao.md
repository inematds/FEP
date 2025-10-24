# Decomposição de Tarefas Complexas

## O que é Decomposição de Tarefas?

A decomposição de tarefas é uma técnica fundamental de prompt engineering que consiste em **quebrar problemas complexos em subtarefas menores, mais específicas e gerenciáveis**. Esta abordagem permite que modelos de linguagem processem cada parte com máximo foco e precisão, resultando em outputs de maior qualidade.

Pense nisso como o princípio "Dividir para Conquistar" aplicado à engenharia de prompts.

---

## Por que Decompor é Crítico?

Modelos de linguagem, mesmo os mais avançados como GPT-4 e Claude, têm melhor desempenho quando lidam com tarefas bem definidas e delimitadas. Ao tentar resolver um problema muito amplo de uma vez, você enfrenta:

### Problemas de Tarefas Não Decompostas

1. **Sobrecarga Cognitiva do Modelo**
   - Tentando processar muitas dimensões simultaneamente
   - Atenção dividida entre múltiplos objetivos
   - Perda de profundidade em cada aspecto

2. **Resultados Superficiais**
   - Cada parte recebe atenção inadequada
   - Análises genéricas e rasas
   - Falta de detalhamento onde é necessário

3. **Dificuldade de Iteração**
   - Hard to identify where improvement is needed
   - Difícil ajustar partes específicas
   - Precisa refazer tudo para melhorar um aspecto

4. **Inconsistência**
   - Partes podem contradizer umas às outras
   - Falta de coesão no resultado final
   - Qualidade varia entre seções

---

## Quando Usar Decomposição?

Use esta técnica quando a tarefa apresentar:

- ✅ **Múltiplos componentes distintos** (análise + síntese + recomendação)
- ✅ **Necessidade de profundidade** em cada aspecto
- ✅ **Divisão natural** em etapas sequenciais
- ✅ **Diferentes tipos de raciocínio** (criativo → analítico → crítico)
- ✅ **Volume grande de informação** a processar
- ✅ **Requisitos de qualidade alto** onde cada parte precisa estar excelente

---

## Estratégias de Decomposição

### 1. Decomposição Sequencial

Divida em etapas que seguem uma **ordem lógica** temporal ou causal:

```
Pesquisar → Analisar → Sintetizar → Apresentar
```

**Exemplo prático:**
- **Etapa 1:** Coletar dados sobre o mercado
- **Etapa 2:** Analisar tendências nos dados
- **Etapa 3:** Identificar oportunidades
- **Etapa 4:** Criar plano de ação

**Quando usar:** Projetos, planejamento, processos que têm fluxo natural.

---

### 2. Decomposição por Aspectos (Dimensional)

Separe por **dimensões diferentes** do mesmo problema:

```
- Aspecto Técnico
- Aspecto Financeiro
- Aspecto de Mercado
- Aspecto de Implementação
```

**Exemplo prático:**
Analisar viabilidade de um novo produto:
- **Dimensão Técnica:** Viabilidade de desenvolvimento
- **Dimensão Financeira:** Custos vs ROI esperado
- **Dimensão Mercado:** Demanda e competição
- **Dimensão Operacional:** Recursos necessários

**Quando usar:** Análises complexas, decisões estratégicas, avaliações multi-critério.

---

### 3. Decomposição Hierárquica

Divida em **níveis de granularidade** (top-down):

```
Nível 1: Grande objetivo
├─ Nível 2: Sub-objetivos
│  ├─ Nível 3: Tarefas específicas
│  │  └─ Nível 4: Micro-tarefas
│  └─ Nível 3: Tarefas específicas
└─ Nível 2: Sub-objetivos
```

**Exemplo prático:**
```
Lançar produto SaaS
├─ Desenvolver produto
│  ├─ Backend (API, banco de dados)
│  ├─ Frontend (UI/UX, componentes)
│  └─ Infraestrutura (deploy, monitoramento)
├─ Go-to-Market
│  ├─ Definir posicionamento
│  ├─ Criar materiais de marketing
│  └─ Planejar campanhas de lançamento
└─ Operações
   ├─ Processos de onboarding
   ├─ Suporte ao cliente
   └─ Billing e pagamentos
```

**Quando usar:** Projetos grandes, planejamento estratégico, roadmaps.

---

### 4. Decomposição por Tipo de Pensamento

Separe por **modo cognitivo** necessário:

- 🎨 **Divergente/Criativo:** Geração de ideias
- 🔍 **Analítico:** Análise de dados e padrões
- ⚖️ **Crítico:** Avaliação e julgamento
- 🔧 **Prático:** Implementação e execução

**Exemplo prático:**
```
1. Brainstorming (criativo): Gerar 20 ideias de features
2. Análise (analítico): Avaliar viabilidade de cada
3. Priorização (crítico): Escolher top 5
4. Planejamento (prático): Criar roadmap de implementação
```

**Quando usar:** Inovação, resolução de problemas complexos, desenvolvimento de produtos.

---

## Exemplos Práticos Completos

### Exemplo 1: Criação de Estratégia de Marketing Digital

#### ❌ Sem Decomposição (Prompt Ruim)

```
"Crie uma estratégia de marketing digital completa para minha startup
de SaaS B2B que vende software de gestão de projetos."
```

**Problema:**
- Muito amplo e vago
- Resultado será superficial em todas as áreas
- Falta de profundidade e especificidade
- Não permite iteração eficaz

**Output típico:** Lista genérica de "use redes sociais, faça SEO, rode anúncios" sem profundidade.

---

#### ✅ Com Decomposição (Abordagem Correta)

**PROMPT 1 - Análise de Público-Alvo**
```
Analise o público-alvo para uma startup SaaS B2B de gestão de projetos:

Tarefa:
1. Identifique 3 personas principais (cargo, dores, objetivos, comportamento de compra)
2. Para cada persona, liste 5 canais digitais onde estão mais ativos
3. Identifique padrões de comportamento de compra B2B

Contexto:
- Produto: Software de gestão de projetos
- Ticket médio: R$500/mês
- Ciclo de venda: 30-60 dias
```

**Output esperado:** 3 personas detalhadas com características, canais e comportamentos específicos.

---

**PROMPT 2 - Posicionamento e Mensagem**
```
Com base nas personas identificadas:

[COLAR RESULTADO DO PROMPT 1]

Defina:
1. Proposta de valor única para cada persona
2. Mensagem principal de marketing (headline + 3 pilares)
3. Top 3 diferenciais vs concorrentes (Asana, Monday, Trello)
4. Prova de valor (case study angle)

Requisitos:
- Foque em dores reais identificadas nas personas
- Mensagens devem ser específicas, não genéricas
```

**Output esperado:** Posicionamento claro e diferenciado para cada persona.

---

**PROMPT 3 - Táticas por Canal**
```
Usando o posicionamento definido:

[COLAR RESULTADO DO PROMPT 2]

Crie táticas específicas e acionáveis para:

1. LinkedIn (B2B focus)
   - Tipo de conteúdo a publicar
   - Estratégia de LinkedIn Ads (targeting, formats)
   - Frequência e KPIs

2. Google Ads
   - 10 palavras-chave principais (com intenção de compra)
   - Copy para 2 anúncios diferentes
   - Budget allocation sugerido

3. Email Marketing
   - Sequência de nurturing (5 emails)
   - Triggers para cada email
   - CTAs e objetivos de cada email

Budget total: R$10.000/mês
```

**Output esperado:** Táticas detalhadas e prontas para implementar.

---

**PROMPT 4 - Métricas e Otimização**
```
Para as táticas definidas:

[COLAR RESULTADO DO PROMPT 3]

Estabeleça:
1. KPIs primários e secundários para cada canal
2. Metas mensais realistas (baseadas em benchmarks B2B SaaS)
3. Budget allocation otimizado por canal
4. Plano de testes A/B para primeiros 90 dias
5. Critérios de sucesso/falha para cada tática

Inclua:
- Fórmulas de cálculo (CAC, LTV, ROI)
- Quando escalar ou pausar cada tática
```

**Output esperado:** Framework completo de mensuração e otimização.

---

**Resultado Final da Decomposição:**

Você agora tem:
- ✅ Personas profundamente detalhadas
- ✅ Posicionamento claro e testável
- ✅ Táticas específicas e acionáveis
- ✅ Sistema de métricas e otimização

Cada etapa gerou output de qualidade, e juntos formam uma **estratégia completa, profunda e implementável**.

---

### Exemplo 2: Análise de Dados de Pesquisa

#### ❌ Sem Decomposição

```
"Analise esta pesquisa de satisfação com 500 respostas e me dê insights."
```

**Resultado:** Análise genérica tipo "a maioria está satisfeita" sem profundidade.

---

#### ✅ Com Decomposição (5 Etapas)

**ETAPA 1 - Limpeza e Validação de Dados**
```
Analise a qualidade dos dados desta pesquisa:

[COLAR DADOS]

Identifique e liste:
1. Respostas inconsistentes ou contraditórias
2. Padrões suspeitos (bots, respostas aleatórias)
3. Dados faltantes significativos (% por pergunta)
4. Outliers que precisam investigação
5. Recomendação: excluir ou manter cada caso suspeito

Output: Lista de 10-15 problemas encontrados com ação recomendada.
```

---

**ETAPA 2 - Segmentação de Respondentes**
```
Com dados limpos:

[COLAR DADOS LIMPOS]

Agrupe respondentes em segmentos significativos:

1. Por perfil demográfico (idade, cargo, etc.)
2. Por nível de satisfação:
   - Promotores (NPS 9-10)
   - Neutros (NPS 7-8)
   - Detratores (NPS 0-6)
3. Por frequência de uso do produto
4. Por tempo como cliente

Para cada segmento:
- Tamanho (n e %)
- Características distintivas
- Padrões de resposta únicos

Output: 5-8 segmentos com perfis claros.
```

---

**ETAPA 3 - Análise Qualitativa (Comentários Abertos)**
```
Analise os 500 comentários abertos da pesquisa:

[COLAR COMENTÁRIOS]

Tarefas:
1. Extraia 10 temas recorrentes (com % de menções)
2. Categorize feedback por área:
   - Produto/Features
   - Atendimento/Suporte
   - Preço/Valor
   - Usabilidade
   - Outro
3. Identifique top 5 dores mencionadas
4. Identifique top 5 elogios mencionados
5. Extraia 10 quotes mais representativos (5 positivos, 5 negativos)

Output: Análise temática estruturada com evidências.
```

---

**ETAPA 4 - Análise de Correlações**
```
Cruze os dados para identificar insights não-óbvios:

[COLAR RESULTADOS ETAPAS 2 E 3]

Investigue:
1. Quais fatores mais impactam satisfação geral?
2. Perfis com maior/menor satisfação - por quê?
3. Features mais valorizadas por cada segmento
4. Relação entre uso e satisfação
5. Padrões inesperados ou contra-intuitivos

Use dados quantitativos + qualitativos.

Output: 8-10 insights com evidências de ambas fontes.
```

---

**ETAPA 5 - Recomendações Acionáveis**
```
Com base em toda análise:

[COLAR INSIGHTS PRINCIPAIS DA ETAPA 4]

Crie plano de ação:

1. **Curto prazo (0-30 dias):**
   - 3 ações para quick wins
   - Owner e recursos necessários
   - Impacto esperado em satisfação

2. **Médio prazo (1-3 meses):**
   - 2 iniciativas estruturantes
   - Investment needed
   - KPIs de sucesso

3. **Longo prazo (3-6 meses):**
   - 1 mudança estratégica
   - Roadmap alto nível
   - Resultado esperado

Cada recomendação deve:
- Ter evidência clara da análise
- Ser específica e mensurável
- Incluir rationale
```

---

**Resultado Final:**

Uma análise **profunda, estruturada e completamente acionável** com:
- Dados validados e confiáveis
- Segmentação clara de públicos
- Insights qualitativos ricos
- Correlações não-óbvias
- Plano de ação priorizado

---

## Melhores Práticas

### ✅ O que Fazer

1. **Comece identificando os "blocos principais"**
   - Quebre o problema em 3-5 grandes componentes
   - Cada um deve ser significativo e distinto

2. **Cada subtarefa deve ter objetivo claro**
   - Input bem definido
   - Output mensurável
   - Critério de sucesso

3. **Mantenha contexto entre etapas**
   - Cole resultados relevantes de etapas anteriores
   - Referencie decisões tomadas
   - Mantenha consistência

4. **Documente outputs intermediários**
   - Salve resultado de cada etapa
   - Facilita iteração
   - Permite retornar e refinar

5. **Permita iteração granular**
   - Você pode voltar e refinar uma etapa específica
   - Não precisa refazer tudo
   - Ajustes pontuais são possíveis

### ❌ O que Evitar

1. **Decompor demais**
   - 15 subtarefas minúsculas = overhead desnecessário
   - Busque equilíbrio: 3-5 etapas significativas

2. **Perder o fio da meada**
   - Etapas desconexas não integram bem
   - Sempre tenha visão do todo
   - Como as partes se conectam?

3. **Não transferir contexto**
   - Cada prompt começar do zero é ineficiente
   - Cole resultados relevantes
   - Mantenha thread coerente

4. **Ignorar dependências**
   - Algumas etapas dependem de outras
   - Respeite ordem lógica
   - Paralelizar quando possível, sequenciar quando necessário

---

## Templates Prontos

### Template 1: Análise e Recomendação
```
Etapa 1: Coleta de Informações
Etapa 2: Análise Estruturada
Etapa 3: Identificação de Padrões
Etapa 4: Geração de Opções
Etapa 5: Recomendação Fundamentada
```

### Template 2: Criação de Conteúdo
```
Etapa 1: Research e Keywords
Etapa 2: Outline e Estrutura
Etapa 3: Rascunho do Conteúdo
Etapa 4: Otimização (SEO, tom)
Etapa 5: Edição e Polimento
```

### Template 3: Resolução de Problemas
```
Etapa 1: Definição Clara do Problema
Etapa 2: Análise de Causas Raiz
Etapa 3: Brainstorm de Soluções
Etapa 4: Avaliação de Opções
Etapa 5: Plano de Implementação
```

---

## Ferramentas e Recursos

### Para Prática

- 📝 Pegue um prompt complexo que você usa
- ✂️ Quebre em 3-5 etapas usando uma estratégia acima
- 🔄 Compare resultados: versão única vs decomposta
- 📊 Avalie: profundidade, utilidade, acionabilidade

### Leituras Recomendadas

- 📖 "Divide and Conquer" algorithms (analogia)
- 🎓 Metodologias Ágeis (User Stories, Sprint Planning)
- 🔗 Prompt Chaining (automação da decomposição)
- 📚 Systems Thinking (visão holística + componentes)

### Frameworks Relacionados

- **MECE (Mutually Exclusive, Collectively Exhaustive):** Decomponha sem sobreposição nem gaps
- **First Principles Thinking:** Quebre até os fundamentos
- **Work Breakdown Structure (WBS):** Da gestão de projetos

---

## Checklist de Decomposição

Antes de decompor, pergunte:

- [ ] Esta tarefa é complexa o suficiente para decompor? (Se não, não decomponha)
- [ ] Consigo identificar 3-5 componentes distintos?
- [ ] Há ordem lógica/dependências entre componentes?
- [ ] Cada componente tem objetivo claro?
- [ ] Sei como os outputs se integrarão no final?
- [ ] Documentarei outputs intermediários?

---

## Conclusão

Decomposição de tarefas é uma das técnicas mais poderosas de prompt engineering. Ela transforma problemas intratáveis em sequências de subtarefas gerenciáveis, cada uma produzindo outputs de alta qualidade.

**Lembre-se:** Não decomponha por decompor. Use quando a complexidade justificar. Mas quando usar, use bem - e os resultados serão dramaticamente superiores.

**Próximo passo:** Pegue sua tarefa mais complexa atual e decomponha usando uma das estratégias acima. Compare os resultados!
