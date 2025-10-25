import re

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Encontrar e substituir o tópico 'role' completo
# Padrão: encontrar desde 'role': { até o próximo },
pattern = r"(    'role': \{[\s\S]*?introducao: )[^\n]+\n\s*conteudoCompleto: `[\s\S]*?`,(\s*exemplos:)"

replacement = r'\1"Role Prompting: atribuir persona ao modelo.",\n        conteudoCompleto: "Conteúdo em desenvolvimento.",\2'

content = re.sub(pattern, replacement, content)

with open('topicos-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Corrigido!")
