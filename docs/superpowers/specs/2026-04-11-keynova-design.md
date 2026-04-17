# Keynova Design Spec

> Web-based presentation creation system. Markdown in, standalone HTML out, Claude Code is the engine.

## Context

PowerPoint and presentation frameworks (reveal.js, Slidev) constrain creative freedom through templates and framework conventions. Keynova takes a different approach: the user writes natural-language Markdown, and Claude Code — acting as both parser and designer — generates a unique, standalone HTML file from scratch every time. No templates, no frameworks, no build tools. Each presentation is an independent work of art.

## 1. System Overview

```
User writes .md  -->  Claude Code reads + understands  -->  Generates index.html
                          |
                          v
                  Reads components/README.md
                  (knows what building blocks exist)
```

- **Input**: A `.md` file with presentation content in natural language
- **Engine**: Claude Code itself — reads Markdown, decides layout/animation/style, generates HTML
- **Output**: A single self-contained `.html` file (inline CSS/JS, CDN for heavy libs)
- **No build step**: No npm, no webpack, no bundler
- **No templates**: Component toolkit is a library of building blocks, not cookie cutters

### Project Structure

```
KEYNOVA/
  components/            # Component toolkit — CSS/JS snippets for Claude to pick from
    README.md            # Toolkit index — Claude reads this first
    animations/          # Transitions, scroll-driven, text effects, particles, morphing
    data-viz/            # Chart.js/ECharts helpers, pure CSS charts, number counters
    code/                # Prism.js setup, line animation, live editor
    math/                # KaTeX auto-render config
    interactive/         # Quiz, drag-sort, tabs, click-reveal, poll
    navigation/          # Keyboard, touch, progress bar, overview mode
    layout/              # Grid, split-screen, centered, image-text snippets
    typography/          # Font loading, monospace, CJK optimization
  presentations/         # User's presentation files
    <talk-name>/
      content.md         # Markdown source (written by user)
      index.html         # Generated presentation (created by Claude Code)
  dev-server/
    serve.js             # Zero-dependency Node.js dev server with hot reload
  docs/                  # Design and documentation
```

## 2. Markdown Input

**Zero syntax constraints.** The `.md` file is a creative brief, not structured data. Claude Code understands it through intelligence, not regex.

The user writes naturally:

```markdown
# My Talk Title

A presentation about quantum computing. Dark theme, techy, minimal style.

---

# What is a Qubit

Classical bits are 0 or 1. Qubits can be in superposition of both states.

Show a Bloch sphere diagram to illustrate this concept.

---

# Performance Comparison

Draw a bar chart comparing classical vs quantum computers:
- Factoring: classical 10 years, quantum 4 minutes
- Search: classical O(N), quantum O(sqrt N)
- Molecular simulation: classical impossible, quantum feasible

---

Show some Python code for creating a quantum circuit with Qiskit.
The code should appear line by line with highlighting.

(Note to self: mention Shor's algorithm when presenting slide 3)
```

**Rules:**
- `---` is the only convention — page separator (native Markdown syntax)
- Everything else is natural language — speaker notes, style hints, chart data, layout instructions
- Standard Markdown features (tables, code blocks, math, lists) work naturally when used
- Claude Code is the parser — it reads intent, not markup

## 3. Component Toolkit

A library of independent CSS/JS code snippets. Claude Code reads the index, picks what it needs, copies and adapts the code into the generated HTML. Not a runtime framework.

### Structure

```
components/
  README.md                # Master index — what's available, when to use each piece

  animations/
    transitions.css        # Page transitions (fade, slide, flip, zoom, etc.)
    scroll-driven.css      # Scroll-driven animations
    text-effects.js        # Typewriter, word-by-word reveal, text morphing
    particles.js           # Particle background effects
    morphing.js            # SVG/shape morphing animations

  data-viz/
    chart-helpers.js       # Chart.js convenience wrappers
    echarts-helpers.js     # ECharts wrappers (heavy scenarios)
    simple-bars.css        # Pure CSS bar charts (zero dependency)
    counters.js            # Number roll-up animation

  code/
    prism-setup.js         # Prism.js init + line highlighting
    line-animation.js      # Code line-by-line appearance
    live-editor.js         # Editable + runnable code blocks

  math/
    katex-setup.js         # KaTeX auto-render configuration

  interactive/
    quiz.js                # Multiple choice / Q&A interaction
    drag-sort.js           # Drag-and-drop sorting
    tabs.js                # Tab switching
    reveal-on-click.js     # Click to reveal content
    poll.js                # Live polling (localStorage simulation)

  navigation/
    keyboard.js            # Arrow keys, space, ESC navigation
    touch.js               # Touch/swipe navigation
    progress.js            # Progress bar
    overview.js            # Thumbnail overview mode

  layout/
    grid-helpers.css       # Common grid layout snippets
    split-screen.css       # Side-by-side columns
    centered.css           # Centered big text
    image-text.css         # Image-text mixed layout

  typography/
    fonts.css              # Font loading strategy
    code-fonts.css         # Monospace fonts
    cjk.css                # Chinese/Japanese/Korean typography optimization
```

