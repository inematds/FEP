# 🚀 GPT-5.1 Advanced Prompting Guide

<!-- Powered by BMAD™ Core -->

## 📖 Overview

Este guia contém técnicas avançadas de prompting baseadas nas melhores práticas oficiais da OpenAI para modelos GPT-5.1, incluindo controle de personalidade, persistência de solução, metaprompting, formatação de output e uso de ferramentas.

**Fonte:** [OpenAI GPT-5.1 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5-1_prompting_guide)

---

## 🎯 Princípios Fundamentais do GPT-5.1

### **Agentic Steerability (Controle de Personalidade)**
GPT-5.1 responde excepcionalmente bem a definições explícitas de personalidade e tom. Defina personas claras de agente, especialmente para aplicações voltadas ao cliente, com calibração cuidadosa entre cordialidade e objetividade.

### **Instruction Following (Seguimento de Instruções)**
O modelo se destaca em aderir a instruções concretas e não contraditórias. É essencial esclarecer regras conflitantes — resolva explicitamente tensões entre diretrizes concorrentes.

---

## 🔥 Técnicas-Chave de Prompting

### 1. **Personality & Tone Shaping (Modelagem de Personalidade e Tom)**

Defina explicitamente a filosofia de comunicação do agente.

**Práticas recomendadas:**
- Defina filosofia de comunicação explicitamente (ex: "respeito através do momentum")
- Use frameworks como "polidez adaptativa" para variar respostas por contexto
- Especifique quando incluir vs. omitir frases de reconhecimento
- Declare princípios subjacentes que guiam o estilo de resposta

**Template:**
```
Você é um assistente que segue a filosofia de "respeito através do momentum".

Princípios de comunicação:
- Seja direto e objetivo quando o usuário está em modo de ação
- Seja empático e detalhado quando houver dúvidas ou confusão
- Omita frases de reconhecimento ("Entendo", "Ótima pergunta") quando a tarefa for clara
- Use tom adaptativo: mais formal para negócios, mais casual para criatividade

Quando houver ambiguidade entre ser cordial e ser eficiente, priorize [eficiência/cordialidade].
```

---

### 2. **Output Formatting Control (Controle de Formatação de Saída)**

Use seções dedicadas com regras de compactação.

**Configurações recomendadas:**
- Especifique limites de linhas/palavras para diferentes magnitudes de mudança
- Proíba narração desnecessária de processos (ex: logs de build)
- Restrinja snippets de código por resposta
- Prefira referências em linguagem natural em vez de blocos de código

**Template:**
```
# Formatação de Output

**Regras de Compactação:**
- Mudanças pequenas (1-3 arquivos): máximo 50 linhas de explicação
- Mudanças médias (4-10 arquivos): máximo 100 linhas
- Mudanças grandes (10+ arquivos): máximo 200 linhas

**Proibições:**
- ❌ NÃO inclua logs de build completos
- ❌ NÃO mostre mais de 3 blocos de código por resposta
- ❌ NÃO narre processos óbvios ("Agora vou executar...", "Estou analisando...")

**Preferências:**
- ✅ Use referências naturais: "O método `authenticate()` em auth.js:42"
- ✅ Resuma mudanças em listas de bullets
- ✅ Destaque apenas trechos críticos de código
```

---

### 3. **User Updates (Preambles) - Atualizações ao Usuário**

Estruture como o modelo comunica progresso.

**Padrões eficazes:**
- "Envie atualizações curtas (1-2 frases) a cada poucas chamadas de ferramenta"
- Exija planos iniciais, descobertas significativas e recaps
- Defina limiares de frequência (ex: a cada 6 passos de execução)
- Rastreie status com marcadores explícitos Done/Closed

**Template:**
```
# Comunicação de Progresso

**Frequência de Updates:**
- Envie update a cada 5-6 tool calls
- Sempre envie update quando descobrir algo inesperado
- Envie recap ao completar milestone importante

**Formato de Update:**
Máximo 2 frases por update.

Exemplo:
"✓ Analisados 12 componentes. Encontrada inconsistência no sistema de autenticação."

**Status Tracking:**
- Use ✓ para tarefas completadas
- Use ⚡ para tarefas em andamento
- Use ❌ para bloqueios identificados
```

---

### 4. **Solution Persistence (Persistência de Solução)**

Previna conclusão prematura de tarefas.

**Princípios-chave:**
- "Trate-se como um programador sênior autônomo em pair-programming"
- Persista até completamente resolvido de ponta a ponta
- Seja "extremamente enviesado para ação"
- Evite parar em análise ou correções parciais

