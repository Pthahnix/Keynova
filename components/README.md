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

---

## navigation/

### navigation/keyboard.js
Keyboard navigation controller for slide presentations. Handles arrow keys, spacebar, Home, and End to move between slides. Dispatches a `slidechange` custom event on every transition that other components listen to.

**Usage:** Call `initKeyboardNav()` after DOM ready. Returns an object `{ showSlide, getIndex, getTotal }` that other nav components accept.

**Dependencies:** None.

---

### navigation/touch.js
Swipe gesture navigation for touch/mobile devices. Recognises left/right swipes above a 50 px threshold and delegates to the keyboard-nav controller.

**Usage:** Call `initTouchNav(nav)` where `nav` is the return value of `initKeyboardNav()`.

**Dependencies:** Requires `navigation/keyboard.js` (or any object exposing `showSlide`, `getIndex`, `getTotal`).

---

### navigation/progress.js
Thin fixed progress bar at the top of the viewport that fills as the audience advances through slides. Updates on every `slidechange` event.

**Usage:** Add `<div id="progress-bar"></div>` to the HTML and apply the inline CSS comment from the file (`position:fixed; top:0; left:0; height:3px; background:#4a9eff; ...`). Then call `initProgressBar()`.

**Dependencies:** None (listens for the `slidechange` event emitted by `keyboard.js`).

---

### navigation/overview.js
Press `o` (or `O`) to open a full-screen thumbnail grid of all slides. Click any thumbnail to jump to that slide; press `Escape` or `o` again to close. The current slide thumbnail is highlighted in blue.

**Usage:** Call `initOverview(nav)` where `nav` is the return value of `initKeyboardNav()`.

**Dependencies:** Requires `navigation/keyboard.js`.

---

## layout/

### layout/grid-helpers.css
Utility CSS classes for multi-column grid layouts inside slides: `.grid-2` (two equal columns), `.grid-3` (three columns), `.grid-2x2` (2×2 grid), `.grid-auto` (auto-fit responsive), `.span-2`, and `.span-full` for spanning items.

**Usage:** Add the desired class to any container element, e.g. `<div class="grid-2">`.

**Dependencies:** None.

---

### layout/split-screen.css
Flexbox side-by-side layout with optional ratio variants. `.split` creates an equal 50/50 split; modifier classes `.split-40-60`, `.split-60-40`, and `.split-30-70` set asymmetric ratios. A subtle dividing line separates the left panel.

**Usage:** `<div class="split"><div class="split-left">…</div><div class="split-right">…</div></div>`. Add a ratio modifier class to `.split` as needed.

**Dependencies:** None.

---

### layout/centered.css
Vertically and horizontally centred layout for title slides, quotes, and big-statement slides. Includes responsive `clamp()`-based font sizes for `h1`, `h2`, `p`, and `blockquote` inside a `.centered` container.

**Usage:** Add class `centered` to a `.slide` or its direct child wrapper element.

**Dependencies:** None.

---

### layout/image-text.css
Mixed image-and-text layout utilities. `.img-text` places an image beside text content with `flex`; `.img-text-reverse` flips the order. `.img-bg` turns any element into a full-bleed background image with a dark overlay so overlaid text remains readable.

**Usage:** Wrap content in `<div class="img-text"><img …><div class="img-text-content">…</div></div>`. For background images use `<div class="img-bg" style="background-image:url(…)">`.

**Dependencies:** None.

---

## typography/

### typography/fonts.css
System font stack configuration via CSS custom properties. Defines `--font-sans` (system UI stack), `--font-serif`, and `--font-display` variables, and applies them to `body` and headings.

**Usage:** Link the file; override `--font-display` or `--font-sans` in a `:root` block to switch the typeface for the whole presentation.

**Dependencies:** None.

---

### typography/code-fonts.css
Monospace font configuration for inline `code`, `pre`, `kbd`, and `samp` elements. Defines `--font-mono` with a priority list of programming fonts (Fira Code, JetBrains Mono, Cascadia Code, etc.) and sets appropriate `font-size`, `line-height`, and `tab-size` defaults for code blocks.

**Usage:** Link the file. No additional markup needed; styles apply automatically to all code elements.

