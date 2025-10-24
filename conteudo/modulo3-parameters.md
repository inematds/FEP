# Ajuste de Parâmetros de Modelo

## Introdução

O **ajuste de parâmetros** permite controlar o comportamento do modelo **além do texto do prompt**. Enquanto o prompt define "o que" você quer, os parâmetros controlam "como" o modelo gera a resposta.

Parâmetros como temperature, top-p, max tokens, e penalties oferecem **fine-tuning entre criatividade e precisão**, entre determinismo e aleatoriedade.

Dominar parâmetros é essencial para obter resultados consistentes e otimizados em produção.

---

## Por que Parâmetros Importam?

### O Prompt Não é Tudo

Mesmo com um prompt perfeito, parâmetros incorretos podem arruinar o output:

- **Análise de dados com temperature alta** → respostas inconsistentes
- **Brainstorming com temperature baixa** → ideias genéricas e previsíveis
- **Max tokens muito baixo** → resposta cortada no meio
- **Penalties mal configuradas** → repetição ou diversidade excessiva

### Casos de Uso Diferentes = Parâmetros Diferentes

| Caso de Uso | Temperature | Top-P | Max Tokens | Penalties |
|-------------|-------------|-------|------------|-----------|
| Código | 0.0-0.2 | 0.1 | Alto | Baixa |
| Análise de dados | 0.1-0.3 | 0.1-0.3 | Médio | Baixa |
| Escrita técnica | 0.3-0.5 | 0.5 | Alto | Média |
| Conteúdo criativo | 0.7-0.9 | 0.9 | Alto | Alta |
| Brainstorming | 0.8-1.0 | 0.95 | Médio | Alta |

---

## Parâmetros Principais

### 1. Temperature (0.0 - 2.0)

**O que faz:** Controla a **aleatoriedade** e **criatividade** das respostas.

#### Como Funciona Tecnicamente

Quando o modelo gera texto, ele calcula probabilidades para cada possível próximo token:

```
Próximas palavras possíveis:
- "é" → 45%
- "era" → 30%
- "foi" → 15%
- "está" → 8%
- "seria" → 2%
```

**Temperature modifica essas probabilidades:**

**Temperature = 0.0 (Determinístico)**
- Sempre escolhe a opção mais provável
- 100% previsível
- Sem aleatoriedade

**Temperature = 0.5 (Equilibrado)**
- Probabilidades ajustadas moderadamente
- Mix de previsibilidade e variação

**Temperature = 1.0 (Alta criatividade)**
- Probabilidades achatadas
- Tokens menos prováveis têm mais chance
- Respostas mais diversas e surpreendentes

---

#### Temperature Baixa (0.0 - 0.3)

**Características:**
- ✅ Respostas determinísticas e consistentes
- ✅ Foca em tokens mais prováveis
- ✅ Previsível e factual
- ✅ Ideal para tarefas com resposta "certa"

**Quando usar:**
- Código e programação
- Análise de dados
- Tarefas factuais (tradução, extração)
- Matemática e lógica
- Quando precisa repetibilidade

**Exemplo:**
```
Prompt: "Complete: A capital do Brasil é..."

Temperature 0.0:
"Brasília."

Temperature 0.0 (segunda vez):
"Brasília."  [mesma resposta]
```

---

#### Temperature Média (0.4 - 0.7)

**Características:**
- ✅ Equilíbrio entre criatividade e consistência
- ✅ Respostas variadas mas sensatas
- ✅ Boa para conversação natural

**Quando usar:**
- Conversação geral
- Explicações e tutoriais
- Conteúdo educacional
- Atendimento ao cliente
- Casos de uso gerais

**Exemplo:**
```
Prompt: "Descreva o outono em uma frase."

Temperature 0.5 (1ª vez):
"O outono traz folhas douradas e temperaturas amenas."

Temperature 0.5 (2ª vez):
"Folhas caem suavemente enquanto o ar fica mais fresco."
```

---

