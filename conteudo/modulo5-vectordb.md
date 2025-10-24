# Vector Databases

## O Que É

Vector Databases são bancos de dados otimizados para armazenar, indexar e buscar embeddings vetoriais de alta dimensão (tipicamente 768-1536 dimensões). Diferente de databases relacionais que fazem buscas exatas, vector databases performam similarity search - encontrando vetores "semanticamente próximos" ao vetor de consulta.

São componentes fundamentais em arquiteturas RAG, sistemas de recomendação, e qualquer aplicação que precise encontrar informação similar por significado em vez de matches exatos de palavras.

## Por Que Usar

**Benefícios:**
- **Semantic Search**: Busca por significado, não apenas keywords
- **Escalabilidade**: Bilhões de vetores com latência baixa (< 100ms)
- **Flexibilidade**: Embeddings de texto, imagem, áudio simultaneamente
- **Metadata Filtering**: Combine similarity search com filtros tradicionais
- **Real-time Updates**: Adicionar/atualizar dados sem reindex completo

**Quando usar:**
- RAG (Retrieval-Augmented Generation)
- Semantic search em documentação
- Sistemas de recomendação
- Detecção de similaridade/duplicatas
- Classificação zero-shot

## Como Funciona

### Pipeline Vector Database

```
1. INDEXING PHASE
Document → Chunking → Embedding Model → Vector → Vector DB

2. QUERY PHASE
Query → Embedding Model → Query Vector
    ↓
Vector DB → Similarity Search (cosine/euclidean/dot product)
    ↓
Top-K Similar Vectors → Original Documents
```

### Matemática por Trás

**Cosine Similarity** (mais comum):
```python
similarity = (vector_a · vector_b) / (||vector_a|| * ||vector_b||)
# Range: -1 (opostos) a +1 (idênticos)
```

**Euclidean Distance**:
```python
distance = sqrt(sum((a_i - b_i)^2))
# Menor distância = mais similar
```

## Vector Databases Populares

### Pinecone (Managed Cloud)
```python
import pinecone

pinecone.init(api_key="...", environment="us-west1-gcp")
index = pinecone.Index("my-index")

# Insert vectors
index.upsert(vectors=[
    ("id1", [0.1, 0.2, ...], {"text": "...", "source": "..."}),
    ("id2", [0.3, 0.4, ...], {"text": "...", "source": "..."})
])

# Search
results = index.query(
    vector=[0.15, 0.25, ...],
    top_k=5,
    include_metadata=True,
    filter={"source": {"$eq": "docs.pdf"}}
)
```

**Pros**: Fully managed, scalable, fácil usar
**Cons**: Custo, vendor lock-in

### Weaviate (Open Source)
```python
import weaviate

client = weaviate.Client("http://localhost:8080")

# Create schema
schema = {
    "class": "Document",
    "vectorizer": "text2vec-openai",
    "properties": [
        {"name": "content", "dataType": ["text"]},
        {"name": "source", "dataType": ["string"]}
    ]
}
client.schema.create_class(schema)

# Insert
client.data_object.create(
    {"content": "...", "source": "..."},
    "Document"
)

# Search
result = client.query.get("Document", ["content", "source"])\
    .with_near_text({"concepts": ["machine learning"]})\
    .with_limit(5)\
    .do()
```

**Pros**: Feature-rich, hybrid search, GraphQL
**Cons**: Mais complexo setup

### ChromaDB (Lightweight)
```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

# Insert
collection.add(
    documents=["Doc 1 text", "Doc 2 text"],
    metadatas=[{"source": "a"}, {"source": "b"}],
    ids=["id1", "id2"]
)

# Search
results = collection.query(
    query_texts=["machine learning"],
    n_results=5,
    where={"source": "a"}  # metadata filter
)
```

**Pros**: Zero config, embeddings automáticos, local-first
**Cons**: Menos features enterprise

### Qdrant (High Performance)
```python
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

client = QdrantClient(":memory:")  # ou URL

# Create collection
client.create_collection(
    collection_name="docs",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

# Insert
client.upsert(
    collection_name="docs",
    points=[
        {
            "id": 1,
            "vector": [0.1, 0.2, ...],
            "payload": {"text": "...", "category": "tech"}
        }
    ]
)

# Search
results = client.search(
    collection_name="docs",
    query_vector=[0.15, 0.25, ...],
    limit=5,
    query_filter={"category": {"$eq": "tech"}}
)
```

**Pros**: Rust-based (rápido), rich filtering, open-source
**Cons**: Comunidade menor que Pinecone/Weaviate

## Exemplos Práticos

