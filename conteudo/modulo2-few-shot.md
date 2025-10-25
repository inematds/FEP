## O que é Few-Shot?

Few-shot significa "poucos exemplos". Você mostra 2-5 exemplos do input→output desejado, então dá o input real.

### Estrutura

\`\`\`
[Instrução da tarefa]

Exemplo 1:
Input: [exemplo 1]
Output: [resposta desejada 1]

Exemplo 2:
Input: [exemplo 2]
Output: [resposta desejada 2]

Agora faça:
Input: [tarefa real]
Output:
\`\`\`

### Por que Few-Shot Funciona?

- **Aprendizado por padrão:** LLMs são excelentes em reconhecer padrões
- **Clareza por demonstração:** Exemplo vale mais que explicação
- **Controle de formato:** Você define exatamente como quer a resposta
- **Reduz ambiguidade:** Exemplos resolvem dúvidas

## Quantos Exemplos?

- **1-2 exemplos:** Para tarefas simples ou formatos diretos
- **3-5 exemplos:** Para tarefas mais complexas (ideal)
- **6+ exemplos:** Raramente necessário (e consome tokens)

## Tipos de Few-Shot

### 1. Few-Shot de Formato
Mostre a estrutura da resposta

### 2. Few-Shot de Estilo
Mostre o ton e linguagem

### 3. Few-Shot de Raciocínio
Mostre o processo de pensamento

---

## One-Shot: A Variação de 1 Exemplo

**One-shot** é tecnicamente few-shot com apenas **1 exemplo**. Mas merece destaque por ser extremamente comum e eficiente.

### O que é One-Shot?

Você fornece **exatamente 1 exemplo** antes da tarefa real. É o meio termo entre zero-shot (sem exemplos) e few-shot (2-5 exemplos).

### Estrutura One-Shot

\`\`\`
[Instrução da tarefa]

Exemplo:
Input: [exemplo único]
Output: [resposta desejada]

Agora faça:
Input: [tarefa real]
Output:
\`\`\`

---

### Quando One-Shot é Suficiente?

✅ **Formato simples e direto**
- Extração de dados básicos
- Conversões simples
- Classificações binárias

✅ **Padrão facilmente reconhecível**
- O formato é óbvio após 1 exemplo
- A tarefa tem regras claras

✅ **Economia de tokens é importante**
- APIs pagas onde cada token conta
- Prompts já longos por outras razões

✅ **A tarefa é quase autoexplicativa**
- Zero-shot quase funcionaria, mas 1 exemplo elimina ambiguidade

---

### Quando NÃO usar One-Shot?

❌ **Padrão complexo ou sutil**
→ Use 3-5 exemplos (few-shot) para mostrar variações

❌ **Tarefa com múltiplas regras**
→ Um exemplo não cobre todos os casos

❌ **Formato incomum ou específico**
→ Mais exemplos mostram edge cases

---

## 📊 Comparação: Zero-Shot vs. One-Shot vs. Few-Shot

### Exemplo: Extrair Nome e Email de Texto

#### Zero-Shot (0 exemplos)

\`\`\`
Extraia nome e email deste texto em formato JSON:

Texto: "João Silva - joao@email.com"
\`\`\`

**Resultado provável:**
\`\`\`json
{
  "nome": "João Silva",
  "email": "joao@email.com"
}
\`\`\`

**Análise:** Funciona, mas formato JSON pode variar (chaves em inglês? aspas simples?)

---

#### One-Shot (1 exemplo)

\`\`\`
Extraia nome e email em formato JSON.

Exemplo:
Texto: "Maria Santos - maria@empresa.com"
Output: {"nome": "Maria Santos", "email": "maria@empresa.com"}

Agora extraia:
Texto: "João Silva - joao@email.com"
\`\`\`

**Resultado:**
\`\`\`json
{"nome": "João Silva", "email": "joao@email.com"}
\`\`\`

**Análise:** Formato agora é **exatamente** como você quer. Sem ambiguidade.

---

#### Few-Shot (3 exemplos)

\`\`\`
Extraia nome e email em formato JSON.

Exemplo 1:
Texto: "Maria Santos - maria@empresa.com"
Output: {"nome": "Maria Santos", "email": "maria@empresa.com"}

Exemplo 2:
Texto: "Dr. Pedro Oliveira | pedro.oliveira@hospital.org"
Output: {"nome": "Dr. Pedro Oliveira", "email": "pedro.oliveira@hospital.org"}

Exemplo 3:
Texto: "Ana (ana.costa@startup.io)"
Output: {"nome": "Ana", "email": "ana.costa@startup.io"}

Agora extraia:
Texto: "João Silva - joao@email.com"
\`\`\`

**Resultado:**
\`\`\`json
{"nome": "João Silva", "email": "joao@email.com"}
\`\`\`

**Análise:** Modelo agora sabe lidar com **variações** de formato (|, parênteses, títulos).

---

## 🎯 Progressão de Aprendizado

Use esta progressão conforme a complexidade aumenta:

\`\`\`
Zero-Shot → One-Shot → Few-Shot
(0 exemplos) → (1 exemplo) → (2-5 exemplos)

Sempre comece com o mínimo necessário!
\`\`\`

### Regra de Ouro

**Use o MÍNIMO de exemplos que produz o resultado desejado.**

- Cada exemplo consome tokens (= custo + latência)
- Exemplos demais podem confundir o modelo
- Teste progressivamente: 0 → 1 → 2 → 3

---

## 💡 Casos de Uso Ideais para One-Shot

### 1. Formatação Simples

\`\`\`
Converta números para formato brasileiro.

Exemplo:
Input: 1234.56
Output: 1.234,56

Agora converta:
Input: 9876.43
\`\`\`

---

### 2. Classificação Binária

\`\`\`
Classifique o sentimento como positivo ou negativo.

Exemplo:
Review: "Produto excelente, recomendo!"
Sentimento: positivo

Agora classifique:
Review: "Pior compra que já fiz, não funciona."
\`\`\`

---

### 3. Extração de Campo Único

\`\`\`
Extraia apenas o valor numérico.

Exemplo:
Texto: "O produto custa R$ 149,90"
Valor: 149.90

Agora extraia:
Texto: "Preço promocional: R$ 89,50"
\`\`\`

---

### 4. Tradução com Estilo Específico

\`\`\`
Traduza para inglês em tom formal corporativo.

Exemplo:
PT: "Gostaria de marcar uma reunião"
EN: "I would like to schedule a meeting"

Agora traduza:
PT: "Preciso falar com o gerente"
\`\`\`

---

## 🔄 One-Shot vs. Few-Shot: Quando Escalar?

### Sinais que One-Shot NÃO está funcionando:

1. **Inconsistência:** Resultados variam muito entre tentativas
2. **Edge cases:** Modelo falha em casos atípicos
3. **Ambiguidade:** Ainda há dúvidas sobre formato/estilo
4. **Complexidade:** Tarefa tem múltiplas regras

**Solução:** Adicione mais 1-2 exemplos (vire few-shot)

---

### Exemplo: Escalar de One-Shot para Few-Shot

**Tarefa:** Extrair tags de texto sobre tecnologia

**One-Shot (falha em edge cases):**

\`\`\`
Exemplo:
Texto: "Python é ótimo para data science"
Tags: python, data science

Agora extraia:
Texto: "Aprendi React.js e Node.js para criar apps full-stack"
Tags: React.js, Node.js  ← FALHA: perdeu "full-stack", "apps"
\`\`\`

**Few-Shot (cobre variações):**

\`\`\`
Exemplo 1:
Texto: "Python é ótimo para data science"
Tags: python, data science

Exemplo 2:
Texto: "Machine learning com TensorFlow"
Tags: machine learning, tensorflow

Exemplo 3:
Texto: "Deploy de apps na AWS"
Tags: deploy, apps, aws

Agora extraia:
Texto: "Aprendi React.js e Node.js para criar apps full-stack"
Tags: react.js, node.js, apps, full-stack  ← SUCESSO
\`\`\`

---

## ✅ Checklist: One-Shot ou Few-Shot?

Use para decidir quantos exemplos fornecer:

**Use ONE-SHOT se:**
- [ ] A tarefa é relativamente simples
- [ ] O formato é direto e óbvio
- [ ] Zero-shot quase funciona (mas não perfeitamente)
- [ ] Você quer economizar tokens
- [ ] Não há edge cases significativos

**Escale para FEW-SHOT se:**
- [ ] One-shot produz resultados inconsistentes
- [ ] A tarefa tem variações/edge cases
- [ ] O formato é complexo ou incomum
- [ ] Você precisa mostrar múltiplos estilos/tons
- [ ] A qualidade é mais importante que economia de tokens

---

## 🎓 Exercícios Práticos

### Exercício 1: Teste Zero → One → Few

**Tarefa:** Classificar tópicos de suporte em categorias

**Passo 1:** Tente zero-shot
\`\`\`
Classifique este ticket de suporte:
"Não consigo fazer login na minha conta"
\`\`\`

**Passo 2:** Adicione 1 exemplo (one-shot)
\`\`\`
Exemplo:
Ticket: "Esqueci minha senha"
Categoria: Autenticação

Agora classifique:
"Não consigo fazer login na minha conta"
\`\`\`

**Passo 3:** Adicione mais exemplos (few-shot) se necessário
\`\`\`
Exemplo 1: "Esqueci minha senha" → Autenticação
Exemplo 2: "O app está muito lento" → Performance
Exemplo 3: "Como exportar relatórios?" → Funcionalidade

Agora classifique:
"Não consigo fazer login na minha conta"
\`\`\`

**Insight:** Identifique em qual etapa o resultado ficou bom o suficiente. Pare aí!

---

### Exercício 2: Criar One-Shot Perfeito

Escolha uma tarefa sua e crie 1 exemplo que:
1. Mostra o formato EXATO que você quer
2. É representativo da tarefa típica
3. Elimina ambiguidade sobre estilo/tom
4. Não é nem trivial demais nem complexo demais

**Teste:** O modelo acerta em 8 de 10 tentativas? Se sim, seu one-shot está ótimo!

---

## 📊 Resumo: Estratégia de Exemplos

| Abordagem | Exemplos | Quando Usar | Custo (tokens) | Qualidade |
|-----------|----------|-------------|----------------|-----------|
| **Zero-Shot** | 0 | Tarefas comuns, bem conhecidas | Mínimo | Média |
| **One-Shot** | 1 | Formatos específicos, padrões simples | Baixo | Boa |
| **Few-Shot** | 2-5 | Padrões complexos, variações, edge cases | Médio | Excelente |
| **Many-Shot** | 6+ | Raramente necessário, tarefas muito específicas | Alto | Excelente |

---

## 🚀 Próximo Passo

**Desafio:** Pegue uma tarefa que você está fazendo com zero-shot hoje e:

1. Adicione 1 exemplo (one-shot)
2. Compare os resultados
3. Documente a diferença
4. Decida: one-shot é suficiente ou precisa escalar para few-shot?

**Meta:** Criar uma biblioteca pessoal de one-shot prompts para suas tarefas mais frequentes.