#### Temperature Alta (0.8 - 1.5)

**Características:**
- ✅ Respostas criativas e diversas
- ✅ Vocabulário rico e variado
- ✅ Surpreendente e original
- ⚠️ Pode ser inconsistente
- ⚠️ Maior risco de "nonsense"

**Quando usar:**
- Brainstorming e ideação
- Escrita criativa (histórias, poesia)
- Geração de nomes/títulos
- Quando diversidade é prioridade
- Explorações criativas

**Exemplo:**
```
Prompt: "Crie nome para app de meditação."

Temperature 0.9:
- "Respiro Sereno"
- "Mindful Echo"
- "Pausa Interior"
- "Zen Pulse"

Temperature 0.2:
- "App de Meditação"
- "Meditação Guiada"
- "Medita Fácil"  [nomes óbvios/genéricos]
```

---

### 2. Top-P / Nucleus Sampling (0.0 - 1.0)

**O que faz:** Controla a **diversidade de tokens** considerados durante a geração.

#### Como Funciona

Top-P considera apenas os tokens cuja probabilidade cumulativa soma até P.

**Exemplo visual:**

```
Tokens possíveis com probabilidades:
1. "o" → 40%
2. "a" → 30%
3. "um" → 15%
4. "uma" → 10%
5. "este" → 3%
6. "aquele" → 2%

Top-P = 0.7 (70%):
Considera apenas tokens 1 e 2 (40% + 30% = 70%)

Top-P = 0.95 (95%):
Considera tokens 1-5 (soma 98%)
```

---

#### Top-P Baixo (0.1 - 0.5)

**Comportamento:**
- Considera apenas tokens altamente prováveis
- Respostas focadas e previsíveis
- Menos diversidade

**Quando usar:**
- Tarefas factuais
- Código
- Quando precisa consistência máxima

---

#### Top-P Alto (0.9 - 1.0)

**Comportamento:**
- Considera ampla variedade de tokens
- Permite criatividade e diversidade
- Respostas menos previsíveis

**Quando usar:**
- Escrita criativa
- Brainstorming
- Quando diversidade é desejável

---

### ⚠️ Temperature vs Top-P

**Importante:** Temperature e Top-P têm efeitos similares.

**Recomendação:**
- Ajuste **UM** deles, não ambos simultaneamente
- Padrão comum: Top-P fixo (0.9-1.0), variar Temperature
- OU: Temperature fixa (0.7), variar Top-P

---

### 3. Max Tokens (Completion Length)

**O que faz:** Limita o **tamanho máximo da resposta** gerada.

#### Como Funciona

- Define número máximo de tokens no output
- Modelo para quando atinge o limite (pode cortar no meio!)
- Não garante que vai usar tudo (pode terminar antes)

---

#### Estratégias de Uso

**Respostas Curtas (50-150 tokens)**
```
Use quando:
- Respostas tipo "sim/não" com justificativa
- Resumos de 2-3 frases
- Descriptions curtas
```

**Respostas Médias (200-500 tokens)**
```
Use quando:
- Explicações de conceitos
- Análises estruturadas
- Emails e mensagens
```

**Respostas Longas (1000+ tokens)**
```
Use quando:
- Artigos e conteúdo extenso
- Análises profundas
- Documentação
- Código complexo
```

---

#### ⚠️ Armadilhas Comuns

**Problema 1: Max Tokens Muito Baixo**
```
Max Tokens: 50
Prompt: "Escreva tutorial completo de Git"

Output:
"Git é um sistema de controle de versão. Para começar,
instale usando..."  [CORTADO]
```

**Solução:** Sempre deixe margem (se precisa 100, configure 150).

---

**Problema 2: Não Considerar Prompt + Output**
```
Context Window: 4000 tokens
Prompt: 3900 tokens
Max Tokens: 500

Resultado: ERRO (3900 + 500 > 4000)
```

**Solução:** Max Tokens ≤ (Context Window - Prompt Tokens - Margem)

---

