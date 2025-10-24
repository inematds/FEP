# RAG (Retrieval-Augmented Generation)

## O Que É

RAG (Retrieval-Augmented Generation) é uma arquitetura que combina LLMs com sistemas de busca em bases de conhecimento externas. Em vez de confiar apenas no conhecimento interno do modelo (parametric knowledge), RAG primeiro busca informações relevantes em documentos, databases ou APIs, e então usa essas informações como contexto para gerar respostas fundamentadas em dados reais.

## Por Que Usar

**Benefícios:**
- **Informação Atualizada**: Dados além do training cutoff do modelo
- **Conhecimento Específico**: Acesso a documentação proprietária, interna
- **Redução de Alucinações**: Respostas baseadas em fontes verificáveis
- **Citabilidade**: Pode citar fontes exatas
- **Escalabilidade de Conhecimento**: Adicionar novos dados sem retreinar modelo
- **Privacy**: Dados sensíveis não precisam estar no modelo

**Quando usar:**
- Customer support com base de conhecimento grande
- Q&A sobre documentação técnica
- Análise de documentos corporativos
- Research assistants
- Sistemas que precisam de informação sempre atualizada

## Como Funciona

### Arquitetura RAG Básica

```
User Query
    ↓
1. RETRIEVE
    - Convert query to embedding
    - Search vector database
    - Get top-k relevant documents
    ↓
2. AUGMENT
    - Combine query + retrieved docs in prompt
    - Add instructions
    ↓
3. GENERATE
    - LLM generates answer based on context
    ↓
Response (with citations)
```

### Pipeline Detalhado

```python
class RAGPipeline:
    def __init__(self, embedding_model, vector_db, llm):
        self.embedding_model = embedding_model  # e.g., OpenAI Ada-002
        self.vector_db = vector_db  # e.g., Pinecone, Weaviate
        self.llm = llm  # e.g., Claude, GPT-4

    def query(self, user_question):
        # 1. RETRIEVE
        query_embedding = self.embedding_model.embed(user_question)
        relevant_docs = self.vector_db.similarity_search(
            query_embedding,
            top_k=5
        )

        # 2. AUGMENT
        context = self.build_context(user_question, relevant_docs)

        # 3. GENERATE
        response = self.llm.generate(context)

        return response, relevant_docs  # Return answer + sources

    def build_context(self, question, docs):
        context = f"""
Answer the question based on the context below.

Context:
{
    "\n\n---\n\n".join([
        f"Source: {doc.metadata['source']}\n{doc.content}"
        for doc in docs
    ])
}

Question: {question}

Instructions:
- Base your answer ONLY on the context above
- Cite sources like [Source: filename.pdf]
- If information is insufficient, say so clearly
"""
        return context
```

## Exemplos Práticos

### Exemplo 1: Documentação Técnica Q&A

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.llms import Anthropic
from langchain.chains import RetrievalQA

# Setup
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone.from_documents(docs, embeddings, index_name="tech-docs")
llm = Anthropic(model="claude-3-5-sonnet-20250219")

# Create RAG chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # "stuff" all docs into context
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4})
)

# Query
question = "Como configurar autenticação OAuth2 na API?"
answer = qa_chain.run(question)
print(answer)
```

### Exemplo 2: Customer Support com Citations

```python
def answer_support_question(question, knowledge_base):
    # Retrieve
    retrieved = knowledge_base.search(question, top_k=3)

    # Augment + Generate
    prompt = f"""
You are a customer support assistant.

<knowledge_base>
{format_docs_with_ids(retrieved)}
</knowledge_base>

<user_question>
{question}
</user_question>

Instructions:
1. Answer based solely on the knowledge base
2. Cite article IDs like [KB-123]
3. If answer not in KB, offer to escalate to human
4. Be concise but complete

Answer:
"""

    response = llm.invoke(prompt)

    return {
        "answer": response,
        "sources": [doc.metadata for doc in retrieved]
    }
```

### Exemplo 3: Multi-Hop RAG (Reasoning Chains)

```python
def multi_hop_rag(complex_question):
    # Question decomposition
    sub_questions = llm.invoke(f"Break this into 2-3 simpler questions: {complex_question}")

    # Retrieve for each sub-question
    all_context = []
    for sq in sub_questions:
        docs = vector_db.search(sq)
        all_context.extend(docs)

    # Synthesize
    final_prompt = f"""
Original Question: {complex_question}

Sub-questions asked:
{sub_questions}

Retrieved Information:
{format_docs(all_context)}

Synthesize a comprehensive answer to the original question:
"""

    return llm.invoke(final_prompt)
```

## Variações de RAG

### 1. Naive RAG (Basic)
```
Query → Retrieve → Generate
```

### 2. Advanced RAG
```
Query Rewriting → Retrieve → Rerank → Generate → Self-Check
```

### 3. Modular RAG
```
Query → Routing → Multiple Retrievers → Fusion → Generate
```

### 4. Agentic RAG
```
Query → Plan → Iterative Retrieve/Reason → Synthesize
```

## Componentes Chave

### Embeddings
```python
# Text to vector
text = "Como resetar senha?"
vector = embedding_model.encode(text)  # [0.23, -0.41, 0.67, ...]
```

### Vector Databases
- **Pinecone**: Managed, scalable
- **Weaviate**: Open-source, rich features
- **ChromaDB**: Lightweight, local-first
- **Qdrant**: High performance
- **FAISS**: Facebook's library, in-memory

### Retrieval Strategies
1. **Semantic Search**: Similarity by meaning
2. **Keyword Search**: BM25, TF-IDF
3. **Hybrid**: Combine semantic + keyword
4. **Metadata Filtering**: Filter by date, category, author

### Reranking
```python
# Initial retrieve: top 20
candidates = vector_db.search(query, k=20)

# Rerank: top 5
reranked = cross_encoder.rerank(query, candidates, top_k=5)
```

## Dicas Práticas

1. **Chunking Strategy**: 500-1000 tokens por chunk com overlap de 10-20%
2. **Metadata is Gold**: Store source, date, author, category
3. **Hybrid Search**: Combine semantic + keyword para melhor recall
4. **Reranking**: Segunda passagem melhora precisão significativamente
5. **Cache Results**: Cache embeddings e retrieved docs
6. **Monitor Relevance**: Track se docs retrieved são realmente úteis

## Erros Comuns

### ❌ Erro 1: Chunks Muito Pequenos ou Grandes
Muito pequeno: falta contexto. Muito grande: ruído.

### ✅ Solução
Test 300-1500 tokens, veja o que funciona para seu domínio.

### ❌ Erro 2: Não Usar Metadata
Perder informação valiosa de contexto.

### ✅ Solução
```python
chunk.metadata = {
    "source": "manual.pdf",
    "page": 42,
    "section": "Troubleshooting",
    "date": "2025-01-01"
}
```

### ❌ Erro 3: Retrieval Pobre = Resposta Pobre
LLM só é tão bom quanto o que você dá para ele.

### ✅ Solução
Invista tempo otimizando retrieval: embeddings, reranking, hybrid search.

## Recursos Adicionais

- **LangChain RAG Docs**: Framework líder para RAG
- **LlamaIndex**: Especializado em RAG e data indexing
- **Pinecone Learning Center**: Tutoriais de vector search
- **"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"**: Paper original
- **Weaviate Blog**: Case studies de RAG em produção

---

**Resumo**: RAG é a arquitetura padrão para LLMs que precisam de conhecimento específico, atualizado ou verificável. Combina o melhor de search systems e generation models para respostas fundamentadas e citáveis.
