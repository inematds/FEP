# Embeddings e Similarity

## O Que É

Embeddings são representações vetoriais densas de dados (texto, imagens, áudio) em espaços de alta dimensão, onde itens semanticamente similares ficam próximos geometricamente. Um embedding transforma informação complexa e não-estruturada em arrays de números que capturam significado, permitindo operações matemáticas sobre conceitos.

Similarity (similaridade) é a medida de quão "próximos" dois embeddings estão no espaço vetorial, geralmente calculada por cosine similarity, euclidean distance, ou dot product.

## Por Que Usar

**Benefícios:**
- **Semantic Understanding**: Captura significado além de palavras exatas
- **Transferability**: Embeddings pre-trained funcionam em múltiplos domínios
- **Computável**: Operações matemáticas sobre conceitos
- **Escalável**: Buscar milhões de items eficientemente
- **Multi-Modal**: Mesma técnica para texto, imagem, áudio

**Quando usar:**
- Semantic search
- Recomendação de conteúdo similar
- Detecção de duplicatas/plagiarismo
- Clustering de documentos
- Classification zero-shot

## Como Funciona

### Do Texto ao Vetor

```
Texto: "cachorro feliz correndo"
    ↓
Embedding Model (ex: OpenAI Ada-002)
    ↓
Vetor: [0.23, -0.41, 0.67, ..., 0.12]  # 1536 dimensões
```

**Propriedade Mágica**: Textos similares têm vetores próximos!
```
"cachorro feliz correndo" → [0.23, -0.41, 0.67, ...]
"cão alegre andando"      → [0.25, -0.39, 0.65, ...]  # Próximo!

"física quântica"         → [-0.81, 0.53, -0.22, ...] # Distante!
```

### Cálculo de Similaridade

**Cosine Similarity** (mais comum):
```python
from numpy import dot
from numpy.linalg import norm

def cosine_similarity(vec_a, vec_b):
    return dot(vec_a, vec_b) / (norm(vec_a) * norm(vec_b))

# Resultado: -1 (opostos) a +1 (idênticos)
# Tipicamente: > 0.8 = muito similar, < 0.3 = não relacionado
```

**Euclidean Distance**:
```python
import numpy as np

def euclidean_distance(vec_a, vec_b):
    return np.linalg.norm(vec_a - vec_b)

# Menor distância = mais similar
```

## Modelos de Embedding

### Text Embeddings

| Modelo | Dims | Custo | Uso |
|--------|------|-------|-----|
| OpenAI text-embedding-3-small | 1536 | $ | General purpose, bom custo/benefício |
| OpenAI text-embedding-3-large | 3072 | $$ | Maior qualidade |
| Cohere embed-multilingual-v3 | 1024 | $$ | Suporta 100+ idiomas |
| Sentence-Transformers all-MiniLM-L6 | 384 | FREE | Local, rápido, decent quality |
| BGE-M3 | 1024 | FREE | SOTA open-source, multilingual |

### Multimodal Embeddings

| Modelo | Modalidades | Uso |
|--------|-------------|-----|
| CLIP (OpenAI) | Text + Image | Buscar imagens por descrição textual |
| ImageBind (Meta) | 6 modalities | Text, Image, Audio, Video, Depth, IMU |

## Exemplos Práticos

### Exemplo 1: Semantic Search Básico

```python
from openai import OpenAI

client = OpenAI()

def get_embedding(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

# Criar embeddings da base de conhecimento
kb_texts = [
    "Como resetar senha do email",
    "Configurar autenticação de dois fatores",
    "Recuperar conta bloqueada"
]
kb_embeddings = [get_embedding(text) for text in kb_texts]

# Query do usuário
query = "esqueci minha senha"
query_embedding = get_embedding(query)

# Calcular similaridade
from scipy.spatial.distance import cosine

similarities = []
for i, kb_emb in enumerate(kb_embeddings):
    sim = 1 - cosine(query_embedding, kb_emb)  # 1 - cosine distance = similarity
    similarities.append((sim, kb_texts[i]))

# Ranking
similarities.sort(reverse=True)
print("Top 3 mais similares:")
for sim, text in similarities[:3]:
    print(f"{sim:.3f} - {text}")

# Output:
# 0.887 - Como resetar senha do email
# 0.623 - Recuperar conta bloqueada
# 0.401 - Configurar autenticação de dois fatores
```

