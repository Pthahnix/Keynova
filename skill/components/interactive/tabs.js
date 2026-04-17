// Tab switching component
// Call initTabs() after DOM ready

function initTabs() {
  document.querySelectorAll('.tab-container').forEach(function(container) {
    var buttons = container.querySelectorAll('.tab-btn');
    var panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(function(btn) {
      btn.style.cssText = 'padding:8px 20px;background:transparent;border:none;border-bottom:2px solid transparent;color:#aaa;cursor:pointer;font-size:0.95rem;transition:all 0.3s;';

      btn.addEventListener('click', function() {
        var tabIndex = btn.dataset.tab;
        buttons.forEach(function(b) {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = '#aaa';
        });
        panels.forEach(function(p) {
          p.classList.remove('active');
          p.style.display = 'none';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = '#4a9eff';
        btn.style.color = '#fff';
        var panel = container.querySelector('[data-panel="' + tabIndex + '"]');
        if (panel) {
          panel.classList.add('active');
          panel.style.display = 'block';
        }
      });
    });

    if (buttons.length > 0) buttons[0].click();
  });
}
