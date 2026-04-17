// Code line-by-line appearance animation
// Usage: add data-animate="lines" to <pre><code>...</code></pre>
// Lines appear one by one when the slide becomes active

function initLineAnimation() {
  document.querySelectorAll('pre[data-animate="lines"]').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    const lines = code.innerHTML.split('\n');
    const delay = parseInt(pre.dataset.delay) || 100;

    code.innerHTML = lines.map((line, i) =>
      '<span class="code-line" style="opacity:0;display:block;transition:opacity 0.3s ease ' +
      (i * delay) + 'ms">' + line + '</span>'
    ).join('');

    const slide = pre.closest('.slide');
    if (!slide) return;

    window.addEventListener('slidechange', () => {
      if (slide.classList.contains('active')) {
        code.querySelectorAll('.code-line').forEach(el => {
          el.style.opacity = '1';
        });
      } else {
        code.querySelectorAll('.code-line').forEach(el => {
          el.style.opacity = '0';
        });
      }
    });
  });
}
