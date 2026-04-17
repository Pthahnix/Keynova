# Keynova Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a web-based presentation system where users write Markdown, and Claude Code generates standalone HTML presentations using a component toolkit — no frameworks, no build tools.

**Architecture:** The system has three pillars: (1) a component toolkit of independent CSS/JS snippets organized by category, each with a master README index; (2) a zero-dependency Node.js dev server (~80 lines) for live preview with auto-reload; (3) a `presentations/` directory convention where each talk has `content.md` (user input) and `index.html` (Claude-generated output). Claude Code reads the toolkit README, understands the Markdown content semantically, and generates a fully self-contained HTML file.

**Tech Stack:** Vanilla HTML/CSS/JS, Node.js (zero dependencies for dev server), CDN libraries (Prism.js, KaTeX, Chart.js, ECharts, anime.js/GSAP, html2pdf.js) loaded on-demand.

---

## File Structure

All files to create from scratch:

```
components/
  README.md                    # Master toolkit index — Claude reads this first
  animations/
    transitions.css            # Page transition classes (fade, slide, flip, zoom)
    scroll-driven.css          # Scroll-driven animation utilities
    text-effects.js            # Typewriter, word-reveal, text morph
    particles.js               # Particle background effects
    morphing.js                # SVG/shape morphing
  data-viz/
    chart-helpers.js           # Chart.js convenience wrappers
    echarts-helpers.js         # ECharts wrappers for complex scenarios
    simple-bars.css            # Pure CSS bar charts (zero dependency)
    counters.js                # Number roll-up animation
  code/
    prism-setup.js             # Prism.js initialization + line highlighting
    line-animation.js          # Code line-by-line appearance
    live-editor.js             # Editable + runnable code blocks
  math/
    katex-setup.js             # KaTeX auto-render configuration
  interactive/
    quiz.js                    # Multiple choice / Q&A
    drag-sort.js               # Drag-and-drop sorting
    tabs.js                    # Tab switching
    reveal-on-click.js         # Click to reveal content
    poll.js                    # Live polling (localStorage-based)
  navigation/
    keyboard.js                # Arrow keys, space, ESC navigation
    touch.js                   # Touch/swipe navigation
    progress.js                # Progress bar
    overview.js                # Thumbnail overview mode
  layout/
    grid-helpers.css           # Common grid layouts
    split-screen.css           # Side-by-side columns
    centered.css               # Centered big text
    image-text.css             # Image-text mixed layouts
  typography/
    fonts.css                  # Font loading strategy
    code-fonts.css             # Monospace fonts
    cjk.css                    # CJK typography optimization
dev-server/
  serve.js                     # Zero-dependency Node.js dev server with hot reload
presentations/
  example/
    content.md                 # Example Markdown source
    index.html                 # Example generated presentation
```

---

## Task Overview

| Task | Component | Description |
|------|-----------|-------------|
| 1 | Component README | Master toolkit index that Claude reads first |
| 2 | Navigation | Keyboard, touch, progress bar, overview mode |
| 3 | Layout & Typography | Grid, split-screen, centered, image-text, fonts, CJK |
| 4 | Animations | Page transitions, scroll-driven, text effects, particles, morphing |
| 5 | Code Display | Prism.js setup, line animation, live editor |
| 6 | Math Rendering | KaTeX auto-render configuration |
| 7 | Data Visualization | Chart.js, ECharts, pure CSS charts, number counters |
| 8 | Interactive Elements | Quiz, drag-sort, tabs, click-reveal, poll |
| 9 | Dev Server | Zero-dependency Node.js server with hot reload |
| 10 | Example Presentation | A complete example demonstrating the workflow end-to-end |
| 11 | Component README Finalization | Update README with all actual component details |

---

### Task 1: Component README (Skeleton)

**Files:**
- Create: `components/README.md`

The README is the master index that Claude reads before generating any presentation. Start with a skeleton — Task 11 finalizes it after all components exist.

- [ ] **Step 1: Create components directory and README skeleton**

```markdown
# Keynova Component Toolkit

> Claude reads this file first when generating a presentation.
> Each component is an independent snippet — copy, adapt, or ignore as needed.

## How to Use This Toolkit

1. Read the user's Markdown content to understand intent, style, and structure
2. Scan the categories below to find relevant building blocks
3. Copy snippets into the generated HTML, adapting colors/sizes/timing to match the presentation's style
4. You can also write from scratch — this toolkit is inspiration, not constraint

## CDN Dependencies (load only when needed)

| Feature | Library | CDN URL | When to include |
|---------|---------|---------|-----------------|
| Code highlighting | Prism.js | `https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js` | Has code blocks |
| Math rendering | KaTeX | `https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js` | Has LaTeX math |
| Charts (simple) | Chart.js | `https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js` | Has data viz |
| Charts (complex) | ECharts | `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js` | Rich interactive charts |
| Animation engine | anime.js | `https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js` | Complex timelines |

## Categories

- **navigation/** — Keyboard, touch, progress bar, overview mode
- **layout/** — Grid, split-screen, centered, image-text layouts
- **typography/** — Font loading, monospace, CJK optimization
- **animations/** — Page transitions, scroll-driven, text effects, particles, morphing
- **code/** — Prism.js setup, line animation, live editor
- **math/** — KaTeX auto-render
- **data-viz/** — Chart.js, ECharts, pure CSS charts, counters
- **interactive/** — Quiz, drag-sort, tabs, click-reveal, poll

> Detailed component docs will be added as each category is built.
```

- [ ] **Step 2: Verify file exists**

Run: `cat components/README.md | head -5`
Expected: Shows the title and description.

- [ ] **Step 3: Commit**

```bash
git add components/README.md
git commit -m "feat: add component toolkit README skeleton"
```

---

### Task 2: Navigation Components

**Files:**
- Create: `components/navigation/keyboard.js`
- Create: `components/navigation/touch.js`
- Create: `components/navigation/progress.js`
- Create: `components/navigation/overview.js`

Navigation is the backbone — every presentation needs slide switching. Build this first so the example presentation (Task 10) has a working navigation system.

- [ ] **Step 1: Create `keyboard.js`**

```javascript
// Keyboard navigation for slide presentations
// Usage: include in <script>, call initKeyboardNav()
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
```

- [ ] **Step 2: Create `touch.js`**

