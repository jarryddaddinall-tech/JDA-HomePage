(function () {
  var W = window.WRITING || {};
  var u = W.substack && String(W.substack).trim();

  var a = document.getElementById("writing-substack-link");
  if (a) {
    if (u) {
      a.href = u;
      a.classList.remove("writing-substack-link--pending");
      a.removeAttribute("aria-disabled");
    } else {
      a.href = "#";
      a.classList.add("writing-substack-link--pending");
      a.setAttribute("aria-disabled", "true");
    }
  }
})();
