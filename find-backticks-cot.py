#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# COT topic is lines 833-1014
cot_start = 832  # 0-indexed
cot_end = 1014

print(f"Analyzing COT topic (lines 833-1014)", file=sys.stderr)
print(f"\nUnescaped backticks:", file=sys.stderr)

count = 0
for i in range(cot_start, cot_end):
    line = lines[i]
    j = 0
    while j < len(line):
        if line[j] == '`':
            # Check if escaped
            is_escaped = j > 0 and line[j-1] == '\\'
            if not is_escaped:
                count += 1
                # Show context
                start = max(0, j-15)
                end = min(len(line), j+15)
                context = line[start:end].replace('\n', ' ')
                print(f"  #{count} Line {i+1}: ...{context}...", file=sys.stderr)
        j += 1

print(f"\nTotal unescaped backticks: {count}", file=sys.stderr)
print(f"Balanced: {count % 2 == 0}", file=sys.stderr)
