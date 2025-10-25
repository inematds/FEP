// Conteúdo completo dos tópicos para modal de detalhamento
const topicosData = {
    // NÍVEL TÉCNICO - MÓDULO 3
    'decomposicao': {
        titulo: 'Decomposição de Tarefas',
        nivel: 'Técnico',
        modulo: 3,
        icon: '📋',
        introducao: `A decomposição de tarefas é uma técnica fundamental de prompt engineering que consiste em quebrar problemas complexos em subtarefas menores, mais específicas e gerenciáveis. Esta abordagem permite que modelos de linguagem processem cada parte com máximo foco e precisão.`,

        conteudoCompleto: `
## Por que Decompor é Importante?

Modelos de linguagem, mesmo os mais avançados, têm melhor desempenho quando lidam com tarefas bem definidas e delimitadas. Ao tentar resolver um problema muito amplo de uma vez, você corre o risco de:

- **Sobrecarga cognitiva do modelo:** Tentando processar muitas informações simultaneamente
- **Perda de foco:** Aspectos importantes podem ser negligenciados
- **Resultados superficiais:** Cada parte recebe atenção inadequada
- **Dificuldade de revisão:** Fica mais difícil identificar onde melhorar

### Quando Usar Decomposição?

Use esta técnica quando:
- A tarefa tem múltiplos componentes distintos
- Você precisa de profundidade em cada aspecto
- O problema pode ser naturalmente dividido em etapas
- Você quer poder revisar e ajustar partes específicas
- A tarefa requer diferentes tipos de raciocínio

## Estratégias de Decomposição

### 1. Decomposição Sequencial
Divida em etapas que seguem uma ordem lógica:
\`\`\`
1. Pesquisar → 2. Analisar → 3. Sintetizar → 4. Apresentar
\`\`\`

### 2. Decomposição por Aspectos
Separe por dimensões diferentes do problema:
\`\`\`
- Aspecto técnico
- Aspecto financeiro
- Aspecto de mercado
- Aspecto de implementação
\`\`\`

### 3. Decomposição Hierárquica
Divida em níveis de granularidade:
\`\`\`
Nível 1: Grande objetivo
├─ Nível 2: Sub-objetivos
│  ├─ Nível 3: Tarefas específicas
│  └─ Nível 3: Tarefas específicas
└─ Nível 2: Sub-objetivos
\`\`\`
`,

        exemplos: [
            {
                titulo: 'Exemplo 1: Criação de Estratégia de Marketing',
                contexto: 'Você precisa criar uma estratégia completa de marketing digital',
                semDecomposicao: `Prompt ruim (sem decomposição):
"Crie uma estratégia de marketing digital completa para minha startup de SaaS B2B que vende software de gestão de projetos."

Problema: Muito amplo, resultado será superficial em todas as áreas.`,
                comDecomposicao: `Prompt bom (com decomposição):

**PROMPT 1 - Análise de Público:**
Analise o público-alvo para uma startup SaaS B2B de gestão de projetos:
1. Identifique 3 personas principais (cargo, dores, objetivos)
2. Para cada persona, liste 5 canais digitais onde estão ativos
3. Identifique padrões de comportamento de compra

**PROMPT 2 - Posicionamento:**
Com base nas personas identificadas: [cola resultado do Prompt 1]
Defina:
1. Proposta de valor única para cada persona
2. Mensagem principal de marketing
3. Diferenciais vs concorrentes

**PROMPT 3 - Táticas de Canais:**
Usando o posicionamento: [cola resultado do Prompt 2]
Crie táticas específicas para:
1. LinkedIn (conteúdo + ads)
2. Google Ads (palavras-chave + copy)
3. Email marketing (sequência de nurturing)

**PROMPT 4 - Métricas:**
Para as táticas definidas: [cola resultado do Prompt 3]
Estabeleça:
1. KPIs para cada canal
2. Metas mensais realistas
3. Budget allocation por canal`,
                resultado: 'Cada etapa gera output profundo e específico. O resultado final é uma estratégia completa e acionável.'
            },
            {
                titulo: 'Exemplo 2: Análise de Dados',
                contexto: 'Analisar resultados de pesquisa de satisfação com 500 respostas',
                semDecomposicao: `"Analise esta pesquisa de satisfação e me dê insights"
Resultado: Análise genérica e superficial`,
                comDecomposicao: `**ETAPA 1 - Limpeza:**
Identifique e liste:
- Respostas inconsistentes
- Padrões suspeitos
- Dados faltantes significativos

**ETAPA 2 - Segmentação:**
Agrupe respondentes por:
- Perfil demográfico
- Nível de satisfação (promotores/neutros/detratores)
- Frequência de uso do produto

**ETAPA 3 - Análise Qualitativa:**
Para comentários abertos:
- Extraia temas recorrentes
- Categorize feedback (produto/atendimento/preço)
- Identifique quotes mais representativos

**ETAPA 4 - Correlações:**
Cruze dados para identificar:
- Quais fatores mais impactam satisfação
- Perfis com maior/menor satisfação
- Padrões não óbvios

**ETAPA 5 - Recomendações:**
Com base em tudo acima:
- 3 ações de curto prazo
- 2 iniciativas de médio prazo
- 1 mudança estratégica de longo prazo`,
                resultado: 'Análise profunda, estruturada e acionável.'
            }
        ],

        casosDeUso: [
            {
                area: 'Desenvolvimento de Software',
                aplicacao: 'Planejamento de features complexas',
                detalhes: 'Decompor em: arquitetura → backend → frontend → testes → documentação'
            },
            {
                area: 'Criação de Conteúdo',
                aplicacao: 'Escrever artigo técnico longo',
                detalhes: 'Decompor em: outline → pesquisa → rascunho de cada seção → revisão → SEO'
            },
            {
                area: 'Business Analysis',
                aplicacao: 'Análise de viabilidade de novo produto',
                detalhes: 'Decompor em: mercado → técnico → financeiro → riscos → recomendação'
            }
        ],

        dicasPraticas: [
            '✓ Comece identificando os "blocos principais" do problema',
            '✓ Cada subtarefa deve ter um objetivo claro e mensurável',
            '✓ Mantenha contexto entre etapas (cole resultados anteriores)',
            '✓ Não exagere: 3-5 etapas é geralmente ideal',
            '✓ Documente o output de cada etapa para referência futura',
            '✓ Permita iteração: você pode voltar e refinar uma etapa específica'
        ],

        errosComuns: [
            {
                erro: 'Decompor demais',
                exemplo: 'Criar 15 subtarefas minúsculas',
                solucao: 'Busque o equilíbrio: cada etapa deve agregar valor significativo'
            },
            {
                erro: 'Perder o fio da meada',
                exemplo: 'Etapas desconexas que não se integram',
                solucao: 'Sempre tenha clara a visão do todo e como as partes se conectam'
            },
            {
                erro: 'Não transferir contexto',
                exemplo: 'Cada prompt começa do zero',
                solucao: 'Cole resultados relevantes de etapas anteriores'
            }
        ],

        recursosAdicionais: [
            '📖 Leia sobre "Divide and Conquer" em algoritmos',
            '🎓 Estude metodologias ágeis (quebrar em sprints/stories)',
            '🔗 Explore "prompt chaining" para automação da decomposição'
        ]
    },

    // Adicione mais tópicos aqui seguindo o mesmo padrão
    'chaining': {
        titulo: 'Prompt Chaining',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🔗',
        introducao: `Prompt Chaining é a técnica de conectar múltiplos prompts em sequência, onde a saída de um alimenta a entrada do próximo. É como criar um pipeline de processamento onde cada estágio refina e expande o trabalho anterior.`,

        conteudoCompleto: `
## O que é Prompt Chaining?

Imagine uma linha de montagem: cada estação realiza uma tarefa específica e passa o produto para a próxima. Prompt chaining funciona da mesma forma com LLMs.

### Componentes do Chain

1. **Prompt Inicial:** Coleta ou gera informação base
2. **Prompts Intermediários:** Processam, refinam, expandem
3. **Prompt Final:** Sintetiza em formato desejado

### Diferença vs Decomposição Simples

**Decomposição:** Você executa cada etapa manualmente
**Chaining:** Pode ser automatizado (via API) - o sistema passa outputs automaticamente

## Tipos de Chains

### 1. Chain Linear Simples
\`\`\`
A → B → C → Resultado
\`\`\`

### 2. Chain com Ramificações
\`\`\`
      B1
     /
A →      → D → Resultado
     \\
      B2
\`\`\`

### 3. Chain com Loops
\`\`\`
A → B → C → [Validação] → Se OK: D, Se não: volta para B
\`\`\`
`,

        exemplos: [
            {
                titulo: 'Chain para Criação de Conteúdo',
                contexto: 'Criar post de blog otimizado para SEO',
                chainCompleto: `**PROMPT 1 - Pesquisa de Keywords:**
Input: Tópico "automação de marketing"
Output: Lista de 10 keywords + volume de busca + dificuldade

**PROMPT 2 - Outline:**
Input: Keywords do Prompt 1 + Tópico
Output: Outline com H1, H2s, H3s incluindo keywords estrategicamente

**PROMPT 3 - Rascunho:**
Input: Outline do Prompt 2
Output: Texto completo seguindo outline

**PROMPT 4 - Otimização SEO:**
Input: Texto do Prompt 3
Output: Texto otimizado (densidade de keywords, meta description, alt texts)

**PROMPT 5 - Edição Final:**
Input: Texto otimizado do Prompt 4
Output: Versão polida, corrigida, com CTAs`,
                beneficio: 'Cada etapa foca em um aspecto. O resultado final é muito superior a um prompt único "escreva um post sobre automação de marketing".'
            }
        ],

        casosDeUso: [
            {
                area: 'Data Analysis',
                aplicacao: 'Pipeline de análise',
                detalhes: 'Raw data → Cleaning → Analysis → Visualization code → Insights report'
            },
            {
                area: 'Customer Support',
                aplicacao: 'Resposta automatizada',
                detalhes: 'Classify issue → Find solution in KB → Draft response → Add personalization → Send'
            }
        ],

        dicasPraticas: [
            '✓ Documente claramente o que cada etapa do chain deve produzir',
            '✓ Valide outputs intermediários antes de seguir',
            '✓ Use formatos estruturados (JSON, XML) entre etapas para parsing',
            '✓ Implemente error handling: o que fazer se uma etapa falhar?',
            '✓ Considere usar temperature diferente em cada etapa'
        ],

        errosComuns: [
            {
                erro: 'Chain muito longo',
                exemplo: '10+ etapas com muita informação',
                solucao: 'Mantenha chains com 3-5 etapas. Se precisar mais, crie sub-chains'
            }
        ],

        recursosAdicionais: [
            '🔗 LangChain: Framework para chains complexos',
            '📖 Explore "Sequential Chains" vs "Map-Reduce Chains"',
            '🎓 Estude "Prompt Pipelines" em produção'
        ]
    },

    'negative': {
        titulo: 'Instruções Negativas',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🚫',
        introducao: `Instruções negativas são diretrizes explícitas que especificam o que o modelo NÃO deve fazer. Esta técnica é crucial para evitar comportamentos indesejados e direcionar respostas com maior precisão.`,

        conteudoCompleto: `
## Por que Usar Instruções Negativas?

LLMs tendem a seguir padrões comuns de seus dados de treinamento. Às vezes, você precisa quebrar esses padrões explicitamente.

### Benefícios Principais

- **Previne comportamentos indesejados:** Evita que o modelo faça suposições incorretas
- **Aumenta precisão:** Define limites claros do que é aceitável
- **Controla tom e estilo:** Elimina elementos que não se encaixam na sua necessidade
- **Reduz alucinações:** Instrui o modelo a não inventar informações

## Tipos de Instruções Negativas

### 1. Restrições de Conteúdo
Especifique que tipo de conteúdo evitar:
- NÃO use jargão técnico
- NÃO inclua opiniões pessoais
- NÃO invente estatísticas ou dados

### 2. Restrições de Formato
Controle como a informação é apresentada:
- NÃO use bullet points
- NÃO crie múltiplas seções
- NÃO inclua código

### 3. Restrições de Comportamento
Direcione como o modelo deve agir:
- NÃO assuma informações não fornecidas
- NÃO seja excessivamente formal
- NÃO repita informações
`,

        exemplos: [
            {
                titulo: 'Exemplo 1: Explicação Técnica Acessível',
                contexto: 'Explicar conceito técnico para público leigo',
                semDecomposicao: `Sem negativas:
"Explique o que é blockchain."

Resultado: Texto cheio de jargão técnico (hash, node, consensus, etc.)`,
                comDecomposicao: `Com negativas:
"Explique o que é blockchain para alguém sem background técnico.

NÃO use:
- Jargão técnico (hash, node, consensus, etc.)
- Termos em inglês sem tradução
- Analogias muito complexas

FAÇA:
- Use analogias do dia a dia
- Explique com exemplos concretos
- Mantenha linguagem simples"

Resultado: Explicação clara e acessível usando analogias como "caderno compartilhado" em vez de termos técnicos.`,
                resultado: 'Texto muito mais acessível e compreensível para o público-alvo.'
            },
            {
                titulo: 'Exemplo 2: Relatório Factual',
                contexto: 'Análise de dados sem especulação',
                semDecomposicao: `"Analise estes dados de vendas e dê insights"

Problema: Modelo pode especular sobre causas sem evidência`,
                comDecomposicao: `"Analise estes dados de vendas [dados aqui].

IMPORTANTE - NÃO faça:
❌ Especular sobre causas sem evidência nos dados
❌ Fazer previsões sem base estatística
❌ Inventar dados ou percentuais não presentes
❌ Dar recomendações sem embasamento

FAÇA apenas:
✅ Descrever padrões observáveis nos dados
✅ Citar números e percentuais exatos
✅ Apontar correlações evidentes
✅ Indicar quando dados são insuficientes para conclusão"

Resultado: Análise puramente factual, sem especulação.`,
                resultado: 'Relatório preciso e confiável, baseado apenas em evidências.'
            }
        ],

        casosDeUso: [
            {
                area: 'Conteúdo Educacional',
                aplicacao: 'Material didático',
                detalhes: 'NÃO usar exemplos controversos, NÃO assumir conhecimento prévio'
            },
            {
                area: 'Atendimento ao Cliente',
                aplicacao: 'Respostas de suporte',
                detalhes: 'NÃO fazer promessas, NÃO especular sobre timelines, NÃO usar linguagem técnica'
            },
            {
                area: 'Análise de Dados',
                aplicacao: 'Reports executivos',
                detalhes: 'NÃO inventar dados, NÃO especular causas, NÃO usar jargão estatístico complexo'
            }
        ],

        dicasPraticas: [
            '✓ Seja específico nas negativas: em vez de "não seja técnico", diga "não use termos como API, endpoint, payload"',
            '✓ Combine positivas e negativas: diga o que fazer E o que não fazer',
            '✓ Use negativas para quebrar padrões comuns do modelo',
            '✓ Priorize as 2-3 restrições mais importantes',
            '✓ Teste: às vezes "faça X" funciona melhor que "não faça Y"'
        ],

        errosComuns: [
            {
                erro: 'Negativas vagas',
                exemplo: '"Não seja chato" ou "Não exagere"',
                solucao: 'Seja específico: "NÃO use parágrafos com mais de 4 linhas" ou "NÃO repita a mesma informação"'
            },
            {
                erro: 'Muitas negativas',
                exemplo: 'Lista de 15 coisas para não fazer',
                solucao: 'Foque nas 3-5 restrições mais críticas'
            },
            {
                erro: 'Negativas contraditórias',
                exemplo: '"Seja detalhado" + "NÃO seja verboso"',
                solucao: 'Alinhe instruções positivas e negativas'
            }
        ],

        recursosAdicionais: [
            '📖 Estude "constraint-based prompting"',
            '🎓 Aprenda sobre "guardrails" em LLMs',
            '🔗 Combine com output prefilling para máximo controle'
        ]
    },

    'parameters': {
        titulo: 'Ajuste de Parâmetros',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🎚️',
        introducao: `O ajuste de parâmetros permite controlar o comportamento do modelo além do texto do prompt. Temperature, top-p, max tokens e outros parâmetros oferecem fine-tuning entre criatividade e precisão.`,

        conteudoCompleto: `
## Parâmetros Principais

### 1. Temperature (0.0 - 1.0+)
Controla aleatoriedade/criatividade nas respostas.

**Temperature Baixa (0.0 - 0.3):**
- Respostas mais determinísticas e focadas
- Usa palavras mais prováveis
- Ideal para: tarefas factuais, código, análise de dados

**Temperature Média (0.4 - 0.7):**
- Equilíbrio entre criatividade e consistência
- Ideal para: conteúdo geral, conversas, explicações

**Temperature Alta (0.8 - 1.0+):**
- Respostas mais criativas e variadas
- Maior diversidade de vocabulário
- Ideal para: brainstorming, escrita criativa, geração de ideias

### 2. Top-P (Nucleus Sampling) (0.0 - 1.0)
Controla a diversidade de tokens considerados.

**Top-P Baixo (0.1 - 0.5):**
- Considera apenas tokens mais prováveis
- Respostas mais focadas e previsíveis

**Top-P Alto (0.9 - 1.0):**
- Considera maior variedade de tokens
- Permite mais diversidade e criatividade

**Dica:** Temperature e Top-P têm efeitos similares. Ajuste apenas um de cada vez.

### 3. Max Tokens
Limita o tamanho da resposta.

**Uso estratégico:**
- Respostas curtas: 50-150 tokens
- Respostas médias: 200-500 tokens
- Respostas longas: 1000+ tokens

### 4. Presence Penalty (-2.0 - 2.0)
Penaliza repetição de tópicos já mencionados.

**Positivo (0.1 - 1.0):**
- Encoraja diversidade de tópicos
- Reduz repetições temáticas

### 5. Frequency Penalty (-2.0 - 2.0)
Penaliza repetição de tokens específicos.

**Positivo (0.1 - 1.0):**
- Reduz repetição de palavras
- Aumenta variedade vocabular
`,

        exemplos: [
            {
                titulo: 'Exemplo 1: Análise de Dados vs. Brainstorming',
                contexto: 'Diferentes tasks requerem diferentes parâmetros',
                semDecomposicao: `Usar mesmos parâmetros para tudo:
Temperature: 0.7 (padrão)

Problema: Análise de dados fica inconsistente, brainstorming fica genérico`,
                comDecomposicao: `**Task 1: Análise de Dados de Vendas**
Parâmetros:
- Temperature: 0.1
- Top-P: 0.1
- Max Tokens: 500

Resultado: Análise precisa, consistente, factual.

---

**Task 2: Brainstorming de Nomes para Produto**
Parâmetros:
- Temperature: 0.9
- Top-P: 0.95
- Max Tokens: 200
- Presence Penalty: 0.6

Resultado: Ideias criativas, diversas, inesperadas.`,
                resultado: 'Cada task otimizada com parâmetros adequados.'
            }
        ],

        casosDeUso: [
            {
                area: 'Código e Programação',
                aplicacao: 'Geração de código',
                detalhes: 'Temperature: 0.1-0.2 para código correto e determinístico'
            },
            {
                area: 'Escrita Criativa',
                aplicacao: 'Histórias e narrativas',
                detalhes: 'Temperature: 0.8-1.0 para criatividade e originalidade'
            },
            {
                area: 'Sumarização',
                aplicacao: 'Resumos de documentos',
                detalhes: 'Temperature: 0.3, Max Tokens ajustado ao tamanho desejado'
            }
        ],

        dicasPraticas: [
            '✓ Comece com valores padrão e ajuste iterativamente',
            '✓ Para produção, use temperature baixa (<0.3) para consistência',
            '✓ Documente os parâmetros que funcionam para cada tipo de task',
            '✓ Teste A/B: mesma prompt, parâmetros diferentes',
            '✓ Lembre: parâmetros não substituem um prompt bem escrito',
            '✓ Max tokens deve ter margem: se precisa 100 tokens, configure 150'
        ],

        errosComuns: [
            {
                erro: 'Temperature muito alta para tarefas factuais',
                exemplo: 'Temperature 0.9 para análise de dados',
                solucao: 'Use 0.1-0.3 para tarefas que exigem precisão'
            },
            {
                erro: 'Ajustar múltiplos parâmetros simultaneamente',
                exemplo: 'Mudar temperature, top-p e penalties ao mesmo tempo',
                solucao: 'Ajuste um parâmetro por vez para entender o efeito'
            },
            {
                erro: 'Max tokens muito baixo',
                exemplo: 'Configurar 50 tokens e cortar resposta no meio',
                solucao: 'Sempre adicione margem ao max tokens estimado'
            }
        ],

        recursosAdicionais: [
            '📖 Leia documentação da API do modelo que você usa',
            '🧪 Crie um "parameter playground" para experimentar',
            '📊 Mantenha log de parâmetros x resultados para referência'
        ]
    },

    'prefilling': {
        titulo: 'Output Prefilling',
        nivel: 'Técnico',
        modulo: 3,
        icon: '✍️',
        introducao: `Output Prefilling é a técnica de começar a resposta do modelo com texto pré-definido. Isso dá controle direto sobre formato, tom e estrutura da resposta, direcionando o modelo desde a primeira palavra.`,

        conteudoCompleto: `
## O que é Output Prefilling?

Em vez de apenas enviar um prompt e deixar o modelo começar do zero, você pode "preencher" as primeiras palavras da resposta.

### Como Funciona

**Formato típico:**
\`\`\`
User: [seu prompt]
Assistant: [texto pré-preenchido que você define]
\`\`\`

O modelo continua naturalmente a partir do que você iniciou.

## Por que Usar?

### 1. Controle de Formato
Force estruturas específicas:
- JSON que sempre começa com \`{\`
- Listas que começam com \`1.\`
- Respostas que começam com frase específica

### 2. Controle de Tom
Direcione a personalidade:
- "Claro! Vou explicar de forma bem simples..."
- "Tecnicamente falando, isso envolve..."
- "Para ser direto ao ponto:..."

### 3. Forçar Compliance
Garanta que instruções sejam seguidas:
- "Seguindo exatamente o template solicitado: ..."
- "Aqui está a análise baseada APENAS nos dados fornecidos: ..."

## Casos de Uso Principais

### JSON/XML Estruturado
\`\`\`
Assistant: {
  "nome":
\`\`\`
Força formato JSON válido desde o início.

### Análise em Etapas
\`\`\`
Assistant: Vou analisar isso em 3 etapas:

1. Primeiro,
\`\`\`

### Controle de Idioma
\`\`\`
Assistant: Here is the answer in English:
\`\`\`
`,

        exemplos: [
            {
                titulo: 'Exemplo 1: Forçar Formato JSON',
                contexto: 'Garantir que resposta seja sempre JSON válido',
                semDecomposicao: `User: Extraia nome, idade e cidade deste texto: "João tem 30 anos e mora em São Paulo"

Problema: Modelo pode responder em texto livre, dificultando parsing`,
                comDecomposicao: `User: Extraia nome, idade e cidade deste texto: "João tem 30 anos e mora em São Paulo". Retorne em JSON.