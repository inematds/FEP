#!/usr/bin/env python
# -*- coding: utf-8 -*-

with open('topicos-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Count backticks up to line 1020 (before the problematic line 1021)
count = 0
for i, line in enumerate(lines[:1020], 1):
    # Count non-escaped backticks
    j = 0
    while j < len(line):
        if line[j] == '`':
            # Check if it's escaped
            if j == 0 or line[j-1] != '\\':
                count += 1
        j += 1

print(f"Non-escaped backticks before line 1021: {count}")
print(f"Is even (balanced): {count % 2 == 0}")

# Also show backtick counts per topic section
print("\nBackticks by section:")
in_topic = None
topic_counts = {}
for i, line in enumerate(lines, 1):
    if "'cot':" in line:
        in_topic = 'cot'
        topic_counts['cot'] = 0
    elif "'role':" in line:
        in_topic = 'role'
        topic_counts['role'] = 0

    if in_topic:
        j = 0
        while j < len(line):
            if line[j] == '`' and (j == 0 or line[j-1] != '\\'):
                topic_counts[in_topic] += 1
            j += 1

for topic, count in topic_counts.items():
    print(f"  {topic}: {count} backticks (even: {count % 2 == 0})")
