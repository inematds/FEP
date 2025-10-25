# Skeleton of Thought (Esqueleto de Pensamento)

## O Que É?

**Skeleton of Thought** (Esqueleto de Pensamento) é uma técnica de prompting onde você pede à IA para primeiro criar uma **estrutura/outline** antes de gerar o conteúdo completo.

É como construir o esqueleto de uma casa antes de colocar as paredes.

---

## Metáfora Visual

```
Abordagem Tradicional:
"Escreva um artigo sobre IA"
    ↓
[IA gera tudo de uma vez, possivelmente desorganizado]


Skeleton of Thought:
"Crie um outline para artigo sobre IA"
    ↓
[IA gera estrutura]
    ↓
"Agora expanda cada seção"
    ↓
[Conteúdo organizado e coerente]
```

---

## Como Funciona?

### Processo em 2 Etapas:

#### **ETAPA 1: Criar o Esqueleto** 🦴

```
Você: Crie um outline detalhado para um artigo sobre
     "Como usar IA no trabalho"

IA:
I. Introdução
   A. O que é IA no contexto profissional
   B. Por que é relevante agora

II. Áreas de Aplicação
    A. Automação de tarefas repetitivas
    B. Análise de dados
    C. Criação de conteúdo
    D. Atendimento ao cliente

III. Como Começar
     A. Identificar processos automatizáveis
     B. Escolher ferramentas adequadas
     C. Treinar equipe

IV. Desafios e Limitações
    A. Resistência da equipe
    B. Custo de implementação
    C. Questões éticas

V. Conclusão
   A. Recap dos benefícios
   B. Próximos passos
```

#### **ETAPA 2: Expandir o Esqueleto** 📝

```
Você: Agora expanda cada seção do outline em 2-3 parágrafos

IA: [Gera conteúdo completo seguindo a estrutura]
```

---

## Por Que Usar?

### ✅ **Vantagens:**

1. **Maior Controle:**
   - Você pode ajustar a estrutura ANTES de gastar tokens no conteúdo

2. **Coerência:**
   - Garante fluxo lógico e transições naturais

3. **Eficiência:**
   - Evita gerar conteúdo que depois você vai descartar

4. **Flexibilidade:**
   - Pode expandir apenas partes relevantes

5. **Precisão:**
   - Estrutura clara → conteúdo alinhado ao objetivo

---

## Quando Usar?

### 🎯 **Ideal para:**

- **Artigos e blogposts** (estrutura é crucial)
- **Apresentações** (slides precisam de fluxo lógico)
- **Relatórios** (seções bem definidas)
- **Cursos e treinamentos** (módulos e lições)
- **Roteiros de vídeo** (cenas sequenciais)
- **Livros ou e-books** (capítulos e subcapítulos)

### 🚫 **Não usar para:**

- Tarefas curtas (tweets, descrições)
- Conteúdo criativo livre (poesias, brainstorming)
- Quando você NÃO quer estrutura rígida

---

## Variações da Técnica

### **Variação 1: Skeleton com Aprovação**

```
PASSO 1: Crie outline
PASSO 2: [Você revisa e ajusta a estrutura]
PASSO 3: Expanda o outline aprovado
```

**Vantagem:** Máximo controle sobre a estrutura.

---

### **Variação 2: Skeleton Iterativo**

```
PASSO 1: Crie outline de alto nível (só títulos principais)
PASSO 2: Expanda seção II em sub-tópicos
PASSO 3: Expanda sub-tópico II.C em conteúdo
```

**Vantagem:** Zoom progressivo para maior profundidade.

---

### **Variação 3: Skeleton com Estimativas**

```
Você: Crie outline para apresentação de 30 minutos.
     Indique tempo estimado para cada seção.

IA:
I. Introdução (5 min)
II. Problema (8 min)
III. Solução (12 min)
IV. Demonstração (3 min)
V. Q&A (2 min)
```

**Vantagem:** Garante timing adequado.

---

## Exemplo Completo: Artigo de Blog

### 🦴 **FASE 1: Criar Esqueleto**

```
Você: Crie um outline para artigo "10 Dicas de Produtividade para
     Desenvolvedores". Artigo deve ter 1500-2000 palavras.

IA:
# 10 Dicas de Produtividade para Desenvolvedores

## Introdução (150 palavras)
- Por que produtividade é crucial para devs
- Overview das 10 dicas

## Dica 1: Use Atalhos de Teclado (150 palavras)
- Exemplos práticos
- Como memorizar

## Dica 2: Automatize Tarefas Repetitivas (150 palavras)
- Scripts úteis
- Ferramentas de automação

[... Dicas 3-9 ...]

## Dica 10: Faça Pausas Regulares (150 palavras)
- Técnica Pomodoro
- Benefícios comprovados

## Conclusão (150 palavras)
- Recap das dicas
- Incentivo para implementar
```

### ✏️ **FASE 2: Revisar e Ajustar (Opcional)**

```
Você: Altere Dica 5 para "Aprenda Vim ou Emacs" e adicione uma
     dica sobre pair programming antes da conclusão.

IA: [Atualiza o outline]
```