```javascript
// Touch/swipe navigation for mobile devices
// Usage: include in <script>, call initTouchNav(nav) where nav = return value of initKeyboardNav()
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
```

- [ ] **Step 3: Create `progress.js`**

```javascript
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
```

- [ ] **Step 4: Create `overview.js`**

```javascript
// Thumbnail overview mode — press 'o' to toggle grid view of all slides
// Usage: include in <script>, call initOverview(nav)
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
```

- [ ] **Step 5: Verify all navigation files exist**

Run: `ls components/navigation/`
Expected: `keyboard.js  overview.js  progress.js  touch.js`

- [ ] **Step 6: Commit**

```bash
git add components/navigation/
git commit -m "feat: add navigation components (keyboard, touch, progress, overview)"
```

---

### Task 3: Layout & Typography Components

**Files:**
- Create: `components/layout/grid-helpers.css`
- Create: `components/layout/split-screen.css`
- Create: `components/layout/centered.css`
- Create: `components/layout/image-text.css`
- Create: `components/typography/fonts.css`
- Create: `components/typography/code-fonts.css`
- Create: `components/typography/cjk.css`

- [ ] **Step 1: Create `grid-helpers.css`**

```css
/* Grid layout helpers for slide content */
/* Usage: add class to a container inside .slide */

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; align-items: start; }
.grid-2x2 { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 1.5rem; }
.grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }

/* Span helpers */
.span-2 { grid-column: span 2; }
.span-full { grid-column: 1 / -1; }
```

- [ ] **Step 2: Create `split-screen.css`**

```css
/* Side-by-side split layout */
/* Usage: <div class="split"><div class="split-left">...</div><div class="split-right">...</div></div> */

.split { display: flex; height: 100%; gap: 2rem; align-items: center; }
.split-left, .split-right { flex: 1; padding: 1rem; }
.split-left { border-right: 1px solid rgba(255,255,255,0.1); }

/* Ratio variants */
.split-40-60 .split-left { flex: 0.4; }
.split-40-60 .split-right { flex: 0.6; }
.split-60-40 .split-left { flex: 0.6; }
.split-60-40 .split-right { flex: 0.4; }
.split-30-70 .split-left { flex: 0.3; }
.split-30-70 .split-right { flex: 0.7; }
```

- [ ] **Step 3: Create `centered.css`**

```css
/* Centered content layout — big text, title slides, quotes */
/* Usage: add class to .slide or inner container */

.centered { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; height: 100%; }
.centered h1 { font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 1rem; }
.centered h2 { font-size: clamp(1.5rem, 4vw, 3rem); line-height: 1.2; opacity: 0.8; }
.centered p { font-size: clamp(1rem, 2vw, 1.5rem); max-width: 40ch; opacity: 0.7; }
.centered blockquote { font-size: clamp(1.2rem, 3vw, 2rem); font-style: italic; border-left: 4px solid currentColor; padding-left: 1.5rem; max-width: 35ch; }
```

- [ ] **Step 4: Create `image-text.css`**

```css
/* Image-text mixed layouts */
/* Usage: <div class="img-text"><img src="..."><div class="img-text-content">...</div></div> */

.img-text { display: flex; align-items: center; gap: 2rem; height: 100%; }
.img-text img { max-width: 50%; max-height: 80%; object-fit: contain; border-radius: 8px; }
.img-text-content { flex: 1; }

/* Image on right */
.img-text-reverse { flex-direction: row-reverse; }

/* Full-bleed background image */
.img-bg { background-size: cover; background-position: center; position: relative; }
.img-bg::before { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.5); }
.img-bg > * { position: relative; z-index: 1; }
```

- [ ] **Step 5: Create `fonts.css`**

```css
/* Font loading strategy */
/* Usage: include in <style>, customize font-family choices per presentation */

/* System font stack — zero load time, always available */
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  --font-serif: Georgia, 'Times New Roman', Times, serif;
  --font-display: var(--font-sans);
}

/* Google Fonts loading pattern — swap for seamless display */
/* Example: <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"> */
/* Then set: --font-sans: 'Inter', -apple-system, ...; */

body { font-family: var(--font-sans); }
h1, h2, h3 { font-family: var(--font-display); font-weight: 700; }
```

- [ ] **Step 6: Create `code-fonts.css`**

```css
/* Monospace font configuration */
/* Usage: include in <style> for consistent code rendering */

:root {
  --font-mono: 'Fira Code', 'JetBrains Mono', 'Cascadia Code', 'Source Code Pro', 'Consolas', monospace;
}

code, pre, kbd, samp { font-family: var(--font-mono); }
pre { font-size: 0.9em; line-height: 1.6; tab-size: 2; }
code { font-size: 0.85em; padding: 0.15em 0.4em; background: rgba(255,255,255,0.1); border-radius: 3px; }
pre code { padding: 0; background: none; font-size: inherit; }
```

- [ ] **Step 7: Create `cjk.css`**

```css
/* CJK typography optimization */
/* Usage: include when presentation contains Chinese, Japanese, or Korean text */

:root {
  --font-cjk: 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-cjk-serif: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;
}

/* Apply CJK font stack */
:lang(zh), :lang(ja), :lang(ko) { font-family: var(--font-cjk); }

/* CJK line height needs more breathing room */
:lang(zh) p, :lang(ja) p, :lang(ko) p { line-height: 1.8; }
:lang(zh) li, :lang(ja) li, :lang(ko) li { line-height: 1.7; }

/* Punctuation kerning */
:lang(zh) { font-feature-settings: 'halt' 1; }

/* Mixed CJK + Latin spacing */
:lang(zh) code, :lang(ja) code, :lang(ko) code {
  font-family: var(--font-mono), var(--font-cjk);
  margin-inline: 0.15em;
}
```

- [ ] **Step 8: Verify all layout & typography files exist**

Run: `ls components/layout/ components/typography/`
Expected:
```
components/layout/:
centered.css  grid-helpers.css  image-text.css  split-screen.css

components/typography/:
cjk.css  code-fonts.css  fonts.css
```

- [ ] **Step 9: Commit**

```bash
git add components/layout/ components/typography/
git commit -m "feat: add layout and typography components"
```

---


### Task 4: Animation Components

