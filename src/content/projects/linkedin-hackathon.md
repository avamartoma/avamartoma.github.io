---
title: "LinkedIn Career Discovery"
blurb: "A gamified career-exploration concept for LinkedIn — discover roles you've never heard of, then use your profile + AI to map the skill gap to get there."
description: "A hackathon project: a career-discovery feature built inside LinkedIn for GenZ/GenAlpha. Discover unfamiliar roles, then use profile data + AI to map the gap to a field you're excited about, with Khan-Academy-style progress and % mastery."
date: 2026-06-24
tags: ["Hackathon", "Next.js", "TypeScript", "FastAPI", "Python", "AI/LLM"]
repo: "https://github.com/avamartoma/possibilities-hack-67"
accent: "#4361ee"
accentAlt: "#a855f7"
featured: true
---

*Built with Daniel Lee, Namyanzi Edwards, and Muhammed Ali — with mentorship
from Jaden Hinton and Pablo Najera.*

## See it in action

<video controls preload="none" poster="/images/projects/linkedin-hackathon/demo-poster.jpg">
  <source src="/videos/linkedin-hackathon/demo.mp4" type="video/mp4" />
  Your browser can't play embedded video —
  <a href="/videos/linkedin-hackathon/demo.mp4">download the demo clip</a> instead.
</video>

## The idea

A **career-discovery feature that lives inside LinkedIn**, aimed at
GenZ/GenAlpha who don't yet have a good mental map of what jobs exist or how to
reach them. A persistent **Locked[IN]** button on your profile opens a flow
that helps you **discover roles you've never heard of**, then uses your profile
data plus **AI** to map the gap between where you are and a field you're excited
about — Khan-Academy-style progress and **% mastery**.

The core bet: **everything reduces to skills** as the connective tissue —
a role is a cluster of skills, you hold some of them, a course teaches some,
the gap is the difference, and your "fit %" is the overlap.

![The entry point: a LinkedIn-style profile with a persistent Locked[IN] button that kicks off the discovery flow.](/images/projects/linkedin-hackathon/profile.png)

## The flow

**Lock in → (Explore *or* Explain) → Comparison → Your Path**, with a streak /
leaderboard around it:

- **Explore** — broad interest *bubbles* (Creative, Technical, …) you click to
  reveal careers in that field, for people who don't know what they want yet.
- **Explain** — an AI chatbot route into the same space.
- **Comparison** — weigh roles against each other.
- **Your Path** — readiness, skill gaps, and a concrete milestone plan.

![Explore — "Discover where you could go": search hundreds of roles, each scored with a readiness % against your profile.](/images/projects/linkedin-hackathon/discover.png)

![Comparison — a role deep-dive: readiness ring, live open roles, and a clean split of the skills you already have versus the ones to build.](/images/projects/linkedin-hackathon/role-detail.png)

![Your Path — a milestone plan that turns the skill gap into concrete, checkable actions on a suggested timeline.](/images/projects/linkedin-hackathon/your-path.png)

## My role

I **owned the Explore page** — the interest-bubble discovery experience — and
**integrated the full end-to-end flow** (`AppFlow`: Lock-in → Explore/Explain →
Comparison → Milestone) so the separate, per-owner pages became one product.

## Stack

**Next.js / React / TypeScript** frontend talking to a **Python (FastAPI)**
backend over a JSON/HTTP API, with **Anthropic (Claude)** for the AI guidance
(deterministic recommendations as a fallback). Designed against synthetic
LinkedIn-style data — ~2,000 users, **207 roles across 21 industries**, and 600
courses — specifically to showcase discovering *unfamiliar* roles.
