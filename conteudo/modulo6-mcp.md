# Model Context Protocol (MCP)

## O Que É

Model Context Protocol (MCP) é um protocolo padronizado open-source criado pela Anthropic para conectar LLMs a fontes de dados e ferramentas externas de forma segura, eficiente e interoperável. É como USB para AI - um padrão universal que permite que qualquer LLM se conecte a qualquer sistema através de uma interface consistente.

MCP substitui integrações personalizadas e frágeis por um protocolo padronizado que funciona com qualquer modelo compatível.

## Por Que Usar

**Benefícios:**
- **Padronização**: Uma integração funciona com múltiplos LLMs
- **Segurança**: Controles de acesso e permissões builtin
- **Simplicidade**: Conectar sistemas complexos com config mínima
- **Manutenibilidade**: Updates centralizados em vez de N integrações
- **Composabilidade**: Combinar múltiplos MCP servers facilmente

**Quando usar:**
- Conectar Claude a databases proprietários
- Integrar com ferramentas enterprise (Salesforce, SAP, etc)
- Acesso seguro a filesystems e APIs internas
- Construir agents que precisam de múltiplas fontes de dados

## Como Funciona

### Arquitetura MCP

```
Claude (MCP Client)
    ↓ [MCP Protocol]
MCP Server (seu código)
    ↓
External System (DB, API, Files, etc)
```

### Componentes

**MCP Client**: Claude, ou qualquer LLM compatível
**MCP Server**: Seu código que implementa protocolo MCP
**Resources**: Dados que server expõe (files, DB records, etc)
**Tools**: Ações que server pode executar
**Prompts**: Templates reutilizáveis

## Implementação Básica

### MCP Server em Python

```python
from mcp import Server, Resource, Tool
import mcp.types as types

# Create MCP server
server = Server("my-company-data")

# 1. Expose Resources (read-only data)
@server.list_resources()
async def list_resources() -> list[Resource]:
    return [
        Resource(
            uri="company://employees",
            name="Employee Directory",
            mimeType="application/json"
        ),
        Resource(
            uri="company://policies",
            name="Company Policies",
            mimeType="text/markdown"
        )
    ]

@server.read_resource()
async def read_resource(uri: str) -> str:
    if uri == "company://employees":
        return json.dumps(get_employees())  # Your DB query
    elif uri == "company://policies":
        return load_policies_markdown()
    else:
        raise ValueError(f"Unknown resource: {uri}")

# 2. Expose Tools (executable actions)
@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="create_ticket",
            description="Create support ticket in Jira",
            inputSchema={
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "description": {"type": "string"},
                    "priority": {"type": "string", "enum": ["low", "medium", "high"]}
                },
                "required": ["title", "description"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[types.TextContent]:
    if name == "create_ticket":
        ticket_id = create_jira_ticket(**arguments)  # Your Jira API call
        return [types.TextContent(
            type="text",
            text=f"Ticket created: JIRA-{ticket_id}"
        )]

# 3. Expose Prompts (reusable templates)
@server.list_prompts()
async def list_prompts() -> list[types.Prompt]:
    return [
        types.Prompt(
            name="analyze_employee",
            description="Analyze employee performance",
            arguments=[
                types.PromptArgument(
                    name="employee_id",
                    description="Employee ID",
                    required=True
                )
            ]
        )
    ]

@server.get_prompt()
async def get_prompt(name: str, arguments: dict) -> types.GetPromptResult:
    if name == "analyze_employee":
        employee_data = get_employee(arguments["employee_id"])
        return types.GetPromptResult(
            messages=[
                types.PromptMessage(
                    role="user",
                    content=types.TextContent(
                        type="text",
                        text=f"Analyze performance for: {employee_data}"
                    )
                )
            ]
        )

# Start server
if __name__ == "__main__":
    server.run()
```

