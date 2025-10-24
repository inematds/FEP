# Long Context Management

## O Que É

Long Context Management envolve técnicas e estratégias para trabalhar efetivamente com janelas de contexto grandes (100k+ tokens) oferecidas por modelos modernos como Claude 3.5 Sonnet (200k), GPT-4 Turbo (128k) e Gemini 1.5 Pro (1M+ tokens).

Não se trata apenas de colocar mais texto no contexto, mas de organizá-lo, estruturá-lo e gerenciá-lo de forma que o modelo possa encontrar e utilizar informações relevantes eficientemente.

## Por Que Usar

**Benefícios:**
- Processar documentos inteiros (livros, contratos, codebases) sem chunking
- Manter histórico completo de conversas longas
- Análise cross-document sem perder contexto
- Reduzir complexidade de sistemas RAG simples
- Better reasoning com acesso a todo o contexto relevante

**Quando usar:**
- Análise de documentos legais extensos
- Code review de repositórios inteiros
- Sumarização de livros ou papers acadêmicos
- Conversas mult

i-turn complexas (customer support, tutoring)
- Research synthesis de múltiplas fontes

## Como Funciona

### Técnicas de Long Context

**1. Document Structuring**
Organize o documento com marcadores claros:
```xml
<document>
  <metadata>
    <title>Contrato de Prestação de Serviços</title>
    <date>2025-01-15</date>
    <parties>ClienteCorp, FornecedorLtda</parties>
  </metadata>

  <section id="1" title="Objeto do Contrato">
    [conteúdo]
  </section>

  <section id="2" title="Valores e Pagamento">
    [conteúdo]
  </section>
</document>
```

**2. Chunking Semântico com Contexto**
```python
chunks = [
    {
        "id": "ch1",
        "content": "...",
        "metadata": {
            "source": "contract.pdf",
            "page": 1,
            "section": "Introduction"
        }
    }
]
```

**3. Hierarchical Summarization**
```
Full Document (200k tokens)
  ↓
Executive Summary (2k tokens)
  ↓
Section Summaries (500 tokens each)
  ↓
Detailed Sections (original)
```

**4. Index-then-Query**
```
Step 1: "Leia este código inteiro e crie um índice de:
- Todas as funções e suas localizações
- Todas as classes
- Dependências principais"

Step 2: "Usando o índice, encontre a função responsável por X"
```

## Exemplos Práticos

### Exemplo 1: Análise de Codebase Completa
```python
prompt = f"""
Você tem acesso a toda a codebase (50k tokens):

<codebase>
{all_files_concatenated}
</codebase>

Tarefa:
1. Identifique todos os endpoints da API REST
2. Para cada endpoint, documente: método HTTP, path, parâmetros, response
3. Verifique se há inconsistências entre rotas similares

Organize por módulo/arquivo.
"""
```

### Exemplo 2: Multi-Document Legal Analysis
```xml
Analise estes 3 contratos em busca de cláusulas conflitantes:

<contract id="A">
[50 páginas de contrato A]
</contract>

<contract id="B">
[45 páginas de contrato B]
</contract>

<contract id="C">
[60 páginas de contrato C]
</contract>

Identifique:
1. Cláusulas de prazo que conflitam entre si
2. Valores que não batem
3. Obrigações duplicadas ou contraditórias

Para cada conflito, cite: contrato, seção e texto específico.
```

### Exemplo 3: Conversational Memory
```python
conversation_history = []

for turn in dialogue:
    # Mantém todo o histórico no contexto
    full_context = "\n".join([
        f"User: {t['user']}\nAssistant: {t['assistant']}"
        for t in conversation_history
    ])

    prompt = f"""
    <conversation_history>
    {full_context}
    </conversation_history>

    <current_user_message>
    {turn['user']}
    </current_user_message>

    Responda considerando todo o contexto da conversa acima.
    """

    response = llm.invoke(prompt)
    conversation_history.append(turn)
```

## Casos de Uso Reais

- **Due Diligence Legal**: Análise de centenas de documentos em M&A
- **Code Review**: Review de PRs grandes ou repositórios inteiros
- **Academic Research**: Synthesis de 10-20 papers relacionados
- **Customer Support**: Manter contexto completo de interações de semanas
- **Content Creation**: Escrever sequels mantendo consistência com texto anterior longo

## Dicas Práticas

1. **Use Marcadores de Estrutura**: XML tags, markdown headers, delimitadores claros para ajudar o modelo a navegar

2. **Informação Relevante no Início e Fim**: Modelos têm melhor recall de informações no começo e fim do contexto (recency/primacy effect)

3. **Cite Fontes**: Peça ao modelo para citar de onde tirou cada informação
   ```
   Sempre cite a fonte: [Contract A, Section 3.2]
   ```

4. **Chunking Hierárquico**: Para contextos enormes, crie sumários progressivos

5. **Monitore Custos**: Long context é mais caro - use somente quando necessário

6. **Test Needle in Haystack**: Teste se o modelo encontra informação específica em meio a muito texto

## Erros Comuns e Como Evitar

### ❌ Erro 1: "Lost in the Middle"
Informação crucial no meio do contexto pode ser negligenciada.

### ✅ Solução
- Coloque info mais importante no início ou fim
- Repita informações críticas
- Use instruções explícitas: "Preste atenção especial à seção X"

### ❌ Erro 2: Contexto Desorganizado
Text dump sem estrutura dificulta navegação.

### ✅ Solução
Use estrutura clara com headers, IDs, metadata:
```xml
<document id="doc1" type="contract" priority="high">
```

### ❌ Erro 3: Assumir Recall Perfeito
Esperar que modelo lembre de cada detalhe em 200k tokens.

### ✅ Solução
- Para informação crítica, crie índice primeiro
- Use two-pass: primeiro scan, depois análise detalhada
- Valide outputs cruzando com original

## Recursos Adicionais

- **Claude 3.5 Documentation**: Guias de uso de long context
- **LangChain TextSplitters**: Ferramentas para chunking inteligente
- **Anthropic's Context Window Guide**: Best practices oficiais
- **"Lost in the Middle" Paper**: Research sobre degradação em long context
- **LlamaIndex**: Framework especializado em contexto longo e RAG

---

**Resumo**: Long Context Management permite aproveitar janelas de contexto massivas de modelos modernos, mas requer estruturação cuidadosa, organização clara e estratégias para garantir que informação relevante seja encontrada e utilizada efetivamente.
