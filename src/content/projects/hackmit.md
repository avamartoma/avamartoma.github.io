---
title: "Sirius"
blurb: "An assistive cane for people who are blind or have low vision: a LiDAR on the cane senses obstacles, vibration motors warn you which way they are, and an iPhone app handles walking directions."
description: "Sirius is a HackMIT project: an assistive cane that scans its surroundings with LiDAR, warns of obstacles through two vibration motors, and pairs with an iPhone companion over Bluetooth for Google Maps walking directions delivered as turn cues."
date: 2026-09-20
tags: ["Hackathon", "Hardware", "Arduino", "LiDAR", "Python", "Swift", "Bluetooth LE", "CAD"]
accent: "#ff5cc4"
accentAlt: "#5ce6a0"
featured: true
---

*Built with Hala Komaiha, Shreya Chougle, and Shivam Maji at HackMIT.*

## The idea

A white cane tells you what's directly in front of the tip and nothing else. It
can't warn you about something a few steps to the side, and it can't tell you
where to turn. **Sirius adds sensing and directions to the cane.** It scans the
space ahead, tells you through vibration which side an obstacle is on, and
guides you along a walking route with turn cues you feel in your hand.

## What we built

- **Sensing on the cane.** A spinning **RPLIDAR C1** feeds an **Arduino UNO Q**,
  which builds a live 200° occupancy grid of what's around you and checks the
  corridor you're walking into for obstacles, about 12 scans a second.
- **Vibration feedback.** Two motors, one on each side, buzz to warn of an
  obstacle on that side. Route turns come through as double-taps, and an obstacle
  warning always overrides a turn cue.
- **The iPhone companion.** An app called Sirius connects to the cane over
  **Bluetooth**. You search for a destination, confirm it, and the cane fetches a
  walking route from Google Maps. As you walk, the phone's GPS tracks your
  progress and the cane pulses before each turn. The app also speaks status out
  loud and has an offline simulator for demoing without the hardware.
- **Safety by design.** The microcontroller runs a watchdog that cuts the motors
  if the sensor data stops arriving, and assistance always stops when you say
  stop. The original design included motorized steering, but it stayed disabled.
  Sirius is a supervised prototype, not a validated mobility aid.

## My role

I worked on two ends of the project. On the **mechanical side**, I did CAD for
the cane hardware. On the **phone side**, I built the Sirius iPhone app in Xcode,
got it signed and onto a real phone, and paired it with the board over Bluetooth.

## Stack

The cane runs on an **Arduino UNO Q**, which has a Linux processor running the
**Python** sensing, planning, and Bluetooth code plus a separate microcontroller
running **C++** firmware for the motors and watchdog. Routes and place search use
the **Google Maps Places and Routes APIs**, called from the board so no API key
ever lives on the phone. The companion app is **Swift / SwiftUI** using Core
Bluetooth, Core Location, and on-device speech. A live dashboard on the board
shows the LiDAR grid in a browser. The Python code has 105 unit tests, and the
firmware has its own C++ tests.
