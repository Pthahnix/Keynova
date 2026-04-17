---
name: projects
description: Use when the user wants to create a presentation, slide deck, or talk from existing content such as papers, notes, documentation, or code
---

# Keynova — Presentation Generator

Generate self-contained HTML presentations from any content source. No frameworks, no build tools — just one `index.html` with everything inlined.

## Overview

Keynova reads user content (papers, notes, docs, code), plans a slide structure, and generates a standalone HTML presentation using a component toolkit of 30 CSS/JS snippets. Output is a single file that works offline, supports keyboard/touch navigation, and includes responsive design.

## Workflow

### Step 1 — Analyze Content Source

Read the files or directories the user specifies. Extract:
- Core concepts and structure
- Key data points, figures, images
- Language (for `<html lang>` and CJK font loading)
- Technical depth (determines component choices)

### Step 2 — Plan Slide Structure (HARD GATE)

Output a slide outline with: slide number, title, bullet points, recommended components.

**Present to user for confirmation. Do NOT proceed to HTML generation until user approves.**

### Step 3 — Select Theme and Components

Recommend a theme preset based on content type:

| Theme | Best for | Key properties |
|-------|----------|---------------|
| `academic-dark` | Research talks, technical papers | `--bg:#0a0a0f; --accent:#4a9eff` |
| `academic-light` | Conference talks, classroom | `--bg:#ffffff; --accent:#1a73e8` |
| `tech` | Product demos, tech showcases | `--bg:#06080d; --accent:#00d4ff; --accent2:#7c4dff` + particles + glow |

Read `components/README.md` (in this skill directory) to identify needed components, then read the specific component source files to get actual CSS/JS code.

### Step 4 — Generate HTML

Create `presentations/<name>/index.html` in the **user's working directory** (not inside this skill directory).

Requirements:
- Single self-contained HTML file — all CSS and JS inlined
- CDN scripts loaded conditionally (see CDN table below)
- Responsive: works on desktop, tablet, mobile
- Keyboard navigable: arrows, space, Home/End, 'o' for overview
- Touch navigable: swipe left/right
- Print-friendly: `@media print` styles included

### Step 5 — Preview with Dev-Server

Start the hot-reload dev server:

```bash
node <this-skill-directory>/dev-server/serve.js presentations/<name>
```

Opens at `http://localhost:3000`. Auto-reloads on file changes. User can request changes; edit the HTML directly and the browser refreshes automatically.

## HTML Skeleton Template

Use this as the starting point for every generated presentation. Adapt colors/fonts to the chosen theme.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <!-- CDN links here (only if needed) -->
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-mono: 'Fira Code', 'Cascadia Code', Consolas, monospace;
      /* Theme variables inserted here */
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
    #progress-bar { position: fixed; top: 0; left: 0; height: 3px; background: var(--accent); transition: width 0.3s; z-index: 9999; }
    @media print { .slide { position: relative; opacity: 1; visibility: visible; page-break-after: always; height: auto; min-height: 100vh; } #progress-bar { display: none; } }
    /* Component CSS inlined here */
  </style>
</head>
<body>
  <div id="progress-bar"></div>
  <div class="slide-container">
    <!-- Slides here -->
  </div>
  <script>
    // Navigation JS inlined here (keyboard + touch + progress + overview)
    // Component JS inlined here
  </script>
</body>
</html>
```

## Theme Presets

### academic-dark

```css
:root {
  --bg: #0a0a0f;
  --text: #e8e8e8;
  --accent: #4a9eff;
  --accent-soft: rgba(74, 158, 255, 0.15);
}
```

### academic-light

```css
:root {
  --bg: #ffffff;
  --text: #1a1a2e;
  --accent: #1a73e8;
  --accent-soft: rgba(26, 115, 232, 0.08);
}
html, body { color: var(--text); }
pre { background: rgba(0, 0, 0, 0.04); }
code { background: rgba(0, 0, 0, 0.06); }
ul li::before { background: var(--accent); }
```

### tech

```css
:root {
  --bg: #06080d;
  --text: #e0e4ec;
  --accent: #00d4ff;
  --accent2: #7c4dff;
  --accent-soft: rgba(0, 212, 255, 0.12);
  --gradient: linear-gradient(135deg, var(--accent), var(--accent2));
}
```

Tech theme extras (add when using `tech` theme):
- Particle canvas background on title/section slides (use `animations/particles.js`)
- Gradient text for main headings: `background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- Glow on accent elements: `box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);`

## CDN Conditional Loading

Only include CDN scripts when the presentation content requires them:

| Feature | CDN URL | Include when |
|---------|---------|-------------|
| Code highlighting | `<link href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css" rel="stylesheet">` + `<script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>` + per-language `prism-{lang}.min.js` | Content has code blocks |
| Math rendering | `<link href="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.css" rel="stylesheet">` + `<script src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js"></script>` + `<script src="https://cdn.jsdelivr.net/npm/katex@0.16/dist/contrib/auto-render.min.js"></script>` | Content has LaTeX or math formulas |
| Charts (simple) | `<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>` | Using data-viz/chart-helpers.js |
| Charts (complex) | `<script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>` | Using data-viz/echarts-helpers.js |
| SVG morphing | `<script src="https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js"></script>` | Using animations/morphing.js |
| CJK fonts | `<style>@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');</style>` | Content is in Chinese/Japanese/Korean |

## Using Components

1. Read `components/README.md` (in this skill directory) for the full index with descriptions and usage instructions
2. Pick components that match the presentation's needs
3. Read the specific component source file to get the actual CSS/JS code
4. Inline the code into the generated HTML `<style>` or `<script>` block, adapting colors and sizes to match the chosen theme

Components are independent snippets — use any combination. Dependencies:
- `navigation/touch.js` and `navigation/overview.js` require the `nav` object returned by `navigation/keyboard.js`
- `animations/morphing.js` requires anime.js CDN
- `code/prism-setup.js` requires Prism.js CDN
- `math/katex-setup.js` requires KaTeX CDN
- `data-viz/chart-helpers.js` requires Chart.js CDN
- `data-viz/echarts-helpers.js` requires ECharts CDN

## Dev-Server

Start the hot-reload preview server (zero dependencies, Node.js only):

```bash
node <this-skill-directory>/dev-server/serve.js presentations/<name>
```

- Serves at `http://localhost:3000` (use `--port=NNNN` to change)
- Auto-reloads the browser on any file change via WebSocket
- No npm install needed — uses only Node.js built-in modules

## Output Specification

Each generated presentation is:
- A single `index.html` file in `presentations/<name>/` within the user's project
- Self-contained: all CSS and JS inlined (no external file references except CDN)
- Works offline for everything except CDN-loaded libraries
- Responsive: desktop, tablet, mobile
- Keyboard navigable: arrows, space, Home/End, 'o' for overview
- Touch navigable: swipe left/right
- Printable: `@media print` styles included

## What This Skill Does NOT Do

- No build step, no bundler, no framework
- No package.json or node_modules in the output
- No image embedding (figures referenced by URL or local path — user provides)
- No PDF export (user can print-to-PDF from browser)
- No slide-by-slide editing UI (Claude edits the HTML directly)