### Configurando Claude para Usar MCP

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "company-data": {
      "command": "python",
      "args": ["/path/to/your/mcp_server.py"],
      "env": {
        "DB_CONNECTION": "postgresql://...",
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

## Exemplos de MCP Servers

### 1. File System Access
```python
@server.list_resources()
async def list_resources():
    files = os.listdir("/company/docs")
    return [
        Resource(
            uri=f"file:///{file}",
            name=file,
            mimeType="text/plain"
        )
        for file in files if file.endswith('.md')
    ]

@server.read_resource()
async def read_resource(uri: str):
    path = uri.replace("file:///", "/company/docs/")
    with open(path, 'r') as f:
        return f.read()
```

### 2. Database Access
```python
import psycopg2

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="query_customers",
            description="Query customer database",
            inputSchema={
                "type": "object",
                "properties": {
                    "filter": {"type": "string"},
                    "limit": {"type": "integer", "default": 10}
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name, arguments):
    if name == "query_customers":
        conn = psycopg2.connect(os.getenv("DB_CONNECTION"))
        cursor = conn.execute(
            "SELECT * FROM customers WHERE name LIKE %s LIMIT %s",
            (f"%{arguments['filter']}%", arguments.get('limit', 10))
        )
        results = cursor.fetchall()
        return [types.TextContent(
            type="text",
            text=json.dumps(results)
        )]
```

### 3. API Integration (Salesforce)
```python
from simple_salesforce import Salesforce

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="create_lead",
            description="Create lead in Salesforce",
            inputSchema={
                "type": "object",
                "properties": {
                    "first_name": {"type": "string"},
                    "last_name": {"type": "string"},
                    "company": {"type": "string"},
                    "email": {"type": "string"}
                },
                "required": ["last_name", "company"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name, arguments):
    if name == "create_lead":
        sf = Salesforce(
            username=os.getenv("SF_USERNAME"),
            password=os.getenv("SF_PASSWORD"),
            security_token=os.getenv("SF_TOKEN")
        )
        result = sf.Lead.create({
            'FirstName': arguments.get('first_name'),
            'LastName': arguments['last_name'],
            'Company': arguments['company'],
            'Email': arguments.get('email')
        })
        return [types.TextContent(
            type="text",
            text=f"Lead created: {result['id']}"
        )]
```

## Security Best Practices

### 1. Environment Variables para Secrets
```python
# NEVER hardcode credentials
API_KEY = os.getenv("API_KEY")  # ✅
# API_KEY = "sk-1234..."  # ❌
```

### 2. Input Validation
```python
@server.call_tool()
async def call_tool(name, arguments):
    # Validate inputs
    if "email" in arguments:
        if not re.match(r"[^@]+@[^@]+\.[^@]+", arguments["email"]):
            raise ValueError("Invalid email format")

    # Sanitize SQL inputs
    if "query" in arguments:
        if any(word in arguments["query"].upper() for word in ["DROP", "DELETE"]):
            raise ValueError("Dangerous query detected")
```

### 3. Rate Limiting
```python
from collections import defaultdict
import time

call_counts = defaultdict(list)

def rate_limit_check(tool_name: str):
    now = time.time()
    call_counts[tool_name] = [t for t in call_counts[tool_name] if now - t < 60]

    if len(call_counts[tool_name]) >= 10:  # Max 10 calls/minute
        raise Exception("Rate limit exceeded")

    call_counts[tool_name].append(now)
```

## MCP vs Outras Abordagens

| Aspecto | MCP | Function Calling Direto | Custom Integration |
|---------|-----|-------------------------|-------------------|
| **Padronização** | ✅ Universal | ❌ Model-specific | ❌ One-off |
| **Portabilidade** | ✅ Multi-model | ❌ Vendor lock-in | ❌ Não portável |
| **Manutenção** | ✅ Centralizada | ⚠️ Por model | ❌ N integrações |
| **Segurança** | ✅ Builtin | ⚠️ DIY | ⚠️ DIY |
| **Learning Curve** | ⚠️ Média | ✅ Simples | ❌ Alta |

## Dicas Práticas

1. **Start with Resources**: Mais simples que Tools, good for learning
2. **Use Type Hints**: MCP SDK usa tipos Python para validation
3. **Test Locally**: MCP Inspector tool para debug
4. **Version Your Server**: Semantic versioning para breaking changes
5. **Document Well**: Clear descriptions ajudam Claude usar corretamente

## Ecosystem MCP

### Official MCP Servers
- **filesystem**: Acesso seguro a arquivos
- **postgres**: Query PostgreSQL databases
- **github**: Interact with GitHub API
- **brave-search**: Web search via Brave
- **slack**: Send messages, read channels

### Community Servers
Centenas no [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)

## Recursos Adicionais

- **MCP Specification**: Protocol specs oficiais
- **MCP SDK (Python)**: Library oficial
- **MCP SDK (TypeScript)**: Para Node.js
- **MCP Inspector**: Debug tool
- **Anthropic MCP Docs**: Guias e tutorials

---

**Resumo**: MCP é o futuro de LLM integrations - padronizado, seguro, e interoperável. Permite que LLMs acessem dados e ferramentas enterprise de forma consistente across models e providers.
