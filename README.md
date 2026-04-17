# Keynova

Generate self-contained HTML presentations from any content source. No frameworks, no build tools — just one `index.html` with everything inlined.

## What It Does

Keynova takes your content (papers, notes, docs, code) and produces a single HTML file that:

- Works offline — all CSS and JS inlined
- Supports keyboard and touch navigation
- Includes responsive design for desktop, tablet, and mobile
- Has print-friendly styles (`Ctrl+P` to PDF)

## Project Structure

```
components/         30 CSS/JS snippets (animations, layout, data-viz, etc.)
dev-server/         Hot-reload preview server (zero dependencies)
presentations/      Generated presentations go here
skill/              Claude Code skill — copy to .claude/skills/ to use /keynova
```

## Quick Start

### With Claude Code

1. Copy `skill/` to your project's `.claude/skills/keynova/`
2. Run `/keynova` and point it at your content
3. Claude analyzes your content, plans slides, and generates HTML

### Manual

1. Browse `components/README.md` for available snippets
2. Pick a theme preset (`academic-dark`, `academic-light`, or `tech`)
3. Compose your `index.html` using the HTML skeleton from `skill/SKILL.md`
4. Preview with the dev server:

```bash
node dev-server/serve.js presentations/my-talk
# Opens at http://localhost:3000 with hot reload
```

## Themes

| Theme | Best for |
|-------|----------|
| `academic-dark` | Research talks, technical papers |
| `academic-light` | Conference talks, classroom |
| `tech` | Product demos, tech showcases |

## Components

30 independent snippets organized by category:

- **animations** — transitions, particles, morphing, text effects
- **code** — syntax highlighting, line animation, live editor
- **data-viz** — Chart.js/ECharts helpers, counters, simple bars
- **interactive** — tabs, quiz, poll, drag-sort, reveal-on-click
- **layout** — split-screen, grid, centered, image-text
- **math** — KaTeX setup
- **navigation** — keyboard, touch, overview, progress bar
- **typography** — fonts, CJK support, code fonts

See [`components/README.md`](components/README.md) for full documentation.

## License

[Apache 2.0](LICENSE)
