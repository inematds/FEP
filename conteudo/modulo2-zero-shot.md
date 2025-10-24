## O que é Zero-Shot?

"Zero-shot" significa "zero exemplos". Você simplesmente descreve a tarefa e o modelo tenta executar baseado em seu treinamento.

### Estrutura Básica

\`\`\`
[Instrução clara do que fazer]
[Especificações opcionais]
[Input/contexto se necessário]
\`\`\`

### Quando Usar Zero-Shot?

✅ Tarefas comuns e bem definidas
✅ Quando o modelo já tem conhecimento da tarefa
✅ Para economizar tempo (não precisa criar exemplos)
✅ Quando a tarefa é auto-explicativa

### Limitações

❌ Tarefas muito específicas ou incomuns
❌ Formatos muito particulares
❌ Quando você precisa de estilo muito específico
❌ Tarefas ambíguas

## Exemplos de Bom Uso

### Tradução
"Traduza este texto para inglês: [texto]"
→ Tarefa comum, modelo sabe fazer

### Resumo
"Resuma este artigo em 3 frases: [artigo]"
→ Tarefa direta e conhecida

### Extração
"Extraia todos os emails deste texto: [texto]"
→ Padrão claro e reconhecível