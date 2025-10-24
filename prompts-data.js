// Dados dos 100 Prompts Essenciais
const promptsData = [
    // CATEGORIA 1: Métodos Fundamentais (1-15)
    {
        id: 1,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método da Decomposição',
        subtitle: 'Deconstruction Method',
        description: 'Dividir uma tarefa complexa em subtarefas menores e gerenciáveis, processando cada uma separadamente.',
        template: `Tarefa principal: [Objetivo final]

Decomponha esta tarefa nas seguintes etapas:
1. [Subtarefa 1]
2. [Subtarefa 2]
3. [Subtarefa 3]

Execute cada etapa separadamente e depois integre os resultados.`,
        example: `Tarefa principal: Criar uma estratégia de marketing digital completa

Decomponha esta tarefa nas seguintes etapas:
1. Análise do público-alvo (demografia, interesses, dores)
2. Definição de canais de comunicação mais efetivos
3. Criação de calendário de conteúdo mensal
4. Definição de métricas de sucesso e KPIs

Execute cada etapa separadamente, fornecendo análise detalhada para cada uma.`,
        why: 'Evita sobrecarga cognitiva do modelo, permite foco específico em cada aspecto, facilita revisão e ajustes.',
        tags: ['decomposição', 'organização', 'complexidade', 'etapas']
    },
    {
        id: 2,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método da Empilhagem',
        subtitle: 'Stacking Method',
        description: 'Construir o prompt em camadas, adicionando contexto, restrições e especificações progressivamente.',
        template: `CAMADA 1 - Papel:
Você é [definição de papel/especialidade]

CAMADA 2 - Contexto:
[Informações de background relevantes]

CAMADA 3 - Tarefa:
[O que você quer que seja feito]

CAMADA 4 - Restrições:
- [Restrição 1]
- [Restrição 2]

CAMADA 5 - Formato:
[Como você quer a saída]`,
        example: `CAMADA 1 - Papel:
Você é um copywriter especializado em e-commerce de moda

CAMADA 2 - Contexto:
Estamos lançando uma nova coleção de verão para público feminino 25-40 anos, estilo casual-chic

CAMADA 3 - Tarefa:
Escreva uma descrição de produto para um vestido midi floral

CAMADA 4 - Restrições:
- Máximo 150 palavras
- Tom: sofisticado mas acessível
- Incluir benefícios (não apenas características)
- Evitar clichês de moda

CAMADA 5 - Formato:
Parágrafo único, fluido, com call-to-action sutil no final`,
        why: 'Cada camada adiciona precisão sem confundir o modelo, permite ajustes granulares, estrutura clara facilita replicação.',
        tags: ['camadas', 'estrutura', 'contexto', 'precisão']
    },
    {
        id: 3,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método Tell and Show',
        subtitle: 'Demonstração',
        description: 'Combinar instruções explícitas com exemplos concretos do resultado desejado.',
        template: `INSTRUÇÃO (Tell):
[Explique o que você quer]

EXEMPLO (Show):
[Forneça 1-3 exemplos do resultado ideal]

AGORA CRIE:
[Seu caso específico]`,
        example: `INSTRUÇÃO (Tell):
Crie títulos de artigos de blog que sejam específicos, prometam valor claro e usem números quando possível.

EXEMPLO (Show):
✓ "7 Estratégias Comprovadas para Aumentar Conversões em E-commerce em 30 Dias"
✓ "Como Reduzir Custos de Aquisição de Clientes em 40%: Guia Prático com Casos Reais"
✓ "O Framework Completo de SEO Local: 12 Passos para Dominar Sua Região"

AGORA CRIE:
5 títulos para artigos sobre produtividade para empreendedores digitais`,
        why: 'Exemplos eliminam ambiguidade, modelo aprende o padrão exato, reduz iterações necessárias.',
        tags: ['exemplos', 'demonstração', 'clareza', 'padrão']
    },
    {
        id: 4,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método Talent Show',
        subtitle: 'Bom vs Ruim',
        description: 'Mostrar exemplos do que é BOM e do que é RUIM, criando contraste claro.',
        template: `Tarefa: [Objetivo]

EXEMPLO BOM (siga este padrão):
[Exemplo de qualidade]

EXEMPLO RUIM (evite este padrão):
[Exemplo do que não fazer]

Agora crie: [Seu pedido específico]`,
        example: `Tarefa: Criar legenda para Instagram de uma cafeteria artesanal

EXEMPLO BOM (siga este padrão):
"O aroma de café fresco pela manhã tem o poder de transformar um dia comum em algo especial. Cada xícara que preparamos carrega a dedicação de quem escolheu os grãos, torrou com precisão e extraiu com cuidado. Venha sentir a diferença. ☕"

EXEMPLO RUIM (evite este padrão):
"☕🔥 MELHOR CAFÉ DA CIDADE! 💯 Venha já! #cafe #coffee #cafeteria #bomdia #cafedamanha #instacafe #coffeelovers #coffeetime"

Agora crie: Legenda para post promovendo novo método de extração cold brew`,
        why: 'Contraste visual entre bom/ruim é mais efetivo que apenas instruções, modelo entende nuances de qualidade.',
        tags: ['contraste', 'qualidade', 'exemplos', 'padrão']
    },
    {
        id: 5,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método de Importação',
        subtitle: 'Import Method',
        description: 'Referenciar e importar contexto de conversas ou documentos anteriores.',
        template: `CONTEXTO IMPORTADO:
[Cole informações relevantes de fontes anteriores]

BASEADO NO CONTEXTO ACIMA:
[Nova tarefa que depende desse contexto]`,
        example: `CONTEXTO IMPORTADO:
Na nossa última conversa, definimos o público-alvo como:
- Idade: 28-45 anos
- Profissão: Empreendedores digitais e freelancers
- Dor principal: Falta de tempo para criar conteúdo consistente
- Objetivo: Automatizar marketing sem perder autenticidade

BASEADO NO CONTEXTO ACIMA:
Crie 5 headlines para anúncios no Facebook que falem diretamente com as dores desse público e apresentem nossa ferramenta de automação como solução.`,
        why: 'Mantém consistência entre interações, evita repetir contexto, permite construção incremental.',
        tags: ['contexto', 'continuidade', 'referência', 'consistência']
    },
    {
        id: 6,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Chain of Thought',
        subtitle: 'Cadeia de Pensamento',
        description: 'Solicitar que o modelo mostre seu raciocínio passo a passo antes da resposta final.',
        template: `[Problema ou pergunta]

Antes de responder, pense em voz alta:
1. Analise o problema
2. Considere diferentes abordagens
3. Avalie prós e contras
4. Chegue a uma conclusão fundamentada

Mostre todo o seu raciocínio.`,
        example: `Problema: Minha taxa de abertura de emails está em 15%, mas a taxa de cliques está em apenas 1,2%. Como melhorar?

Antes de responder, pense em voz alta:
1. Analise onde está o gargalo (abertura vs. clique)
2. Identifique possíveis causas para cada métrica
3. Priorize qual problema atacar primeiro
4. Sugira soluções específicas com justificativa

Mostre todo o seu raciocínio antes de dar recomendações finais.`,
        why: 'Força análise profunda, permite verificar lógica, melhora qualidade de respostas complexas.',
        tags: ['raciocínio', 'análise', 'lógica', 'passo-a-passo']
    },
    {
        id: 7,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método Anti-Keyword Staining',
        subtitle: 'Prevenção de Palavras-Chave',
        description: 'Instruir explicitamente o que NÃO incluir para evitar padrões indesejados.',
        template: `Tarefa: [Objetivo]

O QUE INCLUIR:
- [Elemento desejado 1]
- [Elemento desejado 2]

O QUE NÃO INCLUIR:
- [Evitar elemento 1]
- [Evitar elemento 2]
- [Evitar padrão específico]`,
        example: `Tarefa: Escrever post profissional no LinkedIn sobre liderança

O QUE INCLUIR:
- Experiência pessoal autêntica
- Insight acionável específico
- Tom vulnerável mas profissional

O QUE NÃO INCLUIR:
- Jargões corporativos vazios ("sinergia", "pensar fora da caixa")
- Hashtags excessivas
- Perguntas genéricas no final ("O que você acha?")
- Emojis (exceto 1-2 estratégicos)
- Listas de bullet points`,
        why: 'Instruções negativas são tão importantes quanto positivas, previne padrões clichês, refina qualidade.',
        tags: ['restrições', 'negativas', 'qualidade', 'evitar']
    },
    {
        id: 8,
        category: 'fundamentais',
        categoryName: 'Métodos Fundamentais',
        title: 'Método de Encadeamento',
        subtitle: 'Chaining Method',
        description: 'Conectar múltiplos prompts onde a saída de um alimenta a entrada do próximo.',
        template: `PROMPT 1 (Análise):
[Primeira etapa - geralmente análise ou coleta]

PROMPT 2 (Processamento):
Use os resultados do Prompt 1 para: [Segunda etapa]

PROMPT 3 (Síntese):
Com base nos Prompts 1 e 2, crie: [Saída final]`,
        example: `PROMPT 1 (Análise):
Analise este texto de vendas e identifique: 1) Público-alvo, 2) Principais objeções, 3) Benefícios destacados

PROMPT 2 (Processamento):
Use os resultados do Prompt 1 para criar 3 variações de headline, cada uma focada em uma objeção diferente identificada

PROMPT 3 (Síntese):
Com base nos Prompts 1 e 2, crie um email completo de follow-up usando a headline mais forte e incorporando todos os benefícios`,
        why: 'Permite processos complexos em etapas gerenciáveis, cada prompt foca em uma função específica.',
        tags: ['sequência', 'etapas', 'workflow', 'processo']
    }

    // NOTA: Adicione os outros 92 prompts seguindo o mesmo padrão
    // Para cada categoria: conteudo, marketing, analise, comunicacao, educacao, criatividade, avancadas
];
