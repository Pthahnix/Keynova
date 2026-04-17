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
