#!/usr/bin/env python3
"""Mark unlisted app pages as noindex with neutral copy (not linked from apps.html)."""

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "apps"

HIDDEN = [
    "100-things-with-riley.html",
    "alcohol-free-at-home.html",
    "bin-day.html",
    "budget-and-finance-task-app.html",
    "financial-hub.html",
    "homeclearapp.html",
    "ios-lizard-game.html",
    "kids-chore-app.html",
    "lifestyle-app.html",
    "octopus-energy.html",
    "one-year-alcohol-free.html",
    "returns-proto.html",
    "tax-app.html",
    "tenancy-management-app-ios.html",
]

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="description" content="Unlisted app concept." />
    <meta name="author" content="Jarryd Addinall" />
    <meta name="theme-color" content="#ffffff" />
    <title>{title} · Unlisted</title>
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
        <div class="app-detail-icon app-detail-icon--web" aria-hidden="true">{initials}</div>
        <div class="app-detail-hero-text">
          <h1 class="app-detail-title">{title}</h1>
          <p class="app-detail-subtitle">This concept is not listed publicly.</p>
          <p class="app-detail-meta-line muted">Unlisted · Concept</p>
        </div>
      </header>

      <section class="app-detail-section">
        <div class="app-detail-prose">
          <p class="muted">Browse <a href="../apps.html">Apps &amp; product work</a> for shipped products and featured concepts.</p>
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


def title_from_filename(name: str) -> str:
    stem = name.replace(".html", "")
    words = stem.replace("-", " ").split()
    return " ".join(w.capitalize() if w.islower() else w for w in words)


def initials(title: str) -> str:
    parts = [p for p in title.split() if p[0].isalpha()]
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return (parts[0][:2] if parts else "AP").upper()


def main() -> None:
    for filename in HIDDEN:
        path = ROOT / filename
        if not path.exists():
            print("skip missing", filename)
            continue
        title = title_from_filename(filename)
        path.write_text(
            TEMPLATE.format(title=title, initials=initials(title)),
            encoding="utf-8",
        )
        print("updated", filename)


if __name__ == "__main__":
    main()
