---
title: "Ledger"
blurb: "A tiny, keyboard-first expense tracker with local-first storage and zero accounts."
description: "Ledger is a fast, offline-first personal finance tracker built as a Rust + WASM app with an SQLite-in-the-browser backend."
date: 2025-02-09
draft: true
tags: ["Rust", "WASM", "SQLite", "UX"]
repo: "https://github.com/avamartoma/ledger"
demo: "https://example.com/ledger"
accent: "#4361ee"
accentAlt: "#ff5cc4"
---

## Why

Every expense app I tried wanted an account, a subscription, and my bank
credentials. I wanted the opposite: something that opens instantly, stores
everything on my own device, and can be driven entirely from the keyboard.

Ledger is that. No sign-up, no server, no telemetry. Your data never leaves
the tab.

## Design principles

1. **Local-first.** All data lives in an in-browser SQLite database persisted
   to IndexedDB. Export to CSV any time.
2. **Keyboard-native.** Every action has a shortcut. Adding an expense is
   `n`, then type `12.50 coffee #food`.
3. **Fast.** The core is Rust compiled to WASM, so parsing and aggregation
   stay instant even with years of data.

## The parser

The natural-language entry is the part I'm proudest of. `18 lunch #food @cash`
becomes a fully structured record without a single form field.

```rust
struct Entry {
    amount: Decimal,
    note: String,
    tags: Vec<String>,
    account: Option<String>,
}
```

## Status

Daily-driven by me for the better part of a year. It's intentionally small
and I'd like to keep it that way — the feature list is mostly a list of
things I've decided *not* to build.