### 4. Presence Penalty (-2.0 - 2.0)

**O que faz:** Penaliza **tópicos** que já foram mencionados.

#### Como Funciona

- **0.0:** Sem penalização (padrão)
- **Positivo (0.1 - 1.0):** Encoraja diversidade de tópicos
- **Negativo:** Encoraja repetição de tópicos (raramente útil)

#### Quando Usar

**Presence Penalty Positiva (0.3 - 0.6):**
```
Use quando:
- Listagens (quer cobertura ampla)
- Brainstorming (quer ideias diversas)
- Evitar que modelo "fique preso" em um tópico
```

**Exemplo:**
```
Prompt: "Liste 10 estratégias de marketing digital"

Presence Penalty = 0.0:
1. Marketing de conteúdo
2. Marketing de conteúdo em blog
3. Marketing de conteúdo em vídeo
4. Marketing de conteúdo em podcast
[muito repetitivo]

Presence Penalty = 0.6:
1. Marketing de conteúdo
2. SEO e otimização
3. Email marketing
4. Social media ads
5. Influencer partnerships
[mais diverso]
```

---

### 5. Frequency Penalty (-2.0 - 2.0)

**O que faz:** Penaliza **tokens específicos** que já apareceram.

#### Como Funciona

- **0.0:** Sem penalização
- **Positivo (0.1 - 1.0):** Reduz repetição de palavras
- **Negativo:** Encoraja repetição (raramente útil)

#### Quando Usar

**Frequency Penalty Positiva (0.3 - 0.6):**
```
Use quando:
- Quer variedade vocabular
- Evitar que mesma palavra apareça múltiplas vezes
- Texto fica repetitivo
```

**Exemplo:**
```
Frequency Penalty = 0.0:
"O produto é ótimo. A qualidade do produto impressiona.
O produto superou expectativas."
[palavra "produto" repetida 3x]

Frequency Penalty = 0.5:
"O produto é ótimo. A qualidade impressiona.
Este item superou expectativas."
[variação vocabular]
```

---

## Parâmetros por Caso de Uso

### Código e Programação

```json
{
  "temperature": 0.0,
  "top_p": 0.1,
  "max_tokens": 2000,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.0
}
```

**Rationale:**
- Temperature 0.0: Código precisa ser correto e determinístico
- Top-P baixo: Foque em padrões mais prováveis (melhores práticas)
- Max tokens alto: Código pode ser longo
- Sem penalties: Código muitas vezes repete padrões (loops, etc.)

---

### Análise de Dados

```json
{
  "temperature": 0.2,
  "top_p": 0.3,
  "max_tokens": 800,
  "presence_penalty": 0.0,
  "frequency_penalty": 0.1
}
```

**Rationale:**
- Temperature baixa: Precisão e consistência
- Max tokens médio: Análises estruturadas mas não excessivas
- Frequency penalty baixa: Evita repetir mesmos números/termos

---

### Conteúdo Criativo (Blog, Marketing)

```json
{
  "temperature": 0.7,
  "top_p": 0.9,
  "max_tokens": 1500,
  "presence_penalty": 0.3,
  "frequency_penalty": 0.4
}
```

**Rationale:**
- Temperature média-alta: Criatividade mas coerência
- Presence penalty: Cobre diversos tópicos
- Frequency penalty: Vocabulário rico e variado

---

### Brainstorming

```json
{
  "temperature": 0.9,
  "top_p": 0.95,
  "max_tokens": 500,
  "presence_penalty": 0.6,
  "frequency_penalty": 0.6
}
```

**Rationale:**
- Temperature alta: Máxima criatividade
- Penalties altas: Força diversidade de ideias
- Max tokens médio: Lista de ideias, não ensaios

---

### Conversação / Chatbot

```json
{
  "temperature": 0.6,
  "top_p": 0.85,
  "max_tokens": 300,
  "presence_penalty": 0.2,
  "frequency_penalty": 0.3
}
```