**Files:**
- Create: `components/animations/transitions.css`
- Create: `components/animations/scroll-driven.css`
- Create: `components/animations/text-effects.js`
- Create: `components/animations/particles.js`
- Create: `components/animations/morphing.js`

- [ ] **Step 1: Create `transitions.css`**

```css
/* Page transition classes */
/* Usage: add data-transition="fade|slide|flip|zoom" to .slide elements */

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide.active {
  opacity: 1;
  visibility: visible;
}

/* Fade (default) */
.slide[data-transition="fade"] { transition: opacity 0.6s ease; }

/* Slide from right */
.slide[data-transition="slide"] { transform: translateX(100%); }
.slide[data-transition="slide"].active { transform: translateX(0); }
.slide[data-transition="slide"].slide-exit { transform: translateX(-100%); }

/* Flip */
.slide[data-transition="flip"] {
  transform: perspective(1000px) rotateY(90deg);
  backface-visibility: hidden;
}
.slide[data-transition="flip"].active { transform: perspective(1000px) rotateY(0); }

/* Zoom */
.slide[data-transition="zoom"] { transform: scale(0.8); }
.slide[data-transition="zoom"].active { transform: scale(1); }
.slide[data-transition="zoom"].slide-exit { transform: scale(1.2); opacity: 0; }

/* Rise from bottom */
.slide[data-transition="rise"] { transform: translateY(30px); }
.slide[data-transition="rise"].active { transform: translateY(0); }
```

- [ ] **Step 2: Create `scroll-driven.css`**

```css
/* Scroll-driven animation utilities */
/* Usage: add class to elements inside a slide, they animate when slide becomes active */

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.slide.active .anim-up { animation: fadeInUp 0.6s ease both; }
.slide.active .anim-left { animation: fadeInLeft 0.6s ease both; }
.slide.active .anim-right { animation: fadeInRight 0.6s ease both; }
.slide.active .anim-scale { animation: scaleIn 0.5s ease both; }

/* Stagger delays */
.slide.active .stagger-1 { animation-delay: 0.1s; }
.slide.active .stagger-2 { animation-delay: 0.2s; }
.slide.active .stagger-3 { animation-delay: 0.3s; }
.slide.active .stagger-4 { animation-delay: 0.4s; }
.slide.active .stagger-5 { animation-delay: 0.5s; }

/* Initial hidden state */
.anim-up, .anim-left, .anim-right, .anim-scale { opacity: 0; }
```

- [ ] **Step 3: Create `text-effects.js`**

```javascript
// Text animation effects: typewriter, word-by-word reveal
// Usage: add data-effect="typewriter|word-reveal" to elements

function initTextEffects() {
  document.querySelectorAll('[data-effect="typewriter"]').forEach(el => {
    const text = el.textContent;
    const speed = parseInt(el.dataset.speed) || 50;
    el.textContent = '';
    el.style.visibility = 'visible';
    let i = 0;
    const parent = el.closest('.slide');
    const observer = new MutationObserver(() => {
      if (parent.classList.contains('active') && i === 0) {
        const interval = setInterval(() => {
          el.textContent += text[i++];
          if (i >= text.length) clearInterval(interval);
        }, speed);
      }
    });
    observer.observe(parent, { attributes: true, attributeFilter: ['class'] });
  });

  document.querySelectorAll('[data-effect="word-reveal"]').forEach(el => {
    const words = el.textContent.split(' ');
    const delay = parseInt(el.dataset.delay) || 150;
    el.innerHTML = words.map((w, i) =>
      '<span style="opacity:0;display:inline-block;transition:opacity 0.4s ease ' +
      (i * delay) + 'ms,transform 0.4s ease ' + (i * delay) +
      'ms;transform:translateY(10px)">' + w + '</span>'
    ).join(' ');
    const parent = el.closest('.slide');
    window.addEventListener('slidechange', () => {
      if (parent.classList.contains('active')) {
        el.querySelectorAll('span').forEach(s => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        });
      }
    });
  });
}
```

- [ ] **Step 4: Create `particles.js`**

```javascript
// Particle background effect
// Usage: call initParticles(slideEl, { count, color, speed })

function initParticles(slideEl, opts = {}) {
  const count = opts.count || 50;
  const color = opts.color || 'rgba(255,255,255,0.3)';
  const speed = opts.speed || 0.5;
  const connect = opts.connect !== false;
  const maxDist = opts.maxDist || 120;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
  slideEl.style.position = 'relative';
  slideEl.insertBefore(canvas, slideEl.firstChild);
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId = null;

  function resize() {
    canvas.width = slideEl.offsetWidth;
    canvas.height = slideEl.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < count; i++) {
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
    particles.forEach(p => {
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
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
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

  window.addEventListener('slidechange', () => {
    const isActive = slideEl.classList.contains('active');
    if (isActive && !animId) draw();
    if (!isActive && animId) { cancelAnimationFrame(animId); animId = null; }
  });
}
```

- [ ] **Step 5: Create `morphing.js`**

```javascript
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
```

- [ ] **Step 6: Verify all animation files exist**

Run: `ls components/animations/`
Expected: `morphing.js  particles.js  scroll-driven.css  text-effects.js  transitions.css`

- [ ] **Step 7: Commit**

```bash
git add components/animations/
git commit -m "feat: add animation components (transitions, scroll, text, particles, morphing)"
```

---


### Task 5: Code Display Components

**Files:**
- Create: `components/code/prism-setup.js`
- Create: `components/code/line-animation.js`
- Create: `components/code/live-editor.js`

- [ ] **Step 1: Create `prism-setup.js`**

```javascript
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
```

- [ ] **Step 2: Create `line-animation.js`**

```javascript
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
```

- [ ] **Step 3: Create `live-editor.js`**