### 📝 **FASE 3: Expandir**

```
Você: Perfeito! Agora expanda cada seção do outline com o conteúdo completo.

IA: [Gera artigo de 1500-2000 palavras seguindo a estrutura]
```

---

## Exemplo: Apresentação de Vendas

### 🦴 **Esqueleto**

```
Você: Crie estrutura para pitch de vendas de 15 minutos sobre
     software de gestão de projetos

IA:
Slide 1: Título + Gancho (1 min)
Slide 2: Problema que resolvemos (2 min)
Slide 3: Nossa Solução - Overview (2 min)
Slide 4-6: Features Principais (6 min - 2 min cada)
Slide 7: Case de Sucesso (2 min)
Slide 8: Pricing (1 min)
Slide 9: Call to Action (1 min)
```

### 📝 **Expansão Seletiva**

```
Você: Expanda apenas Slides 4-6 (features) com detalhes técnicos

IA: [Gera conteúdo detalhado só das features]
```

---

## Skeleton + Outras Técnicas

### 🔗 **Combinação Poderosa:**

**Skeleton + Few-Shot:**
```
Você: Crie outline para email de vendas.
     Use este formato de outline como exemplo:
     [exemplo de outline bem-sucedido]

IA: [Cria outline similar ao exemplo]
```

**Skeleton + Role Prompting:**
```
Você: Você é um arquiteto de conteúdo experiente.
     Crie outline para curso online sobre Python.

IA: [Outline com estrutura pedagógica profissional]
```

**Skeleton + Chain of Thought:**
```
Você: Pense passo a passo para criar o melhor outline para
     [tarefa]. Explique por que escolheu essa estrutura.

IA: [Outline + raciocínio por trás das escolhas]
```

---

## Comparação: Com vs Sem Skeleton

### ❌ **Sem Skeleton (Direto):**

```
Você: Escreva artigo sobre machine learning

IA: [Gera 1000 palavras...]
Você: Hmm, faltou falar de aplicações práticas
IA: [Regera tudo...]
Você: Agora ficou longo demais para meu blog
```

**Problemas:**
- Desperdício de tokens
- Múltiplas regenerações
- Estrutura inconsistente

---

### ✅ **Com Skeleton:**

```
Você: Crie outline para artigo sobre machine learning

IA: [Outline com 5 seções]

Você: Adicione seção sobre aplicações práticas. Reduza conclusão.

IA: [Outline ajustado]

Você: Perfeito! Expanda cada seção em 200 palavras.

IA: [Artigo bem estruturado de primeira]
```

**Benefícios:**
- Ajustes rápidos e baratos (só texto)
- Uma única geração de conteúdo
- Resultado alinhado desde o início

---

## Templates Úteis

### **Template 1: Artigo/Blogpost**
```
Crie outline para artigo sobre [TÓPICO] com:
- Introdução (contexto + gancho)
- 3-5 seções principais
- Conclusão (resumo + CTA)
- Estimativa: [PALAVRAS] palavras no total
```

### **Template 2: Apresentação**
```
Crie outline para apresentação de [MINUTOS] minutos sobre [TÓPICO]:
- Indicar número de slides
- Tempo estimado por slide
- Tipo de conteúdo (texto, imagem, gráfico, etc.)
```

### **Template 3: Curso/Treinamento**
```
Crie outline para curso sobre [TÓPICO]:
- 5-8 módulos
- 3-5 lições por módulo
- Objetivos de aprendizado para cada módulo
```

---

## Armadilhas a Evitar

### ❌ **Erro 1: Outline Muito Genérico**

```
Ruim:
I. Introdução
II. Desenvolvimento
III. Conclusão
```

✅ **Melhor:**
```
I. Introdução: Por que Python é ideal para iniciantes
II. Fundamentos: Variáveis, loops, funções
III. Projeto Prático: Construindo calculadora
IV. Próximos Passos: Frameworks e bibliotecas
```

---

### ❌ **Erro 2: Não Revisar o Esqueleto**

```
Fluxo ruim:
Outline criado → Expande imediatamente
```

✅ **Melhor:**
```
Outline criado → Você revisa → Ajusta → Expande
```

---

### ❌ **Erro 3: Expandir Tudo de Uma Vez**

Se artigo tem 10 seções mas você só precisa de 3, expanda apenas essas 3.

---

## Exercício Prático

**Desafio:**

1. Escolha um conteúdo que você precisa criar
2. Peça à IA para criar o outline
3. Revise e ajuste a estrutura
4. Expanda apenas uma seção
5. Compare a qualidade vs gerar tudo direto

**Reflexão:** O controle sobre a estrutura valeu o esforço extra?

---

## Resumo

- **Skeleton of Thought** = criar estrutura antes do conteúdo
- **Processo:** Outline → Revisar → Expandir
- **Vantagens:** Controle, coerência, eficiência
- **Ideal para:** Conteúdo longo e estruturado (artigos, apresentações, cursos)
- **Combina bem com:** Role Prompting, Few-Shot, Chain of Thought

**Próximo passo:** Use Skeleton para seus próximos projetos de conteúdo!
