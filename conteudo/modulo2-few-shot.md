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
Mostre o tom e linguagem

### 3. Few-Shot de Raciocínio
Mostre o processo de pensamento