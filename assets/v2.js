(function () {
  'use strict';

  function syncAccordion(button) {
    var panelId = button.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;
    var open = !panel.classList.contains('hidden') || panel.classList.contains('active');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var topicButton = target.closest('.topic-button[aria-controls], [onclick*="toggleTopic"][aria-controls]');
    if (topicButton) setTimeout(function () { syncAccordion(topicButton); }, 0);

    var legacyTheme = target.closest('#theme-toggle');
    if (legacyTheme) {
      setTimeout(function () {
        if (!window.INEMA) return;
        var theme = document.documentElement.classList.contains('dark') ? 'inema-dark' : 'claro';
        window.INEMA.setPref('theme', theme);
      }, 0);
    }

    var resume = target.closest('[data-inema-resume]');
    if (resume && window.INEMA) {
      event.preventDefault();
      window.INEMA.resume();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.topic-button[aria-controls], [onclick*="toggleTopic"][aria-controls]').forEach(syncAccordion);
  });
})();
