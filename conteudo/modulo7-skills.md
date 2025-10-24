# Claude Skills

## O Que É

Claude Skills é um sistema de capacidades customizadas e reutilizáveis que permite criar agentes especializados com comportamentos consistentes e reproduzíveis. Uma "skill" é essencialmente um prompt template otimizado combinado com configurações específicas que definem como Claude deve executar uma tarefa particular de forma expert.

Skills transformam Claude de assistente genérico em especialista focado em domínios específicos.

## Por Que Usar

**Benefícios:**
- **Consistência**: Mesmo output quality across executions
- **Reutilização**: Define once, use everywhere
- **Especialização**: Expert-level performance em tarefas específicas
- **Composição**: Combinar múltiplas skills para workflows complexos
- **Manutenibilidade**: Update skill central em vez de N prompts
- **Escalabilidade**: Build library de skills para organização inteira

**Quando usar:**
- Tarefas repetitivas que requerem expertise consistente
- Workflows empresariais padronizados
- Code review, document analysis, data extraction
- Content creation com style guides
- Compliance e regulatory tasks

## Anatomia de uma Skill

```python
class Skill:
    def __init__(self, name, description, system_prompt, examples=None, config=None):
        self.name = name
        self.description = description
        self.system_prompt = system_prompt
        self.examples = examples or []  # Few-shot examples
        self.config = config or {}  # Model configs (temp, max_tokens, etc)

    def execute(self, user_input, **kwargs):
        messages = [
            {"role": "system", "content": self.system_prompt}
        ]

        # Add few-shot examples
        for ex in self.examples:
            messages.append({"role": "user", "content": ex["input"]})
            messages.append({"role": "assistant", "content": ex["output"]})

        # Add user input
        messages.append({"role": "user", "content": user_input})

        # Call Claude with skill config
        response = claude.messages.create(
            model="claude-3-5-sonnet-20250219",
            max_tokens=self.config.get("max_tokens", 4096),
            temperature=self.config.get("temperature", 1.0),
            messages=messages
        )

        return response.content[0].text
```

## Exemplos de Skills

### 1. Code Review Skill

```python
code_review_skill = Skill(
    name="expert_code_reviewer",
    description="Reviews code for security, performance, and best practices",

    system_prompt="""You are an expert code reviewer with 15 years of experience.

Your review process:
1. Security: Check for vulnerabilities (SQL injection, XSS, auth issues)
2. Performance: Identify bottlenecks, inefficient algorithms
3. Best Practices: Code style, naming, documentation
4. Bugs: Logic errors, edge cases not handled

Output format:
## Security Issues
- [CRITICAL/HIGH/MEDIUM/LOW] Issue description
  Location: file.py:line
  Fix: Suggested fix

## Performance Issues
...

## Best Practices
...

## Bugs
...

Be specific, cite line numbers, provide actionable fixes.
""",

    examples=[
        {
            "input": "def login(username, password):\n    query = f\"SELECT * FROM users WHERE username='{username}' AND password='{password}'\"\n    return db.execute(query)",
            "output": """## Security Issues
- [CRITICAL] SQL Injection vulnerability
  Location: line 2
  Fix: Use parameterized queries:
  ```python
  query = "SELECT * FROM users WHERE username=? AND password=?"
  return db.execute(query, (username, password))
  ```

- [HIGH] Plain text password comparison
  Location: line 2
  Fix: Hash passwords and compare hashes
  ```python
  hashed = hash_password(password)
  query = "SELECT * FROM users WHERE username=? AND password_hash=?"
  ```
"""
        }
    ],

    config={"temperature": 0.3, "max_tokens": 2000}
)

# Usage
review = code_review_skill.execute("""
def process_payment(amount, card_number):
    # Process payment logic
    return True
""")
```

### 2. SQL Query Generator Skill

```python
sql_generator_skill = Skill(
    name="sql_expert",
    description="Generates optimized SQL queries from natural language",

    system_prompt="""You are a SQL expert specializing in PostgreSQL.

Rules:
- Generate ONLY SELECT queries (no INSERT/UPDATE/DELETE)
- Use proper JOINs instead of subqueries when possible
- Add indexes suggestions in comments
- Include EXPLAIN plan considerations
- Handle NULL values properly
- Use CTEs for readability when query is complex

Output:
```sql
-- Query description
-- Indexes needed: ...
SELECT ...
```
""",

    examples=[
        {
            "input": "Get all customers who made purchases above $1000 in last 30 days",
            "output": """```sql
-- Customers with high-value recent purchases
-- Indexes needed: orders(customer_id, created_at, amount)

