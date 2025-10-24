# Tool Design e Function Calling

## O Que É

Tool Design e Function Calling é a técnica de permitir que LLMs chamem funções externas ou ferramentas programáticas para executar ações além de geração de texto. O modelo identifica quando precisa usar uma ferramenta, escolhe qual usar, gera os parâmetros corretos e interpreta os resultados.

Essencialmente, transforma LLMs de text-only em agentes capazes de interagir com APIs, databases, calculadoras, search engines e qualquer sistema programático.

## Por Que Usar

**Benefícios:**
- **Ações no Mundo Real**: Enviar emails, criar tickets, fazer reservas
- **Dados Atualizados**: Buscar informação em tempo real via APIs
- **Computação Precisa**: Cálculos matemáticos, processamento de dados
- **Integração de Sistemas**: Conectar LLM a software existente
- **Extensibilidade**: Adicionar novas capacidades sem retreinar modelo

**Quando usar:**
- Customer service automation (criar tickets, consultar status)
- Personal assistants (agendar meetings, enviar mensagens)
- Data analysis agents (query databases, gerar gráficos)
- Development tools (execute code, run tests, deploy)
- E-commerce (check inventory, process orders)

## Como Funciona

### Function Calling Flow

```
User: "Qual a previsão do tempo em São Paulo amanhã?"
    ↓
LLM Reasoning: "Preciso de dados em tempo real, vou usar weather_api"
    ↓
Function Call: get_weather(location="São Paulo", date="tomorrow")
    ↓
Execute Function → Return: {"temp": 25, "condition": "sunny"}
    ↓
LLM: "Amanhã em São Paulo estará ensolarado com 25°C"
```

## Implementação - OpenAI Function Calling

```python
from openai import OpenAI

client = OpenAI()

# 1. Define tools/functions
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "City name, e.g. San Francisco"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature unit"
                    }
                },
                "required": ["location"]
            }
        }
    }
]

# 2. Call LLM
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=tools,
    tool_choice="auto"  # Model decides if/when to use tools
)

# 3. Check if model wants to call function
message = response.choices[0].message

if message.tool_calls:
    tool_call = message.tool_calls[0]
    function_name = tool_call.function.name
    function_args = json.loads(tool_call.function.arguments)

    # 4. Execute function
    if function_name == "get_weather":
        result = get_weather(**function_args)  # Your actual function

    # 5. Send result back to model
    messages.append(message)  # Assistant's function call
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(result)
    })

    # 6. Get final response
    final_response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )

    print(final_response.choices[0].message.content)
```

## Implementação - Anthropic Tool Use

```python
from anthropic import Anthropic

client = Anthropic()

# 1. Define tools
tools = [
    {
        "name": "get_weather",
        "description": "Get weather for a location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {"type": "string", "description": "City name"},
                "unit": {"type": "string", "enum": ["C", "F"]}
            },
            "required": ["location"]
        }
    }
]

# 2. Call Claude
response = client.messages.create(
    model="claude-3-5-sonnet-20250219",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "Weather in Paris?"}]
)

# 3. Process tool use
if response.stop_reason == "tool_use":
    tool_use = next(block for block in response.content if block.type == "tool_use")

    # 4. Execute
    if tool_use.name == "get_weather":
        result = get_weather(**tool_use.input)

    # 5. Continue conversation
    response = client.messages.create(
        model="claude-3-5-sonnet-20250219",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "Weather in Paris?"},
            {"role": "assistant", "content": response.content},
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": json.dumps(result)
                    }
                ]
            }
        ]
    )
```

## Exemplos de Tools

### 1. Database Query Tool
```python
def query_database(query: str, table: str) -> dict:
    """
    Execute SQL query on database

    Args:
        query: SQL SELECT statement
        table: Table name to query

    Returns:
        Query results as dict
    """
    # Validate query is SELECT only (security!)
    if not query.strip().upper().startswith("SELECT"):
        return {"error": "Only SELECT queries allowed"}

    conn = get_db_connection()
    result = conn.execute(query)
    return {"data": result.fetchall()}

tool_schema = {
    "name": "query_database",
    "description": "Query customer database with SQL",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "SQL SELECT query"},
            "table": {"type": "string", "enum": ["customers", "orders", "products"]}
        },
        "required": ["query", "table"]
    }
}
```

