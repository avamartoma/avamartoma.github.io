---
title: "CAD Bridge (FEA)"
blurb: "A laser-cut MDF bridge designed in Fusion 360 and iterated dozens of times against FEA stress tests to carry a cinder block."
description: "Designed and optimized a structural bridge for MDF fabrication in Autodesk Fusion, using Finite Element Analysis to simulate load distribution, stress concentrations, and deflection — iterating the geometry to shed weight while carrying a cinder-block load."
date: 2024-10-10
tags: ["Fusion 360", "FEA", "Structural Design", "Laser Cutting", "CAD"]
accent: "#4361ee"
accentAlt: "#a855f7"
---

*Built with Sarah Rodrigues for Intro to Mechanical Engineering (Ms. Selan) —
the first project of the term: design a bridge that could carry a **cinder
block**, then fabricate it from laser-cut **MDF**.*

## Sketch → Fusion → FEA

We started in the dot notebook, sketching how we wanted the bridge to look. The
idea: use **arcs and angles** to tie the side components together and push the
cinder block's load into the parts of the structure we thought were strongest,
so it wouldn't crack.

![Early dot-notebook sketches — an arched deck sized (~18 in span) to carry a cinder block, with the load fed into the strongest members.](/images/cad-bridge/bridge-sketch.jpg)

From the sketch we moved into **Fusion 360** — a side profile, extruded, with
cross-beams added to make Design 1. Then came round after round of **FEA stress
testing** to check our safety factor and see how the bridge was projected to
hold up. We used each result to trim material and make the next version lighter.

![The bridge modeled in Fusion 360 — an arched deck with cross-beams and ramped ends.](/images/cad-bridge/bridge-fusion.jpg)

We changed the design something like **fifteen times** — the Fusion file
climbed to **v34** — so the first and last bridges look quite different. This
was the project that taught me how much *iteration* matters: after each change
I'd spot something else to refine, and after enough FEA I could look at a bridge
and pretty much *feel* where it would be weak or strong before running the test.
It was also my first time using the practical, simulation side of Fusion — until
then I'd only used it for aesthetic modeling.

![Deep into iteration — the Fusion file reached v34 as we trimmed material between stress tests.](/images/cad-bridge/bridge-iterations.jpg)

## Building it

We laser-cut the bridge from MDF. Our first cut didn't hold — the MDF was
slightly too thick for the joint clearances, so the pieces wouldn't stay
together (a good lesson in designing for real material tolerances). The final
build came out fairly stable.

![The final bridge, laser-cut from MDF and assembled.](/images/cad-bridge/bridge-built.jpg)

## How it did

Under load it ultimately **broke** — but watching it fail, Sarah and I already
had concrete ideas for how we'd reinforce it next time. For a first structural
project, learning to read stress and iterate against it mattered more than the
final result.
