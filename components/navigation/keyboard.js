// Keyboard navigation for slide presentations
// Usage: include in script, call initKeyboardNav()
function initKeyboardNav() {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.setAttribute('aria-hidden', i !== index);
    });
    current = index;
    window.dispatchEvent(new CustomEvent('slidechange', { detail: { index: current, total: slides.length } }));
  }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        e.preventDefault();
        if (current < slides.length - 1) showSlide(current + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (current > 0) showSlide(current - 1);
        break;
      case 'Home':
        e.preventDefault();
        showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        showSlide(slides.length - 1);
        break;
    }
  });

  showSlide(0);
  return { showSlide, getIndex: () => current, getTotal: () => slides.length };
}
