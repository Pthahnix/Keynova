// Particle background effect
// Usage: call initParticles(slideEl, { count, color, speed })

function initParticles(slideEl, opts) {
  opts = opts || {};
  var count = opts.count || 50;
  var color = opts.color || 'rgba(255,255,255,0.3)';
  var speed = opts.speed || 0.5;
  var connect = opts.connect !== false;
  var maxDist = opts.maxDist || 120;

  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
  slideEl.style.position = 'relative';
  slideEl.insertBefore(canvas, slideEl.firstChild);
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animId = null;

  function resize() {
    canvas.width = slideEl.offsetWidth;
    canvas.height = slideEl.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: Math.random() * 2 + 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });
    if (connect) {
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - dist / maxDist) * 0.3) + ')';
            ctx.stroke();
          }
        }
      }
    }
    animId = requestAnimationFrame(draw);
  }

  window.addEventListener('slidechange', function() {
    var isActive = slideEl.classList.contains('active');
    if (isActive && !animId) draw();
    if (!isActive && animId) { cancelAnimationFrame(animId); animId = null; }
  });
}
