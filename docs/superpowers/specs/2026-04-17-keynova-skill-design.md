# Keynova Skill Design Spec

## Overview

Package the Keynova presentation toolkit as a Claude Code skill. Invoked via `/projects`, it guides Claude through analyzing content, planning slide structure, and generating a self-contained HTML presentation — all without requiring external dependencies or path references.

## Skill Identity

- **Name**: `projects`
- **Trigger**: Manual invocation via `/projects`
- **Install location**: `.claude/skills/projects/` (project-level)
- **Portability**: Copy the skill directory into any project's `.claude/skills/` to enable

## Directory Structure

```
.claude/skills/projects/
  SKILL.md                    # Entry point (auto-loaded into context)
  components/                 # 30 component source files, carried over as-is
    README.md                 # Component index — Claude reads this first
    navigation/               # keyboard.js, touch.js, progress.js, overview.js
    layout/                   # grid-helpers.css, split-screen.css, centered.css, image-text.css
    typography/               # fonts.css, code-fonts.css, cjk.css
    animations/               # transitions.css, scroll-driven.css, text-effects.js, particles.js, morphing.js
    code/                     # prism-setup.js, line-animation.js, live-editor.js
    math/                     # katex-setup.js
    data-viz/                 # chart-helpers.js, echarts-helpers.js, simple-bars.css, counters.js
    interactive/              # quiz.js, drag-sort.js, tabs.js, reveal-on-click.js, poll.js
  dev-server/serve.js         # Hot-reload dev server (~100 lines, Node.js)
```

## SKILL.md Contents

### 1. Frontmatter

```yaml
name: projects
description: Use when the user wants to create a presentation, slide deck, or talk from existing content such as papers, notes, documentation, or code
```

### 2. Workflow (5 steps)

**Step 1 — Analyze content source**
- Read the files/directories the user specifies
- Extract core concepts, structure, key data points, figures

**Step 2 — Plan slide structure (hard gate)**
- Output a slide outline: slide number, title, bullet points, which components to use
- Present to user for confirmation
- Do NOT proceed to generation until user approves

**Step 3 — Select theme and components**
- Recommend a theme preset based on content type (academic-dark / academic-light / tech)
- Read `components/README.md` to identify which components are needed
- Read the specific component source files to get the actual code

**Step 4 — Generate HTML**
- Create `presentations/<name>/` in the user's working directory (the project that invoked the skill, NOT inside the skill directory)
- Generate a single self-contained `index.html` with all CSS/JS inlined
- CDN scripts loaded conditionally (only include KaTeX if math is present, etc.)

**Step 5 — Preview with dev-server**
- Copy `dev-server/serve.js` from the skill directory to a temp location or run directly
- Start `node <path>/serve.js presentations/<name>` for hot-reload preview
- User can request changes; Claude edits the HTML directly

### 3. HTML Skeleton Template

A minimal complete HTML structure that Claude uses as the starting point:

- `<!DOCTYPE html>` + `<html lang>` (auto-detect language from content)
- `<head>`: charset, viewport, title, conditional CDN links, `<style>` block
- `<body>`:
  - `<div id="progress-bar">`
  - `<div id="slide-num">`
  - `<div class="slide-container">` containing N `<div class="slide">` elements
  - `<script>`: navigation (keyboard + touch + progress bar + overview mode + slide number)
  - Conditional: KaTeX auto-render init, Prism.js highlight, counter animations

### 4. Theme Presets (CSS custom properties)

**academic-dark:**
```css
--bg: #0a0a0f; --text: #e8e8e8; --accent: #4a9eff; --accent-soft: rgba(74,158,255,0.15);
```

**academic-light:**
```css
--bg: #ffffff; --text: #1a1a2e; --accent: #1a73e8; --accent-soft: rgba(26,115,232,0.08);
```

**tech:**
```css
--bg: #06080d; --text: #e0e4ec; --accent: #00d4ff; --accent2: #7c4dff;
--gradient: linear-gradient(135deg, var(--accent), var(--accent2));
```
Tech theme also includes: particle canvas background, gradient text for headings, glow effects on accent elements.

### 5. CDN Conditional Loading Table

| Feature | Library | CDN URL | Include when |
|---------|---------|---------|-------------|
| Code highlighting | Prism.js | `https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js` + theme CSS | Content has code blocks |
| Math rendering | KaTeX | `https://cdn.jsdelivr.net/npm/katex@0.16/dist/katex.min.js` + auto-render + CSS | Content has LaTeX / math |
| Charts (simple) | Chart.js | `https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js` | Using chart-helpers.js |
| Charts (complex) | ECharts | `https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js` | Using echarts-helpers.js |
| Animation engine | anime.js | `https://cdn.jsdelivr.net/npm/animejs@3/lib/anime.min.js` | Using morphing.js |
| CJK fonts | Noto Sans SC | Google Fonts `@import` | Content is Chinese |

### 6. Component Usage Instructions

```
To find available components:
1. Read components/README.md for the full index with descriptions
2. Pick components that match the presentation's needs
3. Read the specific component file to get the actual CSS/JS code
4. Inline the code into the generated HTML, adapting colors/sizes to match the theme

Components are independent snippets — use any combination. No component depends on another
except: touch.js and overview.js require keyboard.js's nav object.
```

### 7. Dev-Server Instructions

```
To enable hot-reload preview:
1. Run: node <skill-dir>/dev-server/serve.js presentations/<name>
2. Opens at http://localhost:3000
3. Auto-reloads on file changes (WebSocket-based, no dependencies)
4. The dev-server reads from the skill's own directory — no need to copy it
```

## Components (carried over as-is)

All 30 component files from the current `components/` directory are copied into the skill unchanged. The `components/README.md` serves as the index. No modifications needed.

## Output Specification

Each generated presentation is:
- A single `index.html` file in `presentations/<name>/`
- Self-contained: all CSS and JS inlined (no external file references except CDN)
- Works offline for everything except CDN-loaded libraries
- Responsive: works on desktop, tablet, mobile
- Keyboard navigable: arrows, space, Home/End, 'o' for overview
- Touch navigable: swipe left/right
- Printable: `@media print` styles included

## What This Skill Does NOT Do

- No build step, no bundler, no framework
- No package.json or node_modules in the output
- No image embedding (figures referenced by URL or path — user provides)
- No PDF export (user can print-to-PDF from browser)
- No slide-by-slide editing UI (Claude edits the HTML directly)
