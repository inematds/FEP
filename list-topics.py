#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

topics = []
current_topic = None

for i, line in enumerate(lines, 1):
    # Find topic key
    if line.strip().startswith("'") and ': {' in line:
        key = line.strip().split("'")[1]
        current_topic = {'key': key, 'line': i}
        continue

    # Find module number
    if current_topic and 'modulo:' in line:
        modulo = line.split('modulo:')[1].strip().rstrip(',')
        current_topic['modulo'] = int(modulo)

    # Find title
    if current_topic and 'titulo:' in line:
        titulo = line.split('titulo:')[1].strip().strip("'\"").rstrip(',')
        current_topic['titulo'] = titulo

    # Check if has conteudoArquivo
    if current_topic and 'conteudoArquivo:' in line:
        current_topic['has_md'] = True
        topics.append(current_topic)
        current_topic = None
    elif current_topic and 'conteudoCompleto:' in line:
        current_topic['has_md'] = False
        topics.append(current_topic)
        current_topic = None

# Group by module
modulos = {}
for topic in topics:
    mod = topic.get('modulo', 0)
    if mod not in modulos:
        modulos[mod] = []
    modulos[mod].append(topic)

print("Tópicos por módulo:\n", file=sys.stderr)
for mod in sorted(modulos.keys()):
    print(f"MÓDULO {mod}:", file=sys.stderr)
    for topic in modulos[mod]:
        status = "✅ .md" if topic.get('has_md') else "❌ inline"
        print(f"  {status} - {topic['key']}: {topic.get('titulo', 'N/A')}", file=sys.stderr)
    print("", file=sys.stderr)

# Print topics that need .md files
needs_md = [t for t in topics if not t.get('has_md')]
print(f"\n{len(needs_md)} tópicos precisam de arquivos .md:", file=sys.stderr)
for topic in needs_md:
    print(f"  - {topic['key']} (módulo {topic['modulo']})", file=sys.stderr)
