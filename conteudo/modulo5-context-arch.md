# Arquitetura de Contexto

## O Que É

Arquitetura de Contexto é a prática deliberada de organizar, estruturar e priorizar informações dentro da janela de contexto de um LLM para maximizar compreensão, recall e qualidade de resposta. É como design de informação, mas especificamente otimizado para como modelos de linguagem processam e acessam dados.

## Por Que Usar

**Benefícios:**
- **Melhor Recall**: Informação relevante é encontrada e utilizada
- **Redução de Alucinações**: Contexto claro reduz invenção de fatos
- **Eficiência de Tokens**: Aproveitar melhor o espaço disponível
- **Raciocínio Mais Preciso**: Modelo tem o que precisa quando precisa
- **Escalabilidade**: Suportar contextos cada vez maiores sem degradação

## Como Funciona

### Princípios de Arquitetura Eficaz

**1. Princípio da Recência e Primazia**
```
[INÍCIO DO CONTEXTO - alta atenção]
    Informação crítica e instruções principais
[MEIO DO CONTEXTO - atenção variável]
    Dados de suporte, exemplos, background
[FIM DO CONTEXTO - alta atenção]
    Task específica, pergunta atual, refresh de info crítica
```

**2. Chunking Semântico**
Agrupe informações relacionadas logicamente:
```xml
<knowledge_base>
  <topic id="pricing">
    <rule>Desconto máximo: 15%</rule>
    <rule>Clientes VIP: até 25%</rule>
  </topic>

  <topic id="shipping">
    <rule>Frete grátis acima de R$200</rule>
    <rule>Prazo: 5-7 dias úteis</rule>
  </topic>
</knowledge_base>
```

**3. Hierarquia Clara**
```
# Nível 1: Missão do Sistema
Você é um assistente técnico...

## Nível 2: Regras Globais
- Sempre seja preciso
- Cite fontes

### Nível 3: Tópico Específico
#### Nível 4: Subtópico
```

**4. Delimitadores e Marcadores**
```xml
<user_query>
Qual o prazo de entrega?
</user_query>

<relevant_context>
Informação de shipping: [...]
</relevant_context>

<instructions>
Responda baseado APENAS no contexto acima.
</instructions>
```

## Exemplos Práticos

### Exemplo 1: Customer Support Bot Architecture

```xml
<system_identity>
Nome: SupportBot Pro
Empresa: TechCorp
Tom: Profissional, empático, solutivo
</system_identity>

<critical_rules priority="highest">
1. NUNCA prometa reembolsos sem aprovação
2. SEMPRE verifique ID do cliente antes de compartilhar dados
3. Escalar para humano se incerteza > 30%
</critical_rules>

<knowledge_base>
  <policies>
    <return_policy>
      Devolução: até 30 dias
      Condição: produto sem uso
      Processo: [...]
    </return_policy>

    <warranty>
      Garantia: 12 meses
      Cobertura: defeitos de fábrica
      Exclusões: dano físico, uso indevido
    </warranty>
  </policies>

  <faq>
    <question>Como rastrear pedido?</question>
    <answer>Acesse: minhaconta.com/pedidos</answer>
  </faq>
</knowledge_base>

<current_conversation>
<turn n="1">
  <user>Meu produto chegou com defeito</user>
  <assistant>Lamento muito! Vamos resolver...</assistant>
</turn>
<turn n="2">
  <user>Quero devolução</user>
  <assistant>[GERANDO AGORA...]</assistant>
</turn>
</current_conversation>

<task>
Responda à última mensagem do usuário considerando:
- Políticas de devolução acima
- Histórico da conversa
- Tom empático
</task>
```

### Exemplo 2: RAG (Retrieval-Augmented Generation) Context

```python
def build_rag_context(query, retrieved_docs):
    context = f"""
<user_question>
{query}
</user_question>

<retrieved_information>
{
  f'''
  <document id="{i}" relevance_score="{doc.score}">
    <source>{doc.source}</source>
    <content>{doc.content}</content>
  </document>
  '''
  for i, doc in enumerate(retrieved_docs, 1)
}
</retrieved_information>

<instructions>
1. Analise TODOS os documentos acima
2. Sintetize informação relevante para responder a pergunta
3. Cite fontes: [Document ID]
4. Se informação for insuficiente, diga explicitamente
5. NÃO invente informações além dos documentos
</instructions>

Responda à pergunta agora:
"""
    return context
```