### Exemplo 2: Detecção de Duplicatas

```python
def find_duplicates(documents, threshold=0.95):
    """Encontra documentos quase idênticos"""
    embeddings = [get_embedding(doc) for doc in documents]
    duplicates = []

    for i in range(len(embeddings)):
        for j in range(i+1, len(embeddings)):
            sim = 1 - cosine(embeddings[i], embeddings[j])
            if sim > threshold:
                duplicates.append({
                    "doc1": documents[i],
                    "doc2": documents[j],
                    "similarity": sim
                })

    return duplicates

docs = [
    "Python é uma linguagem de programação",
    "Python é uma language de programação",  # Quase idêntico
    "Java é usado para desenvolvimento web"
]

dupes = find_duplicates(docs)
# Encontra doc1 e doc2 como duplicatas (similarity > 0.95)
```

### Exemplo 3: Clustering de Documentos

```python
from sklearn.cluster import KMeans
import numpy as np

# Documentos variados
docs = [
    "Machine learning com Python",
    "Deep learning e redes neurais",
    "Receita de bolo de chocolate",
    "Como fazer pão caseiro",
    "Análise de dados com Pandas",
    "Culinária italiana tradicional"
]

# Embeddings
embeddings = np.array([get_embedding(doc) for doc in docs])

# Cluster em 2 grupos
kmeans = KMeans(n_clusters=2, random_state=42)
labels = kmeans.fit_predict(embeddings)

# Agrupar
clusters = {}
for i, label in enumerate(labels):
    if label not in clusters:
        clusters[label] = []
    clusters[label].append(docs[i])

for cluster_id, cluster_docs in clusters.items():
    print(f"\nCluster {cluster_id}:")
    for doc in cluster_docs:
        print(f"  - {doc}")

# Output:
# Cluster 0:
#   - Machine learning com Python
#   - Deep learning e redes neurais
#   - Análise de dados com Pandas

# Cluster 1:
#   - Receita de bolo de chocolate
#   - Como fazer pão caseiro
#   - Culinária italiana tradicional
```

### Exemplo 4: Recomendação de Conteúdo

```python
def recommend_similar(target_doc, candidate_docs, top_k=3):
    """Recomenda documentos similares ao target"""
    target_emb = get_embedding(target_doc)
    candidate_embs = [get_embedding(doc) for doc in candidate_docs]

    similarities = []
    for i, cand_emb in enumerate(candidate_embs):
        sim = 1 - cosine(target_emb, cand_emb)
        similarities.append((sim, candidate_docs[i]))

    similarities.sort(reverse=True)
    return similarities[:top_k]

# Usuário gostou de:
liked = "Tutorial de FastAPI para APIs REST"

# Recomendar entre:
candidates = [
    "Introdução ao Flask web framework",
    "Como fazer bolo de cenoura",
    "Django: construindo web apps Python",
    "React para iniciantes",
    "Poesia brasileira moderna"
]

recs = recommend_similar(liked, candidates, top_k=3)
print("Recomendações:")
for sim, doc in recs:
    print(f"{sim:.3f} - {doc}")

# Output:
# 0.812 - Django: construindo web apps Python
# 0.798 - Introdução ao Flask web framework
# 0.445 - React para iniciantes
```

### Exemplo 5: Multi-Modal (Text-to-Image Search)