**Template:**
```
# Persistência de Solução

Você é um desenvolvedor sênior autônomo trabalhando em pair-programming.

**Comportamento Obrigatório:**
1. Persista até entregar solução completa end-to-end
2. NÃO pare em:
   - Análise sem ação
   - Correções parciais
   - Sugestões sem implementação
   - Diagnóstico sem solução

3. Quando em dúvida entre "devo agir?" → seja EXTREMAMENTE ENVIESADO PARA AÇÃO
4. Se a ação for tecnicamente possível, EXECUTE-A

**Critério de Conclusão:**
Tarefa só está completa quando:
- ✅ Código implementado
- ✅ Testes passando
- ✅ Validações executadas
- ✅ Documentação atualizada (se aplicável)
```

---

### 5. **Tool-Calling Patterns (Padrões de Chamada de Ferramentas)**

Defina claramente quando e como usar ferramentas.

**Melhores práticas:**
- Descreva funcionalidade e quando/como usar ferramentas no prompt
- Forneça exemplos concretos com argumentos esperados e outputs
- Clarifique invocações obrigatórias vs. opcionais de ferramentas
- Inclua incentivo para chamadas paralelas quando apropriado

**Template:**
```
# Tool Usage Guidelines

## Ferramenta: read_file
**Quando usar:** Sempre que precisar do conteúdo exato de um arquivo
**Argumentos:** file_path (absoluto)
**Exemplo:** read_file("/Users/project/src/auth.ts")
**Paralelismo:** ✅ Permitido - leia múltiplos arquivos simultaneamente

## Ferramenta: apply_patch
**Quando usar:** Para criar, modificar ou deletar arquivos
**Obrigatório quando:** Usuário pedir mudanças em código
**Proibido quando:** Apenas explorando/analisando código
**Paralelismo:** ✅ Permitido - edite múltiplos arquivos de uma vez

## Ferramenta: shell
**Quando usar:** Comandos CLI, builds, testes
**Obrigatório confirmar:** Comandos destrutivos (rm, drop, delete)
**Output:** Sempre mostre stdout/stderr + exit code
```

---

### 6. **Planning Tools (Ferramentas de Planejamento)**

Para tarefas de complexidade média ou superior.

**Estrutura recomendada:**
- Crie planos leves com 2-5 itens de milestone
- Evite micro-passos ou listagens de tarefas operacionais
- Mantenha exatamente um item in-progress por vez
- Atualize status antes de mudanças de código (nunca batch-complete)
- Estabeleça invariante end-of-turn: zero in_progress, zero pending

**Template:**
```
# Planning Protocol

**Estrutura do Plano:**
[
  {"milestone": "Configurar autenticação JWT", "status": "in_progress"},
  {"milestone": "Implementar middleware de proteção", "status": "pending"},
  {"milestone": "Criar testes de integração", "status": "pending"}
]

**Regras Rígidas:**
1. Máximo 5 milestones por plano
2. EXATAMENTE 1 item "in_progress" por vez
3. Atualize status ANTES de fazer code changes
4. NUNCA marque múltiplos como "done" de uma vez
5. End-of-turn: zero "in_progress", zero "pending"

**Granularidade:**
❌ Muito detalhado: "Importar biblioteca bcrypt"
✅ Milestone adequado: "Implementar hashing de senhas"
```

---

### 7. **Design System Enforcement (Aplicação de Sistema de Design)**

Restrinja output de frontend para consistência.

**Princípios:**
- "Tokens-first: NÃO hardcode cores"
- Exija todas as cores de variáveis CSS
- Use utilitários Tailwind conectados a design tokens
- Introduza brand tokens antes de estilizar

**Template:**
```
# Design System Rules

**Cores e Estilos:**
- ❌ PROIBIDO: hardcoded colors (ex: #3B82F6, rgb(59, 130, 246))
- ✅ OBRIGATÓRIO: CSS variables (ex: var(--color-primary))
- ✅ OBRIGATÓRIO: Tailwind tokens (ex: bg-primary-500)

**Antes de qualquer estilização:**
1. Declare design tokens no :root
2. Wire Tailwind config para usar esses tokens
3. Só então aplique classes

**Exemplo:**
```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #8B5CF6;
}
```

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)'
    }
  }
}
```
```

---

## 🧠 Reasoning Mode Guidance

### **Modo "none"**
Adequado para tarefas de baixa latência sem raciocínio pesado.

**Combine com:**
- Planejamento extensivo antes de function calls
- Reflexão sobre resultados de funções anteriores
- Verificação de output para seleções de ferramentas
- Checagem explícita de satisfação de constraints

**Template:**
```
# Reasoning Mode: none

**Compensações Obrigatórias:**

Antes de CADA tool call:
1. Planeje: "O que essa ferramenta vai fazer?"
2. Valide: "Tenho todos os argumentos necessários?"
3. Preveja: "Qual output esperado?"

Depois de CADA tool call:
1. Reflita: "O resultado foi o esperado?"
2. Valide: "Atende aos constraints?"
3. Decida: "Próximo passo ou conclusão?"
```

---

## 🔧 Metaprompting Strategy (Estratégia de Metaprompting)

Abordagem diagnóstica em duas etapas.

### **Step 1 – Root Cause Analysis (Análise de Causa Raiz)**

Forneça system prompt + exemplos de falhas ao modelo. Peça que identifique modos de falha, cite seções problemáticas do prompt e explique como essas linhas causam comportamento inadequado.

**Template:**
```
Vou fornecer um system prompt e exemplos de outputs que falharam.

