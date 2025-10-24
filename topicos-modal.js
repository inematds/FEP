// Sistema de Modal para Detalhamento de Tópicos
(function() {
    'use strict';

    const modal = document.getElementById('topicoModal');
    const closeModalBtn = document.getElementById('closeModal');
    const closeModalFooterBtn = document.getElementById('closeModalBtn');

    // Função para abrir o modal e popular com dados do tópico
    function abrirModal(topicoKey) {
        const topico = topicosData[topicoKey];

        if (!topico) {
            console.error('Tópico não encontrado:', topicoKey);
            return;
        }

        // Preencher informações do header
        document.getElementById('modalIcon').textContent = topico.icon;
        document.getElementById('modalTitulo').textContent = topico.titulo;
        document.getElementById('modalNivel').textContent = topico.nivel;
        document.getElementById('modalModulo').textContent = topico.modulo;

        // Preencher introdução
        document.getElementById('modalIntroducao').textContent = topico.introducao;

        // Preencher conteúdo completo (Markdown formatado)
        const conteudoCompleto = document.getElementById('modalConteudoCompleto');
        conteudoCompleto.innerHTML = formatarMarkdown(topico.conteudoCompleto);

        // Preencher exemplos
        renderizarExemplos(topico.exemplos);

        // Preencher casos de uso
        renderizarCasosDeUso(topico.casosDeUso);

        // Preencher dicas práticas
        renderizarDicasPraticas(topico.dicasPraticas);

        // Preencher erros comuns
        renderizarErrosComuns(topico.errosComuns);

        // Preencher recursos adicionais
        renderizarRecursosAdicionais(topico.recursosAdicionais);

        // Mostrar modal
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevenir scroll da página
    }

    // Função para fechar o modal
    function fecharModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restaurar scroll
    }

    // Formatação básica de Markdown para HTML
    function formatarMarkdown(texto) {
        if (!texto) return '';

        return texto
            // Headers
            .replace(/### (.*?)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h3>')
            .replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
            // Listas com bullet
            .replace(/^- (.*?)$/gm, '<li class="ml-6 mb-2">$1</li>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
            // Inline code
            .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
            // Parágrafos (linhas em branco)
            .replace(/\n\n/g, '</p><p class="mb-4">')
            // Quebras de linha
            .replace(/\n/g, '<br>');
    }

    // Renderizar seção de exemplos
    function renderizarExemplos(exemplos) {
        const container = document.getElementById('modalExemplos');

        if (!exemplos || exemplos.length === 0) {
            container.innerHTML = '';
            return;
        }

        let html = '<h3 class="text-2xl font-bold mb-4 text-gray-900">💡 Exemplos Práticos</h3>';

        exemplos.forEach((exemplo, index) => {
            html += `
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-4 border-l-4 border-green-500">
                    <h4 class="text-lg font-bold text-gray-900 mb-2">${exemplo.titulo}</h4>
                    ${exemplo.contexto ? `<p class="text-sm text-gray-600 mb-4 italic">${exemplo.contexto}</p>` : ''}

                    ${exemplo.semDecomposicao ? `
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-red-600 font-semibold">❌ Sem a técnica:</span>
                            </div>
                            <pre class="bg-red-50 p-4 rounded-lg text-sm border border-red-200 overflow-x-auto whitespace-pre-wrap">${exemplo.semDecomposicao}</pre>
                        </div>
                    ` : ''}

                    ${exemplo.comDecomposicao || exemplo.chainCompleto ? `
                        <div class="mb-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-green-600 font-semibold">✅ Com a técnica:</span>
                            </div>
                            <pre class="bg-white p-4 rounded-lg text-sm border border-green-200 overflow-x-auto whitespace-pre-wrap">${exemplo.comDecomposicao || exemplo.chainCompleto}</pre>
                        </div>
                    ` : ''}

                    ${exemplo.resultado || exemplo.beneficio ? `
                        <div class="bg-blue-100 p-3 rounded-lg mt-3">
                            <span class="font-semibold text-blue-900">🎯 Resultado:</span>
                            <span class="text-blue-800"> ${exemplo.resultado || exemplo.beneficio}</span>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Renderizar casos de uso
    function renderizarCasosDeUso(casosDeUso) {
        const container = document.getElementById('modalCasosUso');

        if (!casosDeUso || casosDeUso.length === 0) {
            container.innerHTML = '';
            return;
        }

        let html = '<h3 class="text-2xl font-bold mb-4 text-gray-900">🎯 Casos de Uso</h3>';
        html += '<div class="grid gap-4">';

        casosDeUso.forEach(caso => {
            html += `
                <div class="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div class="font-bold text-purple-900 mb-1">${caso.area}</div>
                    <div class="text-sm text-gray-700 mb-2">${caso.aplicacao}</div>
                    <div class="text-sm text-gray-600 italic">${caso.detalhes}</div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    // Renderizar dicas práticas
    function renderizarDicasPraticas(dicas) {
        const container = document.getElementById('modalDicas');

        if (!dicas || dicas.length === 0) {
            container.innerHTML = '';
            return;
        }

        let html = '<h3 class="text-2xl font-bold mb-4 text-gray-900">⭐ Dicas Práticas</h3>';
        html += '<ul class="space-y-2">';

        dicas.forEach(dica => {
            html += `<li class="flex items-start gap-3 bg-yellow-50 p-3 rounded-lg">
                <span class="text-yellow-600 text-lg flex-shrink-0">💡</span>
                <span class="text-gray-700">${dica}</span>
            </li>`;
        });

        html += '</ul>';
        container.innerHTML = html;
    }

    // Renderizar erros comuns
    function renderizarErrosComuns(erros) {
        const container = document.getElementById('modalErros');

        if (!erros || erros.length === 0) {
            container.innerHTML = '';
            return;
        }

        let html = '<h3 class="text-2xl font-bold mb-4 text-gray-900">⚠️ Erros Comuns</h3>';

        erros.forEach(erro => {
            html += `
                <div class="bg-red-50 rounded-lg p-4 mb-3 border-l-4 border-red-500">
                    <div class="font-bold text-red-900 mb-2">❌ ${erro.erro}</div>
                    ${erro.exemplo ? `<div class="text-sm text-gray-600 mb-2 italic">Exemplo: ${erro.exemplo}</div>` : ''}
                    <div class="text-sm text-green-700 bg-green-50 p-2 rounded">
                        <strong>✓ Solução:</strong> ${erro.solucao}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // Renderizar recursos adicionais
    function renderizarRecursosAdicionais(recursos) {
        const container = document.getElementById('modalRecursos');

        if (!recursos || recursos.length === 0) {
            container.innerHTML = '';
            return;
        }

        let html = '<h3 class="text-2xl font-bold mb-4 text-gray-900">📚 Recursos Adicionais</h3>';
        html += '<ul class="space-y-2">';

        recursos.forEach(recurso => {
            html += `<li class="flex items-start gap-2 text-gray-700 p-2 hover:bg-gray-50 rounded">
                <span class="flex-shrink-0">→</span>
                <span>${recurso}</span>
            </li>`;
        });

        html += '</ul>';
        container.innerHTML = html;
    }

    // Event listeners
    document.addEventListener('click', function(e) {
        // Abrir modal ao clicar em botão "Ver Explicação Completa"
        if (e.target.closest('.ver-detalhes-btn')) {
            e.preventDefault();
            const btn = e.target.closest('.ver-detalhes-btn');
            const topicoKey = btn.getAttribute('data-topico');
            abrirModal(topicoKey);
        }
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', fecharModal);
    closeModalFooterBtn.addEventListener('click', fecharModal);

    // Fechar modal ao clicar fora dele
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            fecharModal();
        }
    });
})();
