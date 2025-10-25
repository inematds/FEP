#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import sys

# Topics that need .md files
topics_to_extract = {
    'llm-basics': 'modulo1-llm-basics.md',
    'tokens': 'modulo1-tokens.md',
    'anatomia': 'modulo1-anatomia.md',
    'clareza': 'modulo1-clareza.md',
    'zero-shot': 'modulo2-zero-shot.md',
    'few-shot': 'modulo2-few-shot.md',
    'cot': 'modulo2-cot.md',
    'role': 'modulo2-role.md'
}

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

for topic_key, filename in topics_to_extract.items():
    print(f"Extracting {topic_key}...", file=sys.stderr)

    # Find the topic definition
    pattern = rf"'{topic_key}':\s*\{{.*?conteudoCompleto:\s*`(.*?)`,\s*exemplos:"
    match = re.search(pattern, content, re.DOTALL)

    if match:
        conteudo = match.group(1)
        # Clean up the content - remove leading/trailing whitespace
        conteudo = conteudo.strip()

        # Write to file
        output_path = f'conteudo/{filename}'
        with open(output_path, 'w', encoding='utf-8') as out:
            out.write(conteudo)

        print(f"  ✓ Created {output_path}", file=sys.stderr)
    else:
        print(f"  ✗ Could not find content for {topic_key}", file=sys.stderr)

print(f"\nDone! Created {len(topics_to_extract)} .md files in conteudo/", file=sys.stderr)