SELECT DISTINCT
    c.customer_id,
    c.name,
    c.email,
    SUM(o.amount) as total_spent
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.created_at >= CURRENT_DATE - INTERVAL '30 days'
AND o.amount > 1000
GROUP BY c.customer_id, c.name, c.email
ORDER BY total_spent DESC;
```"""
        }
    ],

    config={"temperature": 0.2}  # Low temp for precision
)
```

### 3. Legal Document Analysis Skill

```python
legal_analysis_skill = Skill(
    name="contract_analyzer",
    description="Analyzes contracts for risks and key terms",

    system_prompt="""You are a senior contract lawyer.

Analysis framework:
1. **Parties**: Identify all contracting parties
2. **Term**: Contract duration, renewal clauses
3. **Financial**: Payment terms, penalties, caps
4. **Liability**: Indemnification, limitations of liability
5. **Termination**: How can contract end, notice periods
6. **Risks**: Red flags, unusual clauses, missing protections

For EACH section:
- Quote relevant clauses
- Explain implications
- Rate risk (Low/Medium/High)
- Suggest modifications if High risk

Be thorough but concise. Cite section numbers.
""",

    config={"temperature": 0.4, "max_tokens": 8000}
)
```

## Skill Composition & Chaining

```python
class SkillWorkflow:
    def __init__(self, skills):
        self.skills = {s.name: s for s in skills}

    def execute_chain(self, skill_sequence, initial_input):
        """Execute skills in sequence, passing output to next"""
        current_input = initial_input

        results = []
        for skill_name in skill_sequence:
            skill = self.skills[skill_name]
            output = skill.execute(current_input)
            results.append({
                "skill": skill_name,
                "output": output
            })
            current_input = output  # Chain: output becomes next input

        return results

# Define workflow
workflow = SkillWorkflow([
    data_extractor_skill,  # Extract structured data from PDF
    validator_skill,       # Validate extracted data
    summarizer_skill       # Create executive summary
])

# Execute
results = workflow.execute_chain(
    ["data_extractor", "validator", "summarizer"],
    initial_input="[PDF content]"
)
```

## Skill Library Management

```python
class SkillLibrary:
    def __init__(self):
        self.skills = {}

    def register(self, skill):
        """Add skill to library"""
        self.skills[skill.name] = skill

    def get(self, name):
        """Retrieve skill"""
        return self.skills.get(name)

    def list_skills(self):
        """List all available skills"""
        return [
            {"name": s.name, "description": s.description}
            for s in self.skills.values()
        ]

    def search(self, query):
        """Find skills matching query"""
        results = []
        for skill in self.skills.values():
            if query.lower() in skill.name.lower() or query.lower() in skill.description.lower():
                results.append(skill)
        return results

# Usage
library = SkillLibrary()
library.register(code_review_skill)
library.register(sql_generator_skill)
library.register(legal_analysis_skill)

# Find skill
skill = library.search("sql")[0]
result = skill.execute("Get top 10 customers by revenue")
```

## Best Practices

1. **Single Responsibility**: One skill, one well-defined task
2. **Clear System Prompts**: Explicit instructions, examples, format specs
3. **Version Control**: Track skill versions, changes
4. **Testing**: Test skills with diverse inputs, edge cases
5. **Documentation**: Document expected inputs, outputs, limitations
6. **Continuous Improvement**: Update based on feedback and failures

## Skill Templates

### Template: Data Extraction Skill
```python
extraction_template = """You are a data extraction expert.

Task: Extract {entity_type} from provided text.

Output format:
{{
  "entities": [
    {{
      "value": "extracted value",
      "confidence": 0.95,
      "context": "surrounding text"
    }}
  ]
}}

Rules:
- Extract ONLY explicitly stated information
- Include confidence score (0-1)
- If uncertain, set confidence < 0.7
- Provide context for each extraction
"""
```

### Template: Classification Skill
```python
classification_template = """You are a {domain} classification expert.

Categories: {categories}

For each input:
1. Assign to ONE category
2. Provide confidence score
3. Explain reasoning

Output format:
{{
  "category": "chosen_category",
  "confidence": 0.92,
  "reasoning": "explanation"
}}
"""
```

## Recursos Adicionais

- **Anthropic Prompt Library**: Curated skill examples
- **LangChain Custom Agents**: Framework for skills/agents
- **Semantic Kernel**: Microsoft's skills framework
- **AutoGPT Plugins**: Similar concept for autonomous agents
- **OpenAI GPT Store**: Marketplace de GPTs especializados

---

**Resumo**: Claude Skills permitem criar agentes especializados, consistentes e reutilizáveis. Defina comportamento expert uma vez, reutilize infinitamente, e componha skills em workflows complexos para resolver tarefas enterprise de forma escalável.
