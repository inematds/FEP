# Memory Systems

## O Que É

Memory Systems para agentes de IA são arquiteturas que permitem LLMs manterem e utilizarem informações ao longo de múltiplas interações, sessões ou até permanentemente. Diferente do contexto stateless padrão, memory systems dão aos agentes a capacidade de "lembrar" conversas passadas, aprender com interações e manter continuidade de conhecimento.

## Por Que Usar

**Benefícios:**
- **Continuidade**: Conversas coerentes across sessions
- **Personalização**: Adaptar comportamento baseado em histórico do usuário
- **Eficiência**: Não repetir informações já estabelecidas
- **Learning**: Melhorar over time com feedback
- **Context Preservation**: Manter estado em conversations longas

**Quando usar:**
- Customer support multi-session
- Personal assistants (lembrar preferências)
- Educational tutors (tracking progress)
- Long-running research tasks
- Collaborative work assistants

## Tipos de Memória

### 1. Working Memory (Memória de Trabalho)
**O que é**: Contexto da conversa atual dentro de uma sessão

```python
class WorkingMemory:
    def __init__(self):
        self.messages = []

    def add_message(self, role: str, content: str):
        self.messages.append({"role": role, "content": content})

    def get_context(self, max_messages=10):
        # Pega últimas N mensagens
        return self.messages[-max_messages:]

# Uso
memory = WorkingMemory()
memory.add_message("user", "Meu nome é João")
memory.add_message("assistant", "Prazer, João!")
memory.add_message("user", "Qual meu nome?")

# LLM recebe contexto completo
context = memory.get_context()
# LLM pode responder: "Seu nome é João"
```

### 2. Episodic Memory (Memória Episódica)
**O que é**: Memória de eventos/conversas passadas específicas

```python
class EpisodicMemory:
    def __init__(self, vector_db):
        self.vector_db = vector_db

    def store_conversation(self, conversation_id: str, messages: list, metadata: dict):
        # Summarize conversation
        summary = llm.invoke(f"Summarize this conversation: {messages}")

        # Store with embedding
        embedding = embed(summary)
        self.vector_db.add(
            id=conversation_id,
            vector=embedding,
            metadata={
                "summary": summary,
                "date": metadata["date"],
                "user_id": metadata["user_id"],
                "messages": messages
            }
        )

    def recall_similar(self, query: str, top_k=3):
        # Buscar conversas similares
        query_embedding = embed(query)
        results = self.vector_db.search(query_embedding, k=top_k)
        return [r.metadata for r in results]

# Uso
episodic = EpisodicMemory(vector_db)

# Store past conversation
episodic.store_conversation(
    "conv_123",
    messages=[...],
    metadata={"date": "2025-01-15", "user_id": "user_001"}
)

# Later, recall relevant past conversations
query = "What did we discuss about pricing?"
similar_convs = episodic.recall_similar(query)
# Returns: summaries of past conversations about pricing
```

### 3. Semantic Memory (Memória Semântica)
**O que é**: Conhecimento factual acumulado, facts sobre o usuário ou domínio

```python
class SemanticMemory:
    def __init__(self):
        self.facts = {}  # key-value knowledge store

    def store_fact(self, key: str, value: any, confidence=1.0):
        self.facts[key] = {
            "value": value,
            "confidence": confidence,
            "timestamp": datetime.now()
        }

    def get_fact(self, key: str):
        return self.facts.get(key, {}).get("value")

    def get_user_profile(self, user_id: str):
        # Get all facts about user
        return {k: v for k, v in self.facts.items() if k.startswith(f"user:{user_id}:")}

# Uso
semantic = SemanticMemory()

# Learn facts over time
semantic.store_fact("user:123:name", "João Silva")
semantic.store_fact("user:123:company", "TechCorp")
semantic.store_fact("user:123:role", "CTO")
semantic.store_fact("user:123:preferences", {"language": "pt-BR", "timezone": "UTC-3"})

# Later, retrieve
user_profile = semantic.get_user_profile("user:123")
# Can personalize responses based on profile
```

### 4. Procedural Memory
**O que é**: "Como fazer" - procedures e workflows aprendidos

```python
class ProceduralMemory:
    def __init__(self):
        self.procedures = {}

    def learn_procedure(self, name: str, steps: list):
        self.procedures[name] = {
            "steps": steps,
            "success_count": 0,
            "fail_count": 0
        }

    def execute_procedure(self, name: str):
        if name in self.procedures:
            return self.procedures[name]["steps"]
        return None

    def record_outcome(self, name: str, success: bool):
        if name in self.procedures:
            if success:
                self.procedures[name]["success_count"] += 1
            else:
                self.procedures[name]["fail_count"] += 1

# Uso
procedural = ProceduralMemory()

# Agent learns successful procedure
procedural.learn_procedure("password_reset", [
    "1. Verify user identity",
    "2. Generate reset token",
    "3. Send email with link",
    "4. Confirm reset completion"
])

# Later, execute learned procedure
steps = procedural.execute_procedure("password_reset")
# Agent follows established workflow
```

