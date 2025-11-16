# ⚙️ FEP - Front-End Specification

> **Especificação Técnica de Front-End do projeto FEP (Fundamentos e Engenharia de Prompt)**

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Stack Tecnológica](#stack-tecnológica)
4. [Estrutura de Arquivos](#estrutura-de-arquivos)
5. [Componentes e Módulos](#componentes-e-módulos)
6. [Sistema de Dados](#sistema-de-dados)
7. [Interatividade e JavaScript](#interatividade-e-javascript)
8. [Responsividade e Layout](#responsividade-e-layout)
9. [Performance](#performance)
10. [SEO e Meta Tags](#seo-e-meta-tags)
11. [Acessibilidade](#acessibilidade)
12. [Build e Deploy](#build-e-deploy)
13. [Próximos Passos](#próximos-passos)

---

## 🎯 Visão Geral

### Propósito

O FEP (Fundamentos e Engenharia de Prompt) é uma plataforma educacional estática que oferece um curso completo e gratuito de Engenharia de Prompt, estruturado em três níveis de aprendizado.

### Tipo de Aplicação

**Static Website / SPA Hybrid**
- Páginas HTML estáticas com conteúdo dinâmico carregado via JavaScript
- Sem backend (conteúdo em arquivos Markdown e JavaScript)
- Renderização client-side

### Tecnologia Principal

**Vanilla JavaScript + Tailwind CSS**
- Sem frameworks pesados (React, Vue, Angular)
- Performance otimizada
- Baixa complexidade de deployment

---

## 🏗️ Arquitetura

### Modelo de Arquitetura

**JAMstack Simplificado**
- **J**avaScript: Lógica e interatividade client-side
- **M**arkdown: Conteúdo dos módulos
- **Static Files**: HTML, CSS, JS hospedados diretamente

### Fluxo de Dados

```
[Markdown Files] → [Parser (remark/unified)] → [JavaScript Data Objects]
                                                        ↓
                                            [Renderização Dinâmica]
                                                        ↓
                                                   [DOM/HTML]
```

### Padrão de Renderização

1. **Páginas Estáticas**: `index.html`, `nivel-*.html`, `exercicios.html`, etc.
2. **Conteúdo Dinâmico**: Módulos carregados de arquivos `.md` via JavaScript
3. **Modais**: Conteúdo renderizado dinamicamente em overlay
4. **Páginas de Detalhes**: `topico-detalhes.html` com query params

---

## 🛠️ Stack Tecnológica

### Core Technologies

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **HTML5** | - | Estrutura semântica |
| **CSS3** | - | Estilos customizados |
| **JavaScript (ES6+)** | - | Lógica e interatividade |
| **Tailwind CSS** | Latest (CDN) | Utility-first styling |
| **Markdown** | - | Conteúdo dos módulos |

### Libraries e Dependências

#### Front-End

1. **Tailwind CSS**
   - **Source**: CDN (`https://cdn.tailwindcss.com`)
   - **Purpose**: Utility classes para estilização rápida
   - **Configuration**: Via `tailwind.config` inline (se necessário)

2. **Google Fonts - Inter**
   - **Source**: Google Fonts CDN
   - **Weights**: 400, 500, 600, 700
   - **Purpose**: Tipografia consistente

#### Markdown Processing

1. **Remark/Unified**
   - **Package**: `remark`, `remark-parse`, `remark-stringify`
   - **Purpose**: Parsing de Markdown para HTML
   - **Location**: `node_modules/` (dev dependencies)

2. **Markdown Tree Parser**
   - **Package**: `@kayvan/markdown-tree-parser`
   - **Purpose**: Estruturar conteúdo Markdown em árvore navegável

#### Utilities

1. **Lodash** (opcional)
   - Funções utilitárias
   - FP (Functional Programming) module

### Dev Dependencies

```json
{
  "devDependencies": {
    "remark": "^latest",
    "remark-parse": "^latest",
    "unified": "^latest",
    "@kayvan/markdown-tree-parser": "^latest"
  }
}
```

---

## 📁 Estrutura de Arquivos

### Diretório Root

```
FEP/
├── index.html                  # Homepage principal
├── nivel-iniciante.html        # Página do nível Iniciante
├── nivel-tecnico.html          # Página do nível Técnico
├── nivel-masterclass.html      # Página do nível Masterclass
├── exercicios.html             # Página de exercícios
├── recursos.html               # Página de recursos adicionais
├── 100-prompts.html            # Biblioteca de 100 prompts
├── topico-detalhes.html        # Template para páginas de tópico
│
├── styles.css                  # Estilos customizados globais
├── script.js                   # JavaScript global
├── topicos-data.js             # Dados de todos os tópicos
├── topicos-modal.js            # Lógica do modal de tópicos
├── prompts-data.js             # Dados dos prompts (100 prompts)
├── prompts-app.js              # Lógica da app de prompts
│
├── conteudo/                   # Conteúdo Markdown dos módulos
│   ├── modulo1-fundamentos-llms.md
│   ├── modulo2-tecnicas-fundamentais.md
│   ├── modulo3-tecnicas-avancadas.md
│   ├── ...
│   └── modulo8-etica-seguranca.md
│
├── docs/                       # Documentação do projeto
│   ├── prd.md
│   ├── architecture.md
│   ├── style-guide.md
│   └── frontend-specification.md
│
├── .bmad-core/                 # Configuração BMad
├── node_modules/               # Dependências npm
├── package.json                # Configuração npm
└── README.md                   # Documentação principal
```

### Arquivos HTML Principais

| Arquivo | Propósito |
|---------|-----------|
| `index.html` | Landing page com hero, cards de níveis, sobre |
| `nivel-iniciante.html` | Módulos 1-2 (Iniciante) |
| `nivel-tecnico.html` | Módulos 3-5 (Técnico) |
| `nivel-masterclass.html` | Módulos 6-8 (Masterclass) |
| `topico-detalhes.html` | Template para páginas individuais de tópico |
| `exercicios.html` | Lista de exercícios práticos |
| `recursos.html` | Recursos adicionais (ferramentas, links) |
| `100-prompts.html` | Biblioteca de prompts com filtros |

### Arquivos JavaScript

| Arquivo | Propósito | Dependências |
|---------|-----------|--------------|
| `script.js` | JavaScript global (nav, animações, progress tracking) | - |
| `topicos-data.js` | Objeto com dados de todos os tópicos | - |
| `topicos-modal.js` | Lógica para abrir/fechar modais e renderizar Markdown | `topicos-data.js` |
| `prompts-app.js` | Lógica da app de 100 prompts (filtros, busca, favoritos) | `prompts-data.js` |
| `prompts-data.js` | Array de objetos com os 100 prompts | - |

### Arquivos Python (Scripts Auxiliares)

| Arquivo | Propósito |
|---------|-----------|
| `add-topic-buttons.py` | Adiciona botões Modal/Página aos tópicos |
| `list-modules-topics.py` | Lista módulos e tópicos para debug |
| `extract-content-to-md.py` | Extrai conteúdo para Markdown |

---

## 🧩 Componentes e Módulos

### 1. Navigation Component

**Arquivo**: Inline em cada HTML

**Estrutura**:
```html
<nav class="sticky top-0 z-50 bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4">
    <!-- Logo -->
    <!-- Desktop Menu -->
    <!-- Mobile Menu Button -->
    <!-- Mobile Menu (hidden) -->
  </div>
</nav>
```

**Funcionalidades**:
- Menu desktop com dropdown (hover)
- Menu mobile com toggle (click)
- Sticky positioning
- Links ativos

**JavaScript**:
- `script.js`: Toggle mobile menu
- Event listener para fechar menu ao clicar fora

---

### 2. Hero Section

**Arquivo**: `index.html`

**Estrutura**:
```html
<section class="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
  <h1>Título Principal</h1>
  <p>Subtítulo</p>
  <a href="#niveis" class="cta-button">CTA</a>
</section>
```

**Características**:
- Gradiente de fundo
- Texto centralizado
- CTA com scroll suave

---

### 3. Level Cards

**Arquivo**: `index.html`

**Componente Reusável**: 3 instâncias (Iniciante, Técnico, Masterclass)

**Estrutura**:
```html
<div class="level-card bg-gradient-to-br from-[color]-50 to-white">
  <div class="text-6xl">[Emoji]</div>
  <h3>[Título]</h3>
  <div class="badge-[nivel]">[Horas]</div>
  <p>[Descrição]</p>
  <ul>[Tópicos]</ul>
  <a href="nivel-[nome].html" class="btn-[nivel]">CTA</a>
</div>
```

**Estados**:
- Default
- Hover (elevação + sombra)
- Focus (outline)

---

### 4. Module Cards

**Arquivo**: `nivel-*.html`

**Renderização**: Dinâmica via JavaScript

**Estrutura**:
```html
<div class="module-card border-2 border-[nivel]-200">
  <span class="badge-[nivel]">[Nível]</span>
  <h3>[Título do Módulo]</h3>
  <p>[Descrição breve]</p>

  <!-- Lista de tópicos -->
  <ul id="modulo-N-topicos">
    <li class="topic-item">
      <strong>[Tópico]</strong>
      <div class="topic-buttons">
        <button class="btn-modal">📖 Ver em Modal</button>
        <a href="topico-detalhes.html?id=X" class="btn-page">📄 Abrir Página</a>
      </div>
      <div class="topic-explanation hidden">[Explicação]</div>
    </li>
  </ul>

  <!-- Botão expandir (se > 5 tópicos) -->
  <button class="expand-topics">Ver todos os tópicos (N) ▼</button>
</div>
```

**Funcionalidades**:
1. **Botão Modal**: Abre conteúdo em modal overlay
2. **Botão Página**: Navega para página dedicada
3. **Expand/Collapse**: Mostra/oculta tópicos extras
4. **Explicação Toggle**: Toggle inline de explicação breve

---

### 5. Modal Component

**Arquivo**: `topicos-modal.js`

**Estrutura**:
```html
<div id="modal" class="fixed inset-0 bg-black bg-opacity-50 hidden">
  <div class="modal-container bg-white rounded-lg max-w-4xl">
    <div class="modal-header">
      <h2 id="modalTitulo">[Título]</h2>
      <button id="closeModal">×</button>
    </div>
    <div id="modalConteudoCompleto" class="modal-body">
      <!-- Conteúdo Markdown renderizado -->
    </div>
  </div>
</div>
```

**Funcionalidades**:
- Abrir modal via botão "📖 Ver em Modal"
- Fechar via:
  - Botão × (close)
  - Clique fora do modal (overlay)
  - Tecla ESC
- Scroll interno
- Renderização de Markdown → HTML

**JavaScript**:
```javascript
function abrirModalTopico(topicoId) {
  const topico = topicosData[topicoId];
  renderMarkdown(topico.conteudo);
  modal.classList.remove('hidden');
}
```

---

### 6. Topic Details Page

**Arquivo**: `topico-detalhes.html`

**URL Pattern**: `topico-detalhes.html?id=modulo1-fundamentos-llms`

**Funcionalidades**:
- Query param `id` identifica o tópico
- JavaScript carrega dados de `topicos-data.js`
- Breadcrumb dinâmico
- Renderização de Markdown
- Botões de navegação (anterior/próximo)

---

### 7. Prompts Library (100 Prompts)

**Arquivo**: `100-prompts.html` + `prompts-app.js`

**Estrutura**:
```html
<div id="prompts-app">
  <!-- Filtros por categoria -->
  <div class="category-filters">
    <button class="category-filter" data-category="all">Todos</button>
    <button data-category="criativo">Criativo</button>
    <!-- ... -->
  </div>

  <!-- Busca -->
  <input type="text" id="search-prompts" placeholder="Buscar prompts...">

  <!-- Grid de prompts -->
  <div id="prompts-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Cards de prompts renderizados dinamicamente -->
  </div>
</div>
```

**Funcionalidades**:
1. **Filtros**: Por categoria (Criativo, Técnico, Análise, etc.)
2. **Busca**: Texto livre nos títulos e conteúdo
3. **Favoritos**: LocalStorage para salvar favoritos
4. **Copy to Clipboard**: Copiar prompt com um clique

**Dados**:
```javascript
// prompts-data.js
const promptsData = [
  {
    id: 1,
    categoria: "criativo",
    titulo: "Gerador de Histórias",
    prompt: "Crie uma história sobre...",
    tags: ["storytelling", "criatividade"]
  },
  // ...
];
```

---

### 8. Breadcrumbs

**Arquivo**: Inline em páginas de detalhe

**Estrutura**:
```html
<nav class="breadcrumb">
  <a href="index.html">Início</a>
  <span>/</span>
  <a href="nivel-iniciante.html">Iniciante</a>
  <span>/</span>
  <span>Fundamentos de LLMs</span>
</nav>
```

**Geração Dinâmica**: Via JavaScript baseado na página atual

---

### 9. Progress Indicator

**Arquivo**: `script.js`

**Funcionalidades**:
- Rastreia módulos visitados (LocalStorage)
- Atualiza barra de progresso
- Marca módulos como "visitados" com checkmark

**Estrutura**:
```html
<div class="progress-bar" data-total="8">
  <div class="progress-fill" style="width: 0%"></div>
</div>
<p>Progresso: <span id="progress-text">0/8</span> módulos</p>
```

**JavaScript**:
```javascript
// Salvar progresso
function trackModuleVisit(moduleId) {
  const visited = JSON.parse(localStorage.getItem('visitedModules') || '[]');
  visited.push(moduleId);
  localStorage.setItem('visitedModules', JSON.stringify(visited));
  updateProgressIndicators();
}
```

---

### 10. Footer

**Arquivo**: Inline em cada HTML

**Estrutura**:
```html
<footer class="bg-gray-900 text-white py-12">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div><!-- Sobre --></div>
    <div><!-- Links Rápidos --></div>
    <div><!-- Comunidade --></div>
  </div>
  <div class="border-t pt-8 text-center">
    <p>&copy; 2025 FEP</p>
  </div>
</footer>
```

---

## 💾 Sistema de Dados

### Formato de Dados

#### 1. Tópicos (Módulos)

**Arquivo**: `topicos-data.js`

**Estrutura**:
```javascript
const topicosData = {
  "modulo1-fundamentos-llms": {
    id: "modulo1-fundamentos-llms",
    titulo: "Fundamentos de LLMs",
    nivel: "iniciante",
    modulo: 1,
    descricao: "Descrição breve do módulo",
    duracao: "4-5 horas",
    topicos: [
      {
        nome: "O que são LLMs",
        explicacao: "Breve explicação inline",
        conteudo: "# O que são LLMs\n\n[Conteúdo Markdown completo]"
      },
      // ...
    ]
  },
  // ...
};
```

**Fonte de Dados**: Extraído de arquivos Markdown em `conteudo/`

**Parsing**: Scripts Python processam `.md` → `.js`

---

#### 2. Prompts (100 Prompts)

**Arquivo**: `prompts-data.js`

**Estrutura**:
```javascript
const promptsData = [
  {
    id: 1,
    categoria: "criativo",
    titulo: "Gerador de Histórias Interativas",
    descricao: "Cria narrativas interativas com escolhas",
    prompt: `Você é um contador de histórias interativo...`,
    tags: ["storytelling", "interativo", "criatividade"],
    dificuldade: "intermediário"
  },
  // ...
];
```

**Categorias**:
- Criativo
- Técnico
- Análise
- Educacional
- Produtividade
- Código

---

### LocalStorage

**Chaves Utilizadas**:

| Chave | Tipo | Conteúdo |
|-------|------|----------|
| `visitedModules` | Array | IDs dos módulos visitados |
| `favoritePrompts` | Array | IDs dos prompts favoritados |
| `darkMode` | Boolean | Preferência de dark mode (futuro) |

**Exemplo**:
```javascript
localStorage.setItem('visitedModules', JSON.stringify(['modulo1', 'modulo2']));
```

---

## 🎛️ Interatividade e JavaScript

### Script Global (`script.js`)

#### Funcionalidades Implementadas

1. **Mobile Menu Toggle**
   ```javascript
   menuButton.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
   });
   ```

2. **Smooth Scroll**
   - Links âncora (`href="#section"`) scrollam suavemente
   - `scroll-behavior: smooth` no CSS

3. **Intersection Observer (Scroll Animations)**
   ```javascript
   const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         entry.target.classList.add('fade-in');
       }
     });
   });

   document.querySelectorAll('.animate-on-scroll').forEach(el => {
     observer.observe(el);
   });
   ```

4. **Module Progress Tracking**
   - Salva em LocalStorage
   - Atualiza barra de progresso
   - Marca cards como visitados

5. **Keyboard Navigation**
   - ESC: Fecha menu mobile e modais
   - Tab: Navegação por foco

6. **External Links**
   - Adiciona `target="_blank"` e `rel="noopener"`
   - Ícone de link externo (↗)

7. **Lazy Load Images**
   - Intersection Observer para `img[data-src]`
   - Fallback para navegadores antigos

---

### Topicos Modal (`topicos-modal.js`)

#### Funcionalidades

1. **Abrir Modal**
   ```javascript
   function abrirModalTopico(topicoId) {
     const topico = topicosData[topicoId];
     modalTitulo.textContent = topico.titulo;
     modalConteudo.innerHTML = renderMarkdown(topico.conteudo);
     modal.classList.remove('hidden');
   }
   ```

2. **Fechar Modal**
   - Botão ×
   - Clique no overlay
   - Tecla ESC

3. **Renderizar Markdown**
   - Opção 1: Library (marked.js, remarkable.js)
   - Opção 2: Pré-processado em HTML

4. **Toggle Explicações**
   ```javascript
   topicButton.addEventListener('click', () => {
     explanation.classList.toggle('hidden');
   });
   ```

---

### Prompts App (`prompts-app.js`)

#### Funcionalidades

1. **Filtrar por Categoria**
   ```javascript
   function filterByCategory(category) {
     const filtered = category === 'all'
       ? promptsData
       : promptsData.filter(p => p.categoria === category);
     renderPrompts(filtered);
   }
   ```

2. **Busca em Tempo Real**
   ```javascript
   searchInput.addEventListener('input', (e) => {
     const query = e.target.value.toLowerCase();
     const filtered = promptsData.filter(p =>
       p.titulo.toLowerCase().includes(query) ||
       p.prompt.toLowerCase().includes(query)
     );
     renderPrompts(filtered);
   });
   ```

3. **Copy to Clipboard**
   ```javascript
   function copyPrompt(promptText) {
     navigator.clipboard.writeText(promptText);
     showToast('Prompt copiado!');
   }
   ```

4. **Favoritos**
   ```javascript
   function toggleFavorite(promptId) {
     let favorites = JSON.parse(localStorage.getItem('favoritePrompts') || '[]');
     if (favorites.includes(promptId)) {
       favorites = favorites.filter(id => id !== promptId);
     } else {
       favorites.push(promptId);
     }
     localStorage.setItem('favoritePrompts', JSON.stringify(favorites));
   }
   ```

---

### Event Delegation

Para elementos renderizados dinamicamente:

```javascript
document.addEventListener('click', (e) => {
  // Modal buttons
  if (e.target.closest('.btn-modal')) {
    const topicoId = e.target.dataset.topicoId;
    abrirModalTopico(topicoId);
  }

  // Expand topics
  if (e.target.closest('.expand-topics')) {
    const targetId = e.target.dataset.target;
    toggleTopics(targetId);
  }
});
```

---

## 📱 Responsividade e Layout

### Abordagem

**Mobile-First Design**
- Estilos base para mobile
- Media queries para telas maiores

### Breakpoints (Tailwind)

```css
/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }
```

### Layout Grid

**Container**:
```html
<div class="container mx-auto px-4">
  <!-- Conteúdo -->
</div>
```

**Grid de Cards**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Cards -->
</div>
```

### Componentes Responsivos

| Componente | Mobile | Desktop |
|------------|--------|---------|
| **Navigation** | Hamburger + Menu vertical | Menu horizontal + Dropdown |
| **Hero** | 1 coluna, texto menor | 1 coluna, texto grande |
| **Level Cards** | 1 coluna | 3 colunas |
| **Module Cards** | 1 coluna | 2-3 colunas (depende da página) |
| **Stats Section** | 2 colunas | 4 colunas |
| **Footer** | 1 coluna | 3 colunas |

---

## 🚀 Performance

### Otimizações Implementadas

1. **CSS**
   - Tailwind via CDN (produção deve usar build)
   - Custom CSS minificado
   - Critical CSS inline (futuro)

2. **JavaScript**
   - Vanilla JS (sem frameworks pesados)
   - Event delegation para elementos dinâmicos
   - Debounce em busca (se necessário)

3. **Images**
   - Lazy loading nativo: `<img loading="lazy">`
   - Intersection Observer fallback
   - WebP format (se aplicável)

4. **Fonts**
   - Google Fonts com `display=swap`
   - Preconnect para faster loading

5. **Scroll Animations**
   - Apenas `transform` e `opacity` (GPU-accelerated)
   - Respeita `prefers-reduced-motion`

6. **LocalStorage**
   - Dados pequenos (IDs, não conteúdo completo)
   - Evita re-fetch desnecessário

### Métricas Alvo

| Métrica | Alvo | Ferramenta |
|---------|------|------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Lighthouse |
| **FID** (First Input Delay) | < 100ms | Lighthouse |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Lighthouse |
| **TTI** (Time to Interactive) | < 3.8s | Lighthouse |

### Futuras Otimizações

- [ ] Build do Tailwind (apenas classes usadas)
- [ ] Service Worker para cache
- [ ] Code splitting (lazy load de módulos)
- [ ] Pré-renderização de páginas críticas
- [ ] Bundler (Webpack, Vite, Parcel)

---

## 🔍 SEO e Meta Tags

### Meta Tags Padrão

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="FEP - Curso completo e gratuito de Engenharia de Prompt. Do zero ao especialista em 97-120 horas de conteúdo estruturado.">
  <title>FEP - Engenharia de Prompt | Do Zero ao Especialista</title>

  <!-- Open Graph -->
  <meta property="og:title" content="FEP - Engenharia de Prompt">
  <meta property="og:description" content="Curso completo e gratuito de Engenharia de Prompt">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://[seu-dominio].com">
  <meta property="og:image" content="https://[seu-dominio].com/og-image.png">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="FEP - Engenharia de Prompt">
  <meta name="twitter:description" content="Curso completo e gratuito de Engenharia de Prompt">
  <meta name="twitter:image" content="https://[seu-dominio].com/twitter-image.png">
</head>
```

### Structured Data (Schema.org)

**Course Schema**:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "FEP - Fundamentos e Engenharia de Prompt",
  "description": "Curso completo de Engenharia de Prompt do zero ao avançado",
  "provider": {
    "@type": "Organization",
    "name": "FEP",
    "sameAs": "https://github.com/inematds/FEP"
  },
  "educationalLevel": "Beginner to Advanced",
  "coursePrerequisites": "Nenhum conhecimento prévio necessário",
  "hasCourseInstance": [
    {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT97H"
    }
  ]
}
</script>
```

### Sitemap

**Gerar sitemap.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[dominio].com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://[dominio].com/nivel-iniciante.html</loc>
    <priority>0.8</priority>
  </url>
  <!-- ... -->
</urlset>
```

### Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://[dominio].com/sitemap.xml
```

---

## ♿ Acessibilidade

### Padrão

**WCAG 2.1 Level AA**

### Implementações

1. **HTML Semântico**
   ```html
   <nav>, <main>, <article>, <section>, <footer>
   ```

2. **ARIA Labels**
   ```html
   <button aria-label="Abrir menu">☰</button>
   ```

3. **Keyboard Navigation**
   - Tab: Navegação sequencial
   - Enter/Space: Ativar botões
   - ESC: Fechar modais/menu

4. **Focus Management**
   ```css
   *:focus-visible {
     outline: 2px solid #3B82F6;
     outline-offset: 2px;
   }
   ```

5. **Skip to Main**
   ```html
   <a href="#main" class="skip-to-main">Pular para conteúdo</a>
   ```

6. **Alt Text**
   - Todas as imagens possuem `alt` descritivo
   - Decorativas: `alt=""`

7. **Color Contrast**
   - Texto: Mínimo 4.5:1
   - Verificado com ferramentas WCAG

8. **Reduced Motion**
   ```css
   @media (prefers-reduced-motion: reduce) {
     * { animation-duration: 0.01ms !important; }
   }
   ```

### Testes

- **Ferramentas**: axe DevTools, WAVE, Lighthouse
- **Navegadores**: Teclado, Screen readers (NVDA, JAWS)

---

## 🔧 Build e Deploy

### Ambiente de Desenvolvimento

**Sem build process** (atualmente)
- Serve arquivos estáticos diretamente
- Edita HTML/CSS/JS manualmente

**Local Server**:
```bash
# Opção 1: Python
python -m http.server 8000

# Opção 2: Node.js (http-server)
npx http-server

# Opção 3: VS Code Live Server
```

### Build Process (Recomendado para Produção)

**Etapas sugeridas**:

1. **Minificar CSS**
   ```bash
   npx tailwindcss -i styles.css -o dist/styles.min.css --minify
   ```

2. **Minificar JS**
   ```bash
   npx terser script.js -o dist/script.min.js
   ```

3. **Otimizar Imagens**
   - Usar ImageOptim, Squoosh, etc.

4. **Gerar Sitemap**
   - Script automatizado

### Deploy

**Plataformas Recomendadas**:

1. **GitHub Pages**
   - Free, simples
   - Commit → Deploy automático
   - URL: `username.github.io/FEP`

2. **Netlify**
   - CI/CD integrado
   - SSL gratuito
   - Domínio customizado

3. **Vercel**
   - Deploy instantâneo
   - Edge network
   - Serverless functions (se necessário no futuro)

4. **Cloudflare Pages**
   - CDN global
   - Performance otimizada

**GitHub Pages Deploy**:
```bash
# 1. Push para branch main
git add .
git commit -m "Deploy"
git push origin main

# 2. Habilitar GitHub Pages
# Settings → Pages → Source: main branch → /root
```

### CI/CD Pipeline (Opcional)

**GitHub Actions**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build
        run: |
          npm install
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🔮 Próximos Passos

### Curto Prazo

- [ ] **Build Process**: Implementar Tailwind build (apenas classes usadas)
- [ ] **Markdown Rendering**: Integrar library de Markdown (marked.js)
- [ ] **Dark Mode**: Toggle entre light/dark mode
- [ ] **Service Worker**: Cache para offline-first
- [ ] **Analytics**: Integrar Google Analytics ou Plausible

### Médio Prazo

- [ ] **Search**: Busca global por módulos/tópicos
- [ ] **Certificates**: Gerar certificados de conclusão
- [ ] **Progress Dashboard**: Página dedicada ao progresso do usuário
- [ ] **Exercises**: Sistema interativo de exercícios com validação
- [ ] **Comments**: Sistema de comentários (Disqus ou similar)

### Longo Prazo

- [ ] **Backend**: API para autenticação, progresso, certificados
- [ ] **CMS**: Painel admin para editar conteúdo sem tocar código
- [ ] **Mobile App**: PWA ou React Native
- [ ] **AI Tutor**: Chatbot integrado para tirar dúvidas
- [ ] **Community**: Fórum ou Discord integrado

---

## 📚 Referências Técnicas

### Documentação

- **Tailwind CSS**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org
- **Web Accessibility**: https://www.w3.org/WAI/WCAG21/quickref/
- **Schema.org**: https://schema.org/Course

### Tools

- **Lighthouse**: Performance audit
- **axe DevTools**: Acessibilidade
- **Can I Use**: Compatibilidade de navegadores

---

## 📝 Changelog

| Versão | Data | Alterações |
|--------|------|------------|
| 1.0 | 2025-11-04 | Versão inicial da especificação |

---

**Última atualização**: 2025-11-04
**Versão**: 1.0
**Autor**: FEP Team
**Revisores**: Sally (UX Expert)
