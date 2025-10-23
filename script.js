// FEP - JavaScript Functionality

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay
            setTimeout(() => {
                entry.target.classList.add('fade-in');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Module Progress Tracking (localStorage)
function trackModuleVisit(moduleId) {
    const visited = JSON.parse(localStorage.getItem('visitedModules') || '[]');
    if (!visited.includes(moduleId)) {
        visited.push(moduleId);
        localStorage.setItem('visitedModules', JSON.stringify(visited));
    }
    updateProgressIndicators();
}

function updateProgressIndicators() {
    const visited = JSON.parse(localStorage.getItem('visitedModules') || '[]');
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const total = parseInt(bar.dataset.total || '8');
        const completed = visited.length;
        const percentage = Math.min((completed / total) * 100, 100);

        const fill = bar.querySelector('.progress-fill');
        if (fill) {
            fill.style.width = percentage + '%';
        }
    });

    // Mark visited modules
    visited.forEach(moduleId => {
        const moduleCard = document.querySelector(`[data-module-id="${moduleId}"]`);
        if (moduleCard) {
            moduleCard.classList.add('visited');
            const badge = document.createElement('span');
            badge.className = 'inline-block ml-2 text-green-500';
            badge.innerHTML = '✓';
            const title = moduleCard.querySelector('h3');
            if (title && !title.querySelector('.text-green-500')) {
                title.appendChild(badge);
            }
        }
    });
}

// Track clicks on module links
document.querySelectorAll('[data-module-id]').forEach(card => {
    const links = card.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            const moduleId = card.dataset.moduleId;
            if (moduleId) {
                trackModuleVisit(moduleId);
            }
        });
    });
});

// Initialize progress on page load
document.addEventListener('DOMContentLoaded', updateProgressIndicators);

// Reset Progress (for testing)
function resetProgress() {
    if (confirm('Deseja resetar todo o progresso?')) {
        localStorage.removeItem('visitedModules');
        updateProgressIndicators();
        location.reload();
    }
}

// External Link Handler
document.querySelectorAll('a[href^="http"]').forEach(link => {
    // Add external link icon if not already present
    if (!link.querySelector('svg') && !link.textContent.includes('GitHub')) {
        const icon = document.createElement('span');
        icon.innerHTML = ' ↗';
        icon.className = 'inline-block ml-1 text-xs';
        link.appendChild(icon);
    }

    // Open in new tab
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Performance: Lazy Load Images
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// Print Functionality
function printPage() {
    window.print();
}

// Share API (if available)
async function sharePage() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: document.title,
                text: 'Confira este curso incrível de Engenharia de Prompt!',
                url: window.location.href
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast('Link copiado para a área de transferência!');
        });
    }
}

// Toast Notification Helper
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Dark Mode Toggle (future enhancement)
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

// Initialize Dark Mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
}

// Analytics Event Tracking (placeholder)
function trackEvent(category, action, label) {
    // Integrate with Google Analytics or Plausible here
    console.log('Event:', category, action, label);
}

// Track level card clicks
document.querySelectorAll('.level-card a').forEach(link => {
    link.addEventListener('click', function() {
        const level = this.textContent.includes('Iniciante') ? 'iniciante' :
                     this.textContent.includes('Técnico') ? 'tecnico' : 'masterclass';
        trackEvent('Navigation', 'Level Click', level);
    });
});

console.log('🎓 FEP - Engenharia de Prompt | Site carregado com sucesso!');

// ===== TOPIC EXPANSION & EXPLANATION TOGGLES =====

// Toggle topic explanations
document.addEventListener('click', function(e) {
    if (e.target.closest('.topic-button')) {
        const button = e.target.closest('.topic-button');
        const topicItem = button.closest('.topic-item');
        const explanation = topicItem.querySelector('.topic-explanation');
        
        if (explanation) {
            explanation.classList.toggle('hidden');
            
            // Close other open explanations in the same module
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

// Expand/Collapse extra topics
document.addEventListener('click', function(e) {
    if (e.target.closest('.expand-topics')) {
        const button = e.target.closest('.expand-topics');
        const targetId = button.dataset.target;
        const topicsList = document.getElementById(targetId);
        
        if (topicsList) {
            const extraTopics = topicsList.querySelectorAll('.extra-topic');
            const isExpanded = !extraTopics[0]?.classList.contains('hidden');
            
            extraTopics.forEach(topic => {
                topic.classList.toggle('hidden');
            });
            
            // Update button text
            const topicCount = topicsList.querySelectorAll('.topic-item').length;
            if (isExpanded) {
                button.innerHTML = `Ver todos os tópicos (${topicCount}) ▼`;
            } else {
                button.innerHTML = `Ocultar tópicos ▲`;
            }
        }
    }
});

console.log('🎯 FEP - Topic expansion loaded!');
