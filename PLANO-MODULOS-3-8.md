# Plano de Implementação - Módulos 3 a 8

## Status Atual ✅
- **Concluído:** Módulos 1 e 2 (8 arquivos .md criados)
- **Concluído:** topicos-data.js atualizado com Módulos 1 e 2
- **Concluído:** nivel-iniciante.html com botões duplos
- **Concluído:** nivel-tecnico.html com botões duplos para todos os tópicos

## O Que Falta Fazer 📋

### Total de Arquivos a Criar: 29 arquivos .md

---

## MÓDULO 3 - Técnicas Intermediárias (Técnico)
**Localização:** conteudo/modulo3-*.md
**Página:** nivel-tecnico.html
**Total:** 6 arquivos

1. `modulo3-decomposicao.md` - Decomposição de Tarefas
2. `modulo3-chaining.md` - Prompt Chaining
3. `modulo3-negative.md` - Instruções Negativas
4. `modulo3-parameters.md` - Ajuste de Parâmetros
5. `modulo3-prefilling.md` - Output Prefilling
6. `modulo3-formatting.md` - Formatação Avançada

**Status botões:** ✅ JÁ TEM botões duplos no HTML

---

## MÓDULO 4 - Técnicas Avançadas (Técnico)
**Localização:** conteudo/modulo4-*.md
**Página:** nivel-tecnico.html
**Total:** 5 arquivos

1. `modulo4-structured.md` - Structured Outputs (JSON/XML)
2. `modulo4-longcontext.md` - Long Context Management
3. `modulo4-multimodal.md` - Multimodal Prompting
4. `modulo4-optimization.md` - Model-Specific Optimization
5. `modulo4-testing.md` - Prompt Testing & A/B

**Status botões:** ✅ JÁ TEM botões duplos no HTML

---

## MÓDULO 5 - Engenharia de Contexto e RAG (Técnico)
**Localização:** conteudo/modulo5-*.md
**Página:** nivel-tecnico.html
**Total:** 4 arquivos

1. `modulo5-context-arch.md` - Arquitetura de Contexto
2. `modulo5-rag.md` - RAG (Retrieval-Augmented Generation)
3. `modulo5-vectordb.md` - Vector Databases
4. `modulo5-embeddings.md` - Embeddings e Similarity

**Status botões:** ✅ JÁ TEM botões duplos no HTML

---

## MÓDULO 6 - Agentes Fundamentos (Masterclass)
**Localização:** conteudo/modulo6-*.md
**Página:** nivel-masterclass.html
**Total:** 6 arquivos

1. `modulo6-react.md` - Loops Agênticos (ReAct, ReWOO)
2. `modulo6-tools.md` - Tool Design e Function Calling
3. `modulo6-mcp.md` - Model Context Protocol (MCP)
4. `modulo6-memory.md` - Memory Systems
5. `modulo6-planning.md` - Planning & Reasoning
6. `modulo6-error.md` - Error Handling & Recovery

**Status botões:** ❌ NÃO TEM botões duplos - precisa adicionar

---

## MÓDULO 7 - Agentes Avançados (Masterclass)
**Localização:** conteudo/modulo7-*.md
**Página:** nivel-masterclass.html
**Total:** 4 arquivos

1. `modulo7-skills.md` - Claude Skills
2. `modulo7-extended.md` - Extended Thinking
3. `modulo7-multiagent.md` - Sistemas Multi-Agente
4. `modulo7-voice.md` - Voice AI & Multimodal Agents

**Status botões:** ❌ NÃO TEM botões duplos - precisa adicionar

---

## MÓDULO 8 - Masterclasses Especializadas (Masterclass)
**Localização:** conteudo/modulo8-*.md
**Página:** nivel-masterclass.html
**Total:** 4 arquivos

1. `modulo8-production.md` - Production Systems
2. `modulo8-security.md` - Segurança e Prompt Injection
3. `modulo8-observability.md` - Observabilidade e Monitoring
4. `modulo8-ethics.md` - IA Ética e Alignment

**Status botões:** ❌ NÃO TEM botões duplos - precisa adicionar

---

## Tarefas Adicionais 🔧

### 1. Atualizar nivel-masterclass.html
- ❌ Adicionar scripts do modal no final do HTML:
  ```html
  <script src="topicos-data.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="topicos-modal.js"></script>
  ```
- ❌ Adicionar o modal HTML (copiar de nivel-tecnico.html)
- ❌ Adicionar estilos CSS para markdown (copiar de nivel-tecnico.html)
- ❌ Adicionar botões duplos para TODOS os tópicos dos módulos 6, 7 e 8

### 2. Atualizar topicos-data.js
- ❌ Adicionar todas as 29 entradas com `conteudoArquivo` apontando para os novos .md

### 3. Validação Final
- ❌ Validar sintaxe JavaScript com `node -c topicos-data.js`
- ❌ Testar abertura de modais em nivel-tecnico.html
- ❌ Testar abertura de modais em nivel-masterclass.html
- ❌ Testar links "Abrir Página" (topico-detalhes.html)

### 4. Git
- ❌ Commit e push de todas as mudanças

---

## Comando Para Retomar ⚡

Se você interromper e quiser retomar, use:
```bash
# Ver o que já foi feito
ls conteudo/modulo*.md

# Ver status do git
git status

# Ver este plano
cat PLANO-MODULOS-3-8.md
```

---

## Padrão dos Arquivos .md 📝

Cada arquivo deve seguir este template:

```markdown
# [Título do Tópico]

## O Que É

[Explicação detalhada...]

## Por Que Usar

[Benefícios e casos de uso...]

## Como Funciona

[Explicação técnica...]

## Exemplos Práticos

### Exemplo 1: [Nome]
\`\`\`
[código ou exemplo]
\`\`\`

### Exemplo 2: [Nome]
\`\`\`
[código ou exemplo]
\`\`\`

## Casos de Uso Reais

- **[Caso 1]**: Descrição
- **[Caso 2]**: Descrição

## Dicas Práticas

1. **[Dica 1]**: Explicação
2. **[Dica 2]**: Explicação

## Erros Comuns e Como Evitar

### ❌ Erro 1
[Descrição do erro]

### ✅ Solução
[Como fazer certo]

## Recursos Adicionais

- [Link 1] - Descrição
- [Link 2] - Descrição
```

---

## Progresso Atual 📊

- ✅ Módulo 1: 4/4 arquivos (100%)
- ✅ Módulo 2: 4/4 arquivos (100%)
- ⏳ Módulo 3: 0/6 arquivos (0%)
- ⏳ Módulo 4: 0/5 arquivos (0%)
- ⏳ Módulo 5: 0/4 arquivos (0%)
- ⏳ Módulo 6: 0/6 arquivos (0%)
- ⏳ Módulo 7: 0/4 arquivos (0%)
- ⏳ Módulo 8: 0/4 arquivos (0%)

**Total:** 8/37 arquivos criados (21.6%)

---

## Estimativa de Tempo ⏱️

- Criar 29 arquivos .md: ~3-4 horas
- Atualizar topicos-data.js: ~30 minutos
- Atualizar nivel-masterclass.html: ~1 hora
- Testes e validação: ~30 minutos
- **Total estimado: 5-6 horas**

---

## Últimos Commits 📝

```
23b38bf - Adicionar botões duplos e conteúdo markdown para todos os tópicos dos módulos 1-5
7839044 - Corrigir erro crítico de sintaxe JavaScript em topicos-data.js
69ee99e - Adicionar página dedicada e botões duplos para Módulo 3
```
