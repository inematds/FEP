# Prompts Interativos (Conversacionais)

## O Que São Prompts Interativos?

**Prompts Interativos** são uma técnica de conversação iterativa com a IA, onde você **refina, corrige e direciona** a resposta através de múltiplas rodadas de diálogo.

Em vez de tentar acertar o prompt perfeito de primeira, você **conversa** com o modelo para chegar no resultado ideal.

---

## Por Que Usar?

### Vantagens:
✅ **Mais natural** que criar um mega-prompt complexo
✅ **Corrige desvios** em tempo real
✅ **Aprofunda** em partes específicas
✅ **Adapta** conforme necessidade
✅ **Menor pressão** de "acertar de primeira"

### Quando Usar:
- Tarefas exploratórias (você não sabe exatamente o que quer)
- Projetos complexos com múltiplas etapas
- Quando primeira resposta está "quase lá" mas precisa ajustes
- Análises que exigem profundidade progressiva

---

## Técnicas de Prompts Interativos

### 1. **Correção de Foco**

**Problema:** IA perdeu o foco ou desviou do tema

**Solução: Redirecionar explicitamente**

```
Você: Explique marketing digital para iniciantes

IA: [Resposta longa sobre história do marketing...]

Você: ❌ Você falou muito sobre história. Foque apenas em TÁTICAS
     PRÁTICAS que um iniciante pode aplicar hoje.

IA: [Resposta focada em táticas práticas]
```

**Frase-chave:** "Foque apenas em [X]", "Ignore [Y] e concentre-se em [Z]"

---

### 2. **Correção de Instrução Errada**

**Problema:** Você percebeu que deu instrução incorreta

**Solução: Corrigir e pedir para refazer**

```
Você: Escreva um email formal para meu professor

IA: [Email muito formal e distante]

Você: ❌ Corrijo: quero um tom respeitoso mas amigável, não tão
     formal. Reescreva.

IA: [Email com tom ajustado]
```

**Frase-chave:** "Corrijo:", "Na verdade, quero [X]", "Refaça com [ajuste]"

---

### 3. **Verificação de Detalhamento**

**Problema:** Resposta muito superficial ou muito detalhada

**Solução: Pedir ajuste de profundidade**

```
Você: O que é Machine Learning?

IA: [Resposta técnica complexa]

Você: ⚠️ Está muito técnico. Explique como se eu tivesse 12 anos.

IA: [Resposta simplificada com analogias]
```

**Ou o contrário:**

```
Você: O que é Machine Learning?

IA: [Resposta muito básica]

Você: ⬆️ Aprofunde: quero detalhes sobre tipos de algoritmos e
     como funcionam matematicamente.

IA: [Resposta mais técnica]
```

**Frases-chave:**
- "Simplifique", "Explique como se eu fosse [idade/nível]"
- "Aprofunde", "Quero mais detalhes sobre [aspecto]"

---

### 4. **Exploração Progressiva**

Começe amplo, depois vá afunilando:

```
Rodada 1:
Você: Liste 5 estratégias de marketing para pequenas empresas

Rodada 2:
Você: Explique a estratégia #3 (Marketing de Conteúdo) em detalhes

Rodada 3:
Você: Dê 3 exemplos práticos de Marketing de Conteúdo para uma
      cafeteria local

Rodada 4:
Você: Crie um plano de 30 dias para o exemplo #1
```

**Padrão:** Visão geral → Detalhe → Exemplo → Implementação

---

### 5. **Verificação de Correção**

**Problema:** Desconfia que resposta está errada

**Solução: Pedir auto-verificação**

```
Você: Qual a capital da Austrália?

IA: Sydney

Você: ❓ Tem certeza? Verifique novamente.

IA: Corrijo: a capital é Canberra. Sydney é a cidade mais populosa,
    mas não é a capital.
```

**Frases-chave:**
- "Esta resposta está correta?"
- "Verifique se há erros"
- "Se não tiver certeza, diga 'não sei' em vez de adivinhar"

---

### 6. **Fixar Erros e Ajustar Formato**

**Problema:** Conteúdo bom, mas formato errado

**Solução: Manter conteúdo, mudar formato**

