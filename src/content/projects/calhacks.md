---
title: "OpenCloud"
blurb: "A spatial workspace for AI coding agents: every project is a cloud in the sky, and zooming into one opens an office where Codex, Claude, and Cursor agents work side by side."
description: "OpenCloud is a CalHacks project: a shared sky of projects-as-clouds where you zoom into any project to find an office of AI coding agents (Codex, Claude, and Cursor) picking up tickets, handing off work, and showing exactly what they changed."
date: 2026-10-25
tags: ["Hackathon", "TypeScript", "React", "Three.js", "Convex", "AI/LLM", "MCP"]
repo: "https://github.com/avamartoma/calhacks-26"
demo: "https://calhacks-26.vercel.app"
accent: "#7c5cff"
accentAlt: "#ffd23f"
featured: true
---

*Built with Davina Raj and Neha Nataraj at CalHacks.*

## The idea

Coding agents are getting good enough to run several at once, but working with
them still looks like a row of terminal tabs. You can't see who is doing what,
which work is finished, or what a given agent actually changed.

**OpenCloud gives that work a place.** A **workspace** is a sky, and each
project in it is a **cloud**. Your own projects sit up front, and projects shared
with you float further back. Zoom into one of your clouds and the screen fills
with white and opens that project's **office**: a 3D floor of desks where
agents running on **Codex**, **Claude**, or **Cursor** pick up tickets, hand
off findings to each other, and post their progress, commands, and diffs where
you can see them.

![The OpenCloud office: an isometric floor of desks, glass meeting rooms, and a lounge. Agents show up here as small colored blobs at their desks.](/images/projects/calhacks/office.png)

## What we built

- **The sky.** A 2D canvas with parallax layers, painted for your local time of
  day. Clouds are sized to their titles, you can drag them around like Finder
  icons, and zooming in shows each project's description and agents, colored by
  type. Search ranks projects, agents, and tickets by meaning.
- **The office.** Every project gets a project manager that splits a request
  into role tickets for the other agents. You can direct any agent, reply to it
  and have it keep going, and open a diff of exactly what each run changed.
  An agent saying it's done doesn't count as proof: tasks need acceptance checks
  and recorded evidence before they're marked verified.
- **It runs on the web.** At [calhacks-26.vercel.app](https://calhacks-26.vercel.app)
  you sign in, add projects from a folder or straight from GitHub, connect your
  own Codex, Claude, or Cursor key, and the agents run in a cloud sandbox for that
  project, with a live preview of the site they're building.
- **Sharing.** Share a project by link or email invite as a viewer or editor
  (editors run agents on their own keys), or make it public so everyone signed in
  sees it on their sky.
- **ASI:One agents.** Four Fetch.ai agents (office, planner, watcher, and
  reviewer) let you check status, turn ideas into Jira stories, and hand off
  missions from a chat, without opening the app.

## My role

I built most of the **web version**, taking the office from a local app to
something you can open in a browser: sign-in, the sky and projects backed by
Convex, GitHub import, connecting Codex, Claude, and Cursor accounts, running
agents in cloud sandboxes, and showing what each run changed. I also built the
**workspace sky** itself (the cloud model, clustering and layering, workspace
pictures), made **Claude a full office member** alongside Codex using the Claude
Agent SDK, and added sharing with invite emails, the per-project manager that
splits work into tickets, the built-in agents running in Convex, live previews
for sites with no dev script (like GitHub Pages sites), and a fix for sign-in
on iPhones. Davina led the Fetch.ai agents, Cursor and MCP integrations, and
Auth0 sign-in; Neha built the cloud sandbox, live preview, and the connections
panel.

## Stack

**React + TypeScript** on **Vite**, with **Three.js** for the 3D office (its
geometry was modeled in **Blender** through blender-mcp) and a **Node/Express**
server for the local app. The web app is backed by **Convex**, signs people in
with **Auth0**, runs agents in **E2B** sandboxes, and deploys alongside a
**Next.js** share site on **Vercel**. Agents run through the **Claude Agent SDK**,
the **Codex CLI**, and the **Cursor SDK**, and editor sessions report in over
**MCP**. The four ASI:One agents are **Python** uAgents hosted on Fetch.ai's
Agentverse.
