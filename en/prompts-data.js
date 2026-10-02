// Dados dos 100 Prompts Essenciais
const promptsData = [
    // CATEGORIA 1: Métodos Fundamentais (1-15)
    {
        id: 1,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Decomposition Method',
        subtitle: 'Deconstruction Method',
        description: 'Break a complex task into smaller, manageable subtasks, processing each one separately.',
        template: `Main task: [Final objective]

Break this task into the following steps:
1. [Subtask 1]
2. [Subtask 2]
3. [Subtask 3]

Complete each step separately, then combine the results.`,
        example: `Main task: Create a complete digital marketing strategy

Break this task into the following steps:
1. Target audience analysis (demographics, interests, pain points)
2. Define the most effective communication channels
3. Create a monthly content calendar
4. Define success metrics and KPIs

Complete each step separately, providing a detailed analysis for each.`,
        why: 'Avoids overloading the model, allows it to focus on each aspect, and makes review and adjustments easier.',
        tags: ['decomposição', 'organização', 'complexidade', 'etapas']
    },
    {
        id: 2,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Stacking Method',
        subtitle: 'Stacking Method',
        description: 'Build the prompt in layers, progressively adding context, constraints, and specifications.',
        template: `LAYER 1 - Role:
You are [role/specialty definition]

LAYER 2 - Context:
[Relevant background information]

LAYER 3 - Task:
[What you want done]

LAYER 4 - Constraints:
- [Constraint 1]
- [Constraint 2]

LAYER 5 - Format:
[How you want the output]`,
        example: `LAYER 1 - Role:
You are a copywriter specializing in fashion e-commerce

LAYER 2 - Context:
We are launching a new summer collection for women ages 25-40, with a casual-chic style

LAYER 3 - Task:
Write a product description for a floral midi dress

LAYER 4 - Constraints:
- Maximum 150 words
- Tone: sophisticated but accessible
- Include benefits (not just features)
- Avoid fashion clichés

LAYER 5 - Format:
One flowing paragraph, with a subtle call to action at the end`,
        why: 'Each layer adds precision without confusing the model, enables granular adjustments, and provides a clear structure that is easy to replicate.',
        tags: ['camadas', 'estrutura', 'contexto', 'precisão']
    },
    {
        id: 3,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Tell and Show Method',
        subtitle: 'Demonstração',
        description: 'Combine explicit instructions with concrete examples of the desired result.',
        template: `INSTRUCTION (Tell):
[Explain what you want]

EXAMPLE (Show):
[Provide 1-3 examples of the ideal result]

NOW CREATE:
[Your specific case]`,
        example: `INSTRUCTION (Tell):
Create blog post titles that are specific, promise clear value, and use numbers when possible.

EXAMPLE (Show):
✓ "7 Proven Strategies to Increase E-commerce Conversions in 30 Days"
✓ "How to Reduce Customer Acquisition Costs by 40%: A Practical Guide with Real-World Cases"
✓ "The Complete Local SEO Framework: 12 Steps to Dominate Your Region"

NOW CREATE:
5 titles for articles about productivity for digital entrepreneurs`,
        why: 'Examples eliminate ambiguity, help the model learn the exact pattern, and reduce the number of iterations needed.',
        tags: ['exemplos', 'demonstração', 'clareza', 'padrão']
    },
    {
        id: 4,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Talent Show Method',
        subtitle: 'Bom vs Ruim',
        description: 'Show examples of what is GOOD and what is BAD, creating a clear contrast.',
        template: `Task: [Objective]

GOOD EXAMPLE (follow this pattern):
[Quality example]

BAD EXAMPLE (avoid this pattern):
[Example of what not to do]

Now create: [Your specific request]`,
        example: `Task: Write an Instagram caption for an artisanal coffee shop

GOOD EXAMPLE (follow this pattern):
"The aroma of fresh coffee in the morning can turn an ordinary day into something special. Every cup we make carries the dedication of someone who chose the beans, roasted them precisely, and brewed them with care. Come experience the difference. ☕"

BAD EXAMPLE (avoid this pattern):
"☕🔥 BEST COFFEE IN TOWN! 💯 Come now! #coffee #coffee #coffeeshop #goodmorning #breakfastcoffee #instacoffee #coffeelovers #coffeetime"

Now create: A caption for a post promoting a new cold brew method`,
        why: 'Visual contrast between good and bad is more effective than instructions alone; the model understands nuances of quality.',
        tags: ['contraste', 'qualidade', 'exemplos', 'padrão']
    },
    {
        id: 5,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Importing Method',
        subtitle: 'Import Method',
        description: 'Reference and import context from previous conversations or documents.',
        template: `IMPORTED CONTEXT:
[Paste relevant information from previous sources]

BASED ON THE CONTEXT ABOVE:
[New task that depends on this context]`,
        example: `IMPORTED CONTEXT:
In our last conversation, we defined the target audience as:
- Age: 28-45
- Profession: Digital entrepreneurs and freelancers
- Main pain point: Not enough time to create consistent content
- Goal: Automate marketing without losing authenticity

BASED ON THE CONTEXT ABOVE:
Create 5 Facebook ad headlines that speak directly to this audience's pain points and present our automation tool as the solution.`,
        why: 'Maintains consistency across interactions, avoids repeating context, and allows for incremental development.',
        tags: ['contexto', 'continuidade', 'referência', 'consistência']
    },
    {
        id: 6,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Chain of Thought',
        subtitle: 'Chain of Thought',
        description: 'Ask the model to show its reasoning step by step before the final answer.',
        template: `[Problem or question]

Before responding, think out loud:
1. Analyze the problem
2. Consider different approaches
3. Evaluate the pros and cons
4. Reach a well-supported conclusion

Show all your reasoning.`,
        example: `Problem: My email open rate is 15%, but the click-through rate is only 1,2%. How can I improve it?

Before responding, think out loud:
1. Analyze where the bottleneck is (opens vs. clicks)
2. Identify possible causes for each metric
3. Prioritize which problem to tackle first
4. Suggest specific solutions and explain why

Show all your reasoning before giving your final recommendations.`,
        why: 'Encourages deep analysis, lets you examine the logic, and improves the quality of complex responses.',
        tags: ['raciocínio', 'análise', 'lógica', 'passo-a-passo']
    },
    {
        id: 7,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Anti-Keyword Staining Method',
        subtitle: 'Keyword Prevention',
        description: 'Explicitly state what NOT to include to avoid unwanted patterns.',
        template: `Task: [Objective]

WHAT TO INCLUDE:
- [Desired element 1]
- [Desired element 2]

WHAT NOT TO INCLUDE:
- [Element to avoid 1]
- [Element to avoid 2]
- [Specific pattern to avoid]`,
        example: `Task: Write a professional LinkedIn post about leadership

WHAT TO INCLUDE:
- Authentic personal experience
- A specific, actionable insight
- A vulnerable but professional tone

WHAT NOT TO INCLUDE:
- Empty corporate jargon ("synergy," "think outside the box")
- Excessive hashtags
- Generic questions at the end ("What do you think?")
- Emojis (except 1-2 used strategically)
- Bulleted lists`,
        why: 'Negative instructions are just as important as positive ones; they prevent cliché patterns and refine quality.',
        tags: ['restrições', 'negativas', 'qualidade', 'evitar']
    },
    {
        id: 8,
        category: 'fundamentais',
        categoryName: 'Fundamental Methods',
        title: 'Chaining Method',
        subtitle: 'Chaining Method',
        description: 'Connect multiple prompts so that the output of one feeds into the next.',
        template: `PROMPT 1 (Analysis):
[First step — usually analysis or data gathering]

PROMPT 2 (Processing):
Use the results from Prompt 1 to: [Second step]

PROMPT 3 (Synthesis):
Based on Prompts 1 and 2, create: [Final output]`,
        example: `PROMPT 1 (Analysis):
Analyze this sales copy and identify: 1) Target audience, 2) Main objections, 3) Highlighted benefits

PROMPT 2 (Processing):
Use the results from Prompt 1 to create 3 headline variations, each focused on a different objection you identified

PROMPT 3 (Synthesis):
Based on Prompts 1 and 2, create a complete follow-up email using the strongest headline and incorporating all the benefits`,
        why: 'Enables complex processes to be handled in manageable steps, with each prompt focused on a specific function.',
        tags: ['sequência', 'etapas', 'workflow', 'processo']
    },

    // CATEGORIA 2: Criação de Conteúdo (16-30)
    {
        id: 16,
        category: 'conteudo',
        categoryName: 'Content Creation',
        title: 'High-Converting Sales Email',
        subtitle: 'AIDA Framework',
        description: 'AIDA structure (Attention, Interest, Desire, Action), tailored for sales emails.',
        template: `Write a sales email following this structure:

ATTENTION (Subject line + first sentence):
- Specific problem or surprising fact
- Maximum 10 words in the subject line

INTEREST (Body - paragraphs 1-2):
- Expand on the problem
- Show that you understand the pain point

DESIRE (Body - paragraph 3):
- Present the solution
- Main benefit + subtle social proof

ACTION (CTA):
- Clear, low-commitment request
- Reduce friction

Product: [Your product]
Audience: [Your target audience]
Main pain point: [Problem it solves]

Constraints:
- Maximum 150 words
- Consultative tone, not salesy
- 1 CTA only`,
        example: `Product: Project management software for freelancers
Audience: Freelancers managing multiple clients
Pain point: Missed deadlines and disorganization

SUBJECT: Missed a client deadline this week?

Maria, 73% of freelancers miss at least 1 deadline per month. I know how frustrating it is—a dissatisfied client, your reputation at risk.

The problem isn't you. It's managing 5 different projects, each in a different tool, with no clear view of what's due tomorrow.

ProTask brings everything together: deadlines, files, communication. You can see the whole week in one dashboard.
Ana, a designer, avoided 3 delays in her first month alone.

Try it free for 14 days, no card required. Worth seeing if it works for you?`,
        why: 'Proven copywriting structure, focusing on the problem before the solution; a low-commitment CTA increases conversions.',
        tags: ['email', 'vendas', 'AIDA', 'conversão', 'copywriting']
    },
    {
        id: 17,
        category: 'conteudo',
        categoryName: 'Content Creation',
        title: 'Viral LinkedIn Post',
        subtitle: 'Hook + Story + Insight',
        description: 'Analysis of viral elements + structured application to create engaging posts.',
        template: `Create a LinkedIn post with viral potential using this formula:

HOOK (First 2 lines):
- Controversial statement OR
- Provocative question OR
- Surprising statistic

STORY (Body):
- Short personal narrative (3-4 lines)
- Conflict or challenge faced
- Resolution or lesson learned

INSIGHT (Conclusion):
- Actionable lesson
- Practical application for the reader

FORMAT:
- Short paragraphs (1-2 lines each)
- No excessive emojis (maximum 2)
- No hashtags in the body
- Tone: Authentic and vulnerable

Topic: [Your topic]
Audience: [Your target audience]`,
        example: `Topic: Time management
Audience: Entrepreneurs

POST:
I canceled 40% of my meetings this week.
Result? Productivity doubled.

For years, I accepted every meeting. "Networking is important," I thought. My calendar turned into an impossible game of Tetris.

Then I realized: a meeting with no clear agenda = wasted time disguised as work.

Now I apply the 3-criteria rule:
1. Is there an agenda in advance?
2. Am I essential, or can I delegate?
3. Can this be handled by email?

If it doesn't meet all 3, I politely decline.

The time you protect is the time you invest in what really matters.`,
        why: 'A formula based on analysis of viral posts; personal storytelling creates connection, and actionable insights provide value.',
        tags: ['linkedin', 'viral', 'storytelling', 'engajamento', 'social media']
    },
    {
        id: 18,
        category: 'conteudo',
        categoryName: 'Content Creation',
        title: 'Product Description That Converts',
        subtitle: 'Benefits + Experience',
        description: 'Focuses on benefits, not features, with subtle storytelling for e-commerce.',
        template: `Write a product description following this structure:

PARAGRAPH 1 - Problem/Desire:
Start with the customer's situation or desire
(don't mention the product yet)

PARAGRAPH 2 - Solution:
Present the product as the solution
Focus on 2-3 main benefits (not technical features)

PARAGRAPH 3 - Experience:
Describe the experience of using the product
Use sensory language when applicable

PARAGRAPH 4 - Call to Action:
Subtle CTA + guarantee or differentiator

Product: [Name and category]
Audience: [Demographics and psychographics]
Main differentiator: [What makes it unique]

Constraints:
- 120-150 words total
- Tone: [Define appropriate tone]
- Avoid: Exaggerated superlatives, technical jargon`,
        example: `Product: Ergonomic office chair
Audience: Professionals who work from home, ages 30-45
Differentiator: 12-point personalized adjustment

Working 8 hours sitting down shouldn't mean having back pain at the end of the day. But for many remote professionals, that's exactly the reality.

The ErgoFlex Chair was designed to adapt to your body, not the other way around. Adjust the height, seat depth, lumbar support, and tilt until you find your ideal position. Support that moves with your body throughout the day.

Imagine finishing your workday without that tension in your shoulders or heaviness in your lower back. Just you, focused, comfortable, productive.

Try it for 30 days. If you don't feel a difference, we'll refund 100% of the price. Your spine will thank you.`,
        why: 'Starts with empathy, transitions naturally to the solution, and uses sensory language to create an emotional connection.',
        tags: ['e-commerce', 'produto', 'copywriting', 'conversão', 'benefícios']
    },

    // CATEGORIA 3: Marketing e Vendas (31-45)
    {
        id: 31,
        category: 'marketing',
        categoryName: 'Marketing e Vendas',
        title: 'Competitor Analysis',
        subtitle: 'Competitive Intelligence',
        description: 'A framework for analyzing competitors\' strategies and identifying opportunities.',
        template: `Analyze competitor [Name] using this framework:

1. POSITIONING:
   - Main value proposition
   - Communicated differentiator
   - Apparent target audience

2. CONTENT STRATEGY:
   - Main channels used
   - Publishing frequency
   - Recurring themes/topics
   - Communication tone and style

3. OFFERS AND PRICING:
   - Pricing structure
   - Packages/plans offered
   - Promotions and incentives

4. STRENGTHS:
   - What they do very well
   - Clear competitive advantages

5. OPPORTUNITIES (gaps we can explore):
   - What they are not doing
   - Apparent weaknesses
   - Underserved audiences

Competitor: [Name and URL]
Your business: [Brief description]`,
        example: `Competitor: Company X, an online course provider
Your business: A Portuguese-language course platform

ANALYSIS:

Positioning: "Learn technology in 30 days"
Differentiator: Job guarantee or your money back
Audience: Young people ages 18-25 looking for their first job in tech

Content: YouTube (3x/week), Instagram daily, LinkedIn rarely
Tone: Motivational, informal, heavy use of slang

Offers: R$ 997 upfront or 12 installments, no options in between

Strengths: Active community, authentic testimonials, 24/7 support

OPPORTUNITIES:
- They don't serve professionals over 30 looking to change careers
- No presence on LinkedIn (where this audience is)
- No flexible monthly payment option
- Content feels too juvenile and alienates a more mature audience`,
        why: 'Structured analysis reveals market gaps and identifies untapped opportunities, providing a foundation for differentiation.',
        tags: ['concorrência', 'análise', 'estratégia', 'marketing', 'posicionamento']
    },

    // CATEGORIA 4: Análise e Pesquisa (46-55)
    {
        id: 46,
        category: 'analise',
        categoryName: 'Analysis and Research',
        title: 'In-Depth SWOT Analysis',
        subtitle: 'Strategic Analysis',
        description: 'Detailed SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) for strategic planning.',
        template: `Conduct a SWOT analysis for: [Your business/project]

STRENGTHS - Positive internal factors:
List 5-7 competitive advantages or unique resources you have
For each, explain: Why is this a strength? How can we amplify it?

WEAKNESSES - Negative internal factors:
List 5-7 limitations or areas that need improvement
For each, explain: What is the impact? How can we minimize or eliminate it?

OPPORTUNITIES - Positive external factors:
List 5-7 market trends or situations we can take advantage of
For each, explain: How can we capitalize on it? What is the ideal timing?

THREATS - Negative external factors:
List 5-7 external risks or challenges
For each, explain: How likely is it? How can we prepare?

STRATEGIC ACTIONS:
Based on the analysis, suggest 3-5 priority actions that combine:
- Strength + Opportunity (growth)
- Strength to defend against Threat (protection)
- Improve Weakness to take advantage of Opportunity (development)`,
        example: `Business: Digital marketing consulting for small local businesses

STRENGTHS:
- Deep knowledge of local SEO → Expand by creating educational content
- Network of partners (designers, developers) → Offer complete solutions

WEAKNESSES:
- Small team (just me) → Limits the number of clients at a time
- No documented case studies → Makes sales harder

OPPORTUNITIES:
- Boom in local businesses going digital after the pandemic
- Google prioritizing local businesses in search results

THREATS:
- Large agencies lowering prices to attract small and medium-sized businesses
- DIY tools becoming more accessible

ACTIONS:
1. Create the mini-course "Local SEO in 7 Days" (Strength + Opportunity)
2. Document the results of the 3 best clients on video (Address Weakness)
3. Specialize in a specific niche (restaurants) to stand out from large agencies`,
        why: 'A 360° view of the business that identifies strategic priorities and combines internal and external analysis to support informed decisions.',
        tags: ['swot', 'análise', 'estratégia', 'planejamento', 'negócios']
    },

    // CATEGORIA 5: Comunicação Profissional (56-65)
    {
        id: 56,
        category: 'comunicacao',
        categoryName: 'Professional Communication',
        title: 'Difficult Professional Email',
        subtitle: 'Difficult Conversations',
        description: 'A structure for writing emails about sensitive topics while maintaining professionalism.',
        template: `Write a professional email about a delicate situation:

CONTEXT:
[Describe the situation that requires the email]

EMAIL STRUCTURE:

OPENING (Positive tone):
Start by acknowledging something positive or providing neutral context

SITUATION (Objective facts):
Describe the situation using facts, not emotions or judgments
Avoid: "You always...", "You never..."
Use: "I observed that...", "I noticed that..."

IMPACT (Clear consequences):
Explain how the situation affects the project/team/results
Focus on objective consequences

SOLUTION (Constructive proposal):
Offer a way forward
Be specific about next steps

CLOSING (Collaborative tone):
Reinforce the partnership and your willingness to talk

Overall tone: [Assertive but respectful / Empathetic but firm]
Relationship: [Manager-direct report / Colleagues / Client-vendor]`,
        example: `Situation: Freelancer has failed to deliver the project on time for the 3rd time

EMAIL:

Hi João,

Thanks for the work you've been doing on the campaign designs. The quality has always been excellent.

I'd like to talk about deadlines. The last three projects were delivered 5, 7, and 4 days after the agreed dates. This affected our client schedule, and we need to reset expectations across the board.

To keep working together, I need predictability. My suggestion: let's set more realistic deadlines from the start, or you let me know 48h in advance if anything suggests a delay.

Would you be open to this adjustment? Can we have a quick call this week to align?

Best,
Maria`,
        why: 'A constructive approach avoids defensiveness, objective facts reduce conflict, and a focus on solutions maintains a professional relationship.',
        tags: ['email', 'comunicação', 'feedback', 'profissional', 'conflito']
    },

    // CATEGORIA 6: Educação e Aprendizado (66-75)
    {
        id: 66,
        category: 'educacao',
        categoryName: 'Education and Learning',
        title: 'Personalized Study Plan',
        subtitle: 'Learning Roadmap',
        description: 'Create a structured learning roadmap to master a new skill.',
        template: `Create a personalized study plan for: [Skill/Field]

LEARNER PROFILE:
- Current level: [Beginner/Intermediate/Advanced]
- Available time: [X hours/week]
- End goal: [What you want to achieve]
- Desired timeline: [Time to complete]

PLAN STRUCTURE:

PHASE 1 - FOUNDATIONS (Weeks 1-X):
- Essential concepts to master
- Resources: [Specific courses/books/videos]
- Hands-on project to reinforce learning
- Completion criteria (how to know you have mastered it)

PHASE 2 - INTERMEDIATE (Weeks X-Y):
- Skills to develop
- Recommended resources
- More complex hands-on project
- Completion criteria

PHASE 3 - ADVANCED (Weeks Y-Z):
- Specialized topics
- Resources
- Final capstone project
- Completion criteria

SUGGESTED WEEKLY ROUTINE:
[Time allocation by activity]

PROGRESS MILESTONES:
[Checkpoints to validate learning]`,
        example: `Skill: Prompt Engineering
Level: Beginner (knows basic AI concepts)
Time: 5h/week
Goal: Create professional prompts for marketing automation
Timeline: 8 weeks

PHASE 1 - FOUNDATIONS (Weeks 1-3):
Concepts: Tokens, context, temperature, few-shot vs zero-shot
Resources: "Prompt Engineering FEP" course (Beginner Level) + OpenAI Documentation
Project: Create 10 prompts for everyday marketing tasks
Completion: Get consistent results with 8 out of 10 prompts

PHASE 2 - INTERMEDIATE (Weeks 4-6):
Skills: Chain of thought, structured outputs, prompt chaining
Resources: FEP Technical Level + Experiment with Claude and GPT-4
Project: Automate creation of a monthly content calendar
Completion: A functional system that generates 80% of the calendar

PHASE 3 - ADVANCED (Weeks 7-8):
Topics: RAG, function calling, autonomous agents
Resources: FEP Masterclass + Anthropic Documentation
Final Project: A system for generating complete campaigns (copy + strategy)

ROUTINE:
Monday/Wednesday (2h each): Theoretical study
Saturday (1h): Practice and experiments`,
        why: 'Structure reduces overwhelm, clear milestones maintain motivation, and hands-on projects ensure real-world application.',
        tags: ['educação', 'aprendizado', 'plano', 'roadmap', 'estudos']
    },

    // CATEGORIA 7: Criatividade e Brainstorming (76-85)
    {
        id: 76,
        category: 'criatividade',
        categoryName: 'Criatividade e Brainstorming',
        title: 'Brainstorming SCAMPER',
        subtitle: 'Creative Ideation',
        description: 'SCAMPER technique for generating creative ideas from 7 different angles.',
        template: `Use the SCAMPER technique to generate ideas about: [Your product/service/problem]

S - SUBSTITUTE:
What can we replace? (Materials, processes, people, rules)
Generate 3-5 ideas by replacing key elements

C - COMBINE:
What can we combine? (Products, services, processes, audiences)
Generate 3-5 ideas for unusual combinations

A - ADAPT:
What can we adapt from other industries/contexts?
Generate 3-5 ideas inspired by other sectors

M - MODIFY:
What can we modify? (Size, shape, color, sound, movement)
Generate 3-5 ideas for modifications

P - PUT TO OTHER USE:
How could this be used differently?
Generate 3-5 alternative uses

E - ELIMINATE:
What can we remove/simplify?
Generate 3-5 ideas for elimination/minimalism

R - REVERSE/REARRANGE:
What happens if we reverse or rearrange things?
Generate 3-5 ideas for reversing/reordering

SELECTION:
From the ideas generated, choose the 3 most promising and explain why`,
        example: `Product: Food delivery app

SUBSTITUTE:
- Replace restaurants with local home cooks
- Replace delivery drivers with drones in permitted areas

COMBINE:
- Delivery + Cooking classes (chef delivers ingredients + teaches via video)
- Delivery + Nutritionist (nutritional analysis of each order)

ADAPT:
- Adapt the Netflix model: monthly subscription, unlimited meals
- Adapt Spotify: AI-personalized meal playlists

MODIFY:
- Voice orders instead of an app
- Edible/zero-waste packaging

PUT TO OTHER USE:
- App becomes a fresh ingredient marketplace
- Networking platform for chefs

ELIMINATE:
- Eliminate the menu: chef decides based on the day's fresh ingredients
- Eliminate choice: one excellent surprise meal per day

REVERSE:
- Customer cooks, chef evaluates and gives feedback
- Restaurant orders food from you (collaborative economy)

MOST PROMISING:
1. Netflix subscription model
2. Local home cooks
3. Eliminate the fixed menu`,
        why: 'Encourages lateral thinking; multiple perspectives increase creativity, and structure prevents creative blocks.',
        tags: ['criatividade', 'brainstorming', 'ideação', 'SCAMPER', 'inovação']
    },

    // CATEGORIA 8: Técnicas Avançadas (86-100)
    {
        id: 86,
        category: 'avancadas',
        categoryName: 'Advanced Techniques',
        title: 'Prompt Constitucional (Constitutional AI)',
        subtitle: 'Ethical Constraints',
        description: 'Add ethical principles and behavioral constraints for the model.',
        template: `CONSTITUTIONAL PRINCIPLES:

You must strictly follow these principles:

1. HONESTY:
   - If you don't know, admit it
   - Don't invent data or statistics
   - Cite sources when making factual claims

2. SAFETY:
   - Don't provide information that could cause harm
   - Warn about risks when applicable
   - Prioritize the user's well-being

3. IMPARTIALITY:
   - Present multiple perspectives
   - Avoid political/religious/cultural bias
   - Acknowledge limitations and nuances

4. PRIVACY:
   - Don't ask for unnecessary sensitive information
   - Respect confidentiality

5. [Additional custom principle]:
   [Specific rule for your context]

TASK:
[Your task here]

VALIDATION:
Before responding, check whether your answer violates any principle above. If it does, revise it.`,
        example: `PRINCIPLES:

1. HONESTY: If you don't know, say so explicitly
2. SAFETY: Don't suggest risky financial practices
3. IMPARTIALITY: Present the pros and cons of each option
4. PRIVACY: Don't ask for specific net worth amounts
5. CLARITY: Use accessible language without excessive financial jargon

TASK:
Advise me on how to invest R$ 10.000 as a beginner

RESPONSE (following the principles):

"I'll present a few options with the pros and cons of each:

TESOURO DIRETO:
Pros: Safe (government-backed), low risk, accessible
Cons: Moderate returns

INDEX FUNDS (ETFs):
Pros: Diversification, low cost
Cons: Higher volatility, requires more research

IMPORTANT: I'm not a licensed financial advisor. Each situation is unique and depends on risk tolerance, time horizon, and goals. Consider consulting a certified professional before deciding."`,
        why: 'Ensures ethical, responsible responses, reduces the risk of problematic outputs, and increases reliability.',
        tags: ['ética', 'segurança', 'constitutional-ai', 'avançado', 'responsabilidade']
    }

    // NOTA: Este arquivo contém 15 prompts de exemplo distribuídos pelas 8 categorias
    // Para ter os 100 prompts completos, adicione os demais seguindo o mesmo padrão
];