```
Você: Liste benefícios de exercícios físicos

IA: [Parágrafo longo]

Você: 📝 Mantenha o conteúdo, mas formate como:
     - Bullet points
     - Cada ponto com título em negrito
     - Máximo 1 linha de explicação

IA: [Lista formatada]
```

---

### 7. **Iteração com Feedback Específico**

Em vez de "está errado", diga **exatamente** o que mudar:

❌ **Ruim:**
```
Você: Esse código não funciona. Conserte.
```

✅ **Bom:**
```
Você: O código dá erro na linha 15: "undefined variable x".
     Precisamos inicializar 'x' antes do loop. Corrija isso.
```

---

## Padrão de Conversa Eficaz

### Template de Iteração:

```
[RODADA 1 - Pedido Inicial]
Você: [Tarefa clara e concisa]

[RODADA 2 - Ajuste de Foco]
Você: Bom, mas [problema]. Ajuste para [solução].

[RODADA 3 - Refinamento]
Você: Melhor! Agora [próximo passo].

[RODADA 4 - Validação]
Você: Perfeito. Agora [aplicação prática].
```

---

## Exemplo Completo: Criando um Email

```
═══════════════════════════════════════════════════
RODADA 1: Pedido inicial
═══════════════════════════════════════════════════
Você: Escreva um email pedindo extensão de prazo para trabalho

IA: [Email genérico]

═══════════════════════════════════════════════════
RODADA 2: Adicionar contexto
═══════════════════════════════════════════════════
Você: Adicione o motivo: tive problemas de saúde comprovados por
      atestado médico

IA: [Email com motivo]

═══════════════════════════════════════════════════
RODADA 3: Ajustar tom
═══════════════════════════════════════════════════
Você: Menos formal, mais humano. Minha professora é bem acessível.

IA: [Email tom ajustado]

═══════════════════════════════════════════════════
RODADA 4: Verificação final
═══════════════════════════════════════════════════
Você: Está bom! Mas remova a última frase que ficou muito
      apologética.

IA: [Email final perfeito]
```

---

## Comandos Úteis para Interação

| Comando | Uso |
|---------|-----|
| "Simplifique" | Resposta menos técnica |
| "Aprofunde" | Mais detalhes |
| "Reformate como [X]" | Mudar apresentação |
| "Foque apenas em [X]" | Reduzir escopo |
| "Expanda o ponto [N]" | Detalhar parte específica |
| "Corrijo: [X]" | Corrigir instrução anterior |
| "Está correto?" | Pedir verificação |
| "Continue" | Seguir linha de raciocínio |
| "Dê exemplo de [X]" | Ilustrar conceito |

---

## Armadilhas a Evitar

### ❌ **Não fazer:**

1. **Mudar completamente o assunto sem contexto**
   ```
   Você: Explique fotossíntese
   IA: [Resposta sobre fotossíntese]
   Você: E sobre carros? ← Confuso! IA perde contexto
   ```

2. **Ser vago demais na correção**
   ```
   Você: Está errado, conserte ← O quê está errado?
   ```

3. **Esperar que IA "lembre" de conversas antigas**
   - IA só lembra do que está na janela atual de contexto

4. **Não dar feedback claro**
   ```
   Você: Meio que não é isso ← Seja específico!
   ```

---

## Exercício Prático

**Desafio de 5 Rodadas:**

Tente criar um artigo de blog usando prompts interativos:

1. **Rodada 1:** Peça outline do artigo
2. **Rodada 2:** Escolha uma seção, peça para expandir
3. **Rodada 3:** Ajuste o tom (mais casual/formal)
4. **Rodada 4:** Peça para adicionar exemplos
5. **Rodada 5:** Revise e corrija possíveis erros

**Observe:** Como cada rodada melhora o resultado!

---

## Resumo

- **Prompts Interativos** = conversa iterativa para refinar resultados
- **3 correções principais:** Foco, Instrução, Detalhamento
- **Seja específico** no feedback
- **Padrão:** Geral → Específico → Refinamento → Validação
- **Vantagem:** Mais natural que mega-prompts complexos

**Próximo passo:** Combine prompts interativos com outras técnicas para resultados ainda melhores!
