(function () {
  var W = window.WRITING || {};
  var substack = W.substack && String(W.substack).trim().replace(/\/?$/, "");
  var apiPath = (W.feedApi && String(W.feedApi).trim()) || "/api/substack-feed";
  var root = document.getElementById("writing-feed-root");
  if (!root) return;

  function formatDate(isoOrRaw) {
    if (!isoOrRaw) return "";
    var d = new Date(isoOrRaw);
    if (isNaN(d.getTime())) return String(isoOrRaw).slice(0, 16);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  }

  function render(items) {
    root.removeAttribute("data-loading");
    var section = root.closest(".writing-feed");
    if (section) {
      section.removeAttribute("aria-busy");
    }
    if (!items || !items.length) {
      root.innerHTML = "<p class=\"writing-feed-status\">No posts yet.</p>";
      return;
    }
    var ul = document.createElement("ul");
    ul.className = "writing-feed-list";
    ul.setAttribute("role", "list");
    items.forEach(function (it) {
      var li = document.createElement("li");
      var article = document.createElement("article");
      article.className = "writing-feed-row";
      var card = document.createElement("a");
      card.className = "writing-feed-card";
      if (!it.coverImage) {
        card.classList.add("writing-feed-card--no-thumb");
      }
      card.href = it.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      if (it.coverImage) {
        var cover = document.createElement("div");
        cover.className = "writing-feed-cover";
        var img = document.createElement("img");
        img.className = "writing-feed-cover-img";
        img.src = it.coverImage;
        img.alt = "";
        img.setAttribute("loading", "lazy");
        img.setAttribute("decoding", "async");
        cover.appendChild(img);
        card.appendChild(cover);
      }
      var body = document.createElement("div");
      body.className = "writing-feed-body";
      var title = document.createElement("span");
      title.className = "writing-feed-title";
      title.textContent = it.title;
      body.appendChild(title);
      if (it.description) {
        var desc = document.createElement("span");
        desc.className = "writing-feed-desc";
        desc.textContent = it.description;
        body.appendChild(desc);
      }
      card.appendChild(body);
      var time = document.createElement("time");
      time.className = "writing-feed-date";
      if (it.pubDateIso) {
        time.setAttribute("datetime", it.pubDateIso);
      }
      time.textContent = formatDate(it.pubDateIso || it.pubDate);
      card.appendChild(time);
      article.appendChild(card);
      li.appendChild(article);
      ul.appendChild(li);
    });
    root.innerHTML = "";
    root.appendChild(ul);
  }

  function fail() {
    root.removeAttribute("data-loading");
    var section = root.closest(".writing-feed");
    if (section) {
      section.removeAttribute("aria-busy");
    }
    var msg =
      "Couldn’t load the feed. This list appears on the deployed site. ";
    root.innerHTML =
      "<p class=\"writing-feed-status writing-feed-status--error\">" + msg + "</p>";
    if (substack) {
      var p = document.createElement("p");
      p.className = "writing-feed-fallback";
      var a = document.createElement("a");
      a.href = substack;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Open Insights And Rhythms on Substack";
      p.appendChild(a);
      root.appendChild(p);
    }
  }

  fetch(apiPath)
    .then(function (r) {
      if (!r.ok) throw new Error("bad");
      return r.json();
    })
    .then(function (data) {
      render(data.items);
    })
    .catch(fail);
})();
