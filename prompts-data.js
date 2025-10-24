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
    },

    // CATEGORIA 2: Criação de Conteúdo (16-30)
    {
        id: 16,
        category: 'conteudo',
        categoryName: 'Criação de Conteúdo',
        title: 'Email de Vendas de Alta Conversão',
        subtitle: 'AIDA Framework',
        description: 'Estrutura AIDA (Atenção, Interesse, Desejo, Ação) com personalização para emails de vendas.',
        template: `Crie um email de vendas seguindo esta estrutura:

ATENÇÃO (Linha de assunto + primeira frase):
- Problema específico ou dado surpreendente
- Máximo 10 palavras no assunto

INTERESSE (Corpo - parágrafos 1-2):
- Ampliar o problema
- Mostrar que você entende a dor

DESEJO (Corpo - parágrafo 3):
- Apresentar solução
- Benefício principal + prova social sutil

AÇÃO (CTA):
- Pedido claro e de baixo compromisso
- Remover fricção

Produto: [Seu produto]
Público: [Seu público-alvo]
Dor principal: [Problema que resolve]

Restrições:
- Máximo 150 palavras
- Tom consultivo, não vendedor
- 1 CTA apenas`,
        example: `Produto: Software de gestão de projetos para freelancers
Público: Freelancers que gerenciam múltiplos clientes
Dor: Perda de prazos e desorganização

ASSUNTO: Perdeu prazo de cliente esta semana?

Maria, 73% dos freelancers perdem pelo menos 1 prazo por mês. Eu sei como é frustrante - cliente insatisfeito, reputação em risco.

O problema não é você. É gerenciar 5 projetos diferentes, cada um em ferramenta diferente, sem visão clara do que vence amanhã.

ProTask centraliza tudo: prazos, arquivos, comunicação. Você vê a semana inteira num único dashboard.
Ana, designer, evitou 3 atrasos só no primeiro mês.

Teste grátis por 14 dias, sem cartão. Vale a pena ver se funciona pra você?`,
        why: 'Estrutura testada de copywriting, foco em problema antes de solução, CTA de baixo compromisso aumenta conversão.',
        tags: ['email', 'vendas', 'AIDA', 'conversão', 'copywriting']
    },
    {
        id: 17,
        category: 'conteudo',
        categoryName: 'Criação de Conteúdo',
        title: 'Post Viral para LinkedIn',
        subtitle: 'Gancho + História + Insight',
        description: 'Análise de elementos virais + aplicação estruturada para criar posts engajadores.',
        template: `Crie um post para LinkedIn com potencial viral usando esta fórmula:

GANCHO (Primeiras 2 linhas):
- Afirmação controversa OU
- Pergunta provocativa OU
- Estatística surpreendente

HISTÓRIA (Corpo):
- Narrativa pessoal curta (3-4 linhas)
- Conflito ou desafio enfrentado
- Resolução ou aprendizado

INSIGHT (Conclusão):
- Lição acionável
- Aplicação prática para o leitor

FORMATO:
- Parágrafos curtos (1-2 linhas cada)
- Sem emojis excessivos (máximo 2)
- Sem hashtags no corpo
- Tom: Autêntico e vulnerável

Tópico: [Seu tema]
Público: [Seu público-alvo]`,
        example: `Tópico: Gestão de tempo
Público: Empreendedores

POST:
Cancelei 40% das minhas reuniões esta semana.
Resultado? Produtividade dobrou.

Durante anos, aceitei toda reunião. "Networking é importante", pensava. Minha agenda virou um Tetris impossível.

Até que percebi: reunião sem pauta clara = perda de tempo disfarçada de trabalho.

Agora aplico a regra dos 3 critérios:
1. Tem agenda prévia?
2. Eu sou essencial ou posso delegar?
3. Pode ser resolvido por email?

Se não passar nos 3, recuso educadamente.

O tempo que você protege é o tempo que você investe no que realmente importa.`,
        why: 'Fórmula baseada em análise de posts virais, storytelling pessoal gera conexão, insight acionável gera valor.',
        tags: ['linkedin', 'viral', 'storytelling', 'engajamento', 'social media']
    },
    {
        id: 18,
        category: 'conteudo',
        categoryName: 'Criação de Conteúdo',
        title: 'Descrição de Produto que Converte',
        subtitle: 'Benefícios + Experiência',
        description: 'Foco em benefícios, não características, com storytelling sutil para e-commerce.',
        template: `Escreva descrição de produto seguindo esta estrutura:

PARÁGRAFO 1 - Problema/Desejo:
Comece com a situação ou desejo do cliente
(não mencione o produto ainda)

PARÁGRAFO 2 - Solução:
Apresente o produto como solução
Foque em 2-3 benefícios principais (não características técnicas)

PARÁGRAFO 3 - Experiência:
Descreva a experiência de usar o produto
Use linguagem sensorial quando aplicável

PARÁGRAFO 4 - Chamada:
CTA sutil + garantia ou diferencial

Produto: [Nome e categoria]
Público: [Demografia e psicografia]
Diferencial principal: [O que torna único]

Restrições:
- 120-150 palavras total
- Tom: [Definir tom apropriado]
- Evitar: Superlativos exagerados, jargão técnico`,
        example: `Produto: Cadeira ergonômica de escritório
Público: Profissionais que trabalham de casa, 30-45 anos
Diferencial: Ajuste personalizado em 12 pontos

Trabalhar 8 horas sentado não deveria significar dor nas costas ao fim do dia. Mas para muitos profissionais remotos, é exatamente essa a realidade.

A Cadeira ErgoFlex foi projetada para se adaptar ao seu corpo, não o contrário. Ajuste altura, profundidade do assento, apoio lombar e inclinação até encontrar sua posição ideal. Suporte que acompanha seu corpo durante todo o dia.

Imagine terminar o expediente sem aquela tensão nos ombros ou peso na lombar. Apenas você, focado, confortável, produtivo.

Teste por 30 dias. Se não sentir diferença, devolvemos 100% do valor. Sua coluna agradece.`,
        why: 'Começa com empatia, transição natural para solução, linguagem sensorial cria conexão emocional.',
        tags: ['e-commerce', 'produto', 'copywriting', 'conversão', 'benefícios']
    },

    // CATEGORIA 3: Marketing e Vendas (31-45)
    {
        id: 31,
        category: 'marketing',
        categoryName: 'Marketing e Vendas',
        title: 'Análise de Concorrentes',
        subtitle: 'Competitive Intelligence',
        description: 'Framework para analisar estratégias de concorrentes e identificar oportunidades.',
        template: `Analise o concorrente [Nome] seguindo este framework:

1. POSICIONAMENTO:
   - Proposta de valor principal
   - Diferencial comunicado
   - Público-alvo aparente

2. ESTRATÉGIA DE CONTEÚDO:
   - Canais principais utilizados
   - Frequência de publicação
   - Temas/tópicos recorrentes
   - Tom e estilo de comunicação

3. OFERTAS E PRICING:
   - Estrutura de preços
   - Pacotes/planos oferecidos
   - Promoções e incentivos

4. PONTOS FORTES:
   - O que eles fazem muito bem
   - Vantagens competitivas evidentes

5. OPORTUNIDADES (gaps que podemos explorar):
   - O que eles não estão fazendo
   - Pontos fracos aparentes
   - Audiências não atendidas

Concorrente: [Nome e URL]
Seu negócio: [Descrição breve]`,
        example: `Concorrente: Empresa X de cursos online
Seu negócio: Plataforma de cursos em português

ANÁLISE:

Posicionamento: "Aprenda tecnologia em 30 dias"
Diferencial: Garantia de emprego ou dinheiro de volta
Público: Jovens 18-25 buscando primeiro emprego em tech

Conteúdo: YouTube (3x/semana), Instagram diário, LinkedIn raramente
Tom: Motivacional, informal, uso heavy de gírias

Ofertas: R$ 997 à vista ou 12x, sem opções intermediárias

Pontos Fortes: Comunidade ativa, depoimentos autênticos, suporte 24/7

OPORTUNIDADES:
- Não atendem profissionais 30+ querendo transição
- Ausência no LinkedIn (onde está esse público)
- Sem opção de pagamento flexível (mensal)
- Conteúdo muito juvenil afasta público maduro`,
        why: 'Análise estruturada revela gaps de mercado, identificação de oportunidades não exploradas, base para diferenciação.',
        tags: ['concorrência', 'análise', 'estratégia', 'marketing', 'posicionamento']
    },

    // CATEGORIA 4: Análise e Pesquisa (46-55)
    {
        id: 46,
        category: 'analise',
        categoryName: 'Análise e Pesquisa',
        title: 'Análise SWOT Profunda',
        subtitle: 'Strategic Analysis',
        description: 'Análise SWOT (Forças, Fraquezas, Oportunidades, Ameaças) detalhada para planejamento estratégico.',
        template: `Conduza análise SWOT para: [Seu negócio/projeto]

FORÇAS (Strengths) - Fatores internos positivos:
Liste 5-7 vantagens competitivas ou recursos únicos que você possui
Para cada, explique: Por que isso é uma força? Como podemos amplificá-la?

FRAQUEZAS (Weaknesses) - Fatores internos negativos:
Liste 5-7 limitações ou áreas que precisam melhoria
Para cada, explique: Qual o impacto? Como podemos minimizar ou eliminar?

OPORTUNIDADES (Opportunities) - Fatores externos positivos:
Liste 5-7 tendências de mercado ou situações que podemos aproveitar
Para cada, explique: Como podemos capitalizar? Qual o timing ideal?

AMEAÇAS (Threats) - Fatores externos negativos:
Liste 5-7 riscos ou desafios externos
Para cada, explique: Qual a probabilidade? Como podemos nos preparar?

AÇÕES ESTRATÉGICAS:
Baseado na análise, sugira 3-5 ações prioritárias que combinam:
- Força + Oportunidade (crescimento)
- Força para defender contra Ameaça (proteção)
- Melhorar Fraqueza para aproveitar Oportunidade (desenvolvimento)`,
        example: `Negócio: Consultoria de marketing digital para pequenos negócios locais

FORÇAS:
- Conhecimento profundo de SEO local → Amplificar criando conteúdo educacional
- Rede de parceiros (designers, devs) → Oferecer soluções completas

FRAQUEZAS:
- Equipe pequena (só eu) → Limita número de clientes simultâneos
- Sem case studies documentados → Dificulta vendas

OPORTUNIDADES:
- Boom de negócios locais digitalizando pós-pandemia
- Google priorizando negócios locais nos resultados

AMEAÇAS:
- Grandes agências baixando preços para capturar PMEs
- Ferramentas DIY ficando mais acessíveis

AÇÕES:
1. Criar mini-curso "SEO Local em 7 Dias" (Força+Oportunidade)
2. Documentar resultados dos 3 melhores clientes em vídeo (Corrigir Fraqueza)
3. Especializar em nicho específico (restaurantes) para diferenciar de grandes agências`,
        why: 'Visão 360° do negócio, identifica prioridades estratégicas, combina análise interna e externa para decisões informadas.',
        tags: ['swot', 'análise', 'estratégia', 'planejamento', 'negócios']
    },

    // CATEGORIA 5: Comunicação Profissional (56-65)
    {
        id: 56,
        category: 'comunicacao',
        categoryName: 'Comunicação Profissional',
        title: 'Email Profissional Difícil',
        subtitle: 'Difficult Conversations',
        description: 'Estrutura para redigir emails sobre temas sensíveis mantendo profissionalismo.',
        template: `Escreva email profissional sobre situação delicada:

CONTEXTO:
[Descreva a situação que requer o email]

ESTRUTURA DO EMAIL:

ABERTURA (Tom positivo):
Comece reconhecendo algo positivo ou contextualizando de forma neutra

SITUAÇÃO (Fatos objetivos):
Descreva a situação usando fatos, não emoções ou julgamentos
Evite: "Você sempre...", "Você nunca..."
Use: "Observei que...", "Notei que..."

IMPACTO (Consequências claras):
Explique como a situação afeta o projeto/equipe/resultados
Foque em consequências objetivas

SOLUÇÃO (Proposta construtiva):
Ofereça caminho para frente
Seja específico sobre próximos passos

FECHAMENTO (Tom colaborativo):
Reforce parceria e disponibilidade para dialogar

Tom geral: [Assertivo mas respeitoso / Empático mas firme]
Relação: [Superior-subordinado / Colegas / Cliente-fornecedor]`,
        example: `Situação: Freelancer não entregou projeto no prazo pela 3ª vez

EMAIL:

Olá João,

Obrigado pelo trabalho que vem desenvolvendo nos designs da campanha. A qualidade sempre foi excelente.

Gostaria de conversar sobre os prazos. Nos últimos três projetos, as entregas aconteceram 5, 7 e 4 dias após a data combinada. Isso impactou nosso calendário com o cliente e precisamos reajustar expectativas em toda a cadeia.

Para seguirmos trabalhando juntos, preciso de previsibilidade. Minha sugestão: vamos redefinir prazos mais realistas desde o início, ou você me avisa com 48h de antecedência se algo indicar atraso.

Você está aberto a esse ajuste? Podemos fazer uma call rápida essa semana para alinhar?

Abraço,
Maria`,
        why: 'Abordagem construtiva evita defensividade, fatos objetivos reduzem conflito, foco em solução mantém relação profissional.',
        tags: ['email', 'comunicação', 'feedback', 'profissional', 'conflito']
    },

    // CATEGORIA 6: Educação e Aprendizado (66-75)
    {
        id: 66,
        category: 'educacao',
        categoryName: 'Educação e Aprendizado',
        title: 'Plano de Estudos Personalizado',
        subtitle: 'Learning Roadmap',
        description: 'Criar roadmap de aprendizado estruturado para dominar uma nova habilidade.',
        template: `Crie plano de estudos personalizado para: [Habilidade/Área]

PERFIL DO APRENDIZ:
- Nível atual: [Iniciante/Intermediário/Avançado]
- Tempo disponível: [X horas/semana]
- Objetivo final: [O que quer alcançar]
- Prazo desejado: [Tempo para completar]

ESTRUTURA DO PLANO:

FASE 1 - FUNDAMENTOS (Semanas 1-X):
- Conceitos essenciais a dominar
- Recursos: [Cursos/Livros/Vídeos específicos]
- Projeto prático para fixar
- Critério de conclusão (como saber que dominou)

FASE 2 - INTERMEDIÁRIO (Semanas X-Y):
- Habilidades a desenvolver
- Recursos recomendados
- Projeto prático mais complexo
- Critério de conclusão

FASE 3 - AVANÇADO (Semanas Y-Z):
- Tópicos especializados
- Recursos
- Projeto final capstone
- Critério de conclusão

ROTINA SEMANAL SUGERIDA:
[Distribuição de tempo por atividade]

MARCOS DE PROGRESSO:
[Checkpoints para validar aprendizado]`,
        example: `Habilidade: Prompt Engineering
Nível: Iniciante (conhece conceitos básicos de IA)
Tempo: 5h/semana
Objetivo: Criar prompts profissionais para automação de marketing
Prazo: 8 semanas

FASE 1 - FUNDAMENTOS (Semanas 1-3):
Conceitos: Tokens, contexto, temperatura, few-shot vs zero-shot
Recursos: Curso "Prompt Engineering FEP" (Nível Iniciante) + Documentação OpenAI
Projeto: Criar 10 prompts para tarefas de marketing do dia-a-dia
Conclusão: Conseguir resultados consistentes em 8 de 10 prompts

FASE 2 - INTERMEDIÁRIO (Semanas 4-6):
Habilidades: Chain of thought, structured outputs, prompt chaining
Recursos: FEP Nível Técnico + Experimentar com Claude e GPT-4
Projeto: Automatizar criação de calendário de conteúdo mensal
Conclusão: Sistema funcional que gera 80% do calendário

FASE 3 - AVANÇADO (Semanas 7-8):
Tópicos: RAG, function calling, agentes autônomos
Recursos: FEP Masterclass + Documentação Anthropic
Projeto Final: Sistema de geração de campanhas completas (copy + estratégia)

ROTINA:
Segunda/Quarta (2h cada): Estudo teórico
Sábado (1h): Prática e experimentos`,
        why: 'Estruturação reduz overwhelm, marcos claros mantêm motivação, projetos práticos garantem aplicação real.',
        tags: ['educação', 'aprendizado', 'plano', 'roadmap', 'estudos']
    },

    // CATEGORIA 7: Criatividade e Brainstorming (76-85)
    {
        id: 76,
        category: 'criatividade',
        categoryName: 'Criatividade e Brainstorming',
        title: 'Brainstorming SCAMPER',
        subtitle: 'Creative Ideation',
        description: 'Técnica SCAMPER para gerar ideias criativas através de 7 ângulos diferentes.',
        template: `Use técnica SCAMPER para gerar ideias sobre: [Seu produto/serviço/problema]

S - SUBSTITUTE (Substituir):
O que podemos substituir? (Materiais, processos, pessoas, regras)
Gere 3-5 ideias substituindo elementos-chave

C - COMBINE (Combinar):
O que podemos combinar? (Produtos, serviços, processos, públicos)
Gere 3-5 ideias de combinações inusitadas

A - ADAPT (Adaptar):
O que podemos adaptar de outras indústrias/contextos?
Gere 3-5 ideias inspiradas em outros setores

M - MODIFY (Modificar):
O que podemos modificar? (Tamanho, forma, cor, som, movimento)
Gere 3-5 ideias de modificações

P - PUT TO OTHER USE (Outro uso):
Como isso pode ser usado de forma diferente?
Gere 3-5 usos alternativos

E - ELIMINATE (Eliminar):
O que podemos remover/simplificar?
Gere 3-5 ideias de eliminação/minimalismo

R - REVERSE/REARRANGE (Reverter/Reorganizar):
O que acontece se invertermos ou reorganizarmos?
Gere 3-5 ideias de reversão/reordenação

SELEÇÃO:
Das ideias geradas, escolha as 3 mais promissoras e explique por quê`,
        example: `Produto: App de delivery de comida

SUBSTITUTE:
- Substituir restaurantes por cozinheiros caseiros locais
- Substituir entregadores por drones em áreas permitidas

COMBINE:
- Delivery + Aulas de culinária (chef entrega ingredientes + ensina por vídeo)
- Delivery + Nutricionista (análise nutricional de cada pedido)

ADAPT:
- Adaptar modelo Netflix: assinatura mensal, refeições ilimitadas
- Adaptar Spotify: playlists de refeições personalizadas por IA

MODIFY:
- Pedidos por voz em vez de app
- Embalagens comestíveis/zero desperdício

PUT TO OTHER USE:
- App vira marketplace de ingredientes frescos
- Plataforma de networking para chefs

ELIMINATE:
- Eliminar cardápio: chef decide baseado em ingredientes frescos do dia
- Eliminar escolha: uma refeição surpresa excelente por dia

REVERSE:
- Cliente cozinha, chef avalia e dá feedback
- Restaurante pede comida de você (economia colaborativa)

MAIS PROMISSORAS:
1. Modelo assinatura Netflix
2. Chefs caseiros locais
3. Eliminar cardápio fixo`,
        why: 'Forças pensamento lateral, múltiplas perspectivas aumentam criatividade, estrutura previne bloqueio criativo.',
        tags: ['criatividade', 'brainstorming', 'ideação', 'SCAMPER', 'inovação']
    },

    // CATEGORIA 8: Técnicas Avançadas (86-100)
    {
        id: 86,
        category: 'avancadas',
        categoryName: 'Técnicas Avançadas',
        title: 'Prompt Constitucional (Constitutional AI)',
        subtitle: 'Ethical Constraints',
        description: 'Adicionar princípios éticos e restrições ao comportamento do modelo.',
        template: `PRINCÍPIOS CONSTITUCIONAIS:

Você deve seguir rigorosamente estes princípios:

1. HONESTIDADE:
   - Se não souber, admita
   - Não invente dados ou estatísticas
   - Cite fontes quando fizer afirmações factuais

2. SEGURANÇA:
   - Não forneça informações que possam causar dano
   - Alerte sobre riscos quando aplicável
   - Priorize bem-estar do usuário

3. IMPARCIALIDADE:
   - Apresente múltiplas perspectivas
   - Evite viés político/religioso/cultural
   - Reconheça limitações e nuances

4. PRIVACIDADE:
   - Não peça informações sensíveis desnecessárias
   - Respeite confidencialidade

5. [Princípio customizado adicional]:
   [Regra específica para seu contexto]

TAREFA:
[Sua tarefa aqui]

VALIDAÇÃO:
Antes de responder, verifique se sua resposta viola algum princípio acima. Se violar, reformule.`,
        example: `PRINCÍPIOS:

1. HONESTIDADE: Se não souber, admita explicitamente
2. SEGURANÇA: Não sugira práticas financeiras arriscadas
3. IMPARCIALIDADE: Apresente prós e contras de cada opção
4. PRIVACIDADE: Não peça valores específicos de patrimônio
5. CLAREZA: Use linguagem acessível, sem jargão financeiro excessivo

TAREFA:
Aconselhe sobre como investir R$ 10.000 como iniciante

RESPOSTA (seguindo princípios):

"Vou apresentar algumas opções com prós e contras de cada:

TESOURO DIRETO:
Prós: Seguro (governo), baixo risco, acessível
Contras: Rentabilidade moderada

FUNDOS DE ÍNDICE (ETFs):
Prós: Diversificação, baixo custo
Contras: Volatilidade maior, requer mais estudo

IMPORTANTE: Não sou consultor financeiro credenciado. Cada situação é única e depende de tolerância a risco, prazo e objetivos. Considere consultar um profissional certificado antes de decidir."`,
        why: 'Garante respostas éticas e responsáveis, reduz riscos de outputs problemáticos, aumenta confiabilidade.',
        tags: ['ética', 'segurança', 'constitutional-ai', 'avançado', 'responsabilidade']
    }

    // NOTA: Este arquivo contém 15 prompts de exemplo distribuídos pelas 8 categorias
    // Para ter os 100 prompts completos, adicione os demais seguindo o mesmo padrão
];