**Rationale:**
- Temperature média: Natural mas não muito aleatório
- Max tokens baixo: Respostas conversacionais e concisas
- Penalties leves: Alguma variedade sem perder foco

---

## Experimentação e Otimização

### Processo de Ajuste

**Step 1: Baseline**
```
Comece com valores padrão:
- Temperature: 0.7
- Top-P: 1.0
- Max Tokens: adequado à tarefa
- Penalties: 0.0
```

**Step 2: Ajuste Primário (Temperature)**
```
Teste 3 valores:
- Baixo (0.2)
- Médio (0.6)
- Alto (0.9)

Escolha o que melhor se encaixa.
```

**Step 3: Fine-Tuning (Penalties)**
```
Se necessário, ajuste penalties:
- Texto muito repetitivo? → Aumente frequency penalty
- Falta diversidade de tópicos? → Aumente presence penalty
```

**Step 4: Validação**
```
Teste configuração final em 5-10 exemplos
Verifique consistência e qualidade
```

---

### A/B Testing de Parâmetros

**Metodologia:**

1. **Defina métrica de sucesso**
   - Precisão
   - Criatividade
   - Aderência a guidelines
   - Satisfação do usuário

2. **Teste variações**
   ```
   Configuração A: Temperature 0.3
   Configuração B: Temperature 0.7

   Rode cada uma em 20 prompts idênticos
   ```

3. **Compare resultados**
   - Qual configuração ganha na métrica?
   - Há trade-offs?
   - Diferença é significativa?

4. **Implemente vencedor**

---

## Erros Comuns e Como Evitar

### ❌ Erro 1: Ajustar Tudo Simultaneamente

**Problema:**
```
Mudar temperature, top-p, e penalties ao mesmo tempo
→ Impossível saber o que causou melhoria ou piora
```

**Solução:**
```
Ajuste UM parâmetro por vez
Valide o efeito
Só então ajuste o próximo
```

---

### ❌ Erro 2: Temperature Muito Alta para Tarefas Factuais

**Problema:**
```json
{
  "temperature": 0.9,
  "prompt": "Calcule: 127 * 43"
}

Output: "5.461" ❌ (resposta correta: 5.461... ou talvez cria algo errado)
```

**Solução:**
```
Tarefas com resposta certa = Temperature ≤ 0.3
```

---

### ❌ Erro 3: Max Tokens Muito Restritivo

**Problema:**
```
Max Tokens: 100
Prompt: "Escreva tutorial completo de React"

Output cortado no meio da frase...
```

**Solução:**
```
Sempre adicione 30-50% de margem ao max tokens estimado
```

---

### ❌ Erro 4: Ignorar Custos

**Problema:**
```
Max Tokens: 4000 (sempre)
Mesmo quando resposta só precisa de 100 tokens
→ Paga por tokens não usados
```

**Solução:**
```
Ajuste max tokens ao esperado para cada task
Monitore tokens realmente usados
Otimize configuração
```

---

### ❌ Erro 5: Configuração Única para Tudo

**Problema:**
```
Usar mesmos parâmetros para:
- Código
- Marketing copy
- Análise de dados
- Brainstorming

Resultados subótimos em todos
```

**Solução:**
```
Crie PROFILES de parâmetros:
- profile_code = {temperature: 0.0, ...}
- profile_creative = {temperature: 0.8, ...}
- profile_analysis = {temperature: 0.2, ...}
```

---

## Implementação Prática

### Exemplo em Python (API Claude)

```python
import anthropic

client = anthropic.Anthropic(api_key="...")

# Profile para código
def generate_code(prompt):
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2000,
        temperature=0.0,  # Determinístico
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text

# Profile para brainstorming
def brainstorm_ideas(prompt):
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        temperature=0.9,  # Criativo
        top_p=0.95,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text

# Uso
code = generate_code("Crie função Python para ordenar lista")
ideas = brainstorm_ideas("10 nomes para app de fitness")
```

---

### Sistema de Profiles

