#!/usr/bin/env python
# -*- coding: utf-8 -*-

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find all backticks in the COT topic
in_cot = False
cot_start = 0
cot_end = 0

for i, line in enumerate(lines, 1):
    if "'cot':" in line:
        in_cot = True
        cot_start = i
    elif in_cot and (line.strip() == '},' or (line.strip() == '}' and i < len(lines) and (lines[i].strip().startswith("'") or lines[i].strip() == '};'))):
        cot_end = i
        break

print(f"COT topic spans lines {cot_start} to {cot_end}")
print("\nBackticks in COT topic:")

for i in range(cot_start - 1, cot_end):
    line = lines[i]
    j = 0
    while j < len(line):
        if line[j] == '`':
            # Check if escaped
            is_escaped = j > 0 and line[j-1] == '\\'
            context = line[max(0, j-20):min(len(line), j+20)].strip()
            print(f"  Line {i+1}: {'ESCAPED' if is_escaped else 'UNESCAPED'} - ...{context}...")
        j += 1
