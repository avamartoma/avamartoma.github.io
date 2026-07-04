---
title: "Plotter Poems"
blurb: "Generative poetry drawn by a pen plotter — code that writes verse, then physically draws it."
description: "A generative typography project pairing a grammar-based poem generator with G-code output for an AxiDraw pen plotter."
date: 2025-06-18
tags: ["Python", "Generative", "Fabrication"]
repo: "https://github.com/avamartoma/plotter-poems"
accent: "#a855f7"
accentAlt: "#5ce6a0"
featured: true
---

## The idea

I wanted a project that lived in two worlds at once: software that *composes*
and a machine that *draws*. Plotter Poems generates short poems from a
context-free grammar, lays them out as vector paths in a hand-plotted font,
and sends them to an AxiDraw pen plotter to be drawn in real ink.

Every print is one of one. The plotter's tiny imperfections — a slightly
heavier line where it paused, ink pooling at a stroke's end — are the whole
point.

## Pipeline

- A weighted grammar produces the text (seeded, so any poem is reproducible).
- Each glyph is a single-stroke vector so the pen never lifts mid-letter.
- Layout solves for margins and line breaks, then flattens to paths.
- Paths export to SVG, then to plotter instructions.

```python
def compose(seed: int) -> str:
    rng = random.Random(seed)
    return grammar.expand("POEM", rng)
```

## Notes from the studio

Watching a machine slowly draw something *you* generated is oddly moving.
There's a delay between the code finishing and the drawing finishing, and in
that gap the piece stops being software and becomes an object.

I've plotted about forty of these now. A few are framed on my wall.
