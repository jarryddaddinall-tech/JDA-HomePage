(function () {
  var el = document.getElementById("site-header");
  if (!el) return;

  var path = (window.location.pathname || "").replace(/\\/g, "/").toLowerCase();
  var file = path.split("/").pop() || "";
  if (!file) file = "index.html";

  var inSubfolder = path.indexOf("/apps/") !== -1 || path.indexOf("/writing/") !== -1;
  var base = inSubfolder ? "../" : "";

  function activeNav() {
    if (file === "music.html") return "music";
    if (path.indexOf("/writing/") !== -1 || file === "writing.html") return "writing";
    if (path.indexOf("/apps/") !== -1 || file === "apps.html") return "apps";
    if (file === "cv.html") return "cv";
    return "";
  }

  var cur = activeNav();

  function aria(page) {
    return cur === page ? ' aria-current="page"' : "";
  }

  el.innerHTML =
    '<div class="header-inner">' +
    '<a class="logo" href="' +
    base +
    'index.html">Jarryd Addinall</a>' +
    '<nav class="nav" aria-label="Primary">' +
    '<a href="' +
    base +
    'music.html"' +
    aria("music") +
    ">Music</a>" +
    '<a href="' +
    base +
    'apps.html"' +
    aria("apps") +
    ">Apps</a>" +
    '<a href="' +
    base +
    'writing.html"' +
    aria("writing") +
    ">Writing</a>" +
    '<a href="' +
    base +
    'cv.html"' +
    aria("cv") +
    ">CV</a>" +
    "</nav>" +
    "</div>";
})();