### Exemplo 3: Multi-Step Task with Context Evolution

```python
# Step 1: Análise inicial
context_step1 = f"""
<document>{full_text}</document>

<task>Leia e extraia os 5 temas principais</task>
"""

themes = llm.invoke(context_step1)

# Step 2: Análise profunda (context evolves)
context_step2 = f"""
<original_document>{full_text}</original_document>

<themes_identified>{themes}</themes_identified>

<task>
Para cada tema, encontre:
1. Citações relevantes (com página/linha)
2. Subtópicos mencionados
3. Gaps na cobertura
</task>
"""

analysis = llm.invoke(context_step2)

# Step 3: Síntese final
context_step3 = f"""
<document_summary>{themes}</document_summary>

<detailed_analysis>{analysis}</detailed_analysis>

<task>
Crie relatório executivo (200 palavras) que sintetize:
- Principais descobertas
- Lacunas identificadas
- Recomendações de ação
</task>
"""
```

## Estratégias Avançadas

### 1. Context Windowing (Sliding Window)
```python
# Para documentos maiores que contexto
def sliding_window_process(doc, window_size=4000, overlap=500):
    results = []
    for i in range(0, len(doc), window_size - overlap):
        chunk = doc[i:i+window_size]
        context = build_context(chunk, metadata={"position": i})
        result = llm.invoke(context)
        results.append(result)
    return merge_results(results)
```

### 2. Hierarchical Context
```python
context = f"""
# Layer 1: Global Context
{system_prompt}

## Layer 2: Domain Knowledge
{domain_facts}

### Layer 3: Specific Task
{task_description}

#### Layer 4: Current Input
{user_input}
"""
```

### 3. Priority Tagging
```xml
<info priority="critical">SEMPRE verifique este ponto</info>
<info priority="high">Importante considerar</info>
<info priority="normal">Contexto adicional</info>
<info priority="low">Informação opcional</info>
```

## Casos de Uso Reais

- **Legal Document Analysis**: Estruturar cláusulas, artigos, referências claramente
- **Code Review**: Organizar código, testes, documentação em seções navegáveis
- **Medical Diagnosis Support**: Priorizar sintomas, histórico, exames hierarquicamente
- **Financial Analysis**: Agrupar dados por timeframe, categoria, fonte
- **Educational Tutoring**: Separar conceitos base, exemplos, exercícios, hints

## Dicas Práticas

1. **Use Delimitadores Consistentes**: XML, Markdown headers, ou custom tags
2. **Meta-Information Helps**: Timestamps, IDs, source tags melhoram tracking
3. **Test Information Recall**: Esconda info crítica no meio e teste se modelo a encontra
4. **Minimize Redundância**: Não repita informação unless para ênfase deliberada
5. **Versione Estruturas**: Track mudanças na arquitetura de contexto

## Erros Comuns

### ❌ Erro 1: Dumping de Informação
Jogar tudo no contexto sem estrutura.

### ✅ Solução
Organize em seções lógicas com headers claros.

### ❌ Erro 2: Info Crítica no Meio
Informação mais importante enterrada no meio do contexto.

### ✅ Solução
Repita info crítica no início E fim, ou use marcadores de prioridade.

### ❌ Erro 3: Falta de Separação
Misturar instruções, dados, exemplos sem delimitação.

### ✅ Solução
Use tags/marcadores para separar tipos de informação.

## Recursos Adicionais

- **Anthropic Context Window Guide**: Best practices oficiais
- **LangChain Document Loaders**: Tools para estruturar docs
- **"Lost in the Middle" Paper**: Research sobre context positioning
- **Prompt Engineering Guide**: Seção sobre context management

---

**Resumo**: Arquitetura de Contexto bem planejada é fundamental para aproveitar janelas de contexto grandes efetivamente. Organize, priorize e estruture informação pensando em como o modelo vai acessá-la.
