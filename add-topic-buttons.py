#!/usr/bin/env python3
"""
Script para adicionar botões de 'Ver Modal' e 'Abrir Página'
aos tópicos que ainda não os têm nos arquivos HTML
"""

import re
import os

def add_buttons_to_topic(content):
    """
    Adiciona os botões aos tópicos que não os possuem
    """
    # Padrão para encontrar tópicos sem botões
    # Procura por topic-explanation que termina sem os botões
    pattern = r'(<div class="topic-explanation[^>]*>.*?<p class="text-sm mt-2"><strong>(?:Exemplo|Por que usar):</strong>.*?</p>)\s*(</div>\s*</li>)'

    # Template dos botões
    buttons_template = '''
                                    <div class="mt-3 grid grid-cols-2 gap-2">
                                        <button class="ver-detalhes-btn px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2" data-topico="{topic_id}">
                                            <span>📖</span>
                                            <span>Ver Modal</span>
                                        </button>
                                        <a href="topico-detalhes.html?id={topic_id}" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                            <span>🔗</span>
                                            <span>Abrir Página</span>
                                        </a>
                                    </div>'''

    def replace_func(match):
        # Pega o conteúdo antes do fechamento
        before = match.group(1)
        closing = match.group(2)

        # Verifica se já tem botões
        if 'ver-detalhes-btn' in before or 'grid grid-cols-2 gap-2' in before:
            return match.group(0)  # Já tem botões, não altera

        # Extrai o data-topic do li pai
        # Procura para trás no conteúdo para achar o data-topic
        search_back = content[:match.start()]
        topic_match = re.search(r'<li[^>]*data-topic="([^"]+)"[^>]*>', search_back[::-1])

        if not topic_match:
            # Tenta encontrar o data-topic de forma diferente
            li_pattern = r'<li[^>]*data-topic="([^"]+)"[^>]*>(?:(?!</li>).)*?' + re.escape(before)
            li_match = re.search(li_pattern, content[:match.end()], re.DOTALL)
            if li_match:
                topic_id = li_match.group(1)
            else:
                return match.group(0)  # Não conseguiu encontrar, não altera
        else:
            # O match está invertido, então precisamos reverter
            topic_id = topic_match.group(1)[::-1]

        # Adiciona os botões
        buttons = buttons_template.format(topic_id=topic_id)
        return before + buttons + '\n' + closing

    # Aplica a substituição
    modified = re.sub(pattern, replace_func, content, flags=re.DOTALL)
    return modified

def process_html_file(filepath):
    """
    Processa um arquivo HTML adicionando botões onde necessário
    """
    print(f"Processando {filepath}...")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Conta quantos tópicos existem
    topic_count = len(re.findall(r'<li[^>]*class="topic-item[^"]*"[^>]*data-topic="[^"]+"', content))
    # Conta quantos já têm botões
    button_count = len(re.findall(r'<button[^>]*class="[^"]*ver-detalhes-btn', content))

    print(f"  Tópicos encontrados: {topic_count}")
    print(f"  Tópicos com botões: {button_count}")
    print(f"  Tópicos sem botões: {topic_count - button_count}")

    if topic_count == button_count:
        print(f"  ✓ Todos os tópicos já têm botões!")
        return False

    # Adiciona os botões
    modified = add_buttons_to_topic(content)

    # Salva o arquivo
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(modified)

    # Verifica novamente
    button_count_after = len(re.findall(r'<button[^>]*class="[^"]*ver-detalhes-btn', modified))
    print(f"  ✓ Botões adicionados: {button_count_after - button_count}")
    print(f"  ✓ Total de tópicos com botões agora: {button_count_after}")

    return True

def main():
    """
    Função principal
    """
    html_files = [
        'nivel-iniciante.html',
        'nivel-tecnico.html',
        'nivel-masterclass.html'
    ]

    modified_files = []

    for html_file in html_files:
        if os.path.exists(html_file):
            if process_html_file(html_file):
                modified_files.append(html_file)
        else:
            print(f"Arquivo não encontrado: {html_file}")

    print("\n" + "="*60)
    if modified_files:
        print(f"✓ Concluído! {len(modified_files)} arquivo(s) modificado(s):")
        for f in modified_files:
            print(f"  - {f}")
    else:
        print("✓ Nenhuma modificação necessária. Todos os arquivos já estão atualizados!")

if __name__ == '__main__':
    main()
