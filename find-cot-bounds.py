#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find COT topic boundaries
in_cot = False
cot_start = 0
brace_count = 0

for i, line in enumerate(lines, 1):
    if "'cot': {" in line:
        in_cot = True
        cot_start = i
        brace_count = 1
        print(f"COT topic starts at line {i}", file=sys.stderr)
        continue

    if in_cot:
        # Count braces to find matching closing brace
        brace_count += line.count('{')
        brace_count -= line.count('}')

        if brace_count == 0:
            cot_end = i
            print(f"COT topic ends at line {i}", file=sys.stderr)
            break

print(f"{cot_start},{cot_end}")