```javascript
// Editable + runnable code blocks (JavaScript only)
// Usage: add data-live="true" to <pre><code class="language-javascript">...</code></pre>
// Adds an "Run" button that executes the code and shows output below

function initLiveEditor() {
  document.querySelectorAll('pre[data-live="true"]').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;

    code.contentEditable = 'true';
    code.style.outline = 'none';
    code.spellcheck = false;

    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;margin-top:4px;';

    const runBtn = document.createElement('button');
    runBtn.textContent = 'Run';
    runBtn.style.cssText = 'padding:4px 12px;background:#4a9eff;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:13px;';

    const output = document.createElement('pre');
    output.style.cssText = 'margin-top:8px;padding:8px 12px;background:rgba(0,0,0,0.3);border-radius:4px;font-size:0.85em;max-height:150px;overflow:auto;display:none;';

    runBtn.addEventListener('click', () => {
      output.style.display = 'block';
      const logs = [];
      const origLog = console.log;
      console.log = function() {
        logs.push(Array.from(arguments).join(' '));
        origLog.apply(console, arguments);
      };
      try {
        var result = eval(code.textContent);
        output.textContent = logs.join('\n') + (result !== undefined ? '\n=> ' + result : '');
      } catch (err) {
        output.textContent = logs.join('\n') + '\nError: ' + err.message;
        output.style.color = '#ff6b6b';
      }
      console.log = origLog;
      if (!output.textContent.trim()) output.textContent = '(no output)';
      output.style.color = output.style.color || '#aaa';
    });

    controls.appendChild(runBtn);
    pre.parentNode.insertBefore(controls, pre.nextSibling);
    pre.parentNode.insertBefore(output, controls.nextSibling);
  });
}
```

- [ ] **Step 4: Verify all code files exist**

Run: `ls components/code/`
Expected: `line-animation.js  live-editor.js  prism-setup.js`

- [ ] **Step 5: Commit**

```bash
git add components/code/
git commit -m "feat: add code display components (prism, line animation, live editor)"
```

---


### Task 6: Math Rendering Component

**Files:**
- Create: `components/math/katex-setup.js`

- [ ] **Step 1: Create `katex-setup.js`**

```javascript
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
```

- [ ] **Step 2: Verify file exists**

Run: `ls components/math/`
Expected: `katex-setup.js`

- [ ] **Step 3: Commit**

```bash
git add components/math/
git commit -m "feat: add KaTeX math rendering component"
```

---

### Task 7: Data Visualization Components

**Files:**
- Create: `components/data-viz/chart-helpers.js`
- Create: `components/data-viz/echarts-helpers.js`
- Create: `components/data-viz/simple-bars.css`
- Create: `components/data-viz/counters.js`

- [ ] **Step 1: Create `chart-helpers.js`**

```javascript
// Chart.js convenience wrappers
// CDN: <script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
// Usage: call createChart(canvasId, type, data, options)

function createChart(canvasId, type, data, options) {
  if (typeof Chart === 'undefined') {
    console.warn('chart-helpers.js: Chart.js not loaded');
    return;
  }
  var ctx = document.getElementById(canvasId);
  if (!ctx) return;

  var defaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#ccc', font: { size: 14 } } }
    },
    scales: {
      x: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.06)' } },
      y: { ticks: { color: '#aaa' }, grid: { color: 'rgba(255,255,255,0.06)' } }
    }
  };

  // Merge user options with dark-theme defaults
  var mergedOpts = Object.assign({}, defaults, options || {});

  return new Chart(ctx, { type: type, data: data, options: mergedOpts });
}

// Shorthand: bar chart
function createBarChart(canvasId, labels, datasets) {
  return createChart(canvasId, 'bar', { labels: labels, datasets: datasets });
}

// Shorthand: line chart
function createLineChart(canvasId, labels, datasets) {
  return createChart(canvasId, 'line', { labels: labels, datasets: datasets });
}

// Shorthand: pie/doughnut
function createPieChart(canvasId, labels, data, colors) {
  return createChart(canvasId, 'doughnut', {
    labels: labels,
    datasets: [{ data: data, backgroundColor: colors || ['#4a9eff','#ff6b6b','#51cf66','#ffd43b','#cc5de8','#ff922b'] }]
  });
}
```

- [ ] **Step 2: Create `echarts-helpers.js`**

```javascript
// ECharts wrappers for complex/interactive charts
// CDN: <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
// Usage: call createEChart(containerId, option)

function createEChart(containerId, option) {
  if (typeof echarts === 'undefined') {
    console.warn('echarts-helpers.js: ECharts not loaded');
    return;
  }
  var container = document.getElementById(containerId);
  if (!container) return;
  var chart = echarts.init(container, 'dark');
  chart.setOption(option);
  window.addEventListener('resize', function() { chart.resize(); });

  // Auto-resize when slide becomes active (handles hidden containers)
  window.addEventListener('slidechange', function() {
    var slide = container.closest('.slide');
    if (slide && slide.classList.contains('active')) {
      setTimeout(function() { chart.resize(); }, 100);
    }
  });
  return chart;
}
```

- [ ] **Step 3: Create `simple-bars.css`**

```css
/* Pure CSS bar charts — zero dependencies */
/* Usage:
  <div class="css-chart">
    <div class="css-bar" style="--value: 80%;" data-label="Item A" data-value="80%"></div>
    <div class="css-bar" style="--value: 60%;" data-label="Item B" data-value="60%"></div>
  </div>
*/

.css-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 1rem 0;
}
.css-bar {
  position: relative;
  height: 32px;
  background: rgba(255,255,255,0.08);
  border-radius: 4px;
  overflow: hidden;
}
.css-bar::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: var(--value, 0%);
  background: linear-gradient(90deg, #4a9eff, #51cf66);
  border-radius: 4px;
  transition: width 1s ease;
}
.css-bar::after {
  content: attr(data-label) ' — ' attr(data-value);
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #fff;
  z-index: 1;
  white-space: nowrap;
}

/* Animate bars when slide becomes active */
.slide:not(.active) .css-bar::before { width: 0; }
```

- [ ] **Step 4: Create `counters.js`**

```javascript
// Number roll-up animation
// Usage: <span data-counter="1234" data-duration="2000"></span>
// The number counts up from 0 to the target when the slide becomes active

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
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
```

- [ ] **Step 5: Verify all data-viz files exist**

Run: `ls components/data-viz/`
Expected: `chart-helpers.js  counters.js  echarts-helpers.js  simple-bars.css`

- [ ] **Step 6: Commit**

```bash
git add components/data-viz/
git commit -m "feat: add data visualization components (Chart.js, ECharts, CSS bars, counters)"
```

---


### Task 8: Interactive Components

**Files:**
- Create: `components/interactive/quiz.js`
- Create: `components/interactive/drag-sort.js`
- Create: `components/interactive/tabs.js`
- Create: `components/interactive/reveal-on-click.js`
- Create: `components/interactive/poll.js`

