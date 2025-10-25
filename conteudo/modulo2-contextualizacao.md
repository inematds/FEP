# Contextualização Efetiva

## O que é Contextualização?

**Contextualizar** é fornecer informações de background que orientam a resposta do modelo na direção certa.

Pense assim: LLMs são extremamente capazes, mas não sabem **quem você é**, **onde você está**, **o que você já tentou**, ou **o que você realmente precisa** - a menos que você conte.

---

## Por que Contexto Importa?

### Exemplo sem Contexto

```
Explique o que é deploy.
```

**Possível resposta:** Explicação genérica misturando deploy de apps, infraestrutura, DevOps, CI/CD...

---

### Exemplo com Contexto

```
Contexto: Sou iniciante em programação, acabei de fazer meu primeiro site em HTML/CSS e quero colocá-lo online.

Explique o que é deploy.
```

**Resposta agora:** Explicação focada em hospedagem básica (Netlify, GitHub Pages), linguagem simples, passos práticos.

---

**Diferença:** O modelo agora sabe seu nível de experiência, tecnologia, e objetivo. A resposta é 10x mais útil.

---

## Os 4 Tipos de Contexto Essenciais

### 1. Contexto de Público

**Quem vai ler/usar/ouvir a resposta?**

```
Contexto de público: Explicarei para crianças de 8 anos

vs.

Contexto de público: Apresentarei para C-level executivos
```

**Impacto:**
- Muda linguagem (simples vs. executiva)
- Muda exemplos (brinquedos vs. ROI)
- Muda profundidade (overview vs. detalhes)

---

#### Exemplos Práticos

**Para criança:**
```
Público: Criança de 8 anos

Explique o que é inteligência artificial.
```
→ "Sabe quando você ensina seu cachorro a sentar? IA é ensinar o computador a aprender coisas, tipo reconhecer fotos ou falar com você!"

**Para executivo:**
```
Público: CEO sem background técnico

Explique o que é inteligência artificial.
```
→ "IA é tecnologia que automatiza decisões complexas e reconhecimento de padrões, permitindo redução de custos operacionais e novos modelos de receita..."

---

### 2. Contexto de Situação

**Qual a circunstância ou cenário atual?**

```
Situação: Estou em entrevista de emprego para vaga de engenheiro

vs.

Situação: Estou debugando código em produção que está falhando
```

**Impacto:**
- Muda urgência (reflexivo vs. emergencial)
- Muda tom (profissional vs. técnico direto)
- Muda tipo de resposta (conceitual vs. acionável)

---

#### Exemplos Práticos

**Entrevista:**
```
Situação: Estou em entrevista técnica, me perguntaram "Qual seu maior defeito?"

Como devo responder?
```
→ Resposta estratégica sobre growth mindset, vulnerabilidade calculada, exemplo de superação

**Produção falhando:**
```
Situação: API em produção retornando 500, afetando 10k usuários agora

Como debugar rapidamente?
```
→ Checklist de troubleshooting urgente: logs, rollback, monitoramento, comunicação

---

### 3. Contexto de Objetivo

**O que você quer alcançar?**

```
Objetivo: Aprender o conceito para prova

vs.

Objetivo: Implementar em produção amanhã
```

**Impacto:**
- Muda profundidade (teoria vs. prático)
- Muda foco (conceitos vs. código)
- Muda entregável (explicação vs. tutorial)

---

#### Exemplos Práticos

**Para prova:**
```
Objetivo: Preciso explicar REST APIs em prova de faculdade amanhã

Explique REST APIs.
```
→ Definição acadêmica, princípios (stateless, client-server, etc.), exemplos teóricos

**Para implementar:**
```
Objetivo: Preciso criar minha primeira REST API em Python para projeto do trabalho

Explique REST APIs.
```
→ Tutorial prático com Flask/FastAPI, código exemplo, endpoints básicos (GET/POST), teste com Postman

---

### 4. Contexto de Restrições

**Quais as limitações ou requisitos?**

```
Restrições:
- Precisa rodar em servidor antigo (Python 2.7)
- Não posso instalar bibliotecas novas
- Máximo 50 linhas de código
```

**Impacto:**
- Elimina soluções incompatíveis
- Foca em alternativas viáveis
- Evita perda de tempo

---

#### Exemplos Práticos

```
Contexto de restrições:
- Backend já existe em PHP, não podemos mudar
- Orçamento máximo: R$ 500/mês
- Precisa funcionar em IE11 (legado corporativo)

Sugira solução de autenticação para novo produto SaaS.
```

→ Solução considera tecnologias compatíveis com PHP, serviços acessíveis, polyfills para IE11

---