**Sua tarefa:**
1. Identifique modos de falha específicos
2. Cite EXATAMENTE as linhas problemáticas do prompt
3. Explique como cada linha citada causa o comportamento inadequado

**Formato de output:**
| Modo de Falha | Linha(s) Problemática(s) | Explicação |
```

### **Step 2 – Surgical Revision (Revisão Cirúrgica)**

Forneça a análise de modos de falha. Solicite edits pequenos e explícitos que clarifiquem contradições, removam redundância e tornem tradeoffs transparentes — sem redesign completo.

**Template:**
```
Baseado na análise de falhas, faça revisões CIRÚRGICAS.

**Restrições:**
- ❌ NÃO reescreva o prompt inteiro
- ✅ Edits mínimos e explícitos
- ✅ Remova contradições
- ✅ Clarifique regras vagas
- ✅ Torne tradeoffs explícitos

**Formato:**
Para cada edit, mostre:
- Texto original (quote exato)
- Texto revisado
- Razão da mudança (1 frase)
```

---

## 🛠️ New Tool Types (Novos Tipos de Ferramentas)

### **apply_patch**
Diffs estruturados para criação, atualização e deleção de arquivos.

**Impacto:** Implementação de ferramenta nomeada (não descrições customizadas) reduziu falhas em 35%.

### **shell**
Acesso controlado a CLI.

**Funcionamento:** Modelo propõe comandos; sistema executa e retorna stdout/stderr + exit codes.

---

## ⚠️ Common Pitfalls & Fixes (Armadilhas Comuns e Soluções)

| Problema | Solução |
|----------|---------|
| Concisão excessiva | Enfatize persistência e completude via prompting |
| Verbosidade indesejada | Use orientação explícita de length + parâmetro verbosity |
| Má aderência a instruções | Verifique instruções conflitantes; seja muito claro |
| Término prematuro de tool | Reenquadre como agente autônomo com regras explícitas de persistência |
| Uso inconsistente de tools | Forneça hierarquia de quando tools devem vs. não devem aplicar |

---

## 🔄 Optimization Loop Pattern (Padrão de Loop de Otimização)

1. Estabeleça agente baseline com prompts versionados
2. Colete feedback (humano ou LLM-as-judge)
3. Execute evals contra graders predefinidos
4. Use metaprompt para gerar prompt melhorado
5. A/B teste nova versão; rastreie scores agregados
6. Implante melhor performer; estabeleça fallback de histórico de versões
7. Monitore continuamente; repita conforme novos dados chegam

---

## 📋 Example Prompt Sections (Seções de Exemplo de Prompt)

### **Autonomia de Summarizer:**
```
Proativamente reúna contexto, planeje, implemente, teste e refine sem esperar por prompts adicionais.
NÃO pare em análise ou correções parciais; leve mudanças até implementação completa.
```

### **Clareza de Uso de Tool:**
```
Quando o usuário pedir para reservar, agendar ou marcar mesa, você DEVE chamar `create_reservation`.
NÃO adivinhe horário ou nome de reserva — pergunte qualquer detalhe que estiver faltando.
```

### **Requisito de Verificação:**
```
Ao selecionar variante de substituição, verifique que atende a TODOS os constraints do usuário...
Quote o item-id e preço de volta para confirmação antes de executar.
```

---

## 🚀 Migration from GPT-5 (Migração do GPT-5)

- Enfatize persistência para contra-balancear concisão excessiva
- Seja explícito sobre verbosidade de output
- Migre agentes de coding para ferramenta nomeada apply_patch
- Aproveite melhor aderência a instruções para moldar comportamento via prompts

---

## 🔗 Integração com BMad Agents

**Agents que mais se beneficiam:**

| Agent | Técnicas Recomendadas |
|-------|----------------------|
| **Dev** | Solution Persistence + Tool-Calling Patterns + Planning Tools |
| **Architect** | Design System Enforcement + Metaprompting + Output Formatting |
| **PM** | Personality Shaping + User Updates + Reasoning Mode |
| **QA** | Verification Requirements + Optimization Loop + Metaprompting |
| **Analyst** | Reasoning Mode + Metaprompting + User Updates |

**Uso recomendado:** Adicione seções relevantes deste guia aos custom instructions de cada agente conforme necessário.

---

## 📚 Referências

- **Oficial:** [OpenAI GPT-5.1 Prompting Guide](https://cookbook.openai.com/examples/gpt-5/gpt-5-1_prompting_guide)
- **Interno:** `gpt51/` resources

---

**Última atualização:** 2025-11-16
**Status:** ✅ Ativo e integrado ao BMad Core
**Versão:** 2.0 (com conteúdo oficial OpenAI)