- [ ] **Step 1: Create `quiz.js`**

```javascript
// Multiple choice quiz interaction
// Usage:
// <div class="quiz" data-answer="2">
//   <p class="quiz-question">What is 2+2?</p>
//   <button class="quiz-option" data-index="0">3</button>
//   <button class="quiz-option" data-index="1">5</button>
//   <button class="quiz-option" data-index="2">4</button>
// </div>
// Call initQuiz() after DOM ready

function initQuiz() {
  document.querySelectorAll('.quiz').forEach(function(quiz) {
    var answer = parseInt(quiz.dataset.answer);
    var options = quiz.querySelectorAll('.quiz-option');
    var answered = false;

    options.forEach(function(btn) {
      btn.style.cssText = 'display:block;width:100%;padding:12px 16px;margin:6px 0;background:rgba(255,255,255,0.08);border:2px solid rgba(255,255,255,0.15);border-radius:8px;color:#eee;font-size:1rem;cursor:pointer;text-align:left;transition:all 0.3s;';

      btn.addEventListener('click', function() {
        if (answered) return;
        answered = true;
        var idx = parseInt(btn.dataset.index);
        options.forEach(function(opt) {
          opt.style.cursor = 'default';
          var optIdx = parseInt(opt.dataset.index);
          if (optIdx === answer) {
            opt.style.borderColor = '#51cf66';
            opt.style.background = 'rgba(81,207,102,0.15)';
          } else if (optIdx === idx && idx !== answer) {
            opt.style.borderColor = '#ff6b6b';
            opt.style.background = 'rgba(255,107,107,0.15)';
          }
        });
      });

      btn.addEventListener('mouseenter', function() {
        if (!answered) btn.style.background = 'rgba(255,255,255,0.15)';
      });
      btn.addEventListener('mouseleave', function() {
        if (!answered) btn.style.background = 'rgba(255,255,255,0.08)';
      });
    });
  });
}
```

- [ ] **Step 2: Create `drag-sort.js`**

```javascript
// Drag-and-drop sorting interaction
// Usage:
// <div class="drag-sort">
//   <div class="drag-item" draggable="true">Item A</div>
//   <div class="drag-item" draggable="true">Item B</div>
//   <div class="drag-item" draggable="true">Item C</div>
// </div>
// Call initDragSort() after DOM ready

function initDragSort() {
  document.querySelectorAll('.drag-sort').forEach(function(container) {
    var dragItem = null;

    container.querySelectorAll('.drag-item').forEach(function(item) {
      item.style.cssText = 'padding:12px 16px;margin:6px 0;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;cursor:grab;transition:transform 0.2s,opacity 0.2s;user-select:none;';

      item.addEventListener('dragstart', function(e) {
        dragItem = item;
        item.style.opacity = '0.4';
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragend', function() {
        item.style.opacity = '1';
        dragItem = null;
        container.querySelectorAll('.drag-item').forEach(function(el) {
          el.style.borderTop = '1px solid rgba(255,255,255,0.15)';
        });
      });

      item.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        item.style.borderTop = '2px solid #4a9eff';
      });

      item.addEventListener('dragleave', function() {
        item.style.borderTop = '1px solid rgba(255,255,255,0.15)';
      });

      item.addEventListener('drop', function(e) {
        e.preventDefault();
        if (dragItem && dragItem !== item) {
          container.insertBefore(dragItem, item);
        }
        item.style.borderTop = '1px solid rgba(255,255,255,0.15)';
      });
    });
  });
}
```

- [ ] **Step 3: Create `tabs.js`**

```javascript
// Tab switching component
// Usage:
// <div class="tab-container">
//   <div class="tab-buttons">
//     <button class="tab-btn active" data-tab="0">Tab 1</button>
//     <button class="tab-btn" data-tab="1">Tab 2</button>
//   </div>
//   <div class="tab-panel active" data-panel="0">Content 1</div>
//   <div class="tab-panel" data-panel="1">Content 2</div>
// </div>
// Call initTabs() after DOM ready

function initTabs() {
  document.querySelectorAll('.tab-container').forEach(function(container) {
    var buttons = container.querySelectorAll('.tab-btn');
    var panels = container.querySelectorAll('.tab-panel');

    // Style buttons
    buttons.forEach(function(btn) {
      btn.style.cssText = 'padding:8px 20px;background:transparent;border:none;border-bottom:2px solid transparent;color:#aaa;cursor:pointer;font-size:0.95rem;transition:all 0.3s;';

      btn.addEventListener('click', function() {
        var tabIndex = btn.dataset.tab;
        buttons.forEach(function(b) {
          b.classList.remove('active');
          b.style.borderBottomColor = 'transparent';
          b.style.color = '#aaa';
        });
        panels.forEach(function(p) {
          p.classList.remove('active');
          p.style.display = 'none';
        });
        btn.classList.add('active');
        btn.style.borderBottomColor = '#4a9eff';
        btn.style.color = '#fff';
        var panel = container.querySelector('[data-panel="' + tabIndex + '"]');
        if (panel) {
          panel.classList.add('active');
          panel.style.display = 'block';
        }
      });
    });

    // Initialize: show first tab
    if (buttons.length > 0) buttons[0].click();
  });
}
```

- [ ] **Step 4: Create `reveal-on-click.js`**

```javascript
// Click to reveal hidden content
// Usage: <div class="reveal" data-reveal-label="Click to reveal">Hidden content here</div>
// Call initReveal() after DOM ready

function initReveal() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    var content = el.innerHTML;
    var label = el.dataset.revealLabel || 'Click to reveal';
    el.innerHTML = '<button class="reveal-btn">' + label + '</button><div class="reveal-content" style="display:none;">' + content + '</div>';

    var btn = el.querySelector('.reveal-btn');
    var contentDiv = el.querySelector('.reveal-content');

    btn.style.cssText = 'padding:8px 20px;background:rgba(74,158,255,0.2);border:1px solid #4a9eff;border-radius:6px;color:#4a9eff;cursor:pointer;font-size:0.95rem;transition:all 0.3s;';
    contentDiv.style.cssText = 'display:none;opacity:0;transition:opacity 0.4s ease;margin-top:12px;';

    btn.addEventListener('click', function() {
      if (contentDiv.style.display === 'none') {
        contentDiv.style.display = 'block';
        requestAnimationFrame(function() { contentDiv.style.opacity = '1'; });
        btn.textContent = 'Hide';
      } else {
        contentDiv.style.opacity = '0';
        setTimeout(function() { contentDiv.style.display = 'none'; }, 400);
        btn.textContent = label;
      }
    });
  });
}
```

