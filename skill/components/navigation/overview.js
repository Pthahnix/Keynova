// Thumbnail overview mode — press 'o' to toggle grid view of all slides
// Usage: include in script, call initOverview(nav)
function initOverview(nav) {
  let active = false;
  const container = document.createElement('div');
  container.id = 'overview-grid';
  container.style.cssText = 'display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.9);padding:2rem;overflow:auto;';
  document.body.appendChild(container);

  function show() {
    container.innerHTML = '';
    document.querySelectorAll('.slide').forEach((slide, i) => {
      const thumb = document.createElement('div');
      thumb.style.cssText = 'display:inline-block;width:240px;height:135px;margin:8px;border:2px solid ' +
        (i === nav.getIndex() ? '#4a9eff' : '#555') + ';border-radius:4px;overflow:hidden;cursor:pointer;position:relative;';
      thumb.innerHTML = '<div style="transform:scale(0.2);transform-origin:top left;width:500%;height:500%;pointer-events:none;">' +
        slide.outerHTML + '</div><div style="position:absolute;bottom:4px;right:8px;color:#aaa;font-size:12px;">' + (i + 1) + '</div>';
      thumb.addEventListener('click', () => { nav.showSlide(i); hide(); });
      container.appendChild(thumb);
    });
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'center';
    container.style.alignContent = 'start';
    active = true;
  }

  function hide() { container.style.display = 'none'; active = false; }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'o' || e.key === 'O') { active ? hide() : show(); }
    if (e.key === 'Escape' && active) hide();
  });
}
