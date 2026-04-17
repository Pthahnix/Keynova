// Text animation effects: typewriter, word-by-word reveal
// Usage: add data-effect="typewriter|word-reveal" to elements

function initTextEffects() {
  document.querySelectorAll('[data-effect="typewriter"]').forEach(el => {
    const text = el.textContent;
    const speed = parseInt(el.dataset.speed) || 50;
    el.textContent = '';
    el.style.visibility = 'visible';
    let i = 0;
    const parent = el.closest('.slide');
    const observer = new MutationObserver(() => {
      if (parent.classList.contains('active') && i === 0) {
        const interval = setInterval(() => {
          el.textContent += text[i++];
          if (i >= text.length) clearInterval(interval);
        }, speed);
      }
    });
    observer.observe(parent, { attributes: true, attributeFilter: ['class'] });
  });

  document.querySelectorAll('[data-effect="word-reveal"]').forEach(el => {
    const words = el.textContent.split(' ');
    const delay = parseInt(el.dataset.delay) || 150;
    el.innerHTML = words.map((w, i) =>
      '<span style="opacity:0;display:inline-block;transition:opacity 0.4s ease ' +
      (i * delay) + 'ms,transform 0.4s ease ' + (i * delay) +
      'ms;transform:translateY(10px)">' + w + '</span>'
    ).join(' ');
    const parent = el.closest('.slide');
    window.addEventListener('slidechange', () => {
      if (parent.classList.contains('active')) {
        el.querySelectorAll('span').forEach(s => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        });
      }
    });
  });
}