**Dependencies:** None (fonts load from the user's system; add a Google Fonts `<link>` for web fonts if desired).

---

### typography/cjk.css
CJK (Chinese, Japanese, Korean) typography optimisation. Defines `--font-cjk` and `--font-cjk-serif` variables and applies them to elements with `lang="zh"`, `lang="ja"`, or `lang="ko"`. Increases line-height for CJK paragraphs and list items, and enables OpenType `halt` feature for Chinese text.

**Usage:** Link the file and set the `lang` attribute on the relevant elements or on `<html>`.

**Dependencies:** None (fonts load from the system; add Noto Sans SC via Google Fonts for consistent cross-platform rendering).

---

## animations/

### animations/transitions.css
CSS slide-transition classes for four transition styles: `fade` (default opacity cross-fade), `slide` (horizontal translate), `flip` (3-D Y-axis rotate), `zoom` (scale in/out), and `rise` (translate up). Apply via `data-transition` attribute on individual `.slide` elements.

**Usage:** Add `data-transition="fade|slide|flip|zoom|rise"` to each `.slide` element. The `.active` class (toggled by `keyboard.js`) triggers the transition.

**Dependencies:** Requires `navigation/keyboard.js` (or any code that toggles `.active` on slides).

---

### animations/scroll-driven.css
Enter-animation utility classes that fire when a slide becomes `.active`. Provides `fadeInUp`, `fadeInLeft`, `fadeInRight`, and `scaleIn` keyframes, mapped to classes `.anim-up`, `.anim-left`, `.anim-right`, `.anim-scale`. Stagger delays `.stagger-1` through `.stagger-5` (0.1 s–0.5 s) allow sequential reveal of list items or cards.

**Usage:** Add animation classes to child elements inside a `.slide`, e.g. `<li class="anim-up stagger-2">`. Elements start hidden (`opacity:0`) and animate in when the slide activates.

**Dependencies:** None.

---

### animations/text-effects.js
Two text animation effects driven by `data-effect` attributes. `typewriter` types the element's text character-by-character when the slide becomes active (configurable speed via `data-speed`). `word-reveal` splits text into words and fades each in sequentially (configurable delay via `data-delay`).

**Usage:** Call `initTextEffects()` after DOM ready. Mark elements with `data-effect="typewriter"` or `data-effect="word-reveal"`.

**Dependencies:** None.

---

### animations/particles.js
Animated particle-network canvas background injected into a target slide element. Particles float and bounce; optional connecting lines are drawn between nearby particles. The animation pauses automatically when the slide is not active to save CPU.

**Usage:** Call `initParticles(slideEl, opts)` where `opts` is an optional object with keys `count`, `color`, `speed`, `connect` (bool), and `maxDist`.

**Dependencies:** None.

---

### animations/morphing.js
SVG path morphing powered by anime.js. Animates the `d` attribute of an `<svg><path>` from one shape to another with an easing curve.

**Usage:** Call `morphShape(svgEl, fromPath, toPath, duration)`. `svgEl` must contain a `<path>` element.

**Dependencies:** `https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js` (anime.js).

---

## code/

### code/prism-setup.js
Prism.js initialiser that calls `Prism.highlightAll()` and adds manual line-highlighting support. Lines specified in `data-line="1,3-5"` on a `<pre>` element are wrapped in `.line-highlight` spans (style them with `background: rgba(255,255,255,0.08)`).

**Usage:** Load the Prism CDN files, then call `initPrism()` after DOM ready. Add `data-line="…"` to any `<pre>` that needs highlighted lines.

**Dependencies:** `https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js` and the Prism theme CSS. Per-language components loaded separately (e.g. `prism-python.min.js`).

---

### code/line-animation.js
Reveals code lines one by one when a slide becomes active. Each line fades in with a configurable stagger delay, and resets to hidden when the slide is left.

**Usage:** Call `initLineAnimation()` after DOM ready. Add `data-animate="lines"` to a `<pre>` element; optionally set `data-delay="100"` (ms between lines).

**Dependencies:** None.

---

### code/live-editor.js
Makes `<code>` blocks inside a `<pre>` editable in the browser and adds a "Run" button that `eval()`s the JavaScript and displays `console.log` output and return values in an output panel below. Errors are shown in red.

**Usage:** Call `initLiveEditor()` after DOM ready. Add `data-live="true"` to any `<pre><code class="language-javascript">…</code></pre>`.

**Dependencies:** None (JavaScript execution only; does not support other languages).

---

## math/

### math/katex-setup.js
Configures KaTeX auto-render to process the entire document body. Supports all four common delimiter styles: `$…$` and `$$ … $$` for inline/display math, plus `\(…\)` and `\[…\]`. Errors are silenced (`throwOnError: false`).

**Usage:** Load KaTeX and its auto-render extension from CDN, then call `initKaTeX()` after DOM ready.

**Dependencies:** `https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.css`, `https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js`, and `https://cdn.jsdelivr.net/npm/katex@0.16/dist/contrib/auto-render.min.js`.

---

## data-viz/

### data-viz/chart-helpers.js
Chart.js convenience wrappers with dark-theme defaults (light tick labels, subtle grid lines). Provides `createChart(canvasId, type, data, options)` as the general function and three shortcuts: `createBarChart`, `createLineChart`, and `createPieChart` (renders as a doughnut).

**Usage:** Add a `<canvas id="myChart">` element, load Chart.js, then call e.g. `createBarChart('myChart', ['A','B','C'], [{ data:[10,20,30], backgroundColor:'#4a9eff' }])`.

**Dependencies:** `https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js`.

---

### data-viz/echarts-helpers.js
ECharts initialiser with dark theme and auto-resize. `createEChart(containerId, option)` initialises a chart in dark mode, binds `window.resize`, and re-sizes the chart when its containing slide becomes active (handles the hidden-element size-zero issue).

**Usage:** Add a sized `<div id="myChart">` element, load ECharts, then call `createEChart('myChart', { … })` with a standard ECharts option object.

**Dependencies:** `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js`.

---

### data-viz/simple-bars.css
Zero-dependency pure CSS horizontal bar chart. Each `.css-bar` uses a `--value` custom property and CSS `::before`/`::after` pseudo-elements to render the filled bar and the label/value text. Bars animate from 0 to their target width when the slide becomes active.

**Usage:** `<div class="css-chart"><div class="css-bar" style="--value:80%;" data-label="Item A" data-value="80%"></div>…</div>`

**Dependencies:** None.

---

### data-viz/counters.js
Animates numeric elements from zero to a target value with an ease-out cubic curve when the containing slide becomes active. Supports integer and decimal targets, configurable duration, and optional `data-prefix`/`data-suffix` strings (e.g. `$`, `%`).

**Usage:** Call `initCounters()` after DOM ready. Mark elements with `data-counter="1234"` and optionally `data-duration="2000"`, `data-prefix="$"`, `data-suffix="%"`.

**Dependencies:** None.

---

## interactive/

### interactive/quiz.js
Multiple-choice quiz widget. Highlights the correct option in green and any wrong selection in red when a choice is clicked. Subsequent clicks are ignored (single-attempt). Button styles are injected via JavaScript so no extra CSS file is required.

**Usage:** Call `initQuiz()` after DOM ready. Markup: `<div class="quiz" data-answer="0"><button class="quiz-option" data-index="0">…</button>…</div>` where `data-answer` is the zero-based index of the correct option.

**Dependencies:** None.

---

### interactive/drag-sort.js
Native HTML5 drag-and-drop list reordering. Items within a `.drag-sort` container can be dragged into any order; a blue top border indicates the current drop target.

**Usage:** Call `initDragSort()` after DOM ready. Markup: `<div class="drag-sort"><div class="drag-item" draggable="true">…</div>…</div>`

**Dependencies:** None.

---

### interactive/tabs.js
Tab-panel switcher. Clicking a `.tab-btn` activates the corresponding `.tab-panel` (matched by a shared `data-tab`/`data-panel` index). The first tab is activated automatically on init. Active tab is underlined in blue.

**Usage:** Call `initTabs()` after DOM ready. Markup: `<div class="tab-container"><button class="tab-btn" data-tab="0">Tab 1</button>…<div class="tab-panel" data-panel="0">…</div>…</div>`

**Dependencies:** None.

---

### interactive/reveal-on-click.js
Wraps element content in a toggling "Click to reveal / Hide" button. Content fades in on reveal and fades out on hide. The button label is customisable via `data-reveal-label`.

**Usage:** Call `initReveal()` after DOM ready. Wrap any content in `<div class="reveal" data-reveal-label="Show answer">…</div>`.

**Dependencies:** None.

---

### interactive/poll.js
Client-side polling widget backed by `localStorage`. Visitors click a poll option; votes persist across page reloads within the same browser. After voting, an animated bar-chart results view is shown. Each `.poll` requires a unique `data-poll-id` to keep separate polls independent.

**Usage:** Call `initPolls()` after DOM ready. Markup: `<div class="poll" data-poll-id="q1"><button class="poll-option" data-option="Yes">Yes</button><button class="poll-option" data-option="No">No</button><div class="poll-results"></div></div>`

**Dependencies:** None (uses `localStorage`; results are per-browser only).