## Template Universal de Contextualização

Use este template para qualquer pergunta:

```
CONTEXTO:
- Público: [Quem vai usar/ler]
- Situação: [Cenário atual]
- Objetivo: [O que você quer alcançar]
- Restrições: [Limitações, se houver]

PEDIDO:
[Sua solicitação específica]
```

---

### Exemplo Completo

**Sem contexto:**
```
Como melhorar performance do meu app?
```
→ Resposta genérica sobre cache, otimização de queries, CDN, etc.

**Com contexto:**
```
CONTEXTO:
- Público: Eu (desenvolvedor fullstack junior)
- Situação: App React + Node.js com 500 usuários diários, carregamento de dashboard lento (5-8 segundos)
- Objetivo: Reduzir tempo de carregamento para menos de 2 segundos até fim do mês
- Restrições: Sem orçamento para infraestrutura nova, posso dedicar 2 dias ao fix

PEDIDO:
Como melhorar performance do dashboard?
```

→ Resposta focada, priorizada, acionável:
1. Identifique queries N+1 (provável culpado - rápido de fix)
2. Implemente paginação no backend (1 dia de trabalho)
3. Lazy load de componentes React (meio dia)
4. Medição antes/depois com ferramentas gratuitas

---

## Quanto Contexto Fornecer?

### ❌ Insuficiente

```
Preciso de ajuda com Python.
```
→ Impossível responder bem (que tipo de ajuda? qual nível? qual problema?)

---

### ⚠️ Mínimo (funcional mas subótimo)

```
Sou iniciante em Python, como ler arquivo CSV?
```
→ Funciona, mas poderia ser melhor

---

### ✅ Ideal

```
Contexto: Iniciante em Python (sei variáveis e funções básicas), preciso ler CSV de 100k linhas com colunas nome,email,idade para enviar emails personalizados. Posso instalar bibliotecas.

Como ler e processar este arquivo?
```
→ Resposta perfeita: usa pandas (pode instalar), mostra como ler, filtrar, iterar, com código completo

---

### ❌ Excessivo

```
Contexto: Sou desenvolvedor há 3 anos, trabalho em startup de fintech com 20 funcionários em São Paulo, uso MacBook Pro M1 com 16GB RAM, trabalho remoto às terças e quintas, meu time tem 2 pessoas, usamos Jira e Slack, meu café favorito é expresso, acordei às 7h hoje, tomei café da manhã às 7:30...

Como ler arquivo CSV em Python?
```
→ 90% do contexto é irrelevante. Foque no essencial.

---

## Quando Contexto é CRÍTICO

Contexto não é sempre necessário. Priorize quando:

### 1. ✅ Tarefa Ambígua

```
"Escreva email para cliente"
```
→ PRECISA de contexto: que cliente? qual assunto? qual tom?

---

### 2. ✅ Múltiplas Interpretações

```
"Explique deployment"
```
→ Deploy de software? De infraestrutura? De ML models? Para quem?

---

### 3. ✅ Expertise Específica Necessária

```
"Como tratar erro de autenticação"
```
→ Web app? Mobile? API? Que tipo de auth? Que erro exato?

---

### 4. ✅ Decisão Entre Alternativas

```
"Devo usar PostgreSQL ou MongoDB?"
```
→ PRECISA de contexto sobre caso de uso, escala, equipe, estrutura de dados

---

## 📊 Comparações: Com vs. Sem Contexto

### Caso 1: Escrever Email

**Sem contexto:**
```
Escreva email para cliente sobre atraso.
```

**Resultado:** Email genérico, tom incerto, sem detalhes úteis

---

**Com contexto:**
```
Contexto:
- Cliente: Empresa Fortune 500, contrato de $100k/ano
- Situação: Atrasamos entrega 2 semanas (prometi sexta, será próxima quinta)
- Relacionamento: Segundo atraso em 6 meses (relacionamento já tenso)
- Objetivo: Manter contrato, rebuild trust
- Tom: Profissional, assume responsabilidade, propõe compensação

Escreva email explicando atraso.
```

**Resultado:** Email profissional, acknowledgment claro, propõe compensação concreta (desconto, entrega de feature adicional), plano de ação com milestones, tom de accountability

---

### Caso 2: Debugging

**Sem contexto:**
```
Código dá erro "null pointer exception", como resolver?
```

**Resultado:** Explicação genérica sobre null pointer, sugestões vagas

---

**Com contexto:**
```
Contexto:
- Linguagem: Java 11
- Framework: Spring Boot
- Erro: NullPointerException em UserService.java linha 47
- Cenário: Ocorre apenas quando usuário não tem email cadastrado
- Código linha 47: `user.getEmail().toLowerCase()`
- Tentei: Já validei que user não é null, mas user.getEmail() pode retornar null

Como fix com null safety?
```

