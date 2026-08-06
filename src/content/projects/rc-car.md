---
title: "Remote-Controlled RC Car"
blurb: "A rear-wheel-drive RC F1-style car built end to end — custom-printed circuit boards, a brushless drivetrain, and Ackermann steering."
description: "An electrical and mechanical design project: a remote-controlled F1-style car with a brushless RWD motor, servo-driven Ackermann steering, custom PCBs printed on a Voltera, KiCad board design, and 3D-printed parts modeled in Fusion 360."
date: 2025-05-20
tags: ["PCB Design", "KiCad", "Arduino", "3D Printing", "Fusion 360", "Brushless Motor"]
accent: "#4361ee"
accentAlt: "#5ce6a0"
featured: true
---

*Built with Sarah Rodrigues and Helen Chang for a term-long Projects in
Engineering course — the goal was a remote-controlled, F1-style race car to run
on a track we designed ourselves.*

## Overview

A ground-up remote-controlled car that lives at the intersection of electrical
and mechanical design. It's driven by a **brushless motor** for rear-wheel
drive and a **servo** on the front wheels for steering — and nearly every part,
from the circuit boards to the chassis, was designed and fabricated by hand.

![The RC F1 car project — from the team's weekly engineering build log.](/images/rc-car/build-01.jpg)

## The electrical side

I got access to a **Voltera** circuit-board printer, which let us design, print,
and test our **own PCBs** rather than relying on off-the-shelf boards. I designed
the board in **KiCad** — which was a real learning curve: beyond wiring the
schematic and getting the pinouts right, I hadn't realized that assigning
footprints and laying out the physical board from the parts was its own whole
stage of the process.

The drivetrain runs on a **brushless motor** (rear-wheel drive) through an
**ESC**, controlled alongside the steering servo from a microcontroller.
Researching brushless motors and the ESC was eye-opening — I'd naively assumed a
motor was a one-size-fits-all part, and comparing motor types, batteries, and
speed controllers taught me how they actually work.

Debugging the radio control was one of the hardest parts: I tried three
different approaches to a stubborn communication problem before finally getting
it working by editing the **RadioHead** command in terminal. We also pushed into
tools that were new to all of us — a **resin printer** and the Voltera — which
meant a lot of trial, error, and correcting.

## The mechanical side

The car uses **Ackermann steering** — the geometry that lets the inner and
outer front wheels turn at slightly different angles so all four wheels trace
clean arcs through a turn. Getting from that geometry to a working linkage was
the toughest mechanical challenge, and it gave me a new appreciation for how
many parts hide beneath the "looks" of a car: axles, knuckles, differentials,
and the ESC, not just the wheels and rear wing.

Structural and custom parts were **3D printed**, modeled in **Autodesk Fusion
360** — and printing was its own iterative battle, swapping printers, slicing
and re-arranging the print file, and experimenting with support types until the
parts came out clean.

## What I learned

- Designing, printing, and debugging our own circuit boards on the Voltera + KiCad.
- Driving a brushless motor + ESC and a steering servo from a microcontroller.
- Translating Ackermann steering from geometry into a working linkage.
- Coordinating three subsystems — code, circuit, and chassis — so the pins,
  the wiring, and the physical space all agreed.
- Iterating relentlessly between CAD, print, and physical test, and learning new
  tools (resin printer, Voltera) under real time pressure.

**If we had two more weeks:** clean up the Ackermann steering so it works *and*
looks the part, and finish migrating the soldered board to a **Voltera-printed
PCB** — the plan from the start.

## Build log

The build, week by week — circuit design, 3D prints, chassis, and assembly.
Use the arrows to step through:

<div class="carousel" data-carousel>
  <span class="carousel__count"></span>
  <div class="carousel__track">
    <img src="/images/rc-car/build-02.jpg" alt="Two of the 3D-printed parts in hand — a drilled motor/servo mounting bracket and a small printed clip." loading="lazy" />
    <img src="/images/rc-car/build-03.jpg" alt="Fusion 360 model of the front corner: the red steering upright and arm, the servo on its mount, and the chassis tub holding the battery." loading="lazy" />
    <img src="/images/rc-car/build-04.jpg" alt="Bench work — checking the small brushless motor and its pinion gear beside my hand-sketched L293D motor-driver pinout." loading="lazy" />
    <img src="/images/rc-car/build-05.jpg" alt="The treaded rubber RC tires on black rims with red bead rings." loading="lazy" />
    <img src="/images/rc-car/build-06.jpg" alt="The wiring worked out on paper — a hand-drawn breadboard layout beside the real breadboarded circuit with the motor, servo, and microcontroller." loading="lazy" />
    <img src="/images/rc-car/build-07.jpg" alt="Fusion 360 views of the steering linkage — the upright and servo-horn arm in perspective and top-down." loading="lazy" />
    <img src="/images/rc-car/build-08.jpg" alt="3D-printing parts on the MakerBot — the print running on the bed and a close-up of the extruder head." loading="lazy" />
    <img src="/images/rc-car/build-09.jpg" alt="Two soldered perfboard versions of the control board — a green build and a red build — each with the microcontroller and an RF receiver coil." loading="lazy" />
    <img src="/images/rc-car/build-10.jpg" alt="The full KiCad schematic — ATmega328P, L7805 regulator, RF receiver, ESC and servo headers, and the crystal." loading="lazy" />
    <img src="/images/rc-car/build-11.jpg" alt="Placing footprints in the KiCad PCB editor — the L293D driver (U1) and the pin-header connectors." loading="lazy" />
    <img src="/images/rc-car/build-12.jpg" alt="The resin-printed chassis plate (left) and an orange 3D-printed bracket (right)." loading="lazy" />
    <img src="/images/rc-car/build-13.jpg" alt="Routing the board in KiCad — copper traces laid out on the 35 × 43 mm PCB." loading="lazy" />
    <img src="/images/rc-car/build-14.jpg" alt="Parts curing on the Phrozen Sonic Mini 8K resin printer." loading="lazy" />
    <img src="/images/rc-car/build-15.jpg" alt="Near-final assembly — chassis, wheels, motor, ESC, and wiring in place (left); the finished etched PCB in hand (right)." loading="lazy" />
    <img src="/images/rc-car/build-16.jpg" alt="The KiCad schematic sheet open in the editor." loading="lazy" />
    <img src="/images/rc-car/build-17.jpg" alt="The 7.2 V NiMH battery pack and the brushless ESC that drive the car." loading="lazy" />
    <img src="/images/rc-car/build-18.jpg" alt="A slice of the control firmware — the C code that decodes the RF command and drives the PWM." loading="lazy" />
    <img src="/images/rc-car/build-19.jpg" alt="Printing a part on the MakerBot (left); the printed chassis plate with its two suspension arms (right)." loading="lazy" />
    <img src="/images/rc-car/build-20.jpg" alt="The drilled and etched PCB in hand (left) and the two soldered controller boards wired to a joystick (right)." loading="lazy" />
    <img src="/images/rc-car/build-21.jpg" alt="Printing our own PCB on the Voltera — the chassis and mounts, the Voltera measuring board height, conductive ink being printed, and the finished Voltera-printed board." loading="lazy" />
    <img src="/images/rc-car/build-22.jpg" alt="The assembled gear differential — bevel gears and shafts that split drive to the rear wheels." loading="lazy" />
  </div>
  <button class="carousel__btn carousel__btn--prev" aria-label="Previous photo">←</button>
  <button class="carousel__btn carousel__btn--next" aria-label="Next photo">→</button>
  <div class="carousel__dots"></div>
</div>

---

*📓 **Origins / build log:** the full week-by-week process — every prototype,
failure, and fix — lives on our [Projects in Engineering blog](https://amartoma25.wixsite.com/projects-in-engineer).*
