#!/usr/bin/env python3
"""Generate placeholder app mock pages under apps/. Run from site root: python3 scripts/generate-app-mocks.py"""
from __future__ import annotations

import html
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APPS = ROOT / "apps"

CATEGORIES: list[tuple[str, list[tuple[str, str]]]] = [
    (
        "Health & habits",
        [
            ("Alcohol Free At Home", "alcohol-free-at-home"),
            ("HRV App", "hrv-app"),
            ("One Year Alcohol Free", "one-year-alcohol-free"),
            ("LifeStyle App", "lifestyle-app"),
        ],
    ),
    (
        "Finance & home admin",
        [
            ("Budget And Finance Task App", "budget-and-finance-task-app"),
            ("Financial Hub", "financial-hub"),
            ("Tax App", "tax-app"),
            ("Tenancy Management App - iOS", "tenancy-management-app-ios"),
            ("HomeclearApp", "homeclearapp"),
            ("Octopus Energy", "octopus-energy"),
            ("Bin Day", "bin-day"),
        ],
    ),
    (
        "Notes & reminders",
        [
            ("Echo Note", "echo-note"),
            ("FinalNotes", "finalnotes"),
            ("Roam Notes App", "roam-notes-app"),
            ("bullet Notes FInal", "bullet-notes-final"),
            ("Admin Reminders", "admin-reminders"),
        ],
    ),
    (
        "Family",
        [
            ("100 Things with Riley", "100-things-with-riley"),
            ("Kids Chore App", "kids-chore-app"),
        ],
    ),
    (
        "Music & audio",
        [
            ("MixCheck", "mixcheck"),
            ("SongFrame", "songframe"),
        ],
    ),
    (
        "Productivity",
        [
            ("Focus App", "focus-app"),
            ("Momentum", "momentum"),
        ],
    ),
    (
        "Games",
        [
            ("iOS Lizard Game", "ios-lizard-game"),
        ],
    ),
    (
        "Prototypes & experiments",
        [
            ("Returns Proto", "returns-proto"),
        ],
    ),
]

SKIP = {"mileage-tracker", "logreps"}


def initials(title: str) -> str:
    words = title.split()
    first_letters: list[str] = []
    for w in words:
        for c in w:
            if c.isalpha():
                first_letters.append(c.upper())
                break
    if len(first_letters) >= 2:
        return first_letters[0] + first_letters[-1]
    if len(first_letters) == 1:
        return (first_letters[0] * 2)[:2]
    return "?"


SITE = "https://jarrydaddinall.com"
OG_IMAGE = f"{SITE}/og-image.jpg"


def seo_head(*, title: str, description: str, path: str, robots: str = "index, follow") -> str:
    url = f"{SITE}/{path.lstrip('/')}"
    safe_title = html.escape(title)
    safe_desc = html.escape(description)
    return f"""    <meta name="description" content="{safe_desc}" />
    <meta name="author" content="Jarryd Addinall" />
    <meta name="robots" content="{robots}" />
    <meta name="theme-color" content="#ffffff" />
    <link rel="canonical" href="{url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Jarryd Addinall" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:title" content="{safe_title}" />
    <meta property="og:description" content="{safe_desc}" />
    <meta property="og:url" content="{url}" />
    <meta property="og:image" content="{OG_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <title>{safe_title}</title>"""


def write_mock(name: str, slug: str, category: str) -> None:
    if slug in SKIP:
        return
    path = APPS / f"{slug}.html"
    ab = initials(name)
    safe_name = html.escape(name)
    safe_cat = html.escape(category)
    page_title = f"{name} · Apps"
    page_desc = f"{name}: placeholder app concept on Jarryd Addinall's apps page."
    head = seo_head(
        title=page_title,
        description=page_desc,
        path=f"apps/{slug}.html",
        robots="noindex, follow",
    )
    content = f"""<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
{head}
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
    <header class="header">
      <div class="header-inner">
        <a class="logo" href="../index.html">Jarryd Addinall</a>
        <nav class="nav" aria-label="Primary">
          <a href="../music.html">Music</a>
          <a href="../apps.html" aria-current="page">Apps</a>
          <a href="../writing.html">Writing</a>
        </nav>
      </div>
    </header>

    <main id="main" class="main main--app-detail">
      <nav class="app-detail-breadcrumb muted" aria-label="Breadcrumb">
        <a href="../apps.html">Apps</a>
        <span class="app-detail-bc-sep" aria-hidden="true">/</span>
        <span>{safe_name}</span>
      </nav>

      <header class="app-detail-hero app-detail-hero--web">
        <div class="app-detail-icon app-detail-icon--web" aria-hidden="true">{html.escape(ab)}</div>
        <div class="app-detail-hero-text">
          <h1 class="app-detail-title">{safe_name}</h1>
          <p class="app-detail-subtitle">
            Placeholder page for this idea. Replace the title, description, and action when you host the real product or App Store link.
          </p>
          <p class="app-detail-meta-line muted">{safe_cat}</p>
          <div class="app-detail-actions app-detail-actions--web">
            <span class="app-detail-get-note muted">Edit <code class="inline-code">apps/{slug}.html</code> or swap this file for your live marketing page.</span>
          </div>
        </div>
      </header>

      <section class="app-detail-section" aria-labelledby="about-mock-heading">
        <h2 id="about-mock-heading" class="app-detail-h2">About</h2>
        <div class="app-detail-prose">
          <p>
            This is a static mock so visitors can browse from <a href="../apps.html">Apps</a>. Nothing here connects to a backend. When you are ready,
            replace this file with your real landing page or redirect to the App Store / TestFlight.
          </p>
        </div>
      </section>

      <p class="app-detail-back">
        <a href="../apps.html">Back to all apps</a>
      </p>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <p class="footer-copy">© <span id="year"></span> Jarryd Addinall</p>
        <p class="footer-tag">The 85 Sound · apps · words</p>
      </div>
    </footer>
    <script>
      document.getElementById("year").textContent = new Date().getFullYear();
    </script>
  </body>
</html>
"""
    path.write_text(content, encoding="utf-8")
    print(f"Wrote {path.relative_to(ROOT)}")


def main() -> None:
    APPS.mkdir(parents=True, exist_ok=True)
    for cat, items in CATEGORIES:
        for name, slug in items:
            write_mock(name, slug, cat)


if __name__ == "__main__":
    main()
