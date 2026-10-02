// Conteúdo completo dos tópicos para modal de detalhamento
const topicosData = {
    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 1: Fundamentos
    // ==============================================

    'llm-basics': {
        titulo: 'What are LLMs?',
        nivel: 'Beginner',
        modulo: 1,
        icon: '🤖',
        introducao: `Large Language Models (LLMs) are artificial intelligence models trained on enormous amounts of text to understand and generate natural language. Understanding what they are and how they work is essential to using prompts effectively.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-llm-basics.md',

        conteudoCompleto: `## What Is an LLM?

An LLM is an AI model trained on billions of words from the internet, books, articles, and other sources. Through this training, it learns language patterns, factual knowledge, reasoning, and much more.

### How Does an LLM Work?

1. **Training:** The model reads millions of texts and learns to predict the next word
2. **Patterns:** It identifies patterns in grammar, facts, reasoning, and style
3. **Generation:** When you give it a prompt, it generates text word by word based on learned patterns

### Key Characteristics

- **Not conscious:** It’s a mathematical tool; it doesn’t think or feel
- **Based on probability:** It chooses words based on which one is most likely to come next
- **No persistent memory:** Each conversation is isolated (except for the current conversation history)
- **Trained through a cutoff date:** Its knowledge is limited to its training cutoff date

## Popular Models

### Claude (Anthropic)
- Strong at reasoning and following complex instructions
- Good at analyzing long documents
- Focuses on safety and helpful answers

### GPT-4 (OpenAI)
- Versatile across many types of tasks
- Broad general knowledge
- Good at creative work

### Gemini (Google)
- Integrated with Google services
- Strong at research and up-to-date information`,

        exemplos: [
            {
                titulo: 'Como o LLM Responde',
                contexto: 'Understanding the generation process',
                semDecomposicao: `You ask: "What is the capital of Brazil?"

The LLM does NOT:
❌ Search a database
❌ Browse the internet
❌ "Remember" a previous conversation`,
                comDecomposicao: `THE LLM DOES:
✅ Analyzes your prompt
✅ Based on training patterns, identifies it as a factual question
✅ Generates the most likely tokens (words): "The," "capital," "of," "Brazil," "is," "Brasília"
✅ Continues until it completes the response

That’s why clear prompts help: you guide the model toward the right patterns!`,
                resultado: 'The model doesn’t "know" things—it recognizes patterns and generates likely responses.'
            }
        ],

        casosDeUso: [
            {
                area: 'Escrita',
                aplicacao: 'Content generation',
                detalhes: 'Articles, emails, social media posts'
            },
            {
                area: 'Código',
                aplicacao: 'Assisted programming',
                detalhes: 'Write, debug, and explain code'
            },
            {
                area: 'Análise',
                aplicacao: 'Process information',
                detalhes: 'Resumir textos, extrair insights, responder perguntas'
            }
        ],

        dicasPraticas: [
            '✓ LLMs are better at tasks with examples in their training data',
            '✓ The clearer your prompt, the better the response',
            '✓ LLMs can "hallucinate"—make up information that seems real',
            '✓ Use LLMs as assistants, not as definitive sources of truth',
            '✓ Different models have different strengths'
        ],

        errosComuns: [
            {
                erro: 'Tratar o LLM como onisciente',
                exemplo: 'Ask about events after the training date',
                solucao: 'Provide context if the information is recent or specific'
            },
            {
                erro: 'Assuming the LLM “understands”',
                exemplo: 'Expecting the model to have common sense like humans',
                solucao: 'Be explicit in your instructions; don\'t assume anything'
            }
        ],

        recursosAdicionais: [
            '📖 Research "transformer architecture" to understand the technology',
            '🎓 Read about language model training',
            '🔗 Experiment with different models to see the differences'
        ]
    },

    'tokens': {
        titulo: 'Tokens e Context Window',
        nivel: 'Beginner',
        modulo: 1,
        icon: '🔤',
        introducao: `Tokens are the basic units that LLMs process—they aren’t words, but pieces of text. Understanding tokens is essential for knowing the limits of what you can do with an LLM.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-tokens.md',

        conteudoCompleto: `## What Are Tokens?

Tokens are how an LLM "reads" text. A word can be 1 token or several tokens.

### Tokenization Examples

- "Olá" = 1 token
- "Brasília" = 2 tokens (Bras + ília)
- "ChatGPT" = 2 tokens (Chat + GPT)
- Spaces and punctuation are tokens too!

**General rule:** ~4 characters = 1 token in Portuguese

## Context Window

The "context window" is the maximum number of tokens a model can process at once.

### Common Sizes

- **Claude 3.5 Sonnet:** 200.000 tokens (~150.000 words)
- **GPT-4 Turbo:** 128.000 tokens (~96.000 words)
- **GPT-3.5:** 16.000 tokens (~12.000 words)

### What Counts Toward the Context Window?

✅ Your prompt
✅ The entire conversation history
✅ The model’s response
✅ Examples and context you provide

## Why Do Tokens Matter?

### 1. Physical Limits
If you exceed the context window, the model won’t work.

### 2. Cost
APIs charge per token—for both input and output.

### 3. Performance
Very long prompts can affect quality and speed.`,

        exemplos: [
            {
                titulo: 'Calculando Tokens',
                contexto: 'Estimate whether your prompt fits within the limit',
                semDecomposicao: `1,000-word text in Portuguese
≈ 1,300 tokens

If the limit is 4,000 tokens:
- Your text: 1,300 tokens
- Your question: ~50 tokens
- Expected response: ~500 tokens
Total: ~1,850 tokens ✅ Fits easily!`,
                comDecomposicao: `50,000-word document
≈ 65,000 tokens

If the limit is 16,000 tokens (GPT-3.5):
❌ DOESN'T FIT

Solutions:
1. Use a model with a larger context window (Claude)
2. Split the document into parts
3. Summarize first, then analyze`,
                resultado: 'Always check that your content fits within the context window!'
            }
        ],

        casosDeUso: [
            {
                area: 'Document Analysis',
                aplicacao: 'Processar documentos longos',
                detalhes: 'Use models with a large context window for books, reports, etc.'
            },
            {
                area: 'Desenvolvimento',
                aplicacao: 'Code review',
                detalhes: 'Large codebases need to be split up or use models with large context windows'
            },
            {
                area: 'Conversas Longas',
                aplicacao: 'Manter contexto',
                detalhes: 'Conversas muito longas podem exceder o limite'
            }
        ],

        dicasPraticas: [
            '✓ Use tools like tiktoken (OpenAI) to count tokens exactly',
            '✓ For Portuguese, estimate 1.3x the number of words',
            '✓ Always leave room for the response (don\'t use 100% of the context)',
            '✓ If you hit a limit, split the task into smaller parts',
            '✓ Remember: conversation history counts too!'
        ],

        errosComuns: [
            {
                erro: 'Ignore token count',
                exemplo: 'Colar documento gigante sem verificar',
                solucao: 'Always estimate tokens before sending'
            },
            {
                erro: 'Usar todo o context window',
                exemplo: '15,900-token prompt in a 16k model',
                solucao: 'Leave at least 20-30% for the response'
            }
        ],

        recursosAdicionais: [
            '🔗 OpenAI Tokenizer: plataforma.openai.com/tokenizer',
            '📖 Read about BPE (Byte-Pair Encoding) tokenization',
            '🧮 Create a cost spreadsheet based on tokens'
        ]
    },

    'anatomia': {
        titulo: 'Anatomy of a Prompt',
        nivel: 'Beginner',
        modulo: 1,
        icon: '📝',
        introducao: `A well-structured prompt has specific components that work together. Understanding a prompt’s anatomy is the first step to creating effective instructions.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-anatomia.md',

        conteudoCompleto: `## Components of an Effective Prompt

### 1. Context (Who/What)
Define the scenario and the model’s role.

Example:
"You are a physics teacher explaining a concept to high school students."

### 2. Task (Do This)
A clear instruction about what you want.

Example:
"Explain the concept of gravity."

### 3. Specifications (How)
Details about format, tone, and length.

Example:
"Use everyday analogies. Maximum 3 paragraphs."

### 4. Examples (Optional)
Show the type of answer you want.

### 5. Constraints (Don’t Do This)
What to avoid.

Example:
"Don’t use complex mathematical equations."

## Basic Template

\`\`\`
[CONTEXT]
You are a [role/expert].

[TASK]
[Clear action you want].

[SPECIFICATIONS]
- Format: [how to present it]
- Tone: [formal/casual/technical]
- Length: [short/medium/long]

[CONSTRAINTS]
DO NOT:
- [thing 1]
- [thing 2]
\`\`\``,

        exemplos: [
            {
                titulo: 'Prompt Mal Estruturado vs Bem Estruturado',
                contexto: 'Comparar abordagens',
                semDecomposicao: `❌ Bad Prompt:
"Tell me about digital marketing"

Problems:
- Too vague
- No context
- No specifications
- The answer will be generic`,
                comDecomposicao: `✅ Good Prompt:

[CONTEXT]
You are a digital marketing consultant with 10 years of e-commerce experience.

[TASK]
Create a digital marketing action plan for a sustainable clothing online store that is just getting started.

[SPECIFICATIONS]
- List 5 priority actions
- For each action: objective, channel, and success metric
- Focus on low-cost strategies
- Target audience: environmentally conscious women ages 25-40

[RESTRICTIONS]
DO NOT include:
- Tactics that require a budget >R$5.000/month
- Technical jargon without explanation`,
                resultado: 'Specific, actionable response aligned with your actual needs.'
            }
        ],

        casosDeUso: [
            {
                area: 'Content Creation',
                aplicacao: 'Blog posts',
                detalhes: 'Context: niche and audience | Task: write | Specs: length and tone'
            },
            {
                area: 'Análise',
                aplicacao: 'Data review',
                detalhes: 'Context: data type | Task: analyze | Specs: report format'
            },
            {
                area: 'Código',
                aplicacao: 'Generate functions',
                detalhes: 'Context: language | Task: implement | Specs: technical requirements'
            }
        ],

        dicasPraticas: [
            '✓ Always start with context—it "frames" the response',
            '✓ Be specific about the task—use clear action verbs',
            '✓ Specifications prevent back-and-forth',
            '✓ Examples are worth more than lengthy explanations',
            '✓ Use formatting (line breaks, bullets) for clarity'
        ],

        errosComuns: [
            {
                erro: 'Vague one-line prompt',
                exemplo: '"Help me with marketing"',
                solucao: 'Add context, a clear task, and specifications'
            },
            {
                erro: 'Mixing multiple tasks',
                exemplo: '"Analyze this AND write a summary AND create a plan"',
                solucao: 'One main task per prompt (or break it down)'
            }
        ],

        recursosAdicionais: [
            '📖 Estude frameworks: RTF (Role-Task-Format), CARE, RISEN',
            '🎓 Practice turning vague questions into structured prompts',
            '📝 Create reusable templates for your common tasks'
        ]
    },

    'clareza': {
        titulo: 'Clareza e Especificidade',
        nivel: 'Beginner',
        modulo: 1,
        icon: '🎯',
        introducao: `Clarity is the most important principle of prompt engineering. The more specific and clear you are, the better the results will be. Ambiguity leads to generic, imprecise answers.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-clareza.md',

        conteudoCompleto: `## Why Does Clarity Matter?

LLMs interpret what you write literally. They don’t "guess" what you want—they follow the words you use.

### Principles of Clarity

1. **Be Specific:** Details > Generalities
2. **Be Direct:** Get straight to the point
3. **Be Explicit:** Don’t assume prior knowledge
4. **Be Structured:** Use formatting to highlight important parts

## Techniques for Greater Clarity

### 1. Use Precise Action Verbs

❌ Vague: "Talk about SEO"
✅ Clear: "List 5 on-page SEO techniques with practical examples"

### 2. Define Parameters

❌ Vague: "Write a text"
✅ Clear: "Write a 100-word paragraph"

### 3. Specify the Audience

❌ Vague: "Explain blockchain"
✅ Clear: "Explain blockchain to a bank manager with no technical knowledge"

### 4. Give Examples of What You Want

❌ Vague: "Create creative titles"
✅ Clear: "Create titles in this style: 'How X Revolutionized Y in Z Days'"

## Clarity Checklist

Before sending your prompt, ask:
- [ ] Is the task clear?
- [ ] Is the expected format defined?
- [ ] Is the tone/style specified?
- [ ] Are the length/scope bounded?
- [ ] Is the target audience identified?`,

        exemplos: [
            {
                titulo: 'Turning Vague Prompts into Clear Ones',
                contexto: 'Melhorar especificidade',
                semDecomposicao: `❌ VAGUE:
"Help me write an email"

What's missing?
- Who is the email for?
- What is it about?
- What tone should it use?
- What's the objective?`,
                comDecomposicao: `✅ CLEAR:
"Write an email to my manager requesting approval to attend a conference.

Details:
- Conference: Web Summit 2024 in Lisbon
- Cost: R$15.000 (flight + hotel + registration)
- Benefits: networking, learning about AI, partnership opportunities
- Tone: professional but persuasive
- Length: 3 short paragraphs

Include:
1. Conference context
2. Benefits for the company
3. Request for approval, with availability to discuss"`,
                resultado: 'A specific, appropriate email, ready to send (with minor adjustments).'
            },
            {
                titulo: 'Specificity in Analysis',
                contexto: 'Ask for data analysis',
                semDecomposicao: `❌ VAGUE:
"Analyze these sales" [paste spreadsheet]

Result: Generic, superficial analysis`,
                comDecomposicao: `✅ CLEAR:
"Analyze these Q1 2024 sales data [paste spreadsheet]

Specific questions:
1. Which product performed best? Why?
2. Was there seasonality? When were the peaks?
3. Which region sold the most? Are there geographic patterns?
4. Compare against the R$500k target—did we reach it? Variance?

Response format:
- Answer each question separately
- Use specific numbers and percentages
- Cite evidence from the data
- Maximum 2 paragraphs per question"`,
                resultado: 'Structured analysis with specific, actionable insights.'
            }
        ],

        casosDeUso: [
            {
                area: 'All Areas',
                aplicacao: 'Any interaction with an LLM',
                detalhes: 'Clarity is universal—it’s always important'
            }
        ],

        dicasPraticas: [
            '✓ Ask yourself: "Would someone else understand exactly what I want?"',
            '✓ Replace vague adjectives with specifications: "good" → "with a conversion rate >5%"',
            '✓ Use numbers whenever possible: "some" → "3-5"',
            '✓ Define what you DON\'T want (just as important as what you do want)',
            '✓ Test: if the answer isn\'t good, the prompt probably wasn\'t clear'
        ],

        errosComuns: [
            {
                erro: 'Assuming the model “understands” implicit context',
                exemplo: '"Improve this" [without saying what to improve]',
                solucao: 'Be explicit: "Improve the clarity of this paragraph by reducing technical jargon"'
            },
            {
                erro: 'Use adjectives without defining them',
                exemplo: '"Escreva algo criativo e interessante"',
                solucao: 'Define: "Creative = use unexpected metaphors; Interesting = include surprising statistics"'
            },
            {
                erro: 'One-sentence prompts without context',
                exemplo: '"Como fazer marketing?"',
                solucao: 'Add context: “How do you do digital marketing for a B2B SaaS with an average monthly contract value of R$500?”'
            }
        ],

        recursosAdicionais: [
            '📖 Study the "Show, don\'t tell" principle applied to prompts',
            '🎓 Practice: take vague prompts and rewrite them with maximum clarity',
            '📝 Keep a list of "vague words to avoid" vs. "clear specifications"'
        ]
    },

    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 2: Técnicas Básicas
    // ==============================================

    'zero-shot': {
        titulo: 'Zero-Shot Prompting',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🎯',
        introducao: `Zero-shot is when you ask the model to do something without giving examples. It’s the simplest form of prompting—just direct instructions. It works well for common tasks the model already knows.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-zero-shot.md',

        conteudoCompleto: `## What Is Zero-Shot?

"Zero-shot" means "zero examples." You simply describe the task, and the model tries to perform it based on its training.

### Basic Structure

\`\`\`
[Clear instruction about what to do]
[Optional specifications]
[Input/context if needed]
\`\`\`

### When to Use Zero-Shot

✅ Common, well-defined tasks
✅ When the model already knows how to do the task
✅ To save time (you don’t need to create examples)
✅ When the task is self-explanatory

### Limitations

❌ Very specific or unusual tasks
❌ Highly particular formats
❌ When you need a very specific style
❌ Ambiguous tasks

## Examples of Good Use

### Translation
"Translate this text into English: [text]"
→ Common task; the model knows how to do it

### Summary
"Summarize this article in 3 sentences: [article]"
→ Direct and familiar task

### Extraction
"Extract all emails from this text: [text]"
→ Clear and recognizable pattern`,

        exemplos: [
            {
                titulo: 'Zero-Shot Funcionando Bem',
                contexto: 'Tasks suited to zero-shot',
                semDecomposicao: `Task: Classify sentiment

Prompt:
"Classify the sentiment of this review as positive, negative, or neutral:

'The product arrived quickly, but the quality is lower than expected. The customer service was good.'"

Model response:
"Neutral (positive and negative aspects are balanced)"`,
                comDecomposicao: `✅ It worked because:
- Common task (sentiment analysis)
- Clear options (positive/negative/neutral)
- Well-defined input (specific review)
- No examples needed—the model already knows what sentiment is`,
                resultado: 'Zero-shot is efficient for tasks like this.'
            },
            {
                titulo: 'When Zero-Shot Isn’t Enough',
                contexto: 'Limitations of zero-shot',
                semDecomposicao: `Task: Format quotes in the company's specific style

Prompt:
"Format this quote in our standard style:
John said that he increased sales by 40%"

Response:
"John: 'I increased sales by 40%'"

❌ Problem: The model doesn't know your "standard style"`,
                comDecomposicao: `Solution: Add examples (few-shot)
Or be much more specific:

"Format it like this:
[NAME IN CAPS] | [Company] | [Title]
'[Quote]'
↳ [Highlighted metric]"`,
                resultado: 'For specific formats, zero-shot isn’t enough.'
            }
        ],

        casosDeUso: [
            {
                area: 'Text Processing',
                aplicacao: 'Translation, summarization, extraction',
                detalhes: 'Standard language tasks work well in zero-shot'
            },
            {
                area: 'Simple Classification',
                aplicacao: 'Categorize into known groups',
                detalhes: 'Sentiment, general topics, type of content'
            },
            {
                area: 'Q&A Direto',
                aplicacao: 'Perguntas factuais',
                detalhes: 'When the answer is in the model’s knowledge'
            }
        ],

        dicasPraticas: [
            '✓ Start with zero-shot—it’s faster',
            '✓ If the result isn\'t good, add specifications before trying few-shot',
            '✓ Zero-shot works better with larger/more advanced models',
            '✓ Be even clearer in zero-shot (without examples to guide the model)',
            '✓ Test whether the task is "common" enough for zero-shot'
        ],

        errosComuns: [
            {
                erro: 'Use zero-shot for very specific formats',
                exemplo: 'Expecting the model to know the company\'s internal template',
                solucao: 'Use few-shot with examples of the desired format'
            },
            {
                erro: 'Assuming the task is “obvious”',
                exemplo: '"Do the right thing with this text"',
                solucao: 'Be explicit even in zero-shot'
            }
        ],

        recursosAdicionais: [
            '📖 Compare zero-shot vs. few-shot for the same task',
            '🎓 Study the zero-shot capabilities of different models',
            '🧪 Experiment: when zero-shot is enough vs. when it isn\'t'
        ]
    },

    'few-shot': {
        titulo: 'Few-Shot Prompting',
        nivel: 'Beginner',
        modulo: 2,
        icon: '📚',
        introducao: `Few-shot means providing a few examples of what you want before doing the actual task. It’s one of the most powerful and simple techniques—“show the model” instead of just explaining.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-few-shot.md',

        conteudoCompleto: `## What Is Few-Shot?

Few-shot means "a few examples." You show 2-5 examples of the desired input→output, then provide the real input.

### Structure

\`\`\`
[Task instruction]

Example 1:
Input: [example 1]
Output: [desired answer 1]

Example 2:
Input: [example 2]
Output: [desired answer 2]

Now do this:
Input: [real task]
Output:
\`\`\`

### Why Does Few-Shot Work?

- **Pattern learning:** LLMs are excellent at recognizing patterns
- **Clarity through demonstration:** An example is worth more than an explanation
- **Format control:** You define exactly how you want the answer
- **Reduces ambiguity:** Examples resolve questions

## How Many Examples?

- **1-2 examples:** For simple tasks or straightforward formats
- **3-5 examples:** For more complex tasks (ideal)
- **6+ examples:** Rarely needed (and uses tokens)

## Types of Few-Shot

### 1. Few-Shot for Format
Show the answer structure

### 2. Few-Shot for Style
Show the tone and language

### 3. Few-Shot for Reasoning
Show the thought process`,

        exemplos: [
            {
                titulo: 'Few-Shot for Information Extraction',
                contexto: 'Extract structured data from free-form text',
                semDecomposicao: `❌ No examples:

"Extract the name, title, and company from this bio:
'Maria Silva has worked as Marketing Director at TechCorp since 2020'"

Problem: The model may use an inconsistent format`,
                comDecomposicao: `✅ With few-shot:

"Extract information in JSON format:

Example 1:
Bio: "João Santos has been CEO of StartupX for 3 years"
{
  "nome": "João Santos",
  "cargo": "CEO",
  "empresa": "StartupX"
}

Example 2:
Bio: "Ana Costa, senior developer at Google"
{
  "nome": "Ana Costa",
  "cargo": "Desenvolvedora Senior",
  "empresa": "Google"
}

Now extract:
Bio: "Maria Silva has worked as Marketing Director at TechCorp since 2020"
{`,
                resultado: 'Consistent response in the exact JSON format you specified.'
            },
            {
                titulo: 'Few-shot for Custom Classification',
                contexto: 'Specific categories for your business',
                semDecomposicao: `Task: Classify support tickets into company categories

Categories: Technical, Billing, Question, Complaint

Examples:
"I can't log in" → Technical
"Why was I charged twice?" → Billing
"How does feature X work?" → Question
"The product arrived broken!" → Complaint

Now classify:
"My password isn't working, and I've already tried resetting it 3x"`,
                comDecomposicao: `→ Technical

✅ Few-shot taught the model your specific categories and how to distinguish between them.`,
                resultado: 'Accurate classification using a custom taxonomy.'
            }
        ],

        casosDeUso: [
            {
                area: 'Formatação',
                aplicacao: 'Specific Structures',
                detalhes: 'JSON, XML, templates customizados - mostre o formato exato'
            },
            {
                area: 'Custom Classification',
                aplicacao: 'Specific business categories',
                detalhes: 'Examples teach the nuances of each category'
            },
            {
                area: 'Writing Style',
                aplicacao: 'Tom e voz consistentes',
                detalhes: 'Examples define the writing "style"'
            },
            {
                area: 'Data Transformation',
                aplicacao: 'Converter formato A → B',
                detalhes: 'Mostre alguns pares input→output'
            }
        ],

        dicasPraticas: [
            '✓ Use REAL examples of what you want (not generic ones)',
            '✓ Vary the examples (don\'t make them too similar)',
            '✓ 3 examples is generally the sweet spot',
            '✓ Show edge cases in the examples when relevant',
            '✓ Keep examples concise (don\'t use huge blocks of text)',
            '✓ Formato consistente entre exemplos'
        ],

        errosComuns: [
            {
                erro: 'Exemplos muito similares',
                exemplo: 'All 3 examples have identical structure',
                solucao: 'Vary them to cover different task scenarios'
            },
            {
                erro: 'Too many unnecessary examples',
                exemplo: '10 examples for a simple task',
                solucao: 'Start with 2–3; only add more if needed'
            },
            {
                erro: 'Exemplos inconsistentes',
                exemplo: 'Exemplo 1 usa JSON, exemplo 2 usa texto livre',
                solucao: 'Keep the format identical across all examples'
            }
        ],

        recursosAdicionais: [
            '📖 Study "in-context learning" - the theoretical basis of few-shot',
            '🎓 Practice: take a failed zero-shot prompt and add examples',
            '🧪 A/B teste: 2 exemplos vs 5 exemplos - qual melhor?'
        ]
    },

    'cot': {
        titulo: 'Chain-of-Thought',
        nivel: 'Beginner',
        modulo: 2,
        icon: '💭',
        introducao: `Chain-of-Thought (CoT) prompts the model to “show its reasoning” before giving the final answer. It is especially powerful for problems that require multiple reasoning steps.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-cot.md',

        conteudoCompleto: `## What Is Chain-of-Thought (CoT)?

Instead of asking only for the answer, you ask the model to "think out loud"—explain its reasoning step by step.

### How It Works

**Without CoT:**
Question → Answer

**With CoT:**
Question → Step-by-Step Reasoning → Answer

### Why Use CoT?

✅ **Improves accuracy:** Especially for complex problems
✅ **Detects errors:** You can see where the reasoning failed
✅ **Increases reliability:** More carefully considered answers
✅ **Allows debugging:** You can correct specific steps

## Types of CoT

### 1. Explicit CoT
You give a direct instruction: "Think step by step"

\`\`\`
Solve this problem step by step:
[problem]
\`\`\`

### 2. Few-Shot CoT
You show examples with reasoning

\`\`\`
Example:
Question: [question]
Reasoning: [step 1], [step 2], [step 3]
Answer: [answer]

Now solve:
[new question]
\`\`\`

### 3. Zero-Shot CoT
Simply add "Let’s think step by step"

## When to Use CoT

- Math problems
- Logical reasoning
- Multifactor analysis
- Complex decisions
- Troubleshooting`,

        exemplos: [
            {
                titulo: 'CoT for a Math Problem',
                contexto: 'Solve word problems',
                semDecomposicao: `❌ No CoT:

"A store sold 15 T-shirts for R$50 each and gave a 20% discount. What was the revenue?"

Answer: R$600

❌ Problem: The discount was applied incorrectly (or is the answer right without showing the reasoning?)`,
                comDecomposicao: `✅ With CoT:

"Solve step by step:
A store sold 15 T-shirts at R$50 each and gave a 20% discount. What was the revenue?"

Answer:
Step 1: Calculate the price before the discount
15 T-shirts × R$50 = R$750

Step 2: Calculate the discount
20% of R$750 = R$150

Step 3: Apply the discount
R$750 - R$150 = R$600

Final answer: R$600`,
                resultado: 'You see exactly the reasoning and can validate each step.'
            },
            {
                titulo: 'CoT in Business Analysis',
                contexto: 'Strategic Decision-Making',
                semDecomposicao: `Question: "Should we launch the product now or wait 3 months?"

Without CoT, the answer may be superficial or based on just 1-2 factors.`,
                comDecomposicao: `With CoT:

“Analyze step by step whether we should launch now or in 3 months:

Context: B2B SaaS product, 80% complete, competitor launched something similar last week”

Reasoning:

1. Market Timing Analysis
   - Competitor launched recently = window of opportunity is shrinking
   - But launching an incomplete product could hurt our reputation

2. Readiness Assessment
   - 80% complete = functional, but important features are missing
   - 3 months = time to polish and add differentiators

3. Competitive Impact
   - Launching now = avoid losing market share
   - Waiting 3 months = competitor gains traction

4. Risk vs. Opportunity
   - Risk of launching early: bugs, poor experience
   - Risk of waiting: missing the market opportunity

Recommendation: Launch a beta version NOW for early adopters + a public roadmap of improvements over the next 3 months.”`,
                resultado: 'Evidence-based decision-making with transparent multidimensional reasoning.'
            }
        ],

        casosDeUso: [
            {
                area: 'Math and Logic',
                aplicacao: 'Reasoning problems',
                detalhes: 'CoT dramatically improves accuracy on complex problems'
            },
            {
                area: 'Analysis and Decision-Making',
                aplicacao: 'Strategic Choices',
                detalhes: 'Seeing the reasoning helps validate the recommendation'
            },
            {
                area: 'Debugging',
                aplicacao: 'Encontrar erros',
                detalhes: 'Step-by-step reasoning identifies where the problem is'
            },
            {
                area: 'Educação',
                aplicacao: 'Explicar conceitos',
                detalhes: 'Showing the reasoning teaches, it doesn’t just answer'
            }
        ],

        dicasPraticas: [
            '✓ Simply adding "think step by step" already improves results',
            '✓ For numerical problems, always use CoT',
            '✓ Combine CoT with few-shot for maximum effect',
            '✓ Ask it to number the steps (makes them easier to reference)',
            '✓ Use CoT when a wrong answer could have serious consequences',
            '✓ Review the reasoning, not just the final answer'
        ],

        errosComuns: [
            {
                erro: 'Use CoT for trivial questions',
                exemplo: '"What is the capital of Brazil? Think step by step"',
                solucao: 'CoT is for complex problems. Simple questions don’t need it.'
            },
            {
                erro: 'Do not specify the reasoning format',
                exemplo: 'Ask for CoT without saying how to structure it',
                solucao: 'Specify: "List every step with a number" or "Analyze 3 dimensions: X, Y, Z"'
            },
            {
                erro: 'Ignore the reasoning and only look at the final answer',
                exemplo: 'Jump straight to the conclusion',
                solucao: 'The value of CoT lies IN THE REASONING—validate every step'
            }
        ],

        recursosAdicionais: [
            '📖 Leia paper original Chain-of-Thought Prompting (Google Research)',
            '🎓 Study variations: Tree-of-Thought, Graph-of-Thought',
            '🧪 Test: same question with/without CoT - compare accuracy'
        ]
    },

    'role': {
        titulo: 'Role Prompting (Personas)',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🎭',
        introducao: `Role prompting means assigning a 'persona' or role to the model. By saying 'You are an [expert X],' you activate specific knowledge and styles, shaping the response for the desired context.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-role.md',

        conteudoCompleto: `## What Is Role Prompting?

You define who the model "is" before asking a question. This provides context for the answer.

### Basic Structure

\`\`\`
You are a [role/expert] with [characteristics].
[Your task/question]
\`\`\`

### Why Does It Work?

The model was trained on texts by experts in many fields. By defining a role, you "activate" language patterns, knowledge, and style associated with that role.

## Types of Roles

### 1. Role by Expertise
"You are a cardiologist"
→ Activates medical knowledge and technical terminology

### 2. Role by Style
"You are a teacher explaining something to 10-year-old children"
→ Activates simple language, analogies, and patience

### 3. Role by Perspective
"You are a skeptical critic analyzing this argument"
→ Activates critical thinking and a search for flaws

### 4. Role by Context
"You are a B2B sales consultant"
→ Activates sales knowledge and a focus on ROI

## Elements of a Good Role

1. **Specific:** "Sports nutritionist" > "health expert"
2. **With context:** "...with 15 years of experience"
3. **With a goal:** "...helping professional athletes"
4. **With a style:** "...known for practical explanations"`,

        exemplos: [
            {
                titulo: 'Role for Technical Explanation',
                contexto: 'Explicar conceito complexo',
                semDecomposicao: `❌ No role:

"Explain what a REST API is"

Result: Generic explanation; it may be too technical or too superficial`,
                comDecomposicao: `✅ With a specific role:

OPTION 1 (Technical audience):
"You are a senior software architect explaining things to junior developers.
Explain what a REST API is and when to use one."

→ Result: A technical but accessible explanation, with code examples

OPTION 2 (Non-technical audience):
"You are a technology consultant explaining things to CEOs without a technical background.
Explain what a REST API is and why it matters to the business."

→ Result: Business analogies, focused on value, no jargon`,
                resultado: 'Same question, completely different answers based on the role.'
            },
            {
                titulo: 'Role for Perspective Analysis',
                contexto: 'Get different points of view',
                semDecomposicao: `Task: Analyze the decision to increase the product price

Without a role: Generic analysis

With different roles:`,
                comDecomposicao: `ROLE 1:
"You are the CFO focused on margins and profitability.
Analyze the 20% increase in the product’s price."
→ Focus: financial impact, revenue projections

ROLE 2:
"You are the head of Customer Success, concerned about churn.
Analyze the 20% increase in the product’s price."
→ Focus: retention, customer satisfaction, perceived value

ROLE 3:
"You are the VP of Sales, who needs to hit the target this quarter.
Analyze the 20% increase in the product’s price."
→ Focus: impact on conversions, objections, sales strategies`,
                resultado: 'Multiple perspectives reveal different aspects of the decision.'
            }
        ],

        casosDeUso: [
            {
                area: 'Educação',
                aplicacao: 'Adjust the level of explanation',
                detalhes: '"Teacher" role + student\'s level = appropriate explanation'
            },
            {
                area: 'Content Creation',
                aplicacao: 'Definir voz e tom',
                detalhes: 'Copywriter, journalist, poet, etc. role'
            },
            {
                area: 'Analysis and Consulting',
                aplicacao: 'Perspectiva especializada',
                detalhes: 'Consultant role for X activates specific knowledge'
            },
            {
                area: 'Brainstorming',
                aplicacao: 'Ideas from different angles',
                detalhes: 'Multiple roles generate diverse ideas'
            }
        ],

        dicasPraticas: [
            '✓ Be specific about the role: "sports dietitian" > "person who knows about nutrition"',
            '✓ Add context to the role: "...with 10 years helping startups..."',
            '✓ Combine a role with the target audience: "You are X explaining to Y"',
            '✓ Test different roles for the same question (shows versatility)',
            '✓ Use real roles that exist (the model has more examples)',
            '✓ Don\'t overdo it: use a relevant role, not "you are a Jedi ninja master"'
        ],

        errosComuns: [
            {
                erro: 'Role muito vago',
                exemplo: '"You are an expert"',
                solucao: 'Specify: "You are a B2B SaaS content marketing expert"'
            },
            {
                erro: 'Role irrelevant to the task',
                exemplo: '"You are a chef. Explain blockchain."',
                solucao: 'The role should have expertise relevant to the question'
            },
            {
                erro: 'Role conflicts with the task',
                exemplo: '"You are impartial. Convince me that X is better than Y."',
                solucao: 'Align the role with the task’s goal'
            }
        ],

        recursosAdicionais: [
            '📖 Study "persona-based prompting" in marketing',
            '🎓 Create a library of useful roles for your common tasks',
            '🧪 Experiment with combining multiple roles: "You are X AND Y"'
        ]
    },

    'contextualizacao': {
        titulo: 'Effective Contextualization',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🎯',
        introducao: `Contextualization means providing background information that guides the model’s response in the right direction. Context turns generic prompts into specific, useful ones.`,
        conteudoArquivo: 'conteudo/modulo2-contextualizacao.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Comunicação',
                aplicacao: 'Emails e mensagens',
                detalhes: 'Audience, situation, and goal context improves tone and relevance'
            },
            {
                area: 'Ensino',
                aplicacao: 'Instructional explanations',
                detalhes: 'Knowledge-level context adapts the depth'
            },
            {
                area: 'Technical',
                aplicacao: 'Debugging and code',
                detalhes: 'Stack, specific error, and attempted fixes provide context that speeds up troubleshooting'
            }
        ],
        dicasPraticas: [
            '✓ Use the template: Audience + Situation + Objective + Constraints',
            '✓ Audience context changes the language and depth',
            '✓ Goal context changes the focus (theoretical vs. practical)',
            '✓ Remove irrelevant information (don\'t overdo it)',
            '✓ Context is critical for ambiguous tasks or decisions'
        ],
        errosComuns: [
            {
                erro: 'Contexto insuficiente',
                exemplo: '"I need help with Python"',
                solucao: 'Add: level, goal, specific problem'
            },
            {
                erro: 'Contexto excessivo e irrelevante',
                exemplo: 'Include personal details unrelated to the task',
                solucao: 'Focus on the context that affects the answer'
            }
        ],
        recursosAdicionais: [
            '📖 Pratique adicionar contexto a prompts vagos',
            '🎓 Create a personal context template for your tasks',
            '🧪 Compare results with/without context'
        ]
    },

    'empoderamento': {
        titulo: 'Empowerment Prompt (EXPERT)',
        nivel: 'Beginner',
        modulo: 2,
        icon: '⚡',
        introducao: `EXPERT framework that empowers AI to think autonomously and deeply about complex problems. Turns superficial answers into rich, multidimensional, and truly useful analyses.`,
        conteudoArquivo: 'conteudo/modulo2-empoderamento.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Consultoria',
                aplicacao: 'Strategic analyses',
                detalhes: 'In-depth solutions instead of superficial answers'
            },
            {
                area: 'Educação',
                aplicacao: 'Ensino complexo',
                detalhes: 'Multidimensional explanations tailored to the learner'
            }
        ],
        dicasPraticas: [
            '✓ Use EXPERT for problems that require deep reasoning',
            '✓ Combine with role prompting to amplify expertise',
            '✓ The framework activates the AI\'s autonomy',
            '✓ Ideal for consulting, analysis, and planning'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'meta-prompting': {
        titulo: 'Interactive Prompt Engineer',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🔧',
        introducao: `Meta-prompting that turns AI into an engineer specialized in creating and refining prompts. Automates the creation of optimized prompts through an iterative process of questions and refinement.`,
        conteudoArquivo: 'conteudo/modulo2-engenheiro-interativo.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Automação',
                aplicacao: 'Prompt creation',
                detalhes: 'IA faz perguntas e cria prompt perfeito'
            },
            {
                area: 'Aprendizado',
                aplicacao: 'Ensinar prompting',
                detalhes: 'Meta-prompt that teaches best practices'
            }
        ],
        dicasPraticas: [
            '✓ Let the AI ask questions before generating',
            '✓ An iterative process is more efficient',
            '✓ Use for complex or recurring tasks',
            '✓ Save generated prompts for reuse'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'prompts-iterativos': {
        titulo: 'Prompts Conversacionais (Iterativo)',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🔄',
        introducao: `A technique for refining responses through multiple interactions instead of aiming for perfection in the first prompt. More natural and efficient than trying to create the perfect prompt right away.`,
        conteudoArquivo: 'conteudo/modulo2-prompts-interativos.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Escrita',
                aplicacao: 'Text refinement',
                detalhes: 'Start simple + follow-ups ("more technical", "add examples")'
            },
            {
                area: 'Brainstorming',
                aplicacao: 'Progressive ideation',
                detalhes: 'Explore ideas and expand on the best ones'
            }
        ],
        dicasPraticas: [
            '✓ Comece simples, refine depois',
            '✓ Use comandos curtos: "expandir", "simplificar", "exemplos"',
            '✓ Faster than creating an initial mega-prompt',
            '✓ Natural e conversacional'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'skeleton-of-thought': {
        titulo: 'Skeleton of Thought',
        nivel: 'Beginner',
        modulo: 2,
        icon: '🦴',
        introducao: `A technique that asks for an outline of the response before the full content. Speeds up long responses and lets you validate the structure before generating everything.`,
        conteudoArquivo: 'conteudo/modulo2-skeleton-of-thought.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Long-Form Content',
                aplicacao: 'Artigos e reports',
                detalhes: 'Validate the structure before generating the full content'
            },
            {
                area: 'Otimização',
                aplicacao: 'Latency reduction',
                detalhes: 'Faster responses in 2 steps'
            }
        ],
        dicasPraticas: [
            '✓ Use for long, structured answers',
            '✓ Validate the outline before expanding it',
            '✓ You can parallelize the expansion of the points',
            '✓ Reduce noticeable latency'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    '24-dimensoes-persona': {
        titulo: '24 Persona Dimensions',
        nivel: 'Beginner',
        modulo: 2,
        icon: '👤',
        introducao: `24-attribute framework for creating deep, multifaceted personas for AI to adopt. Creates much richer and more authentic simulations than simple role prompting.`,
        conteudoArquivo: 'conteudo/modulo2-24-dimensoes-persona.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Criatividade',
                aplicacao: 'Personagens complexos',
                detalhes: 'Narratives, scripts, and games with deep personas'
            },
            {
                area: 'Simulação',
                aplicacao: 'Especialistas realistas',
                detalhes: 'Consultants with unique backgrounds, values, and styles'
            }
        ],
        dicasPraticas: [
            '✓ You don\'t need to use all 24 dimensions',
            '✓ Choose dimensions that are relevant to the context',
            '✓ The more details, the more authentic the persona',
            '✓ Combine with role prompting'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'humanizacao': {
        titulo: 'Text Humanization',
        nivel: 'Beginner',
        modulo: 2,
        icon: '✍️',
        introducao: `Techniques for making AI-generated text seem human-written, with naturalness and strategic imperfections. Increases authenticity and engagement, and reduces detection by anti-AI tools.`,
        conteudoArquivo: 'conteudo/modulo2-humanizacao.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Conteúdo',
                aplicacao: 'Blogs e redes sociais',
                detalhes: 'Authentic texts that engage'
            },
            {
                area: 'Comunicação',
                aplicacao: 'Emails e mensagens',
                detalhes: 'Tom natural e conversacional'
            }
        ],
        dicasPraticas: [
            '✓ Use contractions and conversational language',
            '✓ Vary sentence structure (short + long)',
            '✓ Add opinions and emotions',
            '✓ Subtle imperfections increase authenticity',
            '✓ Don\'t overdo it—stay professional'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'refinamento': {
        titulo: 'Refinamento Iterativo',
        nivel: 'Technical',
        modulo: 3,
        icon: '🔄',
        introducao: `Iterative refinement is the ability to improve prompts through cycles of testing, evaluation, and adjustment. We rarely get it right the first time—and that’s okay! The iterative process is key.`,
        conteudoArquivo: 'conteudo/modulo3-refinamento.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Conteúdo',
                aplicacao: 'Escrita e copy',
                detalhes: 'Gradually refine tone, length, and specific elements'
            },
            {
                area: 'Código',
                aplicacao: 'Code generation',
                detalhes: 'Iterate on requirements, edge cases, and optimizations'
            },
            {
                area: 'Análise',
                aplicacao: 'Reports e dashboards',
                detalhes: 'Adjust the depth, format, and specific insights'
            }
        ],
        dicasPraticas: [
            '✓ 2-3 refinements are enough for 90%+ of tasks',
            '✓ Specific feedback > vague feedback ("too formal" vs. "I didn\'t like it")',
            '✓ Keep what works; change only the problem',
            '✓ Know when to stop: "good enough" > perfection',
            '✓ Document successful prompts for reuse'
        ],
        errosComuns: [
            {
                erro: 'Giving up after V1 doesn\'t work',
                exemplo: 'Thinking "I’m not good at writing prompts"',
                solucao: 'Refinement is normal and expected, not a failure'
            },
            {
                erro: 'Rewrite from scratch instead of refining',
                exemplo: 'Jogar fora V1 e criar prompt totalmente diferente',
                solucao: 'Ajuste incrementalmente: V1 → V2 → V3'
            },
            {
                erro: 'Refinar infinitamente (perfecionismo)',
                exemplo: 'V5, V6, V7 looking for a 1% improvement',
                solucao: 'Law of diminishing returns: stop at 90-95%'
            }
        ],
        recursosAdicionais: [
            '📖 Create a library of "before and after" refined prompts',
            '🎓 Identify your personal refinement patterns',
            '🧪 Pratique ciclo: V1 → Avaliar → V2 → Avaliar → V3'
        ]
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 3
    // ==============================================

    'decomposicao': {
        titulo: 'Task Decomposition',
        nivel: 'Technical',
        modulo: 3,
        icon: '📋',
        introducao: `Task decomposition is a fundamental prompt engineering technique that involves breaking complex problems into smaller, more specific, and manageable subtasks. This approach allows language models to process each part with maximum focus and precision.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-decomposicao.md',

        exemplos: [
            {
                titulo: 'Example 1: Creating a Marketing Strategy',
                contexto: 'You need to create a complete digital marketing strategy',
                semDecomposicao: `Bad prompt (without decomposition):
"Create a complete digital marketing strategy for my B2B SaaS startup that sells project management software."

Problem: It’s too broad, so the result will be superficial in every area.`,
                comDecomposicao: `Good prompt (with decomposition):

**PROMPT 1 - Audience Analysis:**
Analyze the target audience for a B2B project management SaaS startup:
1. Identify 3 main personas (job title, pain points, goals)
2. For each persona, list 5 digital channels where they’re active
3. Identify purchasing behavior patterns

**PROMPT 2 - Positioning:**
Based on the identified personas: [paste result from Prompt 1]
Define:
1. A unique value proposition for each persona
2. The main marketing message
3. Differentiators vs. competitors

**PROMPT 3 - Channel Tactics:**
Using the positioning: [paste result from Prompt 2]
Create specific tactics for:
1. LinkedIn (content + ads)
2. Google Ads (keywords + copy)
3. Email marketing (nurturing sequence)

**PROMPT 4 - Metrics:**
For the defined tactics: [paste result from Prompt 3]
Establish:
1. KPIs for each channel
2. Realistic monthly targets
3. Budget allocation by channel`,
                resultado: 'Each step generates deep, specific output. The final result is a complete, actionable strategy.'
            },
            {
                titulo: 'Example 2: Data Analysis',
                contexto: 'Analyze customer satisfaction survey results from 500 responses',
                semDecomposicao: `"Analyze this customer satisfaction survey and give me insights"
Result: Generic, superficial analysis`,
                comDecomposicao: `**STEP 1 - Cleaning:**
Identify and list:
- Inconsistent responses
- Suspicious patterns
- Significant missing data

**STEP 2 - Segmentation:**
Group respondents by:
- Demographic profile
- Satisfaction level (promoters/passives/detractors)
- Product usage frequency

**STEP 3 - Qualitative Analysis:**
For open-ended comments:
- Extract recurring themes
- Categorize feedback (product/service/price)
- Identify the most representative quotes

**STEP 4 - Correlations:**
Cross-reference data to identify:
- Which factors have the greatest impact on satisfaction
- Profiles with the highest/lowest satisfaction
- Non-obvious patterns

**STEP 5 - Recommendations:**
Based on everything above:
- 3 short-term actions
- 2 medium-term initiatives
- 1 long-term strategic change`,
                resultado: 'In-depth, structured, actionable analysis.'
            }
        ],

        casosDeUso: [
            {
                area: 'Software Development',
                aplicacao: 'Planning complex features',
                detalhes: 'Break it down into: architecture → backend → frontend → tests → documentation'
            },
            {
                area: 'Content Creation',
                aplicacao: 'Write a long technical article',
                detalhes: 'Break it down into: outline → research → draft each section → review → SEO'
            },
            {
                area: 'Business Analysis',
                aplicacao: 'Feasibility analysis for a new product',
                detalhes: 'Break it down into: market → technical → financial → risks → recommendation'
            }
        ],

        dicasPraticas: [
            '✓ Start by identifying the "main components" of the problem',
            '✓ Each subtask should have a clear, measurable objective',
            '✓ Mantenha contexto entre etapas (cole resultados anteriores)',
            '✓ Don\'t overdo it: 3–5 steps is generally ideal',
            '✓ Document each step\'s output for future reference',
            '✓ Allow iteration: you can go back and refine a specific step'
        ],

        errosComuns: [
            {
                erro: 'Decompor demais',
                exemplo: 'Create 15 tiny subtasks',
                solucao: 'Find the right balance: each step should add significant value'
            },
            {
                erro: 'Lose track of the thread',
                exemplo: 'Disconnected steps that don\'t fit together',
                solucao: 'Always have a clear view of the whole and how the parts connect'
            },
            {
                erro: 'Do not transfer context',
                exemplo: 'Every prompt starts from scratch',
                solucao: 'Copy relevant results from previous steps'
            }
        ],

        recursosAdicionais: [
            '📖 Read about "Divide and Conquer" in algorithms',
            '🎓 Study agile methodologies (breaking work into sprints/stories)',
            '🔗 Explore "prompt chaining" to automate decomposition'
        ]
    },

    'chaining': {
        titulo: 'Prompt Chaining',
        nivel: 'Technical',
        modulo: 3,
        icon: '🔗',
        introducao: `Prompt Chaining is the technique of connecting multiple prompts in sequence, where the output of one feeds into the next. It’s like creating a processing pipeline where each stage refines and expands on the previous work.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-chaining.md',

        exemplos: [
            {
                titulo: 'Content Creation Chain',
                contexto: 'Create an SEO-optimized blog post',
                chainCompleto: `**PROMPT 1 - Keyword Research:**
Input: Topic "marketing automation"
Output: List of 10 keywords + search volume + difficulty

**PROMPT 2 - Outline:**
Input: Keywords from Prompt 1 + Topic
Output: Outline with H1, H2s, H3s strategically including keywords

**PROMPT 3 - Draft:**
Input: Outline from Prompt 2
Output: Complete text following the outline

**PROMPT 4 - SEO Optimization:**
Input: Text from Prompt 3
Output: Optimized text (keyword density, meta description, alt texts)

**PROMPT 5 - Final Edit:**
Input: Optimized text from Prompt 4
Output: Polished, corrected version with CTAs`,
                beneficio: 'Each step focuses on one aspect. The final result is much better than a single prompt like “write a post about marketing automation.”'
            }
        ],

        casosDeUso: [
            {
                area: 'Data Analysis',
                aplicacao: 'Analysis pipeline',
                detalhes: 'Raw data → Cleaning → Analysis → Visualization code → Insights report'
            },
            {
                area: 'Customer Support',
                aplicacao: 'Resposta automatizada',
                detalhes: 'Classify issue → Find solution in KB → Draft response → Add personalization → Send'
            }
        ],

        dicasPraticas: [
            '✓ Clearly document what each step in the chain should produce',
            '✓ Validate intermediate outputs before continuing',
            '✓ Use structured formats (JSON, XML) between steps for parsing',
            '✓ Implement error handling: what should you do if a step fails?',
            '✓ Consider using a different temperature for each step'
        ],

        errosComuns: [
            {
                erro: 'Chain muito longo',
                exemplo: '10+ steps with lots of information',
                solucao: 'Keep chains to 3-5 steps. If you need more, create sub-chains'
            }
        ],

        recursosAdicionais: [
            '🔗 LangChain: Framework for complex chains',
            '📖 Explore "Sequential Chains" vs "Map-Reduce Chains"',
            '🎓 Study "Prompt Pipelines" in production'
        ]
    },

    'negative': {
        titulo: 'Negative Instructions',
        nivel: 'Technical',
        modulo: 3,
        icon: '🚫',
        introducao: `Negative instructions are explicit guidelines that specify what the model must NOT do. This technique is crucial for avoiding undesired behavior and steering responses with greater precision.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-negative.md',

        exemplos: [
            {
                titulo: 'Example 1: Accessible Technical Explanation',
                contexto: 'Explain a technical concept to a non-expert audience',
                semDecomposicao: `Without negatives:
"Explain what blockchain is."

Result: Text full of technical jargon (hash, node, consensus, etc.)`,
                comDecomposicao: `With negative instructions:
“Explain what blockchain is to someone without a technical background.

DO NOT use:
- Technical jargon (hash, node, consensus, etc.)
- English terms without translations
- Overly complex analogies

DO:
- Use everyday analogies
- Explain with concrete examples
- Keep the language simple”

Result: A clear, accessible explanation using analogies like “shared notebook” instead of technical terms.`,
                resultado: 'Text that\'s much more accessible and understandable to the target audience.'
            },
            {
                titulo: 'Example 2: Factual Report',
                contexto: 'Analyze data without speculation',
                semDecomposicao: `"Analyze these sales data and give insights"

Problem: The model may speculate about causes without evidence`,
                comDecomposicao: `"Analyze these sales data [data here].

IMPORTANT - DO NOT:
❌ Speculate about causes without evidence in the data
❌ Make predictions without a statistical basis
❌ Invent data or percentages not present
❌ Give unsupported recommendations

ONLY DO:
✅ Describe observable patterns in the data
✅ Cite exact numbers and percentages
✅ Point out clear correlations
✅ Indicate when the data is insufficient for a conclusion"

Result: Purely factual analysis, without speculation.`,
                resultado: 'An accurate, reliable report based only on evidence.'
            }
        ],

        casosDeUso: [
            {
                area: 'Educational Content',
                aplicacao: 'Educational material',
                detalhes: 'Do NOT use controversial examples, do NOT assume prior knowledge'
            },
            {
                area: 'Customer Support',
                aplicacao: 'Support responses',
                detalhes: 'Do NOT make promises, do NOT speculate about timelines, do NOT use technical language'
            },
            {
                area: 'Data Analysis',
                aplicacao: 'Reports executivos',
                detalhes: 'Do NOT invent data, do NOT speculate about causes, do NOT use complex statistical jargon'
            }
        ],

        dicasPraticas: [
            '✓ Be specific in your negatives: instead of "don\'t be technical," say "don\'t use terms like API, endpoint, payload"',
            '✓ Combine positive and negative instructions: say what to do AND what not to do',
            '✓ Use negatives to break common model patterns',
            '✓ Prioritize the 2–3 most important constraints',
            '✓ Test: sometimes "do X" works better than "don\'t do Y"'
        ],

        errosComuns: [
            {
                erro: 'Negativas vagas',
                exemplo: '"Don’t be boring" or "Don’t overdo it"',
                solucao: 'Be specific: "DO NOT use paragraphs longer than 4 lines" or "DO NOT repeat the same information"'
            },
            {
                erro: 'Muitas negativas',
                exemplo: 'List of 15 things not to do',
                solucao: 'Focus on the 3-5 most critical constraints'
            },
            {
                erro: 'Contradictory negatives',
                exemplo: '"Be detailed" + "DON’T be verbose"',
                solucao: 'Align positive and negative instructions'
            }
        ],

        recursosAdicionais: [
            '📖 Estude "constraint-based prompting"',
            '🎓 Learn about "guardrails" in LLMs',
            '🔗 Combine with output prefilling for maximum control'
        ]
    },

    'parameters': {
        titulo: 'Parameter Tuning',
        nivel: 'Technical',
        modulo: 3,
        icon: '🎚️',
        introducao: `Parameter tuning lets you control the model’s behavior beyond the prompt text. Temperature, top-p, max tokens, and other parameters offer fine-tuning between creativity and precision.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-parameters.md',

        exemplos: [
            {
                titulo: 'Example 1: Data Analysis vs. Brainstorming',
                contexto: 'Different tasks require different parameters',
                semDecomposicao: `Use the same parameters for everything:
Temperature: 0.7 (default)

Problem: Data analysis becomes inconsistent, brainstorming becomes generic`,
                comDecomposicao: `**Task 1: Sales Data Analysis**
Parameters:
- Temperature: 0.1
- Top-P: 0.1
- Max Tokens: 500

Result: Accurate, consistent, factual analysis.

---

**Task 2: Product Name Brainstorming**
Parameters:
- Temperature: 0.9
- Top-P: 0.95
- Max Tokens: 200
- Presence Penalty: 0.6

Result: Creative, varied, unexpected ideas.`,
                resultado: 'Each task optimized with the right parameters.'
            }
        ],

        casosDeUso: [
            {
                area: 'Code and Programming',
                aplicacao: 'Code generation',
                detalhes: 'Temperature: 0.1-0.2 for correct, deterministic code'
            },
            {
                area: 'Escrita Criativa',
                aplicacao: 'Stories and narratives',
                detalhes: 'Temperature: 0.8-1.0 for creativity and originality'
            },
            {
                area: 'Sumarização',
                aplicacao: 'Document summaries',
                detalhes: 'Temperature: 0.3, Max Tokens adjusted to the desired length'
            }
        ],

        dicasPraticas: [
            '✓ Start with default values and adjust iteratively',
            '✓ For production, use a low temperature (<0.3) for consistency',
            '✓ Document the parameters that work for each type of task',
            '✓ A/B test: same prompt, different parameters',
            '✓ Remember: parameters don\'t replace a well-written prompt',
            '✓ Max tokens should include a buffer: if you need 100 tokens, set it to 150'
        ],

        errosComuns: [
            {
                erro: 'Temperature too high for factual tasks',
                exemplo: 'Temperature 0.9 for data analysis',
                solucao: 'Use 0.1-0.3 for tasks that require precision'
            },
            {
                erro: 'Adjusting multiple parameters simultaneously',
                exemplo: 'Change temperature, top-p, and penalties at the same time',
                solucao: 'Adjust one parameter at a time to understand its effect'
            },
            {
                erro: 'Max tokens muito baixo',
                exemplo: 'Set 50 tokens and cut off the answer halfway through',
                solucao: 'Always add a margin to the estimated max tokens'
            }
        ],

        recursosAdicionais: [
            '📖 Read the API documentation for the model you use',
            '🧪 Create a "parameter playground" to experiment',
            '📊 Keep a log of parameters vs. results for reference'
        ]
    },

    'prefilling': {
        titulo: 'Output Prefilling',
        nivel: 'Technical',
        modulo: 3,
        icon: '✍️',
        introducao: `Output Prefilling is the technique of starting the model’s response with predefined text. This gives you direct control over the response’s format, tone, and structure, guiding the model from the very first word.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-prefilling.md',

        exemplos: [
            {
                titulo: 'Example 1: Enforcing JSON Format',
                contexto: 'Ensure the response is always valid JSON',
                semDecomposicao: `User: Extract the name, age, and city from this text: "João is 30 years old and lives in São Paulo"

Problem: The model may respond in free-form text, making parsing difficult`,
                comDecomposicao: `User: Extract the name, age, and city from this text: "João is 30 years old and lives in São Paulo". Return it in JSON.
Assistant: {
  "nome": "João",
  "idade": 30,
  "cidade": "São Paulo"
}`,
                resultado: 'Guaranteed valid JSON'
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
            '✓ Use to enforce formats (JSON, XML)',
            '✓ Controls tone from the start',
            '✓ Combine with clear instructions'
        ],

        errosComuns: [
            {
                erro: 'Prefill muito longo',
                exemplo: 'Fill in entire paragraphs',
                solucao: 'Use only the necessary opening'
            }
        ],

        recursosAdicionais: [
            '📖 Claude documentation on prefilling',
            '🔗 Combine with structured outputs'
        ]
    },

    'formatting': {
        titulo: 'Formatting and Structuring',
        nivel: 'Technical',
        modulo: 3,
        icon: '📝',
        introducao: `Structuring prompts with delimiters and a clear hierarchy improves the model's understanding and separates instructions from data.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-formatting.md',

        exemplos: [
            {
                titulo: 'Clear Structuring',
                contexto: 'Separate parts of the prompt',
                semDecomposicao: `Prompt confuso sem estrutura`,
                comDecomposicao: `<task>Analise sentimento</task>
<data>Review aqui</data>`,
                resultado: 'Clear structure makes understanding easier'
            }
        ],

        casosDeUso: [
            {
                area: 'Prompts Complexos',
                aplicacao: 'Multiple sections',
                detalhes: 'Separate context, instructions, and data'
            }
        ],

        dicasPraticas: [
            '✓ Claude prefere XML',
            '✓ Be consistent in style',
            '✓ Use descriptive names for tags'
        ],

        errosComuns: [
            {
                erro: 'Misturar estilos',
                exemplo: 'XML + Markdown juntos',
                solucao: 'Choose one and stick with it'
            }
        ],

        recursosAdicionais: [
            '📖 Guia XML prompting Claude',
            '🎓 Estude structured prompting'
        ]
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 4: Técnicas Avançadas
    // ==============================================

    'structured': {
        titulo: 'Structured Outputs (JSON/XML)',
        nivel: 'Technical',
        modulo: 4,
        icon: '🏗️',
        introducao: `Structured Outputs let you force LLMs to return structured, validated responses in formats like JSON or XML, essential for integration with systems.`,
        conteudoArquivo: 'conteudo/modulo4-structured.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'longcontext': {
        titulo: 'Long Context Management',
        nivel: 'Technical',
        modulo: 4,
        icon: '📚',
        introducao: `Techniques for working with long contexts (200k+ tokens), including chunking strategies, summarization, and relevant context.`,
        conteudoArquivo: 'conteudo/modulo4-longcontext.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'multimodal': {
        titulo: 'Multimodal Prompting',
        nivel: 'Technical',
        modulo: 4,
        icon: '🖼️',
        introducao: `Work with multiple modalities (text + image + audio) to create richer, more complete experiences.`,
        conteudoArquivo: 'conteudo/modulo4-multimodal.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'optimization': {
        titulo: 'Model-Specific Optimization',
        nivel: 'Technical',
        modulo: 4,
        icon: '⚡',
        introducao: `Specific optimizations for different models (Claude, GPT-4, Gemini) that take advantage of each one’s strengths.`,
        conteudoArquivo: 'conteudo/modulo4-optimization.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'testing': {
        titulo: 'Prompt Testing & A/B',
        nivel: 'Technical',
        modulo: 4,
        icon: '🧪',
        introducao: `Methodologies for systematically testing prompts, including A/B testing, evaluation metrics, and continuous improvement.`,
        conteudoArquivo: 'conteudo/modulo4-testing.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 5: Engenharia de Contexto e RAG
    // ==============================================

    'context-arch': {
        titulo: 'Context Architecture',
        nivel: 'Technical',
        modulo: 5,
        icon: '🏛️',
        introducao: `Designing efficient context architectures that maximize relevant information within token limits.`,
        conteudoArquivo: 'conteudo/modulo5-context-arch.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'rag': {
        titulo: 'RAG (Retrieval-Augmented Generation)',
        nivel: 'Technical',
        modulo: 5,
        icon: '🔍',
        introducao: `RAG combines semantic search with LLM generation to produce answers based on specific, up-to-date knowledge.`,
        conteudoArquivo: 'conteudo/modulo5-rag.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'vectordb': {
        titulo: 'Vector Databases',
        nivel: 'Technical',
        modulo: 5,
        icon: '🗄️',
        introducao: `Vector databases (Pinecone, Weaviate, Chroma) for efficiently storing and retrieving embeddings.`,
        conteudoArquivo: 'conteudo/modulo5-vectordb.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'embeddings': {
        titulo: 'Embeddings e Similarity',
        nivel: 'Technical',
        modulo: 5,
        icon: '📊',
        introducao: `Embeddings represent text as numeric vectors, enabling semantic search and similarity measurement.`,
        conteudoArquivo: 'conteudo/modulo5-embeddings.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 6: Agentes Fundamentos
    // ==============================================

    'react': {
        titulo: 'Agentic Loops (ReAct, ReWOO)',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔄',
        introducao: `Patterns for agentic loops that let LLMs reason, act, and observe iteratively to solve complex problems.`,
        conteudoArquivo: 'conteudo/modulo6-react.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'tools': {
        titulo: 'Tool Design e Function Calling',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🛠️',
        introducao: `Designing tools/functions that LLMs can call to interact with APIs, databases, and external systems.`,
        conteudoArquivo: 'conteudo/modulo6-tools.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'mcp': {
        titulo: 'Model Context Protocol (MCP)',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔌',
        introducao: `MCP is Anthropic’s open protocol for connecting LLMs to data sources and tools in a standardized way.`,
        conteudoArquivo: 'conteudo/modulo6-mcp.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'memory': {
        titulo: 'Memory Systems',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🧠',
        introducao: `Memory systems allow agents to maintain context between sessions and learn from past interactions.`,
        conteudoArquivo: 'conteudo/modulo6-memory.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'planning': {
        titulo: 'Planning & Reasoning',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🎯',
        introducao: `Techniques for agents to plan multi-step actions and reason through complex problems.`,
        conteudoArquivo: 'conteudo/modulo6-planning.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'error': {
        titulo: 'Error Handling & Recovery',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔧',
        introducao: `Strategies for agents to detect and handle errors and recover gracefully from failures.`,
        conteudoArquivo: 'conteudo/modulo6-error.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 7: Agentes Avançados
    // ==============================================

    'skills': {
        titulo: 'Claude Skills',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '⚙️',
        introducao: `Skills are specialized capabilities that can be combined to create complex, modular agents.`,
        conteudoArquivo: 'conteudo/modulo7-skills.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'extended': {
        titulo: 'Extended Thinking',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '🤔',
        introducao: `Extended Thinking allows Claude to reason more deeply about complex problems before responding.`,
        conteudoArquivo: 'conteudo/modulo7-extended.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'multiagent': {
        titulo: 'Sistemas Multi-Agente',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '👥',
        introducao: `Architectures where multiple specialized agents work collaboratively to solve complex problems.`,
        conteudoArquivo: 'conteudo/modulo7-multiagent.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'voice': {
        titulo: 'Voice AI & Multimodal Agents',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '🎙️',
        introducao: `Voice integration (STT/TTS) with multimodal agents that process text, images, and audio simultaneously.`,
        conteudoArquivo: 'conteudo/modulo7-voice.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 8: Masterclasses Especializadas
    // ==============================================

    'production': {
        titulo: 'Production Systems',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '🚀',
        introducao: `Robust architectures for taking LLM applications to production with high availability, scalability, and reliability.`,
        conteudoArquivo: 'conteudo/modulo8-production.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'security': {
        titulo: 'Security and Prompt Injection',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '🔒',
        introducao: `Security practices for protecting LLM systems against prompt injection, data poisoning, and other attacks.`,
        conteudoArquivo: 'conteudo/modulo8-security.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'observability': {
        titulo: 'Observabilidade e Monitoring',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '📊',
        introducao: `Logs, metrics, and tracing to understand behavior, optimize costs, and ensure the quality of LLM systems.`,
        conteudoArquivo: 'conteudo/modulo8-observability.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'ethics': {
        titulo: 'Ethical AI and Alignment',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '⚖️',
        introducao: `Principles and practices for building responsible, fair, transparent AI systems aligned with human values.`,
        conteudoArquivo: 'conteudo/modulo8-ethics.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    }
};
