(function () {
  var F = window.APPS_FEATURED || {};
  var STATUS_LABEL = { coming: "Coming soon", beta: "Beta", live: "Live", preview: "Preview" };

  function pickUrl(cfg) {
    if (!cfg) return "";
    return (
      [cfg.primaryUrl, cfg.appStoreUrl, cfg.testFlightUrl].find(function (u) {
        return u && String(u).trim();
      }) || ""
    ).trim();
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function ctaLabel(cfg, url) {
    if (!cfg || !url) return "Set URL in apps-config.js";
    if (cfg.appStoreUrl && url === String(cfg.appStoreUrl).trim()) return "View on App Store";
    if (cfg.testFlightUrl && url === String(cfg.testFlightUrl).trim()) return "Join TestFlight";
    if (isExternal(url)) {
      return (cfg.platform || "").toLowerCase() === "web" ? "Open site" : "Open link";
    }
    if (url.indexOf("mileage-tracker") !== -1) return "App Store style page";
    if (url.indexOf("logreps") !== -1) return "Web product page";
    return "View details";
  }

  function apply(key, id) {
    var cfg = F[key];
    var el = document.getElementById(id);
    if (!cfg || !el) return;

    var nameEl = el.querySelector(".app-name");
    var tagEl = el.querySelector(".app-tagline");
    var statusEl = el.querySelector(".app-status");
    var ctaEl = el.querySelector(".app-cta");

    if (nameEl) nameEl.textContent = cfg.name || nameEl.textContent;
    if (tagEl) tagEl.textContent = cfg.tagline || tagEl.textContent;
    if (statusEl) {
      var st = String(cfg.status || "coming").toLowerCase();
      statusEl.textContent = STATUS_LABEL[st] || STATUS_LABEL.coming;
    }

    var url = pickUrl(cfg);
    var htmlHref = (el.getAttribute("href") || "").trim();
    var htmlMock =
      htmlHref && htmlHref.indexOf(".html") !== -1 && htmlHref !== "#";
    if (!url) {
      if (htmlMock) url = htmlHref;
    }
    // Broken config (# or empty) should not override a working mock link in HTML
    if ((!url || url === "#") && htmlMock) {
      url = htmlHref;
    }
    if (url) {
      el.href = url;
      if (isExternal(url)) {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      } else {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }
      el.classList.remove("app-card--static");
      el.removeAttribute("aria-disabled");
      if (ctaEl) {
        ctaEl.textContent = ctaLabel(cfg, url);
        ctaEl.classList.remove("app-cta--muted");
      }
    } else {
      el.href = "#";
      el.classList.add("app-card--static");
      el.setAttribute("aria-disabled", "true");
      if (ctaEl) {
        ctaEl.textContent = "Set URL in apps-config.js";
        ctaEl.classList.add("app-cta--muted");
      }
      el.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  }

  apply("mileage", "featured-mileage");
  apply("logreps", "featured-logreps");
})();
