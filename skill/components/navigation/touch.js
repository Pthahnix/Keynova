// Touch/swipe navigation for mobile devices
// Usage: include in script, call initTouchNav(nav) where nav = return value of initKeyboardNav()
function initTouchNav(nav) {
  let startX = 0;
  let startY = 0;
  const threshold = 50;

  document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && nav.getIndex() < nav.getTotal() - 1) nav.showSlide(nav.getIndex() + 1);
      if (dx > 0 && nav.getIndex() > 0) nav.showSlide(nav.getIndex() - 1);
    }
  }, { passive: true });
}
