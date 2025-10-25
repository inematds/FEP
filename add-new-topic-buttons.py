#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para adicionar botões duplos para os novos tópicos:
- contextualizacao (Módulo 2 - Iniciante)
- refinamento (Módulo 3 - Técnico)
"""

import re

# ===== NIVEL INICIANTE - Adicionar contextualizacao após role =====

iniciante_file = r'C:\Users\neima\projetosCC\FEP\nivel-iniciante.html'

# Ler arquivo
with open(iniciante_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Template do novo tópico contextualizacao (após role)
new_topic_contextualizacao = '''
                            <li class="flex items-start">
                                <button class="topic-button text-left w-full hover:text-emerald-700 font-medium text-gray-800 transition-colors flex items-center">
                                    <span class="mr-2">🎯</span> Contextualização Efetiva
                                </button>
                                <div class="topic-explanation hidden ml-6 mt-2 p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                                    <p class="text-sm"><strong>O que é:</strong> Fornecer informações de background (público, situação, objetivo, restrições) que orientam a resposta do modelo.</p>
                                    <p class="text-sm mt-2"><strong>Por que usar:</strong> Contexto transforma prompts genéricos em específicos e úteis.</p>
                                    <p class="text-sm mt-2"><strong>Exemplo:</strong> "Contexto: Sou iniciante em Python. Explique funções" → Resposta adaptada ao nível.</p>
                                    <div class="flex gap-2 mt-3">
                                        <button class="ver-detalhes-btn px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2" data-topico="contextualizacao">
                                            <span>📖</span>
                                            <span>Ver Modal</span>
                                        </button>
                                        <a href="topico-detalhes.html?id=contextualizacao" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                            <span>🔗</span>
                                            <span>Abrir Página</span>
                                        </a>
                                    </div>
                                </div>
                            </li>'''

# Encontrar o ponto de inserção (após role prompting)
pattern_role = r'(<li class="flex items-start">.*?🎭.*?Role Prompting.*?</li>)'
match = re.search(pattern_role, content, re.DOTALL)

if match:
    insertion_point = match.end()
    content = content[:insertion_point] + new_topic_contextualizacao + content[insertion_point:]
    print("[OK] Adicionado contextualizacao em nivel-iniciante.html")
else:
    print("[ERRO] Não encontrei ponto de inserção para contextualizacao")

# Salvar
with open(iniciante_file, 'w', encoding='utf-8') as f:
    f.write(content)

# ===== NIVEL TECNICO - Adicionar refinamento após formatting =====

tecnico_file = r'C:\Users\neima\projetosCC\FEP\nivel-tecnico.html'

# Ler arquivo
with open(tecnico_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Template do novo tópico refinamento
new_topic_refinamento = '''
                                    <li class="mb-4">
                                        <div class="flex items-start mb-2">
                                            <span class="text-2xl mr-3">🔄</span>
                                            <div class="flex-1">
                                                <h4 class="font-semibold text-gray-900">Refinamento Iterativo</h4>
                                                <p class="text-sm text-gray-600 mt-1">Melhorar prompts através de ciclos de tentativa, avaliação e ajuste.</p>
                                            </div>
                                        </div>
                                        <div class="ml-11 flex gap-2">
                                            <button class="ver-detalhes-btn px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" data-topico="refinamento">
                                                <span>📖</span>
                                                <span>Ver Modal</span>
                                            </button>
                                            <a href="topico-detalhes.html?id=refinamento" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                                                <span>🔗</span>
                                                <span>Abrir Página</span>
                                            </a>
                                        </div>
                                    </li>'''

# Encontrar o ponto de inserção (após formatting)
pattern_formatting = r'(<li class="mb-4">.*?🏗️.*?Formatting.*?</li>)'
match = re.search(pattern_formatting, content, re.DOTALL)

if match:
    insertion_point = match.end()
    content = content[:insertion_point] + new_topic_refinamento + content[insertion_point:]
    print("[OK] Adicionado refinamento em nivel-tecnico.html")
else:
    print("[ERRO] Não encontrei ponto de inserção para refinamento")

# Salvar
with open(tecnico_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Script concluído!")