### Principles

- Every file is independent — no inter-dependencies between components
- Well-commented — Claude can quickly understand what each snippet does and how to use it
- These are reference material, not final code — Claude adapts them to each presentation's style
- Claude can also ignore the toolkit entirely and write from scratch

## 4. CDN Dependencies

Heavy libraries are loaded via CDN, only when needed. No unused dependencies.

| Feature | Library | Size (gzip) | When to include |
|---------|---------|-------------|-----------------|
| Code highlighting | Prism.js core + per-language | ~2KB + ~0.5KB/lang | Has code blocks |
| Math rendering | KaTeX + auto-render + CSS | ~35KB + fonts | Has LaTeX expressions |
| Charts (simple) | Chart.js | ~43KB | Has data visualization |
| Charts (complex) | ECharts | ~300KB | Needs rich interactive charts |
| Animation engine | anime.js or GSAP | ~15-50KB | Needs complex timeline animations |
| PDF export | html2pdf.js | ~120KB | User wants export button |

### Loading Strategy

- **Simple presentations** (text + CSS animations): zero external dependencies, fully self-contained
- **Medium** (code + charts): 2-3 CDN refs, ~50KB total
- **Full-featured**: ~250KB total, still smaller than a React app

### Offline Fallback

- CDN refs include `integrity` and `crossorigin` attributes
- Small libs (Prism core at 2KB) can be inlined directly
- For fully offline delivery: Claude inlines all dependencies into one large HTML file

## 5. Dev Server

A single-file Node.js script. Zero npm dependencies. One job: serve HTML with auto-reload.

```
dev-server/
  serve.js    # ~80 lines, pure Node.js
```

**Features:**
- Static file server for `presentations/` directory
- `fs.watch` file monitoring — detects HTML changes
- WebSocket injection — injects a small reload script into served HTML
- Auto browser refresh on file change

**Usage:**
```bash
node dev-server/serve.js presentations/my-talk/
# Serves on localhost:3000 (default port, configurable via --port flag)
```

**Why not live-server / vite / http-server:**
- Zero dependencies = clone and run, no `npm install`
- Tiny codebase (~80 lines), fully understandable
- Does one thing, introduces no build concepts

## 6. Output & Sharing

The generated `index.html` is the final deliverable.

| Method | How | Best for |
|--------|-----|----------|
| Open directly | Double-click HTML file | Local presentation, send to colleague |
| Local server | `node dev-server/serve.js` | Development, screen-share presenting |
| Static deploy | Push HTML to GitHub Pages / Vercel / Netlify | Share a link with anyone |
| Export PDF | Browser Ctrl+P or built-in html2pdf button | Offline document |

### PDF Export — Two Tiers

1. **Print CSS** (default) — Claude writes `@media print` styles into the HTML. `Ctrl+P` produces a clean, text-selectable PDF. Zero dependencies.
2. **html2pdf.js** (optional) — An export button on the page renders client-side PDF. Preserves animations/complex layouts, but output is image-based (not text-selectable).

### Deployment Notes

- HTML with CDN refs works immediately when deployed online
- For fully offline sharing: ask Claude to generate an inlined version
- Images: base64 inline or external URLs, no local relative paths

## 7. Complete Workflow

```
Step 1: Create presentations/my-talk/content.md
        Write content in natural language, any way you like

Step 2: Tell Claude Code "turn content.md into a presentation"
        Claude reads content.md
              |
        Reads components/README.md to know available building blocks
              |
        Understands content semantics, decides layout/animation/style
              |
        Generates presentations/my-talk/index.html from scratch
        (CDN refs as needed, component snippets as inspiration)

Step 3: Preview
        node dev-server/serve.js presentations/my-talk/
        Browser opens localhost:3000

Step 4: Iterate
        "Change the chart on slide 3 to a pie chart"
        "Make the overall color darker"
        "Add a particle background"
        Claude edits HTML directly, browser auto-refreshes

Step 5: Deliver
        Take index.html → present / deploy / export PDF
```

## Out of Scope

- No online editor / GUI
- No automated Markdown-to-HTML pipeline (Claude Code IS the pipeline)
- No theme marketplace / plugin system
- No multi-user collaboration