```python
import clip
import torch
from PIL import Image

# Load CLIP model
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Encode text query
text_query = "a happy dog running in a park"
text_input = clip.tokenize([text_query]).to(device)
with torch.no_grad():
    text_embedding = model.encode_text(text_input)

# Encode images
image_paths = ["img1.jpg", "img2.jpg", "img3.jpg"]
image_embeddings = []
for img_path in image_paths:
    image = preprocess(Image.open(img_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        img_emb = model.encode_image(image)
        image_embeddings.append(img_emb)

# Find most similar image to text query
similarities = []
for i, img_emb in enumerate(image_embeddings):
    sim = torch.cosine_similarity(text_embedding, img_emb)
    similarities.append((sim.item(), image_paths[i]))

similarities.sort(reverse=True)
print(f"Imagem mais similar: {similarities[0][1]} (score: {similarities[0][0]:.3f})")
```

## Conceitos Avançados

### 1. Dimensionality Reduction
```python
from sklearn.decomposition import PCA

# Reduzir de 1536 dims → 128 dims para visualização/storage
pca = PCA(n_components=128)
reduced_embeddings = pca.fit_transform(embeddings)
```

### 2. Fine-Tuning Embeddings
```python
# Treinar embedding model em seu domínio específico
from sentence_transformers import SentenceTransformer, InputExample, losses

model = SentenceTransformer('all-MiniLM-L6-v2')

# Training data: pares de sentenças similares
train_examples = [
    InputExample(texts=['Python programming', 'Coding in Python'], label=1.0),
    InputExample(texts=['Python programming', 'Cooking recipes'], label=0.0),
]

# Fine-tune
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.CosineSimilarityLoss(model)
model.fit(train_dataloader, epochs=10)
```

### 3. Contextual Embeddings
```python
# Mesma palavra, contextos diferentes, embeddings diferentes
emb1 = get_embedding("O banco do parque está quebrado")
emb2 = get_embedding("Vou ao banco sacar dinheiro")

# "banco" tem significados diferentes → embeddings capturam isso!
```

## Dicas Práticas

1. **Normalize**: Muitos modelos esperam embeddings normalizados (L2 norm = 1)
   ```python
   embedding = embedding / np.linalg.norm(embedding)
   ```

2. **Cache**: Embeddings são caros de computar, cache quando possível

3. **Batch Processing**: Generate múltiplos embeddings em batch
   ```python
   embeddings = client.embeddings.create(
       model="text-embedding-3-small",
       input=["text1", "text2", "text3"]  # Batch!
   )
   ```

4. **Choose Right Model**: Maior nem sempre é melhor
   - Production: velocidade importa
   - Multilingual: use modelo específico
   - Domínio específico: considere fine-tuning

## Erros Comuns

### ❌ Erro 1: Comparar Embeddings de Modelos Diferentes
```python
emb1 = openai.embed("text")      # 1536 dims
emb2 = cohere.embed("text")      # 1024 dims
# NÃO DÁ PARA COMPARAR!
```

### ✅ Solução
Sempre use mesmo modelo para embeddings que serão comparados.

### ❌ Erro 2: Threshold Fixo para Todos os Domínios
```python
if similarity > 0.8:  # "Sempre use 0.8"
    # Threshold varia por domínio e modelo!
```

### ✅ Solução
Test e calibre threshold para seu caso específico.

### ❌ Erro 3: Ignorar Preprocessing
Texto sujo (HTML tags, caracteres especiais) afeta qualidade.

### ✅ Solução
Clean text antes de embedir:
```python
import re
text = re.sub(r'<[^>]+>', '', text)  # Remove HTML
text = text.strip().lower()
```

## Recursos Adicionais

- **MTEB Leaderboard**: Benchmark de embedding models
- **Sentence Transformers**: Library rica para embeddings
- **Hugging Face Embeddings**: Milhares de modelos pre-trained
- **OpenAI Embeddings Guide**: Docs oficiais
- **"Attention Is All You Need"**: Paper seminal sobre Transformers

---

**Resumo**: Embeddings são a representação fundamental que permite máquinas "entenderem" similaridade semântica. São o coração de RAG, search, recommendations, e incontáveis aplicações de ML moderna.
