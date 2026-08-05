---
title: "Amazon Path"
blurb: "A hackathon knowledge graph that answers the question every new intern is afraid to ask: \"who owns this, and who do I talk to?\""
description: "Path turns an engineering org into a queryable map: ask 'who owns this?' or 'can I edit this in prod?' in plain English and get the answer, the evidence-backed path behind it, and a ranked list of who to ask. An AFE hackathon project."
date: 2026-07-21
tags: ["Hackathon", "TypeScript", "React", "Three.js", "Node.js", "MCP", "Knowledge Graph"]
repo: "https://github.com/avamartoma/afe-hackathon-26"
accent: "#5ce6a0"
accentAlt: "#4361ee"
featured: true
cover: "/images/afe-hackathon/cover.png"
---

*Built with Daniel Lee, Jacob Ryabinky, and Andrew Lin for the AFE intern
hackathon (theme: **Pay it Forward**).*

## The idea

It's day three of an internship. You need to change a production setting, but
the package name doesn't match the owning team, the account is governed by
permissions you've never seen, and the role you need is documented somewhere you
can't find. The answer exists — it's just spread across people, packages,
pipelines, permissions, and stale pages.

**Every engineering organization is a graph that new builders can't see.
Path makes that graph queryable.** You ask a normal question in plain English —
*"Who owns AtlasRegionContext?"* or *"Can I edit supported locations in prod?"* —
and get three things back:

1. **The answer** — who owns it, where it deploys, or whether access is confirmed.
2. **The path** — the people, teams, resources, roles, and accounts behind that answer.
3. **The next action** — who to contact, what role to request, and a draft to send.

## What makes it different

Search finds documents *about* a system; Path answers questions whose answers
only emerge from **joined relationships** (`person → team → package`,
`person → role → account → resource`, `package → pipeline → stage → account`).
Instead of stopping at "no," it distinguishes *missing evidence* from a denial —
surfacing the exact missing edge, the likely approver, and a ready-to-send
request. Every answer stays **traceable**: each connection carries its source,
confidence, and observation time, and verified links stay visually distinct from
missing ones.

For "who knows about X?", an explainable ranking blends keyword relevance,
relationship weight, and recency (owners, maintainers, and contributors weighted
differently), then expands each score into a plain-language "why this person"
breakdown with a direct link to their Phone Tool profile.

## Stack

A deterministic query engine over an in-memory graph of typed nodes and
evidence-backed edges, powering three surfaces from the same core: a **React +
Three.js** web app (an interactive 3D graph with orbit/zoom, keyboard path
navigation, and a no-WebGL fallback), a read-only **Express** HTTP API, and five
**MCP tools** for coding agents. Written in **TypeScript** on **Node 20**, with a
test suite covering graph integrity, data-safety, deterministic queries, expert
ranking, and responsive browser rendering. The demo runs on validated, synthetic
public data — connector-based sync with live sources is the designed next step.

## Pay it forward

The data schema maps 1:1 to real internal sources, so each intern cohort can
plug in real data and hand the next cohort an even better map — every future
builder joining an unfamiliar org can instantly see who owns what and who to ask.

<!-- Add screenshots once ready:
![Path — evidence-backed path and ranked contacts](/images/afe-hackathon/demo.jpg)
![Path — 3D graph view](/images/afe-hackathon/graph.jpg) -->
