// Click to reveal hidden content
// Call initReveal() after DOM ready

function initReveal() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    var content = el.innerHTML;
    var label = el.dataset.revealLabel || 'Click to reveal';
    el.innerHTML = '<button class="reveal-btn">' + label + '</button><div class="reveal-content" style="display:none;">' + content + '</div>';

    var btn = el.querySelector('.reveal-btn');
    var contentDiv = el.querySelector('.reveal-content');

    btn.style.cssText = 'padding:8px 20px;background:rgba(74,158,255,0.2);border:1px solid #4a9eff;border-radius:6px;color:#4a9eff;cursor:pointer;font-size:0.95rem;transition:all 0.3s;';
    contentDiv.style.cssText = 'display:none;opacity:0;transition:opacity 0.4s ease;margin-top:12px;';

    btn.addEventListener('click', function() {
      if (contentDiv.style.display === 'none') {
        contentDiv.style.display = 'block';
        requestAnimationFrame(function() { contentDiv.style.opacity = '1'; });
        btn.textContent = 'Hide';
      } else {
        contentDiv.style.opacity = '0';
        setTimeout(function() { contentDiv.style.display = 'none'; }, 400);
        btn.textContent = label;
      }
    });
  });
}