## Implementação Completa: Multi-Tier Memory System

```python
class AgentMemory:
    def __init__(self, user_id: str):
        self.user_id = user_id
        self.working = WorkingMemory()
        self.episodic = EpisodicMemory(vector_db)
        self.semantic = SemanticMemory()
        self.procedural = ProceduralMemory()

    def process_interaction(self, user_message: str):
        # 1. Add to working memory
        self.working.add_message("user", user_message)

        # 2. Extract and store facts
        facts = extract_facts(user_message)  # LLM call
        for fact in facts:
            self.semantic.store_fact(f"user:{self.user_id}:{fact['key']}", fact['value'])

        # 3. Build context from all memory types
        context = self.build_context(user_message)

        # 4. Generate response
        response = llm.invoke(context)

        # 5. Add response to working memory
        self.working.add_message("assistant", response)

        return response

    def build_context(self, current_query: str):
        context_parts = []

        # Working memory (recent messages)
        context_parts.append("## Recent Conversation:")
        context_parts.append(format_messages(self.working.get_context()))

        # Semantic memory (user facts)
        user_profile = self.semantic.get_user_profile(self.user_id)
        if user_profile:
            context_parts.append("\n## User Profile:")
            context_parts.append(json.dumps(user_profile, indent=2))

        # Episodic memory (relevant past conversations)
        past_convs = self.episodic.recall_similar(current_query, top_k=2)
        if past_convs:
            context_parts.append("\n## Relevant Past Conversations:")
            for conv in past_convs:
                context_parts.append(f"- {conv['summary']}")

        # Current query
        context_parts.append(f"\n## Current Query:\n{current_query}")

        return "\n".join(context_parts)

    def end_session(self, conversation_id: str):
        # Store episodic memory
        self.episodic.store_conversation(
            conversation_id,
            self.working.messages,
            {"date": datetime.now(), "user_id": self.user_id}
        )

        # Clear working memory
        self.working = WorkingMemory()
```

## Memory Management Strategies

### 1. Forgetting (Memory Decay)
```python
def decay_memories(memory_store, decay_rate=0.1):
    """Reduce confidence of old memories"""
    for key, fact in memory_store.items():
        age_days = (datetime.now() - fact["timestamp"]).days
        fact["confidence"] *= (1 - decay_rate) ** age_days

        # Remove if confidence too low
        if fact["confidence"] < 0.1:
            del memory_store[key]
```

### 2. Memory Consolidation
```python
def consolidate_memories(episodic_memory, time_window_days=7):
    """Merge similar recent memories"""
    recent = episodic_memory.get_recent(days=time_window_days)

    # Cluster similar conversations
    clusters = cluster_by_topic(recent)

    # Create consolidated summaries
    for cluster in clusters:
        summary = llm.invoke(f"Create meta-summary of these conversations: {cluster}")
        episodic_memory.store(summary, is_consolidated=True)

        # Archive originals
        for conv in cluster:
            episodic_memory.archive(conv.id)
```

### 3. Prioritized Recall
```python
def prioritized_recall(memory, query, top_k=5):
    """Recall based on relevance, recency, and importance"""
    candidates = memory.search(query, k=top_k*2)

    # Score each memory
    scored = []
    for mem in candidates:
        relevance = mem.similarity_score  # From vector search
        recency = 1 / (1 + (datetime.now() - mem.timestamp).days)
        importance = mem.metadata.get("importance", 0.5)

        score = 0.5*relevance + 0.3*recency + 0.2*importance
        scored.append((score, mem))

    # Return top-k by combined score
    scored.sort(reverse=True)
    return [mem for _, mem in scored[:top_k]]
```

## Best Practices

1. **Privacy & Security**: Encrypt sensitive memories, user consent for storage
2. **GDPR Compliance**: Implement right to be forgotten
   ```python
   def forget_user(user_id):
       semantic.delete_user_facts(user_id)
       episodic.delete_user_conversations(user_id)
   ```
3. **Memory Limits**: Set max storage per user to control costs
4. **Fact Verification**: Verify facts before storing
5. **Metadata Richness**: Store timestamps, confidence, source

## Recursos Adicionais

- **Mem0**: Open-source memory layer for AI agents
- **LangChain Memory**: Built-in memory modules
- **Zep**: Long-term memory store for LLM apps
- **Paper: "Generative Agents" (Stanford)**: Simulated humans with memory

---

**Resumo**: Memory Systems transformam agents stateless em assistentes com continuidade e contexto. Combinando working, episodic, semantic e procedural memory, agents podem lembrar, aprender e personalizar interações over time.
