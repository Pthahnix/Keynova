# Keynova Skill Packaging Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Package the existing Keynova presentation toolkit as a Claude Code skill at `.claude/skills/projects/`, so users can invoke `/projects` from any project to generate HTML presentations.

**Architecture:** Copy existing components and dev-server into the skill directory, then write a SKILL.md entry point that teaches Claude the 5-step workflow (analyze → plan → select → generate → preview). The skill is entirely self-contained — no external path references.

**Tech Stack:** Claude Code skill format (SKILL.md + supporting files), existing vanilla HTML/CSS/JS components, Node.js dev-server.

---

## File Structure

```
.claude/skills/projects/
  SKILL.md                          # Entry point — CREATE
  components/                       # COPY from components/
    README.md
    navigation/{keyboard,touch,progress,overview}.js
    layout/{grid-helpers,split-screen,centered,image-text}.css
    typography/{fonts,code-fonts,cjk}.css
    animations/{transitions,scroll-driven}.css
    animations/{text-effects,particles,morphing}.js
    code/{prism-setup,line-animation,live-editor}.js
    math/katex-setup.js
    data-viz/{chart-helpers,echarts-helpers,counters}.js
    data-viz/simple-bars.css
    interactive/{quiz,drag-sort,tabs,reveal-on-click,poll}.js
  dev-server/serve.js               # COPY from dev-server/serve.js
```

---
