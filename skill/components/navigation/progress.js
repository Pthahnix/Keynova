// Progress bar that updates on slide change
// Usage: add <div id="progress-bar"></div> to HTML, call initProgressBar()
// Styles: #progress-bar { position:fixed; top:0; left:0; height:3px; background:#4a9eff; transition:width .3s; z-index:9999; }
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('slidechange', (e) => {
    const { index, total } = e.detail;
    bar.style.width = ((index + 1) / total * 100) + '%';
  });
}
