---
title: "Aurora"
blurb: "A real-time generative art engine that turns sound into flowing light fields in the browser."
description: "Aurora is a WebGL-based audio-reactive visualizer that renders GPU particle flow fields responding to live microphone or track input."
date: 2025-11-02
draft: true
tags: ["WebGL", "TypeScript", "Audio", "Shaders"]
repo: "https://github.com/avamartoma/aurora"
demo: "https://example.com/aurora"
accent: "#a855f7"
accentAlt: "#4361ee"
featured: true
---

## What it is

Aurora listens to sound and paints with it. Feed it a track — or your own
voice through the mic — and it renders a GPU-driven flow field of tens of
thousands of particles that drift, swirl, and bloom in time with the audio.

It started as a question: *what does a bassline look like if you let physics
decide?*

## How it works

The pipeline is deliberately simple:

1. **Analyse** — the Web Audio API's `AnalyserNode` gives me an FFT of the
   incoming signal every frame.
2. **Map** — frequency bands drive a handful of uniforms: low end controls
   turbulence, mids shift hue, highs add sparkle.
3. **Simulate** — a fragment shader advects particles through a curl-noise
   field, ping-ponging positions between two framebuffers.
4. **Render** — additive blending stacks the particles into those soft,
   aurora-like ribbons.

```glsl
// curl noise gives the field its organic, divergence-free swirl
vec2 curl(vec2 p) {
  float e = 0.001;
  float n1 = noise(p + vec2(0.0, e));
  float n2 = noise(p - vec2(0.0, e));
  float n3 = noise(p + vec2(e, 0.0));
  float n4 = noise(p - vec2(e, 0.0));
  return vec2(n1 - n2, n4 - n3) / (2.0 * e);
}
```

## What I learned

> The hardest part wasn't the graphics — it was making it *feel* musical.

Getting the mapping to feel intentional rather than random took far longer
than the rendering. I ended up smoothing every audio value with an
exponential moving average so the visuals breathe instead of twitch.

## Where it's going

Next I want to add a MIDI input mode so it can be VJ'd live, and an export
path to record loops as seamless video.