### 2. Calculator Tool
```python
import ast
import operator

OPERATORS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Pow: operator.pow
}

def calculator(expression: str) -> float:
    """
    Safely evaluate mathematical expression

    Args:
        expression: Math expression like "2+2" or "(10*5)/2"

    Returns:
        Calculation result
    """
    try:
        tree = ast.parse(expression, mode='eval')
        return _eval_node(tree.body)
    except:
        return "Error: Invalid expression"

def _eval_node(node):
    if isinstance(node, ast.Num):
        return node.n
    elif isinstance(node, ast.BinOp):
        return OPERATORS[type(node.op)](_eval_node(node.left), _eval_node(node.right))
    else:
        raise ValueError("Unsupported operation")

tool_schema = {
    "name": "calculator",
    "description": "Perform mathematical calculations",
    "parameters": {
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "Math expression to evaluate, e.g., '(15*7)+3'"
            }
        },
        "required": ["expression"]
    }
}
```

### 3. Send Email Tool
```python
import smtplib
from email.mime.text import MIMEText

def send_email(to: str, subject: str, body: str) -> dict:
    """
    Send email via SMTP

    Args:
        to: Recipient email
        subject: Email subject
        body: Email body content

    Returns:
        Success status
    """
    try:
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = "bot@company.com"
        msg['To'] = to

        with smtplib.SMTP('smtp.company.com', 587) as server:
            server.starttls()
            server.login("bot@company.com", get_password())
            server.send_message(msg)

        return {"status": "sent", "to": to}
    except Exception as e:
        return {"status": "error", "message": str(e)}
```

## Best Practices para Tool Design

### 1. Clear Descriptions
```python
# ❌ Bad
"description": "Gets data"

# ✅ Good
"description": "Retrieves customer order history from database. Returns list of orders with date, amount, and status. Max 100 most recent orders."
```

### 2. Explicit Parameters
```python
{
    "location": {
        "type": "string",
        "description": "City name in format 'City, Country' (e.g., 'Paris, France')"
    },
    "date": {
        "type": "string",
        "description": "Date in ISO format YYYY-MM-DD or relative like 'today', 'tomorrow'"
    }
}
```

### 3. Validation & Error Handling
```python
def my_tool(param: str):
    # Validate input
    if not param:
        return {"error": "Parameter 'param' is required"}

    if len(param) > 100:
        return {"error": "Parameter too long (max 100 chars)"}

    try:
        result = do_operation(param)
        return {"success": True, "data": result}
    except Exception as e:
        return {"error": f"Operation failed: {str(e)}"}
```

### 4. Structured Returns
```python
# ❌ Bad: String return
return "Temperature is 25 degrees and sunny"

# ✅ Good: Structured data
return {
    "temperature": 25,
    "unit": "celsius",
    "condition": "sunny",
    "humidity": 60,
    "timestamp": "2025-01-15T10:30:00Z"
}
```

## Security Considerations

### 1. Input Sanitization
```python
def safe_query(query: str):
    # Blocklist dangerous keywords
    dangerous = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER"]
    if any(word in query.upper() for word in dangerous):
        raise ValueError("Dangerous query detected")

    # Whitelist approach even better
    if not query.strip().upper().startswith("SELECT"):
        raise ValueError("Only SELECT allowed")
```

### 2. Rate Limiting
```python
from functools import lru_cache
import time

call_counts = {}

def rate_limit(tool_name: str, max_calls: int = 10, window: int = 60):
    now = time.time()
    if tool_name not in call_counts:
        call_counts[tool_name] = []

    # Clean old calls
    call_counts[tool_name] = [t for t in call_counts[tool_name] if now - t < window]

    if len(call_counts[tool_name]) >= max_calls:
        raise Exception(f"Rate limit exceeded: max {max_calls} calls per {window}s")

    call_counts[tool_name].append(now)
```

### 3. Least Privilege
```python
# Don't give tool access to everything
# Give minimal permissions needed

# ❌ Bad
def delete_anything(table: str, id: int):
    execute(f"DELETE FROM {table} WHERE id={id}")

# ✅ Good
def delete_draft_order(order_id: int):
    # Only delete drafts, only from orders table
    execute("DELETE FROM orders WHERE id=? AND status='draft'", (order_id,))
```

## Dicas Práticas

1. **Start Simple**: Begin with 1-2 tools, add more gradually
2. **Test Extensively**: LLMs can call tools in unexpected ways
3. **Monitor Costs**: Each function call = extra LLM calls
4. **Timeout Protection**: Set timeouts on tool executions
5. **Logging**: Log every tool call for debugging and audit

## Recursos Adicionais

- **OpenAI Function Calling Guide**: Official documentation
- **Anthropic Tool Use**: Claude-specific guide
- **LangChain Tools**: Pre-built tools library
- **Gorilla**: Specialized model for API calling
- **ToolBench**: Benchmark for tool use

---

**Resumo**: Tool Design transforma LLMs em agentes acionáveis. Designs de tool claros, seguros e bem documentados são cruciais para agents confiáveis em produção.