### Exemplo 1: RAG com Pinecone

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.text_splitter import RecursiveCharacterTextSplitter
import pinecone

# Init
pinecone.init(api_key="...", environment="...")
embeddings = OpenAIEmbeddings()

# Process documents
docs = load_documents("./data/")
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
chunks = splitter.split_documents(docs)

# Create vector store
vectorstore = Pinecone.from_documents(
    chunks,
    embeddings,
    index_name="knowledge-base"
)

# Query
query = "Como resetar senha?"
docs = vectorstore.similarity_search(query, k=4)

for doc in docs:
    print(f"Source: {doc.metadata['source']}")
    print(f"Content: {doc.page_content}\n")
```

### Exemplo 2: Hybrid Search (Semantic + Keyword)

```python
from weaviate import Client

client = Client("http://localhost:8080")

# Hybrid search: combine vector similarity + BM25 keyword search
result = client.query.get("Article", ["title", "content"])\
    .with_hybrid(
        query="machine learning applications",
        alpha=0.7  # 0.7 semantic + 0.3 keyword
    )\
    .with_limit(10)\
    .do()
```

### Exemplo 3: Multi-Modal Vector Search

```python
# Store text AND image embeddings
collection.add(
    embeddings=[
        text_embedding_1,  # from text encoder
        image_embedding_1  # from vision encoder (CLIP)
    ],
    metadatas=[
        {"type": "text", "content": "..."},
        {"type": "image", "url": "..."}
    ],
    ids=["text_1", "img_1"]
)

# Search with text, get both text and images
results = collection.query(
    query_embeddings=[text_query_embedding],
    n_results=10
)
# Results can include both text docs and semantically similar images!
```

## Conceitos Avançados

### 1. Indexing Algorithms

**HNSW (Hierarchical Navigable Small World)**
- Mais comum em production
- Trade-off: velocidade vs recall
- Parâmetros: ef_construction, M

**IVF (Inverted File Index)**
- Divide espaço vetorial em clusters
- Rápido, mas recall pode ser menor

### 2. Approximate Nearest Neighbor (ANN)
```python
# Exact search: 100% recall, slow para bilhões de vetores
# ANN: ~95-99% recall, muito mais rápido

index.query(
    vector=query_vec,
    top_k=10,
    search_params={"ef": 100}  # Higher ef = better recall, slower
)
```

### 3. Metadata Filtering

```python
# Pre-filtering (antes do vector search)
results = index.query(
    vector=vec,
    filter={"date": {"$gte": "2024-01-01"}},  # Filter THEN search
    top_k=5
)

# Post-filtering (depois do vector search)
# Menos eficiente, mas mais flexível
```

## Dicas Práticas

1. **Escolha Dimensionalidade Certa**:
   - OpenAI Ada-002: 1536 dims
   - Sentence Transformers: 384-768 dims
   - Maior não é sempre melhor (custo/performance)

2. **Batch Operations**: Insert/update em batches de 100-1000
   ```python
   index.upsert(vectors=batch, batch_size=100)
   ```

3. **Monitor Costs**: Vector DBs managed cobram por:
   - Armazenamento (GB-month)
   - Queries (por 1k queries)
   - Writes (por 1k inserts)

4. **Backup e Disaster Recovery**: Exporte índices periodicamente

5. **Test Locally First**: Use ChromaDB ou Qdrant local antes de production

## Erros Comuns

### ❌ Erro 1: Dimensões Incompatíveis
```python
# Index criado para 1536 dims
# Tentando inserir vetor com 768 dims → ERRO
```

### ✅ Solução
Sempre use mesmo embedding model para indexing e query.

### ❌ Erro 2: Não Usar Metadata
Perder contexto valioso.

### ✅ Solução
Store tudo que pode ser útil depois:
```python
metadata = {
    "source": "doc.pdf",
    "page": 5,
    "date": "2025-01-15",
    "category": "technical",
    "author": "John"
}
```

### ❌ Erro 3: Ignorar Performance Tuning
Aceitar configurações default sem otimizar.

### ✅ Solução
Test e ajuste parâmetros de index para seu workload específico.

## Recursos Adicionais

- **Pinecone Learning Center**: Tutoriais e best practices
- **Weaviate Documentation**: Guias técnicos detalhados
- **ChromaDB Getting Started**: Quick start para local dev
- **"Billion-Scale Similarity Search"**: Paper sobre HNSW
- **Vector Database Comparison**: Benchmark atualizado de performance

---

**Resumo**: Vector Databases são infraestrutura essencial para aplicações modernas de LLM que precisam de semantic search. Escolha baseado em: managed vs self-hosted, escala necessária, orçamento, e features específicas do seu use case.
