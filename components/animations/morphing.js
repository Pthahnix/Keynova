// SVG/shape morphing animations
// Requires: anime.js CDN loaded
// Usage: call morphShape(svgEl, fromPath, toPath, duration)

function morphShape(svgEl, fromPath, toPath, duration) {
  duration = duration || 1000;
  if (typeof anime === 'undefined') {
    console.warn('morphing.js requires anime.js');
    return;
  }
  var path = svgEl.querySelector('path');
  if (!path) return;
  path.setAttribute('d', fromPath);
  return anime({
    targets: path,
    d: [{ value: toPath }],
    duration: duration,
    easing: 'easeInOutQuad',
    loop: false
  });
}
