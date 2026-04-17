// Number roll-up animation
// Usage: <span data-counter="1234" data-duration="2000"></span>

function initCounters() {
  document.querySelectorAll('[data-counter]').forEach(function(el) {
    var target = parseFloat(el.dataset.counter);
    var duration = parseInt(el.dataset.duration) || 1500;
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var decimals = (target % 1 !== 0) ? (target.toString().split('.')[1] || '').length : 0;
    var slide = el.closest('.slide');
    var animated = false;

    function animate() {
      if (animated) return;
      animated = true;
      var start = performance.now();
      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = (target * eased).toFixed(decimals);
        el.textContent = prefix + current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (slide) {
      window.addEventListener('slidechange', function() {
        if (slide.classList.contains('active')) animate();
      });
    } else {
      animate();
    }
  });
}
