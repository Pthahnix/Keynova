// KaTeX auto-render configuration
// CDN: <link href="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.css" rel="stylesheet">
// CDN: <script src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js"></script>
// CDN: <script src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/contrib/auto-render.min.js"></script>
// Usage: call initKaTeX() after DOM ready

function initKaTeX() {
  if (typeof renderMathInElement === 'undefined') {
    console.warn('katex-setup.js: KaTeX auto-render not loaded');
    return;
  }
  renderMathInElement(document.body, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ],
    throwOnError: false,
    trust: true
  });
}