- [ ] **Step 5: Create `poll.js`**

```javascript
// Live polling simulation using localStorage
// Usage:
// <div class="poll" data-poll-id="q1">
//   <p class="poll-question">Favorite language?</p>
//   <button class="poll-option" data-option="Python">Python</button>
//   <button class="poll-option" data-option="JavaScript">JavaScript</button>
//   <button class="poll-option" data-option="Rust">Rust</button>
//   <div class="poll-results"></div>
// </div>
// Call initPolls() after DOM ready

function initPolls() {
  document.querySelectorAll('.poll').forEach(function(poll) {
    var pollId = poll.dataset.pollId || 'default';
    var storageKey = 'keynova-poll-' + pollId;
    var options = poll.querySelectorAll('.poll-option');
    var resultsDiv = poll.querySelector('.poll-results');
    var voted = localStorage.getItem(storageKey + '-voted');

    function getVotes() {
      try { return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
      catch (e) { return {}; }
    }

    function renderResults() {
      var votes = getVotes();
      var total = Object.values(votes).reduce(function(a, b) { return a + b; }, 0) || 1;
      var html = '';
      Object.keys(votes).forEach(function(key) {
        var pct = Math.round(votes[key] / total * 100);
        html += '<div style="margin:4px 0;"><span>' + key + '</span>';
        html += '<div style="background:rgba(255,255,255,0.08);border-radius:4px;height:24px;margin-top:2px;overflow:hidden;">';
        html += '<div style="width:' + pct + '%;height:100%;background:#4a9eff;border-radius:4px;transition:width 0.5s;display:flex;align-items:center;padding-left:8px;font-size:12px;">' + pct + '%</div>';
        html += '</div></div>';
      });
      if (resultsDiv) resultsDiv.innerHTML = html;
    }

    options.forEach(function(btn) {
      btn.style.cssText = 'display:block;width:100%;padding:10px 16px;margin:4px 0;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:6px;color:#eee;cursor:pointer;font-size:0.95rem;';

      btn.addEventListener('click', function() {
        if (voted) return;
        var option = btn.dataset.option;
        var votes = getVotes();
        votes[option] = (votes[option] || 0) + 1;
        localStorage.setItem(storageKey, JSON.stringify(votes));
        localStorage.setItem(storageKey + '-voted', 'true');
        voted = true;
        options.forEach(function(b) { b.style.cursor = 'default'; b.style.opacity = '0.6'; });
        btn.style.borderColor = '#4a9eff';
        btn.style.opacity = '1';
        renderResults();
      });
    });

    if (voted) renderResults();
  });
}
```

- [ ] **Step 6: Verify all interactive files exist**

Run: `ls components/interactive/`
Expected: `drag-sort.js  poll.js  quiz.js  reveal-on-click.js  tabs.js`

- [ ] **Step 7: Commit**

```bash
git add components/interactive/
git commit -m "feat: add interactive components (quiz, drag-sort, tabs, reveal, poll)"
```

---


### Task 9: Dev Server

**Files:**
- Create: `dev-server/serve.js`

A single-file Node.js script. Zero npm dependencies. Serves HTML with auto-reload via WebSocket injection.

- [ ] **Step 1: Create `serve.js`**

```javascript
// Zero-dependency Node.js dev server with hot reload
// Usage: node dev-server/serve.js presentations/my-talk/
// Serves on localhost:3000 (or --port NNNN)

var http = require('http');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var args = process.argv.slice(2);
var dir = args.find(function(a) { return !a.startsWith('--'); }) || '.';
var port = parseInt((args.find(function(a) { return a.startsWith('--port'); }) || '').split('=')[1]) || 3000;
dir = path.resolve(dir);

var MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2'
};

// WebSocket reload snippet injected into HTML responses
var WS_SCRIPT = '<script>(function(){var ws=new WebSocket("ws://"+location.host+"/__reload");ws.onmessage=function(){location.reload()};ws.onclose=function(){setTimeout(function(){location.reload()},1000)};})()</script>';

// Simple WebSocket server (RFC 6455 minimal implementation)
var wsClients = [];

function handleUpgrade(req, socket) {
  var key = req.headers['sec-websocket-key'];
  var accept = crypto.createHash('sha1')
    .update(key + '258EAFA5-E914-47DA-95CA-5AB5DC562615')
    .digest('base64');
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
  );
  wsClients.push(socket);
  socket.on('close', function() {
    wsClients = wsClients.filter(function(s) { return s !== socket; });
  });
  socket.on('error', function() {
    wsClients = wsClients.filter(function(s) { return s !== socket; });
  });
}

function notifyReload() {
  var frame = Buffer.alloc(4);
  frame[0] = 0x81; // text frame, FIN
  frame[1] = 2;    // payload length
  frame[2] = 0x6F; // 'o'
  frame[3] = 0x6B; // 'k'
  wsClients.forEach(function(socket) {
    try { socket.write(frame); } catch (e) {}
  });
}

var server = http.createServer(function(req, res) {
  var urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  var filePath = path.join(dir, urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(dir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + urlPath);
      return;
    }
    var ext = path.extname(filePath);
    var mime = MIME[ext] || 'application/octet-stream';
    // Inject reload script into HTML
    if (ext === '.html') {
      data = data.toString().replace('</body>', WS_SCRIPT + '</body>');
    }
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.on('upgrade', function(req, socket) {
  if (req.url === '/__reload') handleUpgrade(req, socket);
  else socket.destroy();
});

// Watch for file changes
var debounce = null;
fs.watch(dir, { recursive: true }, function(event, filename) {
  if (!filename) return;
  clearTimeout(debounce);
  debounce = setTimeout(function() {
    console.log('[reload] ' + filename + ' changed');
    notifyReload();
  }, 200);
});

server.listen(port, function() {
  console.log('Serving ' + dir + ' at http://localhost:' + port);
  console.log('Press Ctrl+C to stop');
});
```

- [ ] **Step 2: Verify file exists**

