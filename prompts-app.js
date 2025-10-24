// Prompts Application Logic
class PromptsApp {
    constructor() {
        this.prompts = promptsData;
        this.favorites = this.loadFavorites();
        this.currentFilter = 'all';
        this.currentView = 'all';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.renderPrompts();
        this.attachEventListeners();
        this.updateFavoriteCount();
    }

    loadFavorites() {
        const saved = localStorage.getItem('fep-favorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('fep-favorites', JSON.stringify(this.favorites));
    }

    toggleFavorite(promptId) {
        const index = this.favorites.indexOf(promptId);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(promptId);
        }
        this.saveFavorites();
        this.updateFavoriteCount();
        this.renderPrompts();
    }

    isFavorite(promptId) {
        return this.favorites.includes(promptId);
    }

    updateFavoriteCount() {
        document.getElementById('favCount').textContent = this.favorites.length;
    }

    getFilteredPrompts() {
        let filtered = this.prompts;

        // Filter by category
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.currentFilter);
        }

        // Filter by view (all or favorites)
        if (this.currentView === 'favorites') {
            filtered = filtered.filter(p => this.isFavorite(p.id));
        }

        // Filter by search term
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(term) ||
                p.subtitle.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term) ||
                p.tags.some(tag => tag.includes(term))
            );
        }

        return filtered;
    }

    renderPrompts() {
        const container = document.getElementById('promptsContainer');
        const noResults = document.getElementById('noResults');
        const filtered = this.getFilteredPrompts();

        if (filtered.length === 0) {
            container.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        }

        container.classList.remove('hidden');
        noResults.classList.add('hidden');

        container.innerHTML = filtered.map(prompt => this.createPromptCard(prompt)).join('');
    }

    createPromptCard(prompt) {
        const isFav = this.isFavorite(prompt.id);
        const categoryColors = {
            'fundamentais': 'bg-blue-100 text-blue-800',
            'conteudo': 'bg-green-100 text-green-800',
            'marketing': 'bg-purple-100 text-purple-800',
            'analise': 'bg-orange-100 text-orange-800',
            'comunicacao': 'bg-pink-100 text-pink-800',
            'educacao': 'bg-yellow-100 text-yellow-800',
            'criatividade': 'bg-red-100 text-red-800',
            'avancadas': 'bg-indigo-100 text-indigo-800'
        };

        return `
            <div class="prompt-card bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-indigo-400" data-id="${prompt.id}">
                <!-- Header -->
                <div class="flex justify-between items-start mb-3">
                    <span class="category-badge ${categoryColors[prompt.category] || 'bg-gray-100 text-gray-800'}">
                        ${prompt.categoryName}
                    </span>
                    <button class="favorite-btn p-1" data-id="${prompt.id}" title="${isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                        <svg class="favorite-star w-6 h-6 ${isFav ? 'favorited' : ''}" fill="${isFav ? '#fbbf24' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                    </button>
                </div>

                <!-- Title -->
                <div class="mb-3">
                    <div class="text-sm text-indigo-600 font-semibold mb-1">Prompt #${prompt.id}</div>
                    <h3 class="text-xl font-bold text-gray-900 mb-1">${prompt.title}</h3>
                    <p class="text-sm text-gray-500 italic">${prompt.subtitle}</p>
                </div>

                <!-- Description -->
                <p class="text-gray-700 mb-4 text-sm leading-relaxed">${prompt.description}</p>

                <!-- Template Preview -->
                <div class="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
                    <div class="text-xs font-semibold text-gray-600 mb-2">ESTRUTURA:</div>
                    <pre class="text-xs text-gray-700 whitespace-pre-wrap font-mono">${this.truncateText(prompt.template, 150)}</pre>
                    <button class="expand-btn text-xs text-indigo-600 hover:text-indigo-700 mt-2 font-semibold" data-id="${prompt.id}">
                        Ver completo ↓
                    </button>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1 mb-4">
                    ${prompt.tags.map(tag => `<span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">${tag}</span>`).join('')}
                </div>

                <!-- Actions -->
                <div class="flex gap-2">
                    <button class="copy-btn flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold" data-id="${prompt.id}">
                        📋 Copiar Template
                    </button>
                    <button class="view-btn px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-semibold" data-id="${prompt.id}">
                        👁️ Ver Tudo
                    </button>
                </div>

                <!-- Expanded Content (hidden by default) -->
                <div class="expanded-content hidden mt-4 pt-4 border-t border-gray-200">
                    <!-- Full Template -->
                    <div class="mb-4">
                        <div class="text-sm font-bold text-gray-700 mb-2">📝 Template Completo:</div>
                        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <pre class="text-sm text-gray-700 whitespace-pre-wrap font-mono">${prompt.template}</pre>
                        </div>
                    </div>

                    <!-- Example -->
                    <div class="mb-4">
                        <div class="text-sm font-bold text-gray-700 mb-2">💡 Exemplo Prático:</div>
                        <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <pre class="text-sm text-gray-700 whitespace-pre-wrap font-mono">${prompt.example}</pre>
                        </div>
                    </div>

                    <!-- Why it works -->
                    <div class="mb-4">
                        <div class="text-sm font-bold text-gray-700 mb-2">✅ Por que funciona:</div>
                        <p class="text-sm text-gray-700 bg-green-50 rounded-lg p-4 border border-green-200">${prompt.why}</p>
                    </div>

                    <button class="collapse-btn w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-semibold" data-id="${prompt.id}">
                        ↑ Recolher
                    </button>
                </div>
            </div>
        `;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    attachEventListeners() {
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.renderPrompts();
        });

        // View toggle
        document.getElementById('showAll').addEventListener('click', () => {
            this.currentView = 'all';
            document.getElementById('showAll').classList.add('bg-indigo-600', 'text-white');
            document.getElementById('showAll').classList.remove('border-2', 'border-indigo-600', 'text-indigo-600');
            document.getElementById('showFavorites').classList.remove('bg-indigo-600', 'text-white');
            document.getElementById('showFavorites').classList.add('border-2', 'border-indigo-600', 'text-indigo-600');
            this.renderPrompts();
        });

        document.getElementById('showFavorites').addEventListener('click', () => {
            this.currentView = 'favorites';
            document.getElementById('showFavorites').classList.add('bg-indigo-600', 'text-white');
            document.getElementById('showFavorites').classList.remove('border-2', 'border-indigo-600', 'text-indigo-600');
            document.getElementById('showAll').classList.remove('bg-indigo-600', 'text-white');
            document.getElementById('showAll').classList.add('border-2', 'border-indigo-600', 'text-indigo-600');
            this.renderPrompts();
        });

        // Category filters
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.currentTarget; // Always gets the button, not child elements
                document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                this.currentFilter = button.dataset.category;
                this.renderPrompts();
            });
        });

        // Event delegation for dynamic buttons
        document.getElementById('promptsContainer').addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;

            const promptId = parseInt(target.dataset.id);

            if (target.classList.contains('favorite-btn')) {
                this.toggleFavorite(promptId);
            } else if (target.classList.contains('copy-btn')) {
                this.copyPrompt(promptId);
            } else if (target.classList.contains('view-btn') || target.classList.contains('expand-btn')) {
                this.expandPrompt(promptId);
            } else if (target.classList.contains('collapse-btn')) {
                this.collapsePrompt(promptId);
            }
        });
    }

    copyPrompt(promptId) {
        const prompt = this.prompts.find(p => p.id === promptId);
        if (!prompt) return;

        const textToCopy = `${prompt.title} - ${prompt.subtitle}\n\n${prompt.template}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showNotification('✓ Prompt copiado!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    }

    expandPrompt(promptId) {
        const card = document.querySelector(`[data-id="${promptId}"].prompt-card`);
        if (!card) return;

        const expandedContent = card.querySelector('.expanded-content');
        const expandBtn = card.querySelector('.expand-btn');

        expandedContent.classList.remove('hidden');
        if (expandBtn) expandBtn.classList.add('hidden');
        card.classList.add('expanded');

        // Smooth scroll to expanded content
        setTimeout(() => {
            expandedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }

    collapsePrompt(promptId) {
        const card = document.querySelector(`[data-id="${promptId}"].prompt-card`);
        if (!card) return;

        const expandedContent = card.querySelector('.expanded-content');
        const expandBtn = card.querySelector('.expand-btn');

        expandedContent.classList.add('hidden');
        if (expandBtn) expandBtn.classList.remove('hidden');
        card.classList.remove('expanded');
    }

    showNotification(message) {
        const notification = document.getElementById('copyNotification');
        notification.textContent = message;
        notification.classList.remove('hidden');
        notification.classList.add('copy-notification');

        setTimeout(() => {
            notification.classList.add('hidden');
        }, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.promptsApp = new PromptsApp();
});
