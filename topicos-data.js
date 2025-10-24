// Conteúdo completo dos tópicos para modal de detalhamento
const topicosData = {
    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 1: Fundamentos
    // ==============================================

    'llm-basics': {
        titulo: 'O que são LLMs?',
        nivel: 'Iniciante',
        modulo: 1,
        icon: '🤖',
        introducao: `Large Language Models (LLMs) são modelos de inteligência artificial treinados em enormes quantidades de texto para entender e gerar linguagem natural. Compreender o que são e como funcionam é fundamental para usar prompts de forma eficaz.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-llm-basics.md',

        conteudoCompleto: `
## O que é um LLM?

Um LLM é um modelo de IA que foi treinado em bilhões de palavras de texto da internet, livros, artigos e outras fontes. Através desse treinamento, ele aprende padrões de linguagem, conhecimento factual, raciocínio e muito mais.

### Como um LLM Funciona?

1. **Treinamento:** O modelo lê milhões de textos e aprende a prever a próxima palavra
2. **Padrões:** Ele identifica padrões em gramática, fatos, raciocínio e estilo
3. **Geração:** Quando você dá um prompt, ele gera texto palavra por palavra baseado nos padrões aprendidos

### Principais Características

- **Não tem consciência:** É uma ferramenta matemática, não pensa ou sente
- **Baseado em probabilidade:** Escolhe palavras com base em qual é mais provável vir a seguir
- **Não tem memória persistente:** Cada conversa é isolada (exceto o histórico da conversa atual)
- **Treinado até uma data:** Tem conhecimento limitado até a data de corte do treinamento

## Modelos Populares

### Claude (Anthropic)
- Forte em raciocínio e seguir instruções complexas
- Bom em análise de documentos longos
- Foco em segurança e respostas úteis

### GPT-4 (OpenAI)
- Versátil para diversos tipos de tarefas
- Grande conhecimento geral
- Bom em criatividade

### Gemini (Google)
- Integrado com serviços Google
- Forte em pesquisa e informações atualizadas
`,

        exemplos: [
            {
                titulo: 'Como o LLM Responde',
                contexto: 'Entendendo o processo de geração',
                semDecomposicao: `Você pergunta: "Qual é a capital do Brasil?"

O LLM NÃO faz:
❌ Buscar em um banco de dados
❌ Consultar a internet
❌ "Lembrar" de uma conversa anterior`,
                comDecomposicao: `O LLM FAZ:
✅ Analisa seu prompt
✅ Baseado em padrões do treinamento, identifica que é uma pergunta factual
✅ Gera tokens (palavras) mais prováveis: "A", "capital", "do", "Brasil", "é", "Brasília"
✅ Continua até completar a resposta

É por isso que prompts claros ajudam: você guia o modelo para os padrões certos!`,
                resultado: 'O modelo não "sabe" as coisas - ele reconhece padrões e gera respostas prováveis.'
            }
        ],

        casosDeUso: [
            {
                area: 'Escrita',
                aplicacao: 'Geração de conteúdo',
                detalhes: 'Artigos, emails, posts de redes sociais'
            },
            {
                area: 'Código',
                aplicacao: 'Programação assistida',
                detalhes: 'Escrever, debugar e explicar código'
            },
            {
                area: 'Análise',
                aplicacao: 'Processar informações',
                detalhes: 'Resumir textos, extrair insights, responder perguntas'
            }
        ],

        dicasPraticas: [
            '✓ LLMs são melhores em tarefas com exemplos em seu treinamento',
            '✓ Quanto mais claro seu prompt, melhor a resposta',
            '✓ LLMs podem "alucinar" - inventar informações que parecem reais',
            '✓ Use LLMs como assistentes, não como fontes definitivas de verdade',
            '✓ Diferentes modelos têm diferentes pontos fortes'
        ],

        errosComuns: [
            {
                erro: 'Tratar o LLM como onisciente',
                exemplo: 'Perguntar sobre eventos após a data de treinamento',
                solucao: 'Forneça contexto se a informação é recente ou específica'
            },
            {
                erro: 'Assumir que o LLM "entende"',
                exemplo: 'Esperar que o modelo tenha senso comum como humanos',
                solucao: 'Seja explícito em suas instruções, não assuma nada'
            }
        ],

        recursosAdicionais: [
            '📖 Pesquise sobre "transformer architecture" para entender a tecnologia',
            '🎓 Leia sobre o treinamento de modelos de linguagem',
            '🔗 Experimente com diferentes modelos para ver diferenças'
        ]
    },

    'tokens': {
        titulo: 'Tokens e Context Window',
        nivel: 'Iniciante',
        modulo: 1,
        icon: '🔤',
        introducao: `Tokens são as unidades básicas que LLMs processam - não são palavras, mas pedaços de texto. Entender tokens é essencial para saber os limites do que você pode fazer com um LLM.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-tokens.md',

        conteudoCompleto: `
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
`,

        exemplos: [
            {
                titulo: 'Calculando Tokens',
                contexto: 'Estimar se seu prompt cabe no limite',
                semDecomposicao: `Texto de 1000 palavras em português
≈ 1.300 tokens

Se o limite é 4.000 tokens:
- Seu texto: 1.300 tokens
- Sua pergunta: ~50 tokens
- Resposta esperada: ~500 tokens
Total: ~1.850 tokens ✅ Cabe tranquilo!`,
                comDecomposicao: `Documento de 50.000 palavras
≈ 65.000 tokens

Se o limite é 16.000 tokens (GPT-3.5):
❌ NÃO CABE

Soluções:
1. Use modelo com context window maior (Claude)
2. Divida o documento em partes
3. Resuma primeiro, depois analise`,
                resultado: 'Sempre verifique se seu conteúdo cabe no context window!'
            }
        ],

        casosDeUso: [
            {
                area: 'Análise de Documentos',
                aplicacao: 'Processar documentos longos',
                detalhes: 'Use modelos com grande context window para livros, relatórios, etc.'
            },
            {
                area: 'Desenvolvimento',
                aplicacao: 'Revisar código',
                detalhes: 'Codebases grandes precisam ser divididas ou usar modelos de alto contexto'
            },
            {
                area: 'Conversas Longas',
                aplicacao: 'Manter contexto',
                detalhes: 'Conversas muito longas podem exceder o limite'
            }
        ],

        dicasPraticas: [
            '✓ Use ferramentas como tiktoken (OpenAI) para contar tokens exatos',
            '✓ Para português, estime 1.3x o número de palavras',
            '✓ Deixe sempre margem para a resposta (não use 100% do contexto)',
            '✓ Se estourar limite, divida em partes menores',
            '✓ Lembre: conversation history também conta!'
        ],

        errosComuns: [
            {
                erro: 'Ignorar contagem de tokens',
                exemplo: 'Colar documento gigante sem verificar',
                solucao: 'Sempre estime tokens antes de enviar'
            },
            {
                erro: 'Usar todo o context window',
                exemplo: 'Prompt de 15.900 tokens em modelo de 16k',
                solucao: 'Deixe pelo menos 20-30% para a resposta'
            }
        ],

        recursosAdicionais: [
            '🔗 OpenAI Tokenizer: plataforma.openai.com/tokenizer',
            '📖 Leia sobre tokenização BPE (Byte-Pair Encoding)',
            '🧮 Crie planilha de custos baseado em tokens'
        ]
    },

    'anatomia': {
        titulo: 'Anatomia de um Prompt',
        nivel: 'Iniciante',
        modulo: 1,
        icon: '📝',
        introducao: `Um prompt bem estruturado tem componentes específicos que trabalham juntos. Entender a anatomia de um prompt é o primeiro passo para criar instruções eficazes.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-anatomia.md',

        conteudoCompleto: `
## Componentes de um Prompt Eficaz

### 1. Contexto (Quem/O quê)
Defina o cenário e papel do modelo.

Exemplo:
"Você é um professor de física explicando para alunos do ensino médio."

### 2. Tarefa (Faça isso)
A instrução clara do que você quer.

Exemplo:
"Explique o conceito de gravidade."

### 3. Especificações (Como)
Detalhes sobre formato, tom, tamanho.

Exemplo:
"Use analogias do dia a dia. Máximo 3 parágrafos."

### 4. Exemplos (Opcional)
Mostre o tipo de resposta que você quer.

### 5. Restrições (Não faça)
O que evitar.

Exemplo:
"Não use equações matemáticas complexas."

## Template Básico

\`\`\`
[CONTEXTO]
Você é um [papel/especialista].

[TAREFA]
[Ação clara que você quer].

[ESPECIFICAÇÕES]
- Formato: [como apresentar]
- Tom: [formal/casual/técnico]
- Tamanho: [curto/médio/longo]

[RESTRIÇÕES]
NÃO faça:
- [coisa 1]
- [coisa 2]
\`\`\`
`,

        exemplos: [
            {
                titulo: 'Prompt Mal Estruturado vs Bem Estruturado',
                contexto: 'Comparar abordagens',
                semDecomposicao: `❌ Prompt Ruim:
"Me fala sobre marketing digital"

Problemas:
- Muito vago
- Sem contexto
- Sem especificações
- Resposta será genérica`,
                comDecomposicao: `✅ Prompt Bom:

[CONTEXTO]
Você é um consultor de marketing digital com 10 anos de experiência em e-commerce.

[TAREFA]
Crie um plano de ação de marketing digital para uma loja online de roupas sustentáveis que está começando.

[ESPECIFICAÇÕES]
- Liste 5 ações prioritárias
- Para cada ação: objetivo, canal e métrica de sucesso
- Foque em estratégias de baixo custo
- Público-alvo: mulheres 25-40 anos, conscientes ambientalmente

[RESTRIÇÕES]
NÃO inclua:
- Táticas que exigem budget >R$5.000/mês
- Jargões técnicos sem explicação`,
                resultado: 'Resposta específica, acionável e alinhada com necessidade real.'
            }
        ],

        casosDeUso: [
            {
                area: 'Criação de Conteúdo',
                aplicacao: 'Posts de blog',
                detalhes: 'Contexto: nicho e audiência | Tarefa: escrever | Specs: tamanho e tom'
            },
            {
                area: 'Análise',
                aplicacao: 'Review de dados',
                detalhes: 'Contexto: tipo de dados | Tarefa: analisar | Specs: formato do report'
            },
            {
                area: 'Código',
                aplicacao: 'Gerar funções',
                detalhes: 'Contexto: linguagem | Tarefa: implementar | Specs: requisitos técnicos'
            }
        ],

        dicasPraticas: [
            '✓ Comece sempre com contexto - isso "enquadra" a resposta',
            '✓ Seja específico na tarefa - verbos de ação claros',
            '✓ Especificações evitam idas e vindas',
            '✓ Exemplos valem mais que explicações longas',
            '✓ Use formatação (quebras de linha, bullets) para clareza'
        ],

        errosComuns: [
            {
                erro: 'Prompt de uma linha vago',
                exemplo: '"Me ajuda com marketing"',
                solucao: 'Adicione contexto, tarefa clara e especificações'
            },
            {
                erro: 'Misturar múltiplas tarefas',
                exemplo: '"Analise isso E escreva um resumo E crie um plano"',
                solucao: 'Uma tarefa principal por prompt (ou decomponha)'
            }
        ],

        recursosAdicionais: [
            '📖 Estude frameworks: RTF (Role-Task-Format), CARE, RISEN',
            '🎓 Pratique transformar perguntas vagas em prompts estruturados',
            '📝 Crie templates reutilizáveis para suas tarefas comuns'
        ]
    },

    'clareza': {
        titulo: 'Clareza e Especificidade',
        nivel: 'Iniciante',
        modulo: 1,
        icon: '🎯',
        introducao: `A clareza é o princípio mais importante de prompt engineering. Quanto mais específico e claro você for, melhores serão os resultados. Ambiguidade leva a respostas genéricas e imprecisas.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-clareza.md',

        conteudoCompleto: `
## Por que Clareza Importa?

LLMs interpretam literalmente o que você escreve. Eles não "adivinham" o que você quer - seguem as palavras que você usa.

### Princípios de Clareza

1. **Seja Específico:** Detalhes > Generalidades
2. **Seja Direto:** Vá direto ao ponto
3. **Seja Explícito:** Não assuma conhecimento prévio
4. **Seja Estruturado:** Use formatação para destacar partes importantes

## Técnicas para Aumentar Clareza

### 1. Use Verbos de Ação Precisos

❌ Vago: "Fale sobre SEO"
✅ Claro: "Liste 5 técnicas de SEO on-page com exemplos práticos"

### 2. Defina Parâmetros

❌ Vago: "Escreva um texto"
✅ Claro: "Escreva um parágrafo de 100 palavras"

### 3. Especifique o Público

❌ Vago: "Explique blockchain"
✅ Claro: "Explique blockchain para um gerente de banco sem conhecimento técnico"

### 4. Dê Exemplos do que Você Quer

❌ Vago: "Crie títulos criativos"
✅ Claro: "Crie títulos no estilo: 'Como X Revolucionou Y em Z Dias'"

## Checklist de Clareza

Antes de enviar seu prompt, pergunte:
- [ ] A tarefa está clara?
- [ ] O formato esperado está definido?
- [ ] O tom/estilo está especificado?
- [ ] O tamanho/escopo está delimitado?
- [ ] O público-alvo está identificado?
`,

        exemplos: [
            {
                titulo: 'Transformando Prompts Vagos em Claros',
                contexto: 'Melhorar especificidade',
                semDecomposicao: `❌ VAGO:
"Me ajuda a escrever um email"

O que está faltando?
- Para quem é o email?
- Sobre o que?
- Qual o tom?
- Qual o objetivo?`,
                comDecomposicao: `✅ CLARO:
"Escreva um email para meu gerente solicitando aprovação para participar de uma conferência.

Detalhes:
- Conferência: Web Summit 2024 em Lisboa
- Custo: R$15.000 (passagem + hotel + inscrição)
- Benefícios: networking, aprendizado em IA, oportunidades de parceria
- Tom: profissional mas persuasivo
- Tamanho: 3 parágrafos curtos

Inclua:
1. Contexto da conferência
2. Benefícios para a empresa
3. Pedido de aprovação com disponibilidade para discutir"`,
                resultado: 'Email específico, adequado e pronto para enviar (com pequenos ajustes).'
            },
            {
                titulo: 'Especificidade em Análise',
                contexto: 'Pedir análise de dados',
                semDecomposicao: `❌ VAGO:
"Analise estas vendas" [cola planilha]

Resultado: Análise genérica, superficial`,
                comDecomposicao: `✅ CLARO:
"Analise estes dados de vendas do Q1 2024 [cola planilha]

Perguntas específicas:
1. Qual produto teve melhor performance? Por quê?
2. Houve sazonalidade? Quando foram os picos?
3. Qual região vendeu mais? Há padrões geográficos?
4. Compare com meta de R$500k - atingimos? Desvio?

Formato da resposta:
- Responda cada pergunta separadamente
- Use números e percentuais específicos
- Cite evidências dos dados
- Máximo 2 parágrafos por pergunta"`,
                resultado: 'Análise estruturada, com insights específicos e acionáveis.'
            }
        ],

        casosDeUso: [
            {
                area: 'Todas as Áreas',
                aplicacao: 'Qualquer interação com LLM',
                detalhes: 'Clareza é universal - sempre importante'
            }
        ],

        dicasPraticas: [
            '✓ Pergunte a si mesmo: "Outra pessoa entenderia exatamente o que eu quero?"',
            '✓ Substitua adjetivos vagos por especificações: "bom" → "com taxa de conversão >5%"',
            '✓ Use números sempre que possível: "alguns" → "3-5"',
            '✓ Defina o que você NÃO quer (tão importante quanto o que você quer)',
            '✓ Teste: se a resposta não for boa, provavelmente o prompt não foi claro'
        ],

        errosComuns: [
            {
                erro: 'Assumir que o modelo "entende" contexto implícito',
                exemplo: '"Melhore isso" [sem dizer o que melhorar]',
                solucao: 'Seja explícito: "Melhore a clareza deste parágrafo reduzindo jargão técnico"'
            },
            {
                erro: 'Usar adjetivos sem definição',
                exemplo: '"Escreva algo criativo e interessante"',
                solucao: 'Defina: "Criativo = use metáforas inesperadas; Interessante = inclua estatísticas surpreendentes"'
            },
            {
                erro: 'Prompts de uma frase sem contexto',
                exemplo: '"Como fazer marketing?"',
                solucao: 'Contextualize: "Como fazer marketing digital para um SaaS B2B com ticket médio de R$500/mês?"'
            }
        ],

        recursosAdicionais: [
            '📖 Estude o princípio "Show, don\'t tell" aplicado a prompts',
            '🎓 Pratique: pegue prompts vagos e reescreva com máxima clareza',
            '📝 Mantenha lista de "palavras vagas a evitar" vs "especificações claras"'
        ]
    },

    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 2: Técnicas Básicas
    // ==============================================

    'zero-shot': {
        titulo: 'Zero-Shot Prompting',
        nivel: 'Iniciante',
        modulo: 2,
        icon: '🎯',
        introducao: `Zero-shot é quando você pede ao modelo para fazer algo sem dar exemplos. É a forma mais simples de prompting - apenas instruções diretas. Funciona bem para tarefas comuns que o modelo já conhece.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-zero-shot.md',

        conteudoCompleto: `
## O que é Zero-Shot?

"Zero-shot" significa "zero exemplos". Você simplesmente descreve a tarefa e o modelo tenta executar baseado em seu treinamento.

### Estrutura Básica

\`\`\`
[Instrução clara do que fazer]
[Especificações opcionais]
[Input/contexto se necessário]
\`\`\`

### Quando Usar Zero-Shot?

✅ Tarefas comuns e bem definidas
✅ Quando o modelo já tem conhecimento da tarefa
✅ Para economizar tempo (não precisa criar exemplos)
✅ Quando a tarefa é auto-explicativa

### Limitações

❌ Tarefas muito específicas ou incomuns
❌ Formatos muito particulares
❌ Quando você precisa de estilo muito específico
❌ Tarefas ambíguas

## Exemplos de Bom Uso

### Tradução
"Traduza este texto para inglês: [texto]"
→ Tarefa comum, modelo sabe fazer

### Resumo
"Resuma este artigo em 3 frases: [artigo]"
→ Tarefa direta e conhecida

### Extração
"Extraia todos os emails deste texto: [texto]"
→ Padrão claro e reconhecível
`,

        exemplos: [
            {
                titulo: 'Zero-Shot Funcionando Bem',
                contexto: 'Tarefas adequadas para zero-shot',
                semDecomposicao: `Tarefa: Classificar sentimento

Prompt:
"Classifique o sentimento desta review como positivo, negativo ou neutro:

'O produto chegou rápido mas a qualidade é inferior ao esperado. O atendimento foi bom.'"

Resposta do modelo:
"Neutro (aspectos positivos e negativos balanceados)"`,
                comDecomposicao: `✅ Funcionou porque:
- Tarefa comum (análise de sentimento)
- Opções claras (positivo/negativo/neutro)
- Input bem definido (review específica)
- Não precisa de exemplos - modelo já sabe o que é sentimento`,
                resultado: 'Zero-shot é eficiente para tarefas como esta.'
            },
            {
                titulo: 'Quando Zero-Shot Não é Suficiente',
                contexto: 'Limitações do zero-shot',
                semDecomposicao: `Tarefa: Formatar citações em estilo específico da empresa

Prompt:
"Formate esta citação no nosso estilo padrão:
John disse que aumentou vendas em 40%"

Resposta:
"John: 'Aumentei vendas em 40%'"

❌ Problema: Modelo não sabe seu "estilo padrão"`,
                comDecomposicao: `Solução: Adicionar exemplos (few-shot)
Ou ser muito mais específico:

"Formate assim:
[NOME EM CAPS] | [Empresa] | [Cargo]
'[Citação]'
↳ [Métrica em destaque]"`,
                resultado: 'Para formatos específicos, zero-shot não basta.'
            }
        ],

        casosDeUso: [
            {
                area: 'Processamento de Texto',
                aplicacao: 'Tradução, resumo, extração',
                detalhes: 'Tarefas linguísticas padrão funcionam bem em zero-shot'
            },
            {
                area: 'Classificação Simples',
                aplicacao: 'Categorizar em grupos conhecidos',
                detalhes: 'Sentimento, tópicos gerais, tipo de conteúdo'
            },
            {
                area: 'Q&A Direto',
                aplicacao: 'Perguntas factuais',
                detalhes: 'Quando a resposta está no conhecimento do modelo'
            }
        ],

        dicasPraticas: [
            '✓ Comece com zero-shot - é mais rápido',
            '✓ Se resultado não for bom, adicione especificações antes de tentar few-shot',
            '✓ Zero-shot funciona melhor com modelos maiores/mais avançados',
            '✓ Seja ainda mais claro em zero-shot (sem exemplos para guiar)',
            '✓ Teste se a tarefa é "comum" o suficiente para zero-shot'
        ],

        errosComuns: [
            {
                erro: 'Usar zero-shot para formatos muito específicos',
                exemplo: 'Esperar que modelo conheça template interno da empresa',
                solucao: 'Use few-shot com exemplos do formato desejado'
            },
            {
                erro: 'Assumir que tarefa é "óbvia"',
                exemplo: '"Faça a coisa certa com este texto"',
                solucao: 'Seja explícito mesmo em zero-shot'
            }
        ],

        recursosAdicionais: [
            '📖 Compare zero-shot vs few-shot para mesma tarefa',
            '🎓 Estude capabilities de diferentes modelos em zero-shot',
            '🧪 Experimente: quando zero-shot é suficiente vs quando não é'
        ]
    },

    'few-shot': {
        titulo: 'Few-Shot Prompting',
        nivel: 'Iniciante',
        modulo: 2,
        icon: '📚',
        introducao: `Few-shot é fornecer alguns exemplos do que você quer antes de fazer a tarefa real. É uma das técnicas mais poderosas e simples - "mostre ao modelo" em vez de só explicar.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-few-shot.md',

        conteudoCompleto: `
## O que é Few-Shot?

Few-shot significa "poucos exemplos". Você mostra 2-5 exemplos do input→output desejado, então dá o input real.

### Estrutura

\`\`\`
[Instrução da tarefa]

Exemplo 1:
Input: [exemplo 1]
Output: [resposta desejada 1]

Exemplo 2:
Input: [exemplo 2]
Output: [resposta desejada 2]

Agora faça:
Input: [tarefa real]
Output:
\`\`\`

### Por que Few-Shot Funciona?

- **Aprendizado por padrão:** LLMs são excelentes em reconhecer padrões
- **Clareza por demonstração:** Exemplo vale mais que explicação
- **Controle de formato:** Você define exatamente como quer a resposta
- **Reduz ambiguidade:** Exemplos resolvem dúvidas

## Quantos Exemplos?

- **1-2 exemplos:** Para tarefas simples ou formatos diretos
- **3-5 exemplos:** Para tarefas mais complexas (ideal)
- **6+ exemplos:** Raramente necessário (e consome tokens)

## Tipos de Few-Shot

### 1. Few-Shot de Formato
Mostre a estrutura da resposta

### 2. Few-Shot de Estilo
Mostre o tom e linguagem

### 3. Few-Shot de Raciocínio
Mostre o processo de pensamento
`,

        exemplos: [
            {
                titulo: 'Few-Shot para Extração de Informação',
                contexto: 'Extrair dados estruturados de texto livre',
                semDecomposicao: `❌ Sem exemplos:

"Extraia nome, cargo e empresa desta bio:
'Maria Silva trabalha como Diretora de Marketing na TechCorp desde 2020'"

Problema: Modelo pode usar formato inconsistente`,
                comDecomposicao: `✅ Com few-shot:

"Extraia informações no formato JSON:

Exemplo 1:
Bio: "João Santos é CEO da StartupX há 3 anos"
{
  "nome": "João Santos",
  "cargo": "CEO",
  "empresa": "StartupX"
}

Exemplo 2:
Bio: "Ana Costa, desenvolvedora senior no Google"
{
  "nome": "Ana Costa",
  "cargo": "Desenvolvedora Senior",
  "empresa": "Google"
}

Agora extraia:
Bio: "Maria Silva trabalha como Diretora de Marketing na TechCorp desde 2020"
{`,
                resultado: 'Resposta consistente no formato JSON exato que você definiu.'
            },
            {
                titulo: 'Few-Shot para Classificação Customizada',
                contexto: 'Categorias específicas do seu negócio',
                semDecomposicao: `Tarefa: Classificar tickets de suporte em categorias da empresa

Categorias: Técnico, Cobrança, Dúvida, Reclamação

Exemplos:
"Não consigo fazer login" → Técnico
"Por que foi cobrado duas vezes?" → Cobrança
"Como funciona o recurso X?" → Dúvida
"Produto chegou quebrado!" → Reclamação

Agora classifique:
"Minha senha não funciona e já tentei resetar 3x"`,
                comDecomposicao: `→ Técnico

✅ Few-shot ensinou ao modelo suas categorias específicas e como distinguir entre elas.`,
                resultado: 'Classificação precisa usando taxonomia customizada.'
            }
        ],

        casosDeUso: [
            {
                area: 'Formatação',
                aplicacao: 'Estruturas específicas',
                detalhes: 'JSON, XML, templates customizados - mostre o formato exato'
            },
            {
                area: 'Classificação Custom',
                aplicacao: 'Categorias específicas do negócio',
                detalhes: 'Exemplos ensinam as nuances de cada categoria'
            },
            {
                area: 'Estilo de Escrita',
                aplicacao: 'Tom e voz consistentes',
                detalhes: 'Exemplos definem o "jeito" de escrever'
            },
            {
                area: 'Transformação de Dados',
                aplicacao: 'Converter formato A → B',
                detalhes: 'Mostre alguns pares input→output'
            }
        ],

        dicasPraticas: [
            '✓ Use exemplos REAIS do que você quer (não genéricos)',
            '✓ Varie os exemplos (não muito similares entre si)',
            '✓ 3 exemplos é geralmente o sweet spot',
            '✓ Mostre edge cases nos exemplos se relevante',
            '✓ Mantenha exemplos concisos (não use textos gigantes)',
            '✓ Formato consistente entre exemplos'
        ],

        errosComuns: [
            {
                erro: 'Exemplos muito similares',
                exemplo: 'Todos os 3 exemplos têm estrutura idêntica',
                solucao: 'Varie para cobrir diferentes cenários da tarefa'
            },
            {
                erro: 'Muitos exemplos desnecessários',
                exemplo: '10 exemplos para tarefa simples',
                solucao: 'Comece com 2-3, só adicione mais se necessário'
            },
            {
                erro: 'Exemplos inconsistentes',
                exemplo: 'Exemplo 1 usa JSON, exemplo 2 usa texto livre',
                solucao: 'Mantenha formato idêntico em todos exemplos'
            }
        ],

        recursosAdicionais: [
            '📖 Estude "in-context learning" - base teórica do few-shot',
            '🎓 Pratique: pegue zero-shot que falhou e adicione exemplos',
            '🧪 A/B teste: 2 exemplos vs 5 exemplos - qual melhor?'
        ]
    },

    'cot': {
        titulo: 'Chain-of-Thought',
        nivel: 'Iniciante',
        modulo: 2,
        icon: '💭',
        introducao: `Chain-of-Thought (Cadeia de Pensamento) faz o modelo "mostrar o raciocínio" antes de dar a resposta final. É especialmente poderoso para problemas que exigem múltiplas etapas de raciocínio.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-cot.md',

        conteudoCompleto: `
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
`,

        exemplos: [
            {
                titulo: 'CoT em Problema Matemático',
                contexto: 'Resolver problema de palavras',
                semDecomposicao: `❌ Sem CoT:

"Uma loja vendeu 15 camisetas a R$50 cada e deu 20% de desconto. Qual o faturamento?"

Resposta: R$600

❌ Problema: Desconto foi aplicado errado (ou resposta está certa sem mostrar raciocínio?)`,
                comDecomposicao: `✅ Com CoT:

"Resolva passo a passo:
Uma loja vendeu 15 camisetas a R$50 cada e deu 20% de desconto. Qual o faturamento?"

Resposta:
Passo 1: Calcular valor sem desconto
15 camisetas × R$50 = R$750

Passo 2: Calcular desconto
20% de R$750 = R$150

Passo 3: Aplicar desconto
R$750 - R$150 = R$600

Resposta final: R$600`,
                resultado: 'Você vê exatamente o raciocínio e pode validar cada etapa.'
            },
            {
                titulo: 'CoT em Análise de Negócio',
                contexto: 'Decisão estratégica',
                semDecomposicao: `Pergunta: "Devemos lançar o produto agora ou esperar 3 meses?"

Sem CoT, resposta pode ser superficial ou baseada em apenas 1-2 fatores.`,
                comDecomposicao: `Com CoT:

"Analise passo a passo se devemos lançar agora ou em 3 meses:

Contexto: Produto SaaS B2B, 80% pronto, concorrente lançou similar semana passada"

Raciocínio:

1. Análise de Timing de Mercado
   - Concorrente lançou recentemente = janela de oportunidade diminuindo
   - Mas lançar incompleto pode prejudicar reputação

2. Avaliação de Prontidão
   - 80% pronto = funcional mas faltam features importantes
   - 3 meses = tempo para polir e adicionar diferenciais

3. Impacto Competitivo
   - Lançar agora = evita perder mercado
   - Esperar 3 meses = concorrente ganha tração

4. Risco vs Oportunidade
   - Risco de lançar cedo: bugs, experiência ruim
   - Risco de esperar: perder momento de mercado

Recomendação: Lançar versão beta AGORA para early adopters + roadmap público de melhorias nos próximos 3 meses.`,
                resultado: 'Decisão fundamentada com raciocínio multi-dimensional transparente.'
            }
        ],

        casosDeUso: [
            {
                area: 'Matemática e Lógica',
                aplicacao: 'Problemas de raciocínio',
                detalhes: 'CoT dramaticamente melhora precisão em problemas complexos'
            },
            {
                area: 'Análise e Decisão',
                aplicacao: 'Escolhas estratégicas',
                detalhes: 'Ver o raciocínio ajuda a validar a recomendação'
            },
            {
                area: 'Debugging',
                aplicacao: 'Encontrar erros',
                detalhes: 'Raciocínio passo a passo identifica onde está o problema'
            },
            {
                area: 'Educação',
                aplicacao: 'Explicar conceitos',
                detalhes: 'Mostrar o raciocínio ensina, não apenas responde'
            }
        ],

        dicasPraticas: [
            '✓ Simplesmente adicionar "pense passo a passo" já melhora resultados',
            '✓ Para problemas numéricos, sempre use CoT',
            '✓ Combine CoT com few-shot para máximo efeito',
            '✓ Peça para numerar os passos (facilita referência)',
            '✓ Use CoT quando a resposta errada tiver consequências sérias',
            '✓ Revise o raciocínio, não apenas a resposta final'
        ],

        errosComuns: [
            {
                erro: 'Usar CoT para perguntas triviais',
                exemplo: '"Qual a capital do Brasil? Pense passo a passo"',
                solucao: 'CoT é para problemas complexos. Perguntas simples não precisam.'
            },
            {
                erro: 'Não especificar o formato do raciocínio',
                exemplo: 'Pedir CoT mas não dizer como estruturar',
                solucao: 'Especifique: "Liste cada passo numerado" ou "Analise 3 dimensões: X, Y, Z"'
            },
            {
                erro: 'Ignorar o raciocínio e só ver resposta final',
                exemplo: 'Pular direto para conclusão',
                solucao: 'O valor do CoT está NO RACIOCÍNIO - valide cada passo'
            }
        ],

        recursosAdicionais: [
            '📖 Leia paper original Chain-of-Thought Prompting (Google Research)',
            '🎓 Estude variações: Tree-of-Thought, Graph-of-Thought',
            '🧪 Teste: mesma pergunta com/sem CoT - compare acurácia'
        ]
    },

    'role': {
        titulo: 'Role Prompting (Personas)',
        nivel: 'Iniciante',
        modulo: 2,
        icon: '🎭',
        introducao: `Role Prompting é atribuir uma 'persona' ou papel ao modelo. Ao dizer 'Você é um [especialista X]', você ativa conhecimentos e estilos específicos, moldando a resposta para o contexto desejado.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-role.md',

        conteudoCompleto: `
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
`,

        exemplos: [
            {
                titulo: 'Role para Explicação Técnica',
                contexto: 'Explicar conceito complexo',
                semDecomposicao: `❌ Sem role:

"Explique o que é uma API REST"

Resultado: Explicação genérica, pode ser muito técnica ou muito superficial`,
                comDecomposicao: `✅ Com role específico:

OPÇÃO 1 (Público técnico):
"Você é um arquiteto de software senior explicando para desenvolvedores júnior.
Explique o que é uma API REST e quando usar."

→ Resultado: Explicação técnica mas didática, com exemplos de código

OPÇÃO 2 (Público não-técnico):
"Você é um consultor de tecnologia explicando para CEOs sem background técnico.
Explique o que é uma API REST e por que importa para o negócio."

→ Resultado: Analogias de negócio, foco em valor, zero jargão`,
                resultado: 'Mesma pergunta, respostas totalmente diferentes baseadas no role.'
            },
            {
                titulo: 'Role para Análise sob Perspectiva',
                contexto: 'Obter diferentes pontos de vista',
                semDecomposicao: `Tarefa: Analisar decisão de aumentar preço do produto

Sem role: Análise genérica

Com roles diferentes:`,
                comDecomposicao: `ROLE 1:
"Você é o CFO focado em margem e lucratividade.
Analise o aumento de 20% no preço do produto."
→ Foco: impacto financeiro, projeções de receita

ROLE 2:
"Você é o head de Customer Success preocupado com churn.
Analise o aumento de 20% no preço do produto."
→ Foco: retenção, satisfação do cliente, valor percebido

ROLE 3:
"Você é o VP de Vendas que precisa bater meta este trimestre.
Analise o aumento de 20% no preço do produto."
→ Foco: impacto em conversão, objeções, estratégias de venda`,
                resultado: 'Múltiplas perspectivas revelam diferentes aspectos da decisão.'
            }
        ],

        casosDeUso: [
            {
                area: 'Educação',
                aplicacao: 'Ajustar nível de explicação',
                detalhes: 'Role de "professor" + nível do aluno = explicação adequada'
            },
            {
                area: 'Criação de Conteúdo',
                aplicacao: 'Definir voz e tom',
                detalhes: 'Role de copywriter, jornalista, poeta, etc.'
            },
            {
                area: 'Análise e Consultoria',
                aplicacao: 'Perspectiva especializada',
                detalhes: 'Role de consultor X ativa conhecimento específico'
            },
            {
                area: 'Brainstorming',
                aplicacao: 'Ideias de diferentes ângulos',
                detalhes: 'Múltiplos roles geram ideias diversas'
            }
        ],

        dicasPraticas: [
            '✓ Seja específico no role: "nutricionista esportiva" > "pessoa que sabe de nutrição"',
            '✓ Adicione contexto ao role: "...com 10 anos ajudando startups..."',
            '✓ Combine role com público-alvo: "Você é X explicando para Y"',
            '✓ Teste diferentes roles para mesma pergunta (mostra versatilidade)',
            '✓ Use roles reais que existem (modelo tem mais exemplos)',
            '✓ Não exagere: role relevante, não "você é um mestre jedi ninja"'
        ],

        errosComuns: [
            {
                erro: 'Role muito vago',
                exemplo: '"Você é um especialista"',
                solucao: 'Especifique: "Você é um especialista em marketing de conteúdo B2B SaaS"'
            },
            {
                erro: 'Role irrelevante para a tarefa',
                exemplo: '"Você é um chef de cozinha. Explique blockchain."',
                solucao: 'Role deve ter expertise relevante à pergunta'
            },
            {
                erro: 'Role conflitante com tarefa',
                exemplo: '"Você é imparcial. Convença-me que X é melhor que Y."',
                solucao: 'Alinhe role com objetivo da tarefa'
            }
        ],

        recursosAdicionais: [
            '📖 Estude "persona-based prompting" em marketing',
            '🎓 Crie biblioteca de roles úteis para suas tarefas comuns',
            '🧪 Experimente combinar múltiplos roles: "Você é X E Y"'
        ]
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 3
    // ==============================================

    'decomposicao': {
        titulo: 'Decomposição de Tarefas',
        nivel: 'Técnico',
        modulo: 3,
        icon: '📋',
        introducao: `A decomposição de tarefas é uma técnica fundamental de prompt engineering que consiste em quebrar problemas complexos em subtarefas menores, mais específicas e gerenciáveis. Esta abordagem permite que modelos de linguagem processem cada parte com máximo foco e precisão.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-decomposicao.md',

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

    'chaining': {
        titulo: 'Prompt Chaining',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🔗',
        introducao: `Prompt Chaining é a técnica de conectar múltiplos prompts em sequência, onde a saída de um alimenta a entrada do próximo. É como criar um pipeline de processamento onde cada estágio refina e expande o trabalho anterior.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-chaining.md',

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

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-negative.md',

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

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-parameters.md',

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

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-prefilling.md',

        exemplos: [
            {
                titulo: 'Exemplo 1: Forçar Formato JSON',
                contexto: 'Garantir que resposta seja sempre JSON válido',
                semDecomposicao: `User: Extraia nome, idade e cidade deste texto: "João tem 30 anos e mora em São Paulo"

Problema: Modelo pode responder em texto livre, dificultando parsing`,
                comDecomposicao: `User: Extraia nome, idade e cidade deste texto: "João tem 30 anos e mora em São Paulo". Retorne em JSON.
Assistant: {
  "nome": "João",
  "idade": 30,
  "cidade": "São Paulo"
}`,
                resultado: 'JSON válido garantido'
            }
        ],

        casosDeUso: [
            {
                area: 'APIs',
                aplicacao: 'Respostas estruturadas',
                detalhes: 'Prefill garante formato consistente'
            }
        ],

        dicasPraticas: [
            '✓ Use para forçar formatos (JSON, XML)',
            '✓ Controla tom desde o início',
            '✓ Combine com instruções claras'
        ],

        errosComuns: [
            {
                erro: 'Prefill muito longo',
                exemplo: 'Preencher parágrafos inteiros',
                solucao: 'Use apenas início necessário'
            }
        ],

        recursosAdicionais: [
            '📖 Documentação Claude sobre prefilling',
            '🔗 Combine com structured outputs'
        ]
    },

    'formatting': {
        titulo: 'Formatting e Estruturação',
        nivel: 'Técnico',
        modulo: 3,
        icon: '📝',
        introducao: `Estruturar prompts com delimitadores e hierarquia clara melhora compreensão do modelo e separação entre instruções e dados.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-formatting.md',

        exemplos: [
            {
                titulo: 'Estruturação Clara',
                contexto: 'Separar partes do prompt',
                semDecomposicao: `Prompt confuso sem estrutura`,
                comDecomposicao: `<task>Analise sentimento</task>
<data>Review aqui</data>`,
                resultado: 'Estrutura clara facilita compreensão'
            }
        ],

        casosDeUso: [
            {
                area: 'Prompts Complexos',
                aplicacao: 'Múltiplas seções',
                detalhes: 'Separe contexto, instruções, dados'
            }
        ],

        dicasPraticas: [
            '✓ Claude prefere XML',
            '✓ Seja consistente no estilo',
            '✓ Use nomes descritivos para tags'
        ],

        errosComuns: [
            {
                erro: 'Misturar estilos',
                exemplo: 'XML + Markdown juntos',
                solucao: 'Escolha um e mantenha'
            }
        ],

        recursosAdicionais: [
            '📖 Guia XML prompting Claude',
            '🎓 Estude structured prompting'
        ]
    }
};
