# AI UI Generation Prompt - FEP Course Platform

**Target Tools:** v0.dev, Bolt.new, Claude Code, or any AI code generator
**Generated:** 2025-10-23
**Author:** Sally (UX Expert)

---

## How to Use This Prompt

1. **Copy the entire prompt below** (from "START PROMPT" to "END PROMPT")
2. **Paste into your AI tool** of choice (v0.dev, bolt.new, Claude, etc.)
3. **The AI will generate** a complete, deployable static website
4. **Review and refine** the generated code as needed
5. **Deploy to GitHub Pages** following the instructions provided

---

## 🚀 MASTER PROMPT - START

```
# PROJECT: FEP - Engenharia de Prompt Course Platform

## HIGH-LEVEL GOAL

Create a beautiful, responsive, static website for an online course platform called "FEP - Engenharia de Prompt" (Prompt Engineering Fundamentals). The site must be simple, elegant, accessible (WCAG 2.1 AA), and optimized for GitHub Pages deployment. The platform presents a comprehensive 97-120 hour course divided into 3 progressive levels (Iniciante, Técnico, Masterclass) with 8 modules total.

---

## TECH STACK & CONSTRAINTS

**MUST USE:**
- Pure HTML5, CSS3, and vanilla JavaScript (no frameworks - keep it simple for GitHub Pages)
- Tailwind CSS via CDN for styling (no build step required)
- Responsive design (mobile-first approach)
- Static site - no backend, no database, no authentication
- All content links point to existing GitHub markdown/PDF files

**DO NOT USE:**
- React, Vue, Angular, or any JavaScript framework
- Node.js build tools or package managers
- Server-side code or APIs
- Any features requiring a backend

---

## DETAILED STEP-BY-STEP INSTRUCTIONS

### STEP 1: Create File Structure

Create the following files:
1. `index.html` - Landing page with hero and level cards
2. `nivel-iniciante.html` - Beginner level page with module cards
3. `nivel-tecnico.html` - Technical level page with module cards
4. `nivel-masterclass.html` - Masterclass level page with module cards
5. `exercicios.html` - Exercise hub page
6. `styles.css` - Custom styles (in addition to Tailwind)
7. `script.js` - Minimal JavaScript for interactions

### STEP 2: Landing Page (`index.html`)

Create a stunning landing page with:

1. **Navigation Header** (sticky on scroll):
   - Logo/Brand: "FEP" with icon
   - Menu items: Início | Cursos (dropdown) | Exercícios | GitHub
   - Mobile: Hamburger menu
   - Tailwind classes: `sticky top-0 z-50 bg-white shadow-sm`

2. **Hero Section**:
   - Headline: "Domine a Engenharia de Prompt: Do Zero ao Especialista"
   - Subheadline: "97-120 horas de conteúdo estruturado em 3 níveis progressivos"
   - Primary CTA button: "Começar Agora" (smooth scroll to #niveis)
   - Background: Subtle gradient (blue to purple)
   - Optional: Use `docs/md/journey_path.png` as background image

3. **Stats Section** (4 columns on desktop, 2 on mobile):
   - Icon + "8 Módulos Completos"
   - Icon + "Exercícios Práticos"
   - Icon + "Certificados"
   - Icon + "100% Gratuito"
   - Use Heroicons (via CDN)

4. **Three Level Cards Section** (`id="niveis"`):
   - Card layout: 3 columns on desktop, 1 column on mobile
   - Each card contains:
     - Emoji icon (🌟 Iniciante, ⚡ Técnico, 👑 Masterclass)
     - Level name (H2)
     - Duration badge (e.g., "12-15 horas")
     - Description (2-3 sentences)
     - Module count (e.g., "2 módulos")
     - Key topics (3-4 bullet points)
     - CTA button: "Começar Nível [X]" → links to respective level page

   **Card Content:**

   **Iniciante Card:**
   - Color: Emerald/Green (`bg-emerald-50`, `border-emerald-500`)
   - Duration: "12-15 horas"
   - Description: "Seus primeiros passos na Engenharia de Prompt. Aprenda os fundamentos de LLMs e técnicas básicas sem necessidade de conhecimento prévio."
   - Modules: "2 módulos"
   - Topics: "Fundamentos de LLMs", "Anatomia de Prompts", "Zero-Shot e Few-Shot", "Chain of Thought"
   - Link: `nivel-iniciante.html`

   **Técnico Card:**
   - Color: Blue/Teal (`bg-blue-50`, `border-blue-500`)
   - Duration: "35-45 horas"
   - Description: "Aplicações práticas para profissionais. Domine técnicas avançadas, RAG, contexto e prepare-se para implementações reais."
   - Modules: "3 módulos"
   - Topics: "Técnicas Avançadas", "Engenharia de Contexto", "RAG e Embeddings", "Multimodal Prompting"
   - Link: `nivel-tecnico.html`

   **Masterclass Card:**
   - Color: Purple/Violet (`bg-purple-50`, `border-purple-500`)
   - Duration: "50-60 horas"
   - Description: "Torne-se um expert em Agentes de IA. Sistemas complexos, agentes autônomos, extended thinking e o futuro da IA."
   - Modules: "3 módulos"
   - Topics: "Agentes Autônomos", "MCP e Claude Skills", "Sistemas Multi-Agente", "IA Ética e Segurança"
   - Link: `nivel-masterclass.html`

5. **About Section**:
   - Brief course overview
   - Author credit: "Desenvolvido por Manus"
   - Course features (visual list with icons)

6. **Footer**:
   - GitHub repository link: https://github.com/inematds/FEP
   - License info: "Open Source - MIT License"
   - Copyright: "© 2025 FEP - Engenharia de Prompt"
   - Social links (if applicable)

### STEP 3: Level Pages (Iniciante, Técnico, Masterclass)

Create 3 separate pages following this structure:

1. **Level Header**:
   - Breadcrumb: Home > [Level Name]
   - Level badge with icon and color
   - Level name (H1)
   - Total duration
   - Brief description (from landing page)

2. **Module Grid** (2-3 columns on desktop, 1 on mobile):

   For `nivel-iniciante.html` - 2 modules:
   - **Módulo 1: Fundamentos de Engenharia de Prompt**
     - Duration: 4-6 horas
     - Description: "Entenda LLMs, tokens, contexto e a anatomia de prompts eficazes."
     - Topics: LLM Basics, Tokens e Contexto, Anatomia de Prompts, Clareza e Especificidade
     - Buttons:
       - "Ver Markdown" → `docs/md/🌟 Curso Iniciante Completo_ Fundamentos de Engenharia de Prompt.md`
       - "Baixar PDF" → `docs/pdf/🌟_Curso_Iniciante_Completo_Fundamentos_de_Engenharia_de_Prompt.pdf`

   - **Módulo 2: Técnicas Fundamentais**
     - Duration: 8-10 horas
     - Description: "Domine Zero-Shot, Few-Shot, Chain of Thought e prompts de persona."
     - Topics: Zero-Shot Prompting, Few-Shot Prompting, Chain of Thought, Role Prompting
     - Buttons: Same pattern linking to markdown/PDF

   For `nivel-tecnico.html` - 3 modules:
   - **Módulo 3: Técnicas Intermediárias** (8-10h)
   - **Módulo 4: Técnicas Avançadas** (10-12h)
   - **Módulo 5: Engenharia de Contexto e RAG** (8-10h)

   For `nivel-masterclass.html` - 3 modules:
   - **Módulo 6: Agentes - Fundamentos** (10-12h)
   - **Módulo 7: Agentes Avançados** (10-12h)
   - **Módulo 8: Masterclasses Especializadas** (12-15h)

3. **Progress Visualization**:
   - Simple progress indicator: "X/Y módulos completados"
   - Or numbered step indicator (1, 2, 3 with connecting lines)
   - Use client-side localStorage to track clicked modules (optional enhancement)

4. **Next Level Teaser** (at bottom):
   - Card previewing next level
   - "Pronto para o próximo desafio?" headline
   - CTA button linking to next level page
   - Don't show on Masterclass page (show completion message instead)

### STEP 4: Exercise Hub Page (`exercicios.html`)

1. **Page Header**:
   - Breadcrumb: Home > Exercícios
   - Title: "Exercícios Práticos e Projetos"
   - Description: "Pratique os conceitos aprendidos com exercícios hands-on"

2. **Instructions Section**:
   - How to use exercises
   - Tips for maximum learning
   - Link to solutions

3. **Exercise Cards Grid**:
   - Create cards for exercise categories:
     - "Exercícios Módulo 1-2" (Iniciante)
     - "Exercícios Módulo 3-5" (Técnico)
     - "Exercícios Módulo 6-8" (Masterclass)
     - "Projetos Práticos Completos"
   - Each card:
     - Title
     - Module/Level badge
     - Brief description
     - "Acessar Exercícios" button → links to `docs/md/Exercícios Práticos e Projetos.md`

### STEP 5: Styling (`styles.css`)

Add custom CSS for:

1. **Smooth Animations**:
   - Card hover: subtle elevation and border glow
   - Button hover: slight scale and color change
   - Page transitions: fade in on load
   - Scroll animations: fade up for cards (use Intersection Observer in JS)

2. **Custom Properties** (CSS Variables):
```css
:root {
  --color-iniciante: #10B981;
  --color-tecnico: #3B82F6;
  --color-masterclass: #8B5CF6;
  --spacing-unit: 1rem;
  --border-radius: 0.75rem;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

3. **Typography Enhancements**:
   - Import Inter font from Google Fonts
   - Smooth font rendering
   - Proper line heights and letter spacing

4. **Accessibility**:
   - Focus visible styles (2px solid ring)
   - Skip to main content link
   - Proper color contrast (minimum 4.5:1)

5. **Responsive Utilities**:
   - Smooth scroll behavior
   - Mobile menu transitions
   - Breakpoint-specific adjustments

### STEP 6: JavaScript (`script.js`)

Add minimal JavaScript for:

1. **Mobile Menu Toggle**:
```javascript
// Hamburger menu toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
```

2. **Smooth Scroll**:
```javascript
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
```

3. **Scroll Animations** (Intersection Observer):
```javascript
// Fade-up animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
```

4. **Basic Progress Tracking** (Optional - localStorage):
```javascript
// Track module clicks in localStorage
document.querySelectorAll('.module-link').forEach(link => {
  link.addEventListener('click', function() {
    const moduleId = this.dataset.moduleId;
    localStorage.setItem(`module-${moduleId}`, 'visited');
    updateProgress();
  });
});
```

---

## CODE EXAMPLES & DATA STRUCTURES

### Module Card HTML Template

```html
<div class="module-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 border-transparent hover:border-blue-500 animate-on-scroll">
  <div class="flex items-center justify-between mb-4">
    <span class="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Módulo 1</span>
    <span class="text-sm text-gray-500">4-6 horas</span>
  </div>

  <h3 class="text-2xl font-bold mb-3 text-gray-900">Fundamentos de Engenharia de Prompt</h3>

  <p class="text-gray-600 mb-4">
    Entenda LLMs, tokens, contexto e a anatomia de prompts eficazes.
  </p>

  <div class="mb-6">
    <h4 class="text-sm font-semibold text-gray-700 mb-2">Tópicos:</h4>
    <ul class="text-sm text-gray-600 space-y-1">
      <li>• LLM Basics e Funcionamento</li>
      <li>• Tokens e Janela de Contexto</li>
      <li>• Anatomia de Prompts</li>
      <li>• Clareza e Especificidade</li>
    </ul>
  </div>

  <div class="flex gap-3">
    <a href="docs/md/modulo-1.md" class="flex-1 inline-flex items-center justify-center px-4 py-2 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      Ver Markdown
    </a>
    <a href="docs/pdf/modulo-1.pdf" class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
      Baixar PDF
    </a>
  </div>
</div>
```

### Level Card HTML Template

```html
<div class="level-card bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-emerald-200 hover:border-emerald-400 animate-on-scroll">
  <div class="text-6xl mb-4">🌟</div>
  <h2 class="text-3xl font-bold mb-3 text-gray-900">Nível Iniciante</h2>
  <div class="inline-block bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
    12-15 horas
  </div>
  <p class="text-gray-700 mb-6">
    Seus primeiros passos na Engenharia de Prompt. Aprenda os fundamentos de LLMs e técnicas básicas sem necessidade de conhecimento prévio.
  </p>
  <div class="mb-6">
    <p class="text-sm font-semibold text-gray-600 mb-2">2 módulos incluídos:</p>
    <ul class="text-sm text-gray-600 space-y-2">
      <li>✓ Fundamentos de LLMs</li>
      <li>✓ Anatomia de Prompts</li>
      <li>✓ Zero-Shot e Few-Shot</li>
      <li>✓ Chain of Thought</li>
    </ul>
  </div>
  <a href="nivel-iniciante.html" class="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
    Começar Nível Iniciante →
  </a>
</div>
```

### Navigation HTML Template

```html
<nav class="sticky top-0 z-50 bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <!-- Logo -->
      <a href="index.html" class="flex items-center space-x-2">
        <span class="text-2xl font-bold text-blue-600">FEP</span>
        <span class="text-sm text-gray-600 hidden md:inline">Engenharia de Prompt</span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8 items-center">
        <a href="index.html" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Início</a>

        <!-- Dropdown -->
        <div class="relative group">
          <button class="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
            Cursos
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
            <a href="nivel-iniciante.html" class="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">🌟 Iniciante</a>
            <a href="nivel-tecnico.html" class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">⚡ Técnico</a>
            <a href="nivel-masterclass.html" class="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600">👑 Masterclass</a>
          </div>
        </div>

        <a href="exercicios.html" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Exercícios</a>
        <a href="https://github.com/inematds/FEP" target="_blank" class="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-button" class="md:hidden text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-2">
      <a href="index.html" class="block py-2 text-gray-700 hover:text-blue-600">Início</a>
      <a href="nivel-iniciante.html" class="block py-2 text-gray-700 hover:text-blue-600">🌟 Iniciante</a>
      <a href="nivel-tecnico.html" class="block py-2 text-gray-700 hover:text-blue-600">⚡ Técnico</a>
      <a href="nivel-masterclass.html" class="block py-2 text-gray-700 hover:text-blue-600">👑 Masterclass</a>
      <a href="exercicios.html" class="block py-2 text-gray-700 hover:text-blue-600">Exercícios</a>
      <a href="https://github.com/inematds/FEP" target="_blank" class="block py-2 text-gray-700 hover:text-blue-600">GitHub</a>
    </div>
  </div>
</nav>
```

---

## DESIGN & VISUAL SPECIFICATIONS

### Color Palette
- **Iniciante:** Green/Emerald (#10B981, #059669, #047857)
- **Técnico:** Blue (#3B82F6, #2563EB, #1D4ED8)
- **Masterclass:** Purple/Violet (#8B5CF6, #7C3AED, #6D28D9)
- **Neutral:** Grays (#111827, #4B5563, #9CA3AF, #E5E7EB, #F9FAFB)
- **Success:** #22C55E
- **Warning:** #F59E0B
- **Error:** #EF4444

### Typography
- **Font:** Inter (from Google Fonts CDN)
- **Headings:** Bold (700), tight line height
- **Body:** Regular (400), comfortable line height (1.6)
- **Small text:** Medium (500), slightly tighter

### Spacing & Layout
- **Container:** Max width 1280px, centered
- **Padding:** Consistent 1rem (16px) on mobile, 2rem on desktop
- **Grid gaps:** 1.5rem (24px) on mobile, 2rem (32px) on desktop
- **Border radius:** 0.75rem (12px) for cards, 0.5rem for buttons

### Icons
- Use Heroicons via CDN: `https://cdn.jsdelivr.net/npm/heroicons@2.0.0/`
- Style: Outline for UI elements, Solid for filled states
- Size: 24x24px standard, 20x20px for inline

---

## STRICT SCOPE & FILE ORGANIZATION

**CREATE THESE FILES ONLY:**
1. `/index.html` - Landing page
2. `/nivel-iniciante.html` - Beginner level page
3. `/nivel-tecnico.html` - Technical level page
4. `/nivel-masterclass.html` - Masterclass level page
5. `/exercicios.html` - Exercise hub
6. `/styles.css` - Custom CSS
7. `/script.js` - JavaScript functionality

**DO NOT MODIFY:**
- Any files in `/docs/md/` folder (course content)
- Any files in `/docs/pdf/` folder (PDF versions)
- `.bmad-core/` folder (project infrastructure)
- `package.json` or any config files

**LINK STRUCTURE:**
All content links should use relative paths:
- Markdown files: `docs/md/[filename].md`
- PDF files: `docs/pdf/[filename].pdf`
- Images: `docs/md/[imagename].png`

---

## ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

1. **Semantic HTML:**
   - Proper heading hierarchy (H1 → H2 → H3)
   - `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` elements
   - ARIA labels where needed

2. **Keyboard Navigation:**
   - All interactive elements focusable with Tab
   - Visible focus indicators (2px solid ring)
   - Skip to main content link
   - Escape key closes mobile menu

3. **Color Contrast:**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text (18px+)
   - Test all color combinations

4. **Responsive Design:**
   - Mobile breakpoint: < 640px
   - Tablet: 640px - 1024px
   - Desktop: 1024px+
   - Touch targets minimum 44x44px on mobile

5. **Alt Text:**
   - Descriptive alt text for all images
   - Empty alt="" for decorative images
   - Use emojis sparingly, provide text alternatives

---

## PERFORMANCE OPTIMIZATION

1. **Lazy Loading:**
   - Use `loading="lazy"` for images below the fold
   - Defer non-critical JavaScript

2. **CDN Resources:**
   - Tailwind CSS: `https://cdn.tailwindcss.com`
   - Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`
   - Heroicons: `https://cdn.jsdelivr.net/npm/heroicons@2.0.0/`

3. **Minification:**
   - Minify CSS and JS for production
   - Compress images (use WebP where possible)

4. **Critical CSS:**
   - Inline critical above-the-fold CSS
   - Load remaining CSS asynchronously

---

## GITHUB PAGES DEPLOYMENT INSTRUCTIONS

After generating the code:

1. **Commit all generated files** to the repository
2. **Go to GitHub repository Settings** → Pages
3. **Set Source:** Deploy from branch `main`, folder `/` (root)
4. **Custom domain (optional):** Configure if desired
5. **Wait 2-3 minutes** for GitHub to build and deploy
6. **Access at:** `https://inematds.github.io/FEP/`

**Files in root for GitHub Pages:**
- `index.html` (landing page - required)
- All other HTML pages
- `styles.css` and `script.js`
- Existing `docs/` folder (course content)

---

## FINAL NOTES & HUMAN REVIEW REQUIREMENTS

⚠️ **IMPORTANT:** All AI-generated code requires careful human review, testing, and refinement before being considered production-ready.

**Before deploying, verify:**
1. All links work correctly (test every markdown/PDF link)
2. Mobile responsiveness on real devices
3. Accessibility with screen reader (NVDA/VoiceOver)
4. Keyboard navigation works completely
5. Performance (Lighthouse score > 90)
6. Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
7. Visual consistency across all pages
8. All text is in Portuguese (pt-BR)
9. No console errors or warnings
10. Images load properly from `/docs/md/` folder

**Recommended Enhancements (post-generation):**
- Add favicon and meta tags (Open Graph, Twitter Card)
- Implement dark mode toggle
- Add search functionality
- Create sitemap.xml for SEO
- Add analytics (Google Analytics, Plausible, etc.)
- Progressive Web App (PWA) features
- Better progress tracking (cookie-based or localStorage)

Good luck! 🚀
```

## 🎯 END PROMPT

---

## Quick Start Guide

### Option 1: Use v0.dev (Recommended for beginners)
1. Go to https://v0.dev
2. Paste the entire prompt above
3. Click "Generate"
4. Download the generated code
5. Upload to your GitHub repository

### Option 2: Use Bolt.new (Full-stack capability)
1. Go to https://bolt.new
2. Paste the prompt
3. Let it build the entire project
4. Export and deploy to GitHub Pages

### Option 3: Use Claude Code (You're already here!)
1. Start a new conversation
2. Paste: "Using the prompt in `docs/ai-ui-generation-prompt.md`, create the complete FEP course platform"
3. Claude will generate all files
4. Review and commit to repository

---

## What This Prompt Will Generate

✅ **5 Complete HTML Pages:**
- Beautiful landing page with hero and level cards
- 3 level-specific pages (Iniciante, Técnico, Masterclass)
- Exercise hub page

✅ **Responsive Design:**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

✅ **Accessibility:**
- WCAG 2.1 AA compliant
- Keyboard navigable
- Screen reader friendly

✅ **Performance:**
- Static HTML (fast loading)
- Optimized for GitHub Pages
- No build step required

✅ **Visual Design:**
- Modern, clean aesthetic
- Consistent with course branding
- Color-coded learning levels

---

**Generated by:** Sally (UX Expert) - BMad Method
**Date:** 2025-10-23
**License:** MIT - Free to use and modify