Run: `ls dev-server/`
Expected: `serve.js`

- [ ] **Step 3: Quick smoke test — start and stop the server**

Run: `timeout 3 node dev-server/serve.js . 2>&1 || true`
Expected: Output includes "Serving" and the URL. Server exits after timeout.

- [ ] **Step 4: Commit**

```bash
git add dev-server/
git commit -m "feat: add zero-dependency dev server with WebSocket hot reload"
```

---

### Task 10: Example Presentation

**Files:**
- Create: `presentations/example/content.md`
- Create: `presentations/example/index.html`

A complete working example that demonstrates the Keynova workflow: Markdown in, standalone HTML out. Uses navigation, layout, typography, animations, a code block, and a chart.

- [ ] **Step 1: Create `content.md`**

```markdown
# Keynova Demo

A presentation about Keynova itself. Dark theme, modern, clean.

---

# What is Keynova?

Keynova turns your Markdown into beautiful HTML presentations.

- No frameworks
- No build tools
- Just write and present

Show these bullet points appearing one by one.

---

# How It Works

Show a split layout:

Left side: the workflow steps
1. Write Markdown
2. Claude Code generates HTML
3. Preview with dev server
4. Present or deploy

Right side: a simple diagram or visual showing the flow.

---

# Code Example

Show some JavaScript with syntax highlighting and line-by-line animation:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('Keynova'));
```

---

# Performance Comparison

Draw a bar chart comparing presentation tools:
- PowerPoint: 500MB install
- Reveal.js: 50MB node_modules
- Keynova: 0MB dependencies

---

# Thank You

Big centered text. Fade in.

Questions? Open an issue on GitHub.
```

- [ ] **Step 2: Create `index.html`**

This is the generated presentation HTML. It is self-contained with inline CSS/JS and demonstrates the component toolkit in action.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keynova Demo</title>
  <link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'Fira Code', 'Cascadia Code', Consolas, monospace;
      --bg: #0a0a0f;
      --text: #e8e8e8;
      --accent: #4a9eff;
      --accent-soft: rgba(74,158,255,0.15);
    }
    html, body { height: 100%; overflow: hidden; background: var(--bg); color: var(--text); font-family: var(--font-sans); }
    .slide-container { position: relative; width: 100vw; height: 100vh; }
    .slide {
      position: absolute; inset: 0; padding: 4rem 6rem;
      display: flex; flex-direction: column; justify-content: center;
      opacity: 0; visibility: hidden; transition: opacity 0.5s ease;
    }
    .slide.active { opacity: 1; visibility: visible; }
    h1 { font-size: clamp(2rem, 5vw, 4rem); margin-bottom: 1.5rem; line-height: 1.1; }
    h2 { font-size: clamp(1.2rem, 3vw, 2rem); margin-bottom: 1rem; opacity: 0.8; }
    p, li { font-size: clamp(1rem, 1.8vw, 1.3rem); line-height: 1.7; }
    ul { list-style: none; padding: 0; }
    ul li { padding: 0.4rem 0; padding-left: 1.5rem; position: relative; }
    ul li::before { content: ''; position: absolute; left: 0; top: 50%; width: 8px; height: 8px; background: var(--accent); border-radius: 50%; transform: translateY(-50%); }
    code, pre { font-family: var(--font-mono); }
    pre { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; overflow-x: auto; font-size: 0.9em; line-height: 1.6; }
    code { font-size: 0.85em; padding: 0.15em 0.4em; background: rgba(255,255,255,0.1); border-radius: 3px; }
    pre code { padding: 0; background: none; }

    /* Centered layout */
    .centered { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
    .centered h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
    .centered p { font-size: clamp(1rem, 2vw, 1.5rem); max-width: 40ch; opacity: 0.6; margin-top: 1rem; }

    /* Split layout */
    .split { display: flex; gap: 3rem; align-items: center; height: 100%; }
    .split > * { flex: 1; }
    .split ol { padding-left: 1.5rem; }
    .split ol li { padding: 0.5rem 0; }

    /* Stagger animation */
    .anim-up { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }
    .slide.active .anim-up { opacity: 1; transform: translateY(0); }
    .stagger-1 { transition-delay: 0.1s; }
    .stagger-2 { transition-delay: 0.2s; }
    .stagger-3 { transition-delay: 0.3s; }
    .stagger-4 { transition-delay: 0.4s; }

    /* CSS bar chart */
    .css-chart { display: flex; flex-direction: column; gap: 16px; padding: 1rem 0; max-width: 600px; }
    .css-bar { position: relative; height: 40px; background: rgba(255,255,255,0.05); border-radius: 6px; overflow: hidden; }
    .css-bar::before { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: var(--value, 0%); background: linear-gradient(90deg, var(--accent), #51cf66); border-radius: 6px; transition: width 1.2s ease; }
    .css-bar::after { content: attr(data-label) ' \2014  ' attr(data-value); position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; color: #fff; z-index: 1; white-space: nowrap; }
    .slide:not(.active) .css-bar::before { width: 0; }

    /* Progress bar */
    #progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: var(--accent); transition: width 0.3s; z-index: 9999; }

    /* Flow diagram */
    .flow { display: flex; align-items: center; gap: 1rem; font-size: 1.1rem; flex-wrap: wrap; justify-content: center; }
    .flow-step { background: var(--accent-soft); border: 1px solid var(--accent); padding: 0.8rem 1.2rem; border-radius: 8px; }
    .flow-arrow { font-size: 1.5rem; color: var(--accent); }
  </style>
</head>
<body>
  <div id="progress-bar"></div>
  <div class="slide-container">

    <!-- Slide 1: Title -->
    <div class="slide centered">
      <h1>Keynova</h1>
      <p>Markdown in. Beautiful presentations out.</p>
    </div>

    <!-- Slide 2: What is Keynova -->
    <div class="slide">
      <h1>What is Keynova?</h1>
      <p style="margin-bottom:1.5rem;">Keynova turns your Markdown into beautiful HTML presentations.</p>
      <ul>
        <li class="anim-up stagger-1">No frameworks</li>
        <li class="anim-up stagger-2">No build tools</li>
        <li class="anim-up stagger-3">Just write and present</li>
      </ul>
    </div>

    <!-- Slide 3: How It Works -->
    <div class="slide">
      <h1>How It Works</h1>
      <div class="split">
        <div>
          <ol>
            <li class="anim-up stagger-1">Write Markdown</li>
            <li class="anim-up stagger-2">Claude Code generates HTML</li>
            <li class="anim-up stagger-3">Preview with dev server</li>
            <li class="anim-up stagger-4">Present or deploy</li>
          </ol>
        </div>
        <div class="anim-up stagger-2">
          <div class="flow">
            <span class="flow-step">.md file</span>
            <span class="flow-arrow">&#x2192;</span>
            <span class="flow-step">Claude Code</span>
            <span class="flow-arrow">&#x2192;</span>
            <span class="flow-step">index.html</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Slide 4: Code Example -->
    <div class="slide">
      <h1>Code Example</h1>
      <pre data-animate="lines"><code class="language-javascript">function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('Keynova'));</code></pre>
    </div>

    <!-- Slide 5: Performance Comparison -->
    <div class="slide">
      <h1>Performance Comparison</h1>
      <p style="margin-bottom:1.5rem;">Dependencies required by each tool:</p>
      <div class="css-chart">
        <div class="css-bar" style="--value:100%;" data-label="PowerPoint" data-value="500MB install"></div>
        <div class="css-bar" style="--value:10%;" data-label="Reveal.js" data-value="50MB node_modules"></div>
        <div class="css-bar" style="--value:0.5%;" data-label="Keynova" data-value="0MB dependencies"></div>
      </div>
    </div>

    <!-- Slide 6: Thank You -->
    <div class="slide centered">
      <h1 class="anim-up">Thank You</h1>
      <p class="anim-up stagger-2">Questions? Open an issue on GitHub.</p>
    </div>

  </div>

  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js"></script>
  <script>
    // --- Navigation (from components/navigation/keyboard.js) ---
    (function() {
      var slides = document.querySelectorAll('.slide');
      var current = 0;

      function showSlide(index) {
        slides.forEach(function(s, i) {
          s.classList.toggle('active', i === index);
          s.setAttribute('aria-hidden', i !== index);
        });
        current = index;
        window.dispatchEvent(new CustomEvent('slidechange', { detail: { index: current, total: slides.length } }));
      }

      document.addEventListener('keydown', function(e) {
        switch (e.key) {
          case 'ArrowRight': case 'ArrowDown': case ' ':
            e.preventDefault();
            if (current < slides.length - 1) showSlide(current + 1);
            break;
          case 'ArrowLeft': case 'ArrowUp':
            e.preventDefault();
            if (current > 0) showSlide(current - 1);
            break;
        }
      });

      // Touch navigation
      var startX = 0;
      document.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, { passive: true });
      document.addEventListener('touchend', function(e) {
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) {
          if (dx < 0 && current < slides.length - 1) showSlide(current + 1);
          if (dx > 0 && current > 0) showSlide(current - 1);
        }
      }, { passive: true });

      // Progress bar
      var bar = document.getElementById('progress-bar');
      window.addEventListener('slidechange', function(e) {
        var d = e.detail;
        if (bar) bar.style.width = ((d.index + 1) / d.total * 100) + '%';
      });

      // Code line animation
      document.querySelectorAll('pre[data-animate="lines"]').forEach(function(pre) {
        var code = pre.querySelector('code');
        if (!code) return;
        var lines = code.innerHTML.split('\n');
        code.innerHTML = lines.map(function(line, i) {
          return '<span class="code-line" style="opacity:0;display:block;transition:opacity 0.3s ease ' + (i * 120) + 'ms">' + line + '</span>';
        }).join('');
        var slide = pre.closest('.slide');
        window.addEventListener('slidechange', function() {
          var show = slide.classList.contains('active');
          code.querySelectorAll('.code-line').forEach(function(el) { el.style.opacity = show ? '1' : '0'; });
        });
      });

      showSlide(0);
      Prism.highlightAll();
    })();
  </script>
</body>
</html>
```

