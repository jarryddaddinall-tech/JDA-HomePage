(function () {
  var C = window.THE85_SOUND || {};

  function hrefFromConfigOrMarkup(a) {
    var key = a.getAttribute("data-stream");
    var fromConfig = C[key];
    var trimmed = fromConfig != null && String(fromConfig).trim() ? String(fromConfig).trim() : "";
    if (!trimmed) {
      trimmed = (a.getAttribute("data-stream-href") || "").trim();
    }
    if (!trimmed) {
      var h = a.getAttribute("href");
      if (h && /^https?:/i.test(h)) trimmed = h.trim();
    }
    return trimmed;
  }

  function streamLinks() {
    document.querySelectorAll("[data-stream]").forEach(function (a) {
      var trimmed = hrefFromConfigOrMarkup(a);
      var li = a.closest("li");

      if (trimmed) {
        a.href = trimmed;
        a.classList.remove("stream-btn--pending");
        a.removeAttribute("aria-disabled");
        a.removeAttribute("title");
        if (li) li.hidden = false;
      } else if (li) {
        li.hidden = true;
      }
    });

    var list = document.getElementById("stream-list");
    if (list) {
      var section = list.closest(".stream-section");
      if (section && !list.querySelector("li:not([hidden])")) {
        section.hidden = true;
      }
    }
  }

  function setupSpotifyEmbed() {
    var wrap = document.getElementById("music-spotify-embed");
    if (!wrap) return;
    var iframe = wrap.querySelector("iframe");
    var placeholder = wrap.querySelector(".embed-placeholder");
    var url = C.spotifyEmbedUrl != null && String(C.spotifyEmbedUrl).trim() ? String(C.spotifyEmbedUrl).trim() : "";
    if (!url && iframe) {
      var existing = iframe.getAttribute("src");
      if (existing && existing.trim()) url = existing.trim();
    }

    if (url && iframe) {
      iframe.src = url;
      iframe.removeAttribute("hidden");
      if (placeholder) placeholder.hidden = true;
      wrap.hidden = false;
    } else {
      wrap.hidden = true;
      if (iframe) {
        iframe.removeAttribute("src");
        iframe.setAttribute("hidden", "");
      }
      if (placeholder) placeholder.hidden = false;
    }
  }

  /** file:// often blocks target=_blank; open explicitly on primary click */
  function setupStreamClicks() {
    if (window.location.protocol !== "file:") return;
    var list = document.getElementById("stream-list");
    if (!list) return;
    list.addEventListener("click", function (e) {
      var a = e.target.closest("a.stream-btn[data-stream]");
      if (!a || !list.contains(a)) return;
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (typeof e.button === "number" && e.button !== 0) return;

      var url = hrefFromConfigOrMarkup(a);
      if (!url || !/^https?:\/\//i.test(url)) return;

      e.preventDefault();
      var w = window.open(url, "_blank", "noopener,noreferrer");
      if (!w || w.closed) {
        window.location.href = url;
      }
    });
  }

  function setupDemoPlayers() {
    if (typeof Plyr === "undefined") return;
    document.querySelectorAll(".music-demo-audio").forEach(function (el) {
      if (el.plyr) return;
      new Plyr(el, {
        controls: ["play", "progress", "current-time", "duration", "mute", "volume"],
        settings: [],
        invertTime: false,
        volume: 0.85,
      });
    });
  }

  function setMusicTab(tabId, updateHash) {
    var tabs = document.querySelectorAll(".music-tab[data-music-tab]");
    var panels = document.querySelectorAll(".music-panel[data-music-panel]");
    if (!tabs.length || !panels.length) return;

    var target = tabId === "demos" ? "demos" : "released";

    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-music-tab") === target;
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.classList.toggle("music-tab--active", isActive);
    });

    panels.forEach(function (panel) {
      var isActive = panel.getAttribute("data-music-panel") === target;
      panel.hidden = !isActive;
    });

    if (updateHash !== false) {
      var hash = target === "demos" ? "#demos" : "#released";
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash);
      }
    }
  }

  function tabFromHash() {
    var hash = (window.location.hash || "").replace("#", "").toLowerCase();
    if (hash === "demos" || hash === "in-progress" || hash === "wip") return "demos";
    return "released";
  }

  function setupMusicTabs() {
    var tablist = document.querySelector(".music-tabs");
    if (!tablist) return;

    tablist.addEventListener("click", function (e) {
      var tab = e.target.closest(".music-tab[data-music-tab]");
      if (!tab || !tablist.contains(tab)) return;
      setMusicTab(tab.getAttribute("data-music-tab"), true);
    });

    document.querySelectorAll("[data-music-tab]").forEach(function (el) {
      if (el.classList.contains("music-tab")) return;
      el.addEventListener("click", function (e) {
        var id = el.getAttribute("data-music-tab");
        if (!id) return;
        e.preventDefault();
        setMusicTab(id, true);
        var panel = document.getElementById("music-panel-" + id);
        if (panel) {
          panel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    window.addEventListener("hashchange", function () {
      setMusicTab(tabFromHash(), false);
    });

    setMusicTab(tabFromHash(), false);
  }

  function run() {
    streamLinks();
    setupSpotifyEmbed();
    setupStreamClicks();
    if (typeof window.renderMusicDemos === "function") {
      window.renderMusicDemos();
    }
    setupDemoPlayers();
    setupMusicTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
