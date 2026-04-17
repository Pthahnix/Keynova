// Prism.js initialization with line highlighting
// CDN: <link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css" rel="stylesheet">
// CDN: <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
// CDN per language: <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-python.min.js"></script>
// Usage: call initPrism() after DOM ready

function initPrism() {
  if (typeof Prism === 'undefined') {
    console.warn('prism-setup.js: Prism not loaded');
    return;
  }
  Prism.highlightAll();

  // Line highlight support: add data-line="1,3-5" to <pre>
  document.querySelectorAll('pre[data-line]').forEach(pre => {
    const lines = pre.dataset.line.split(',');
    const codeEl = pre.querySelector('code');
    if (!codeEl) return;
    const codeLines = codeEl.innerHTML.split('\n');
    const highlighted = new Set();
    lines.forEach(range => {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        for (let i = start; i <= end; i++) highlighted.add(i);
      } else {
        highlighted.add(Number(range));
      }
    });
    codeEl.innerHTML = codeLines.map((line, i) =>
      highlighted.has(i + 1)
        ? '<span class="line-highlight">' + line + '</span>'
        : line
    ).join('\n');
  });
}

// Minimal CSS for line highlighting (inline this in the HTML <style>)
// .line-highlight { background: rgba(255,255,255,0.08); display: inline-block; width: 100%; }