**Resultado:** Solução específica com Optional<>, exemplo de código, explica padrão Java moderno, sugere validação no DTO

---

## ✅ Checklist de Contextualização

Antes de enviar prompt importante, verifique:

- [ ] **Especifiquei quem é o público-alvo?**
- [ ] **Expliquei a situação/cenário atual?**
- [ ] **Deixei claro qual meu objetivo?**
- [ ] **Mencionei restrições/limitações relevantes?**
- [ ] **Forneci detalhes técnicos quando necessário?**
- [ ] **Removi informações irrelevantes/excessivas?**
- [ ] **O contexto ajuda a eliminar ambiguidade?**

---

## 🎯 Exercícios Práticos

### Exercício 1: Adicionar Contexto

Pegue este prompt vago:
```
Como aprender programação?
```

Adicione contexto considerando:
- Seu nível atual (nunca programou? sabe Excel?)
- Seu objetivo (mudar de carreira? hobby? projeto específico?)
- Seu tempo disponível (2h/semana? fulltime?)
- Suas restrições (precisa ser grátis? prefere vídeos ou texto?)

Compare as respostas com/sem contexto.

---

### Exercício 2: Identificar Contexto Faltante

Para cada prompt abaixo, identifique QUE contexto está faltando:

**A)** "Preciso melhorar meu inglês"
- Falta: Nível atual? Para que? Quanto tempo tem? Prefere que método?

**B)** "Este código está lento, como otimizar?"
- Falta: Linguagem? Onde está lento (I/O, CPU, memória)? Quanto lento? Código atual?

**C)** "Sugira ferramenta para gerenciar tarefas"
- Falta: Tamanho do time? Orçamento? Preferências (Kanban/Scrum)? Integrações necessárias?

---

### Exercício 3: Template Pessoal

Crie seu template de contexto para sua tarefa mais frequente.

**Exemplo para desenvolvedores:**
```
CONTEXTO TÉCNICO:
- Stack: [tecnologias]
- Ambiente: [dev/staging/prod]
- Escala: [usuários, dados, requests]
- Restrições: [orçamento, tempo, tecnologia]
- Tentei: [soluções que já testei]

PROBLEMA:
[Descrição específica]

OBJETIVO:
[Resultado desejado]
```

Salve como template reutilizável.

---

## 💡 Dicas Avançadas

### Dica 1: Contexto Incremental

Não precisa fornecer TUDO de uma vez. Comece mínimo, adicione se necessário:

```
Iteração 1: "Como fazer autenticação em app web?"
Modelo: [Resposta genérica OAuth, JWT, etc.]

Iteração 2: "Contexto: App React + Node.js, preciso autenticação simples para MVP, sem OAuth. Como fazer?"
Modelo: [Resposta focada em JWT com implementação básica]

Iteração 3: "Como armazenar JWT no client de forma segura?"
Modelo: [Resposta específica sobre httpOnly cookies vs localStorage]
```

---

### Dica 2: Contexto em Formato Estruturado

Use XML ou Markdown para contexto complexo:

```xml
<context>
  <user>
    <role>Junior Frontend Developer</role>
    <experience>6 meses</experience>
  </user>
  <project>
    <type>E-commerce SaaS</type>
    <stack>React, TypeScript, TailwindCSS</stack>
    <timeline>2 weeks until launch</timeline>
  </project>
  <constraints>
    <budget>Cannot add paid dependencies</budget>
    <compatibility>Must support Safari 14+</compatibility>
  </constraints>
</context>

<question>
How to implement responsive navigation menu?
</question>
```

---

### Dica 3: Contexto Negativo (O que NÃO fazer)

Às vezes é útil especificar o que você **não** quer:

```
Contexto: Iniciante absoluto em programação

Explique funções em JavaScript.

NÃO mencione:
- Closures ou scope avançado
- Arrow functions (ainda não aprendi)
- Conceitos de programação funcional
- Jargão técnico sem explicação
```

---

## 🎓 Resumo

**Contextualização em 3 Passos:**

1. **Identifique o GAP**: O que o modelo não sabe sobre você/situação?
2. **Forneça o MÍNIMO necessário**: Público + Situação + Objetivo (+ Restrições se relevante)
3. **Teste e Refine**: Se resposta não é ideal, adicione contexto missing

**Regra de Ouro:**
> "Quanto mais específico o contexto, mais útil a resposta."

**Próximo Passo:**
Pegue sua última pergunta "vaga" para IA e refaça com contexto completo usando o template. Compare os resultados.
