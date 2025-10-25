#!/usr/bin/env python3
"""
Lista todos os módulos e tópicos dos arquivos HTML
"""

import re
import sys

def extract_modules_and_topics(filepath):
    """
    Extrai módulos e tópicos de um arquivo HTML
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex para encontrar módulos
    module_pattern = r'<span class="bg-[^"]*text-white[^>]*>Módulo (\d+)</span>.*?<h3[^>]*>([^<]+)</h3>'
    modules = re.findall(module_pattern, content, re.DOTALL)

    result = []

    for module_num, module_title in modules:
        # Encontrar a seção deste módulo
        module_section_pattern = f'<span class="bg-[^"]*text-white[^>]*>Módulo {module_num}</span>.*?(?=<div class="module-card|<div class="bg-blue-50|<footer)'
        module_section_match = re.search(module_section_pattern, content, re.DOTALL)

        if module_section_match:
            module_section = module_section_match.group(0)

            # Encontrar todos os tópicos nesta seção
            topic_pattern = r'<li[^>]*data-topic="([^"]+)"[^>]*>.*?<span class="mr-2">([^<]*)</span>\s*([^<]+)</button>'
            topics = re.findall(topic_pattern, module_section, re.DOTALL)

            result.append({
                'number': module_num,
                'title': module_title.strip(),
                'topics': [(emoji.strip(), name.strip(), topic_id) for topic_id, emoji, name in topics]
            })

    return result

def main():
    html_files = {
        'Iniciante': 'nivel-iniciante.html',
        'Técnico': 'nivel-tecnico.html',
        'Masterclass': 'nivel-masterclass.html'
    }

    print("=" * 80)
    print("ESTRUTURA DO CURSO - MÓDULOS E TÓPICOS")
    print("=" * 80)

    total_modules = 0
    total_topics = 0

    for nivel, filepath in html_files.items():
        try:
            modules = extract_modules_and_topics(filepath)

            if modules:
                print(f"\n{'='*80}")
                print(f"NÍVEL {nivel.upper()}")
                print(f"{'='*80}")

                for module in modules:
                    total_modules += 1
                    module_topic_count = len(module['topics'])
                    total_topics += module_topic_count

                    print(f"\n📦 MÓDULO {module['number']}: {module['title']}")
                    print(f"   Total de tópicos: {module_topic_count}")
                    print(f"   {'-' * 76}")

                    for i, (emoji, name, topic_id) in enumerate(module['topics'], 1):
                        print(f"   {i}. {emoji} {name}")
                        print(f"      ID: {topic_id}")
            else:
                print(f"\n⚠️  Nenhum módulo encontrado em {filepath}")

        except FileNotFoundError:
            print(f"\n❌ Arquivo não encontrado: {filepath}")
        except Exception as e:
            print(f"\n❌ Erro ao processar {filepath}: {e}")

    print(f"\n{'='*80}")
    print(f"RESUMO GERAL")
    print(f"{'='*80}")
    print(f"Total de Módulos: {total_modules}")
    print(f"Total de Tópicos: {total_topics}")
    print(f"Média de Tópicos por Módulo: {total_topics/total_modules:.1f}" if total_modules > 0 else "N/A")
    print("=" * 80)

if __name__ == '__main__':
    # Configurar encoding UTF-8 no Windows
    if sys.platform == 'win32':
        sys.stdout.reconfigure(encoding='utf-8')
    main()
