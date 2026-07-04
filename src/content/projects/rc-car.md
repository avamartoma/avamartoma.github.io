---
title: "Remote-Controlled RC Car"
blurb: "A rear-wheel-drive RC car built end to end — custom-printed circuit boards, a brushless drivetrain, and Ackermann steering."
description: "An electrical and mechanical design project: a remote-controlled car with a brushless RWD motor, servo-driven Ackermann steering, custom PCBs printed on a Voltera, and 3D-printed parts modeled in Fusion."
date: 2025-05-20
tags: ["PCB Design", "Arduino", "3D Printing", "Fusion 360", "Brushless Motor"]
accent: "#4361ee"
accentAlt: "#5ce6a0"
featured: true
# cover: "/images/rc-car/cover.jpg"   # ← uncomment once you add a cover image
---

*Built with Sarah Rodrigues and Helen Chang.*

## Overview

A ground-up remote-controlled car that lives at the intersection of electrical
and mechanical design. It's driven by a **brushless motor** for rear-wheel
drive and a **servo** on the front wheels for steering — and nearly every part,
from the circuit boards to the chassis, was designed and fabricated by hand.

<!-- Add your best hero shot here once downloaded:
![The finished RC car](/images/rc-car/cover.jpg) -->

## The electrical side

I got access to a **Voltera** circuit board printer, which let me design, print,
and test my own **custom PCBs** for this project rather than relying on
off-the-shelf boards. Learning the print-and-test loop — laying out traces,
printing, reflowing, and debugging the physical board — was one of the most
rewarding parts of the build.

The drivetrain runs on a **brushless motor** (rear-wheel drive), controlled
alongside the steering servo from an **Arduino**.

<!-- ![Custom PCB on the Voltera bed](/images/rc-car/pcb.jpg) -->

## The mechanical side

The car uses **Ackermann steering** — the geometry that lets the inner and
outer front wheels turn at slightly different angles so all four wheels trace
clean arcs through a turn. Figuring out how to actually build that linkage was
a genuinely interesting design challenge.

Structural and custom parts were **3D printed**, modeled in **Autodesk Fusion**.

<!-- ![Steering linkage / chassis in Fusion](/images/rc-car/steering.jpg) -->

## What I learned

- Printing and debugging my own circuit boards on the Voltera.
- Driving a brushless motor + servo from an Arduino.
- Translating Ackermann steering from geometry into a working linkage.
- Iterating between CAD, print, and physical test.

<!-- Beef this up with more detail, results, a demo clip, and what you'd do next. -->
