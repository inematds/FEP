# Structured Outputs (JSON/XML)

## O Que É

Structured Outputs é a técnica de forçar LLMs a retornarem dados em formatos estruturados e parseáveis como JSON, XML, YAML, ou outros formatos de serialização. Em vez de texto livre narrativo, você obtém dados organizados em esquemas bem definidos que podem ser facilmente processados por código.

Esta abordagem transforma LLMs de geradores de texto em APIs previsíveis e integ

ráveis com sistemas de software, permitindo automação, validação e processamento downstream confiável.

## Por Que Usar

**Benefícios:**
- **Parseabilidade Garantida**: Elimina necessidade de regex complexos ou parsing manual
- **Integração com Sistemas**: Output pode alimentar bancos de dados, APIs, UIs diretamente
- **Validação Automática**: Esquemas podem ser validados programaticamente
- **Consistência**: Formato sempre o mesmo, facilitando testes e manutenção
- **Type Safety**: Quando combinado com schemas (JSON Schema, TypeScript interfaces)
- **Interoperabilidade**: JSON/XML são universalmente suportados

**Quando usar:**
- Building APIs ou microserviços com LLMs
- Extração de dados estruturados de texto não-estruturado
- Pipelines de ETL (Extract, Transform, Load)
- Integração com databases ou sistemas legados
- Quando precisar validar programaticamente a resposta

## Como Funciona

### Métodos para Gerar Structured Outputs

**1. Instrução Explícita no Prompt**
```
Extraia informações deste email e retorne em JSON com esta estrutura:
{
  "sender": "nome do remetente",
  "date": "data no formato YYYY-MM-DD",
  "subject": "assunto",
  "action_items": ["item1", "item2"]
}
```

**2. Few-Shot com Exemplos**
```
Exemplo 1:
Input: [texto1]
Output: {"name": "João", "age": 30}

Exemplo 2:
Input: [texto2]
Output: {"name": "Maria", "age": 25}

Agora você:
Input: [seu texto]
Output:
```

**3. Function Calling / Tools (API nativa)**
```python
# OpenAI Function Calling
functions = [{
    "name": "extract_person_info",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {"type": "string"},
            "age": {"type": "integer"},
            "email": {"type": "string", "format": "email"}
        },
        "required": ["name", "age"]
    }
}]
```

**4. JSON Mode (OpenAI) / Structured Output Mode**
```python
response = client.chat.completions.create(
    model="gpt-4",
    response_format={"type": "json_object"},
    messages=[...]
)
```

**5. Output Prefilling (Claude)**
```
User: Extraia dados deste texto...