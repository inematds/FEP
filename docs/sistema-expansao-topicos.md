# 📚 Documentação: Sistema de Expansão de Tópicos

## 📋 Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Estrutura HTML](#estrutura-html)
4. [JavaScript](#javascript)
5. [Estilos CSS](#estilos-css)
6. [Como Implementar](#como-implementar)
7. [Exemplos Práticos](#exemplos-práticos)
8. [Melhores Práticas](#melhores-práticas)

---

## 🎯 Visão Geral

O sistema de expansão de tópicos permite que os usuários cliquem em um título/botão para revelar conteúdo adicional oculto. É uma solução leve, acessível e sem dependências externas.

**Características:**
- ✅ Implementação vanilla (HTML + CSS + JS puro)
- ✅ Comportamento accordion (fecha outros ao abrir um)
- ✅ Animações suaves com Tailwind
- ✅ Responsivo e acessível
- ✅ ~30 linhas de JavaScript

---

## 🏗️ Arquitetura

### Componentes Principais

```
┌─────────────────────────────────────┐
│      TOPIC ITEM (Container)         │
│  ┌───────────────────────────────┐  │
│  │   TOPIC BUTTON (Clicável)     │  │
│  └───────────────────────────────┘  │
│  ┌───────────────────────────────┐  │
│  │  TOPIC EXPLANATION (Toggle)   │  │
│  │  - Inicialmente oculto        │  │
│  │  - Revelado ao clicar         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Fluxo de Interação

```
1. Usuário clica no botão
      ↓
2. JavaScript detecta o clique
      ↓
3. Identifica o topic-item pai
      ↓
4. Encontra o topic-explanation
      ↓
5. Toggle classe 'hidden'
      ↓
6. (Opcional) Fecha outros tópicos abertos
```

---

## 📝 Estrutura HTML

### Template Básico

```html
<li class="topic-item" data-topic="identificador-unico">
    <!-- Botão Clicável -->
    <button class="topic-button w-full text-left hover:text-blue-600 transition-colors">
        <span class="mr-2">📋</span> Título do Tópico
    </button>

    <!-- Conteúdo Expansível (inicialmente oculto) -->
    <div class="topic-explanation hidden ml-6 mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p class="text-sm">
            <strong>O que é:</strong> Descrição breve do conceito.
        </p>
        <p class="text-sm mt-2">
            <strong>Por que usar:</strong> Benefícios e casos de uso.
        </p>
        <p class="text-sm mt-2">
            <strong>Exemplo:</strong> Exemplo prático de aplicação.
        </p>

        <!-- Botões de Ação (Opcional) -->
        <div class="mt-3 grid grid-cols-2 gap-2">
            <button class="ver-detalhes-btn px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                📖 Ver Modal
            </button>
            <a href="detalhes.html?id=identificador" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                🔗 Abrir Página
            </a>
        </div>
    </div>
</li>
```

### Classes Importantes

| Classe | Propósito |
|--------|-----------|
| `topic-item` | Container principal do tópico |
| `topic-button` | Botão clicável que expande/contrai |
| `topic-explanation` | Conteúdo que será expandido |
| `hidden` | Classe Tailwind que oculta o elemento (`display: none`) |

### Atributos Data

- **`data-topic`**: Identificador único para cada tópico (usado para tracking, analytics, etc)

---

## ⚙️ JavaScript

### Código Principal

**Localização:** `script.js` linhas 257-278

```javascript
// Toggle topic explanations
document.addEventListener('click', function(e) {
    // Verifica se o clique foi em um topic-button
    if (e.target.closest('.topic-button')) {
        const button = e.target.closest('.topic-button');
        const topicItem = button.closest('.topic-item');
        const explanation = topicItem.querySelector('.topic-explanation');

        if (explanation) {
            // Toggle (mostra/esconde) a explicação
            explanation.classList.toggle('hidden');

            // COMPORTAMENTO ACCORDION: Fecha outras explicações abertas
            const moduleCard = topicItem.closest('.module-card');
            if (moduleCard) {
                moduleCard.querySelectorAll('.topic-explanation').forEach(exp => {
                    if (exp !== explanation) {
                        exp.classList.add('hidden');
                    }
                });
            }
        }
    }
});
```

### Como Funciona

1. **Event Delegation**: Um único listener no `document` captura todos os cliques
2. **`e.target.closest('.topic-button')`**: Verifica se o clique foi em um botão de tópico
3. **Navegação DOM**: Sobe para `.topic-item`, depois encontra `.topic-explanation`
4. **Toggle**: Adiciona/remove classe `hidden`
5. **Accordion**: Fecha outros tópicos abertos no mesmo módulo

### Vantagens desta Abordagem

- ✅ **Performance**: Um único event listener para todos os botões
- ✅ **Dinâmico**: Funciona com elementos adicionados depois do carregamento
- ✅ **Simples**: Não requer bibliotecas externas
- ✅ **Manutenível**: Código limpo e fácil de entender

---

## 🎨 Estilos CSS

### Com Tailwind (usado no projeto)

```html
<div class="topic-explanation hidden ml-6 mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
    <!-- Conteúdo -->
</div>
```

**Classes Tailwind:**
- `hidden` - Oculta o elemento
- `ml-6` - Margem esquerda (indentação)
- `mt-2` - Margem superior
- `p-3` - Padding interno
- `bg-blue-50` - Fundo azul claro
- `rounded-lg` - Bordas arredondadas
- `border-l-4` - Borda esquerda de 4px
- `border-blue-500` - Cor da borda

### CSS Vanilla (sem Tailwind)

```css
/* Ocultar elemento */
.hidden {
    display: none;
}

/* Estilo do container do tópico */
.topic-item {
    margin-bottom: 10px;
    list-style: none;
}

/* Botão do tópico */
.topic-button {
    width: 100%;
    text-align: left;
    padding: 12px 16px;
    background: #f3f4f6;
    border: none;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    transition: background-color 0.2s, color 0.2s;
}

.topic-button:hover {
    background: #e5e7eb;
    color: #2563eb;
}

/* Conteúdo expansível */
.topic-explanation {
    margin-left: 24px;
    margin-top: 8px;
    padding: 16px;
    background: #eff6ff;
    border-left: 4px solid #3b82f6;
    border-radius: 8px;
    font-size: 14px;
    line-height: 1.6;
}

.topic-explanation p {
    margin-bottom: 8px;
}

.topic-explanation strong {
    color: #1e40af;
    font-weight: 600;
}
```

### Animações CSS (Opcional)

Para adicionar transições suaves:

```css
.topic-explanation {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out;
}

.topic-explanation:not(.hidden) {
    max-height: 1000px; /* Ajuste conforme necessário */
    opacity: 1;
}
```

**Nota:** Com esta abordagem, troque `hidden` por uma classe customizada que controle `max-height` e `opacity`.

---

## 🚀 Como Implementar

### Passo 1: Preparar o HTML

Crie uma lista com a estrutura de tópicos:

```html
<ul class="topics-list">
    <li class="topic-item" data-topic="topico1">
        <button class="topic-button">
            📋 Primeiro Tópico
        </button>
        <div class="topic-explanation hidden">
            <p><strong>Descrição:</strong> Explicação do primeiro tópico.</p>
        </div>
    </li>

    <li class="topic-item" data-topic="topico2">
        <button class="topic-button">
            🔗 Segundo Tópico
        </button>
        <div class="topic-explanation hidden">
            <p><strong>Descrição:</strong> Explicação do segundo tópico.</p>
        </div>
    </li>
</ul>
```

### Passo 2: Adicionar CSS

**Com Tailwind:**
```html
<link href="https://cdn.tailwindcss.com" rel="stylesheet">
```

**Ou CSS customizado:**
```html
<link href="estilos.css" rel="stylesheet">
```

### Passo 3: Adicionar JavaScript

```html
<script>
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const button = e.target.closest('.topic-button');
        const topicItem = button.closest('.topic-item');
        const explanation = topicItem.querySelector('.topic-explanation');

        if (explanation) {
            explanation.classList.toggle('hidden');
        }
    }
});
</script>
```

### Passo 4: Testar

Abra o arquivo HTML no navegador e clique nos botões para verificar se funcionam.

---

## 💡 Exemplos Práticos

### Exemplo 1: Accordion Simples

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accordion Simples</title>
    <style>
        .hidden { display: none; }
        .topic-button {
            width: 100%;
            padding: 12px;
            background: #f0f0f0;
            border: none;
            cursor: pointer;
            text-align: left;
            border-radius: 5px;
        }
        .topic-button:hover {
            background: #e0e0e0;
        }
        .topic-explanation {
            margin-left: 20px;
            padding: 12px;
            background: #e3f2fd;
            border-left: 3px solid #2196f3;
            margin-top: 5px;
        }
        .topic-item {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <h1>Perguntas Frequentes</h1>

    <ul style="list-style: none; padding: 0;">
        <li class="topic-item">
            <button class="topic-button">
                ❓ O que é JavaScript?
            </button>
            <div class="topic-explanation hidden">
                <p>JavaScript é uma linguagem de programação usada para criar páginas web interativas.</p>
            </div>
        </li>

        <li class="topic-item">
            <button class="topic-button">
                ❓ O que é CSS?
            </button>
            <div class="topic-explanation hidden">
                <p>CSS é uma linguagem de estilo usada para controlar a aparência de páginas web.</p>
            </div>
        </li>
    </ul>

    <script>
        document.addEventListener('click', function(e) {
            if (e.target.closest('.topic-button')) {
                const button = e.target.closest('.topic-button');
                const topicItem = button.closest('.topic-item');
                const explanation = topicItem.querySelector('.topic-explanation');

                if (explanation) {
                    explanation.classList.toggle('hidden');
                }
            }
        });
    </script>
</body>
</html>
```

### Exemplo 2: Accordion com Fechamento Automático

```javascript
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const button = e.target.closest('.topic-button');
        const topicItem = button.closest('.topic-item');
        const explanation = topicItem.querySelector('.topic-explanation');

        // Fecha todos os outros
        document.querySelectorAll('.topic-explanation').forEach(exp => {
            if (exp !== explanation) {
                exp.classList.add('hidden');
            }
        });

        // Toggle o atual
        if (explanation) {
            explanation.classList.toggle('hidden');
        }
    }
});
```

### Exemplo 3: Com Ícone de Seta Rotativa

```html
<button class="topic-button">
    <span class="arrow">▼</span> Clique para expandir
</button>
```

```css
.arrow {
    display: inline-block;
    transition: transform 0.3s;
}

.topic-button.expanded .arrow {
    transform: rotate(180deg);
}
```

```javascript
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const button = e.target.closest('.topic-button');
        const topicItem = button.closest('.topic-item');
        const explanation = topicItem.querySelector('.topic-explanation');

        if (explanation) {
            explanation.classList.toggle('hidden');
            button.classList.toggle('expanded');
        }
    }
});
```

---

## ✅ Melhores Práticas

### Acessibilidade

1. **Use elementos semânticos:**
   ```html
   <button> para elementos clicáveis
   <ul> e <li> para listas
   ```

2. **Adicione ARIA attributes:**
   ```html
   <button class="topic-button"
           aria-expanded="false"
           aria-controls="explanation-1">
       Título do Tópico
   </button>

   <div class="topic-explanation hidden"
        id="explanation-1"
        role="region">
       Conteúdo
   </div>
   ```

3. **Atualize aria-expanded com JavaScript:**
   ```javascript
   button.setAttribute('aria-expanded', !explanation.classList.contains('hidden'));
   ```

### Performance

1. **Event Delegation**: Use um único listener em vez de múltiplos
2. **Evite reflows**: Use `classList` em vez de manipular `style` diretamente
3. **Cache de seletores**: Para muitos tópicos, considere cachear elementos

### SEO

1. **Conteúdo visível no HTML**: O conteúdo oculto ainda é indexável
2. **Estrutura semântica**: Use headings apropriados
3. **Schema markup**: Para FAQs, considere usar schema.org/FAQPage

### Mobile

1. **Touch-friendly**: Botões com pelo menos 44x44px
2. **Responsivo**: Teste em diferentes tamanhos de tela
3. **Gestos**: Considere swipe para fechar (opcional)

### Debugging

**Console logs úteis:**
```javascript
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        console.log('Topic clicked:', topicItem.dataset.topic);
        console.log('Is hidden:', explanation.classList.contains('hidden'));
    }
});
```

---

## 🔧 Variações e Extensões

### Abrir/Fechar Todos

```html
<button onclick="toggleAll(true)">Expandir Todos</button>
<button onclick="toggleAll(false)">Fechar Todos</button>
```

```javascript
function toggleAll(show) {
    document.querySelectorAll('.topic-explanation').forEach(exp => {
        if (show) {
            exp.classList.remove('hidden');
        } else {
            exp.classList.add('hidden');
        }
    });
}
```

### Salvar Estado no localStorage

```javascript
// Salvar estado
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const topicItem = e.target.closest('.topic-item');
        const topicId = topicItem.dataset.topic;
        const explanation = topicItem.querySelector('.topic-explanation');

        explanation.classList.toggle('hidden');

        const isHidden = explanation.classList.contains('hidden');
        localStorage.setItem(`topic-${topicId}`, isHidden);
    }
});

// Restaurar estado ao carregar
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.topic-item').forEach(item => {
        const topicId = item.dataset.topic;
        const isHidden = localStorage.getItem(`topic-${topicId}`) === 'true';
        const explanation = item.querySelector('.topic-explanation');

        if (!isHidden) {
            explanation.classList.remove('hidden');
        }
    });
});
```

### Analytics Tracking

```javascript
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const topicItem = e.target.closest('.topic-item');
        const topicId = topicItem.dataset.topic;

        // Google Analytics 4
        if (window.gtag) {
            gtag('event', 'topic_expand', {
                'topic_id': topicId,
                'topic_name': e.target.textContent.trim()
            });
        }

        // Plausible
        if (window.plausible) {
            plausible('Topic Expand', {
                props: { topic: topicId }
            });
        }
    }
});
```

---

## 📚 Referências

- **Localização no Projeto:**
  - HTML: `nivel-tecnico.html` (linhas 151-290)
  - JavaScript: `script.js` (linhas 257-278)

- **Recursos Externos:**
  - [MDN: Element.closest()](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
  - [MDN: ClassList API](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
  - [WAI-ARIA: Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
  - [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📄 Licença

Este sistema é parte do projeto FEP (Engenharia de Prompt) e pode ser reutilizado em outros projetos.

---

**Última atualização:** 2025-11-04
**Versão:** 1.0
**Autor:** FEP Team