- [ ] **Step 3: Test in browser**

Run: `node dev-server/serve.js presentations/example/`
Open: `http://localhost:3000`
Verify:
- Title slide renders with centered text
- Arrow keys navigate between slides
- Bullet points animate in on slide 2
- Split layout works on slide 3
- Code appears line by line on slide 4
- CSS bar chart animates on slide 5
- Progress bar updates at the top

- [ ] **Step 4: Commit**

```bash
git add presentations/example/
git commit -m "feat: add example presentation with content.md and generated index.html"
```

---

### Task 11: Component README Finalization

**Files:**
- Modify: `components/README.md`

Update the skeleton README from Task 1 with detailed documentation for every component now that they all exist.

- [ ] **Step 1: Update README with full component documentation**

Replace the placeholder `> Detailed component docs will be added as each category is built.` with complete documentation for each category. For each component file, document:
- What it does (one line)
- How to use it (code snippet or usage pattern)
- Dependencies if any (CDN link)

Structure by category matching the file tree. Example for one entry:

```markdown
### navigation/keyboard.js
Keyboard navigation for slides. Arrow keys, space, Home/End.

Usage: call `initKeyboardNav()` after DOM ready. Returns `{ showSlide, getIndex, getTotal }`.

Fires `slidechange` CustomEvent on `window` with `{ index, total }` detail.
```

Document all 30 component files in the same pattern.

- [ ] **Step 2: Verify README is complete**

Run: `grep -c '###' components/README.md`
Expected: at least 30 (one heading per component file)

- [ ] **Step 3: Commit**

```bash
git add components/README.md
git commit -m "docs: finalize component README with full documentation for all 30 components"
```

---

## Self-Review Checklist

After writing the plan, verify:

1. **Spec coverage:** Every section of the design spec maps to at least one task:
   - System Overview / Project Structure -> File Structure + all tasks
   - Markdown Input -> Task 10 (example content.md)
   - Component Toolkit -> Tasks 1-8, 11
   - CDN Dependencies -> Task 1 (README table), Task 10 (example HTML)
   - Dev Server -> Task 9
   - Output & Sharing -> Task 10 (example HTML is the deliverable)
   - Complete Workflow -> Task 10 demonstrates the full workflow

2. **No placeholders:** Every step has actual code or exact commands.

3. **Type consistency:** Function names (`initKeyboardNav`, `initTouchNav`, `initProgressBar`, etc.) are consistent between component definitions and the example HTML usage.
