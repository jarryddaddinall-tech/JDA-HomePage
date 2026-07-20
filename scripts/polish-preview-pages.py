#!/usr/bin/env python3
"""Rewrite placeholder app pages with LinkedIn-safe preview copy."""

from pathlib import Path

APPS = {
    "hrv-app.html": {
        "title": "HRV App",
        "icon": "HA",
        "category": "Health &amp; habits",
        "tagline": "Monitor heart rate variability and recovery in one calm view.",
        "about": "A wellness concept focused on HRV trends, recovery signals, and simple daily check-ins — designed for clarity without dashboard overload.",
        "meta": "HRV App — heart rate variability and recovery concept.",
    },
    "mixcheck.html": {
        "title": "MixCheck",
        "icon": "MC",
        "category": "Music &amp; audio",
        "tagline": "Reference mixes and check your levels before you bounce.",
        "about": "A production utility concept for A/B listening, level checks, and mix references — built for home studio workflows.",
        "meta": "MixCheck — reference mixes and level-check concept for producers.",
    },
    "songframe.html": {
        "title": "SongFrame",
        "icon": "SF",
        "category": "Music &amp; audio",
        "tagline": "Frame and organise songwriting ideas while they are still forming.",
        "about": "A songwriting workspace concept for sketches, structure, and lyric fragments — keeping ideas contained until a track is ready to grow.",
        "meta": "SongFrame — songwriting organisation concept.",
    },
    "focus-app.html": {
        "title": "Focus App",
        "icon": "FA",
        "category": "Productivity",
        "tagline": "Deep work sessions without distraction.",
        "about": "A focus timer concept with session goals, gentle checkpoints, and a minimal interface that stays out of the way while you work.",
        "meta": "Focus App — deep work and session timer concept.",
    },
    "momentum.html": {
        "title": "Momentum",
        "icon": "MO",
        "category": "Productivity",
        "tagline": "Build streaks and keep momentum going.",
        "about": "A habit momentum concept — streaks, weekly rhythm, and lightweight reflection to help small actions compound over time.",
        "meta": "Momentum — habit streaks and momentum concept.",
    },
    "echo-note.html": {
        "title": "Echo Note",
        "icon": "EN",
        "category": "Notes &amp; reminders",
        "tagline": "Quick notes that stay out of your way.",
        "about": "A minimal notes concept for capturing thoughts fast — open, type, close, without turning note-taking into a project of its own.",
        "meta": "Echo Note — minimal quick-capture notes concept.",
    },
    "finalnotes.html": {
        "title": "FinalNotes",
        "icon": "FN",
        "category": "Notes &amp; reminders",
        "tagline": "A focused notes app for lasting ideas.",
        "about": "A notes concept aimed at long-lived reference material — clean typography, calm structure, and search that respects how you actually recall things.",
        "meta": "FinalNotes — focused long-form notes concept.",
    },
    "roam-notes-app.html": {
        "title": "Roam Notes",
        "icon": "RN",
        "category": "Notes &amp; reminders",
        "tagline": "Notes that travel with you anywhere.",
        "about": "A mobile-first notes concept for ideas you pick up on the move — quick capture on phone, readable everywhere else.",
        "meta": "Roam Notes — mobile-first notes concept.",
    },
    "bullet-notes-final.html": {
        "title": "Bullet Notes",
        "icon": "BN",
        "category": "Notes &amp; reminders",
        "tagline": "Bullet-journal style notes, refined.",
        "about": "A bullet-journal inspired notes concept — daily logs, rapid symbols, and monthly roll-ups without the paper clutter.",
        "meta": "Bullet Notes — bullet-journal notes concept.",
    },
    "admin-reminders.html": {
        "title": "Admin Reminders",
        "icon": "AR",
        "category": "Notes &amp; reminders",
        "tagline": "Never miss life admin and renewals.",
        "about": "A life-admin concept for renewals, documents, and recurring tasks — the boring stuff, surfaced before it becomes urgent.",
        "meta": "Admin Reminders — life admin and renewals concept.",
    },
}

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="description" content="{meta}" />
    <title>{title} · Apps</title>
    <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="header" id="site-header"></header>
    <script src="../site-header.js"></script>

    <main id="main" class="main main--app-detail">
      <nav class="app-detail-breadcrumb muted" aria-label="Breadcrumb">
        <a href="../apps.html">Apps</a>
        <span class="app-detail-bc-sep" aria-hidden="true">/</span>
        <span>{title}</span>
      </nav>

      <header class="app-detail-hero app-detail-hero--web">
        <div class="app-detail-icon app-detail-icon--web" aria-hidden="true">{icon}</div>
        <div class="app-detail-hero-text">
          <h1 class="app-detail-title">{title}</h1>
          <p class="app-detail-subtitle">{tagline}</p>
          <p class="app-detail-meta-line muted">{category} · In development</p>
        </div>
      </header>

      <section class="app-detail-section" aria-labelledby="about-heading">
        <h2 id="about-heading" class="app-detail-h2">About</h2>
        <div class="app-detail-prose">
          <p>{about}</p>
          <p class="muted">Concept preview — not publicly available yet.</p>
        </div>
      </section>

      <p class="app-detail-back">
        <a href="../apps.html">Back to all apps</a>
      </p>
    </main>

    <footer class="footer"></footer>
  </body>
</html>
"""

def main() -> None:
    apps_dir = Path(__file__).resolve().parents[1] / "apps"
    for filename, data in APPS.items():
        path = apps_dir / filename
        path.write_text(TEMPLATE.format(**data), encoding="utf-8")
        print("updated", filename)

if __name__ == "__main__":
    main()