```python
PARAMETER_PROFILES = {
    "code": {
        "temperature": 0.0,
        "top_p": 0.1,
        "max_tokens": 2000,
    },
    "analysis": {
        "temperature": 0.2,
        "max_tokens": 1000,
    },
    "creative": {
        "temperature": 0.8,
        "top_p": 0.95,
        "max_tokens": 1500,
        "presence_penalty": 0.4,
        "frequency_penalty": 0.4,
    },
    "brainstorm": {
        "temperature": 0.9,
        "max_tokens": 500,
        "presence_penalty": 0.6,
        "frequency_penalty": 0.6,
    },
}

def generate(prompt, profile="analysis"):
    params = PARAMETER_PROFILES[profile]
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        messages=[{"role": "user", "content": prompt}],
        **params
    )
    return response.content[0].text
```

---

## Monitoramento e Métricas

### O que Monitorar em Produção

1. **Token Usage**
   ```
   - Tokens por request (prompt + completion)
   - Custo por request
   - Desperdício (max_tokens vs usado)
   ```

2. **Qualidade de Output**
   ```
   - Taxa de outputs truncados
   - Taxa de regeneração necessária
   - Satisfação do usuário
   ```

3. **Performance**
   ```
   - Latência por configuração
   - Success rate
   ```

---

## Cheat Sheet - Guia Rápido

| Task | Temp | Top-P | Max Tok | Pres | Freq |
|------|------|-------|---------|------|------|
| **Código** | 0.0-0.2 | 0.1 | Alto | 0.0 | 0.0 |
| **Análise** | 0.1-0.3 | 0.3 | Médio | 0.0 | 0.1 |
| **Tutorial** | 0.3-0.5 | 0.5 | Alto | 0.1 | 0.2 |
| **Marketing** | 0.7-0.8 | 0.9 | Alto | 0.3 | 0.4 |
| **Brainstorm** | 0.8-1.0 | 0.95 | Médio | 0.6 | 0.6 |
| **Chat** | 0.6-0.7 | 0.85 | Baixo | 0.2 | 0.3 |
| **Criativo** | 0.8-0.9 | 0.9 | Alto | 0.4 | 0.5 |

---

## Recursos Adicionais

### Ferramentas

- **OpenAI Playground:** Interface visual para testar parâmetros
- **Anthropic Console:** Testar Claude com diferentes configs
- **LangChain:** Framework com parameter management
- **Weights & Biases:** Track experiments com parâmetros

### Leituras

- 📖 Documentação oficial da API (OpenAI, Anthropic, etc.)
- 🎓 "Temperature in Language Models" research papers
- 📊 Benchmarks de parâmetros por task type
- 🔬 Experimentos da comunidade (GitHub, papers)

---

## Exercício Prático

**Desafio:** Otimize parâmetros para seu caso de uso.

1. **Escolha uma task recorrente sua**

2. **Teste 3 configurações:**
   ```
   Config A (conservadora): Temp 0.2
   Config B (balanceada): Temp 0.6
   Config C (criativa): Temp 0.9
   ```

3. **Rode cada config em 5 prompts idênticos**

4. **Compare:**
   - Qual teve melhor qualidade?
   - Qual foi mais consistente?
   - Há trade-offs?

5. **Fine-tune vencedor** ajustando penalties se necessário

6. **Documente** a configuração ideal para referência

---

## Conclusão

Parâmetros são ferramentas poderosas para controlar comportamento do LLM além do prompt. Dominar parâmetros permite:

- ✅ Resultados mais consistentes
- ✅ Otimização para cada caso de uso
- ✅ Economia de custo (max tokens otimizado)
- ✅ Melhor experiência do usuário

**Lembre-se:**
- Parâmetros NÃO substituem prompts bem escritos
- Ajuste um parâmetro por vez
- Documente configurações que funcionam
- Monitore em produção

**Próximo passo:** Crie sua biblioteca de parameter profiles para casos de uso comuns. Você ganhará velocidade e consistência!
