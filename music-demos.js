(function () {
  function escapeHtml(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderArt(project) {
    var art = project.art != null ? String(project.art).trim() : "";
    if (!art) {
      return '<div class="music-project-art" aria-hidden="true"><span class="music-project-art-mark">85</span></div>';
    }
    if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(art) || art.indexOf("/") !== -1) {
      return (
        '<div class="music-project-art music-project-art--img" aria-hidden="true">' +
        '<img class="music-project-art-img" src="' +
        escapeHtml(art) +
        '" alt="" loading="lazy" decoding="async" />' +
        "</div>"
      );
    }
    return (
      '<div class="music-project-art" aria-hidden="true"><span class="music-project-art-mark">' +
      escapeHtml(art) +
      "</span></div>"
    );
  }

  function renderVersion(version, projectId, index) {
    var src = version.src != null ? String(version.src).trim() : "";
    if (!src) return "";

    var label = escapeHtml(version.label || "Version " + (index + 1));
    var date = version.date ? '<span class="music-version-date">' + escapeHtml(version.date) + "</span>" : "";
    var note = version.note ? '<p class="music-version-note muted">' + escapeHtml(version.note) + "</p>" : "";
    var audioId = "demo-audio-" + projectId + "-" + index;

    return (
      '<li class="music-version-row">' +
      '<div class="music-version-head">' +
      '<span class="music-version-label">' +
      label +
      "</span>" +
      date +
      "</div>" +
      note +
      '<div class="music-demo-player">' +
      '<audio id="' +
      audioId +
      '" class="music-demo-audio" playsinline preload="metadata">' +
      '<source src="' +
      escapeHtml(src) +
      '" type="audio/mp4" />' +
      "</audio>" +
      "</div>" +
      "</li>"
    );
  }

  function renderProject(project) {
    if (!project || !project.title) return "";

    var id = escapeHtml(project.id || project.title.toLowerCase().replace(/\s+/g, "-"));
    var featured = project.featured ? " music-project-card--featured" : "";
    var status = project.status ? escapeHtml(project.status) : "";
    var updated = project.updated ? escapeHtml(project.updated) : "";
    var metaParts = [status, updated].filter(Boolean);
    var meta = metaParts.length ? '<p class="music-project-meta muted">' + metaParts.join(" · ") + "</p>" : "";
    var story = project.story
      ? '<p class="music-project-story">' + escapeHtml(project.story) + "</p>"
      : "";

    var versions = Array.isArray(project.versions) ? project.versions : [];
    var versionHtml = versions
      .map(function (v, i) {
        return renderVersion(v, id, i);
      })
      .filter(Boolean)
      .join("");

    var versionsBlock = versionHtml
      ? '<div class="music-project-versions">' +
        '<h4 class="music-project-versions-heading">Versions</h4>' +
        '<ul class="music-project-versions-list" role="list">' +
        versionHtml +
        "</ul></div>"
      : "";

    return (
      '<article class="music-project-card' +
      featured +
      '" id="demo-' +
      id +
      '">' +
      '<div class="music-project-hero">' +
      renderArt(project) +
      '<div class="music-project-intro">' +
      '<h3 class="music-project-title">' +
      escapeHtml(project.title) +
      "</h3>" +
      meta +
      story +
      "</div></div>" +
      versionsBlock +
      "</article>"
    );
  }

  function render() {
    var root = document.getElementById("music-demos-root");
    if (!root) return;

    var C = window.THE85_SOUND || {};
    var demos = Array.isArray(C.demos) ? C.demos : [];

    if (!demos.length) {
      root.innerHTML = '<p class="music-demos-empty muted">No works in progress yet — add projects in <code class="inline-code">music-config.js</code>.</p>';
      return;
    }

    root.innerHTML = '<div class="music-demos-list">' + demos.map(renderProject).join("") + "</div>";
  }

  window.renderMusicDemos = render;
})();
