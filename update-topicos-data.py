#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import sys

# Mapping of topic keys to their .md filenames
topic_files = {
    'llm-basics': 'conteudo/modulo1-llm-basics.md',
    'tokens': 'conteudo/modulo1-tokens.md',
    'anatomia': 'conteudo/modulo1-anatomia.md',
    'clareza': 'conteudo/modulo1-clareza.md',
    'zero-shot': 'conteudo/modulo2-zero-shot.md',
    'few-shot': 'conteudo/modulo2-few-shot.md',
    'cot': 'conteudo/modulo2-cot.md',
    'role': 'conteudo/modulo2-role.md'
}

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# For each topic, replace conteudoCompleto with conteudoArquivo
for topic_key, filename in topic_files.items():
    print(f"Updating {topic_key}...", file=sys.stderr)

    # Pattern: Find the conteudoCompleto section for this topic
    # It starts with "conteudoCompleto: `" and ends with "`,\n\n        exemplos:"
    pattern = rf"('{topic_key}':\s*\{{.*?)(conteudoCompleto:\s*`.*?`,)(\s*exemplos:)"

    def replace_func(match):
        before = match.group(1)
        after = match.group(3)
        # Replace with conteudoArquivo
        replacement = f"// Conteúdo completo em arquivo externo (abordagem híbrida)\n        conteudoArquivo: '{filename}',"
        return before + replacement + after

    new_content = re.sub(pattern, replace_func, content, flags=re.DOTALL)

    if new_content != content:
        content = new_content
        print(f"  ✓ Updated {topic_key}", file=sys.stderr)
    else:
        print(f"  ✗ Failed to update {topic_key}", file=sys.stderr)

# Write the updated content
with open('topicos-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✓ topicos-data.js updated successfully!", file=sys.stderr)
