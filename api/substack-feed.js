/**
 * Fetches Substack RSS server-side (avoids browser CORS) and returns JSON.
 * Vercel serverless: GET /api/substack-feed
 */
const DEFAULT_FEED = "https://jarrydaddinall.substack.com/feed";
const MAX_ITEMS = 12;

function stripHtml(s) {
  if (!s) return "";
  return s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "\u201c")
    .replace(/&#8221;/g, "\u201d")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeXmlEntities(s) {
  if (!s) return "";
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Substack puts the post cover in <enclosure type="image/jpeg" url="..."/> */
function getEnclosureImageUrl(block) {
  const m = block.match(/<enclosure[^>]+url="([^"]+)"/i);
  if (!m) return "";
  return decodeXmlEntities(m[1].trim());
}

function getTagContent(block, tag) {
  const cdata = new RegExp(
    "<" + tag + "[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</" + tag + ">",
    "i"
  );
  const m1 = block.match(cdata);
  if (m1) return m1[1].trim();
  const plain = new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">", "i");
  const m2 = block.match(plain);
  return m2 ? m2[1].replace(/<[^>]+>/g, "").trim() : "";
}

function parseItems(xml, limit) {
  const items = [];
  const parts = xml.split(/<item[^>]*>/i);
  for (let i = 1; i < parts.length && items.length < limit; i++) {
    const block = parts[i].split(/<\/item>/i)[0];
    const title = getTagContent(block, "title");
    const linkMatch = block.match(/<link[^>]*>([^<]+)<\/link>/i);
    const link = linkMatch ? linkMatch[1].trim() : "";
    const pubMatch = block.match(/<pubDate[^>]*>([^<]+)<\/pubDate>/i);
    const pubDate = pubMatch ? pubMatch[1].trim() : "";
    let description = getTagContent(block, "description");
    description = stripHtml(description);
    if (description.length > 280) {
      description = description.slice(0, 277).trim() + "…";
    }
    const coverImage = getEnclosureImageUrl(block);
    if (title && link) {
      const d = new Date(pubDate);
      const pubDateIso = !isNaN(d.getTime()) ? d.toISOString() : "";
      const row = {
        title,
        link,
        pubDate,
        pubDateIso,
        description,
      };
      if (coverImage) {
        row.coverImage = coverImage;
      }
      items.push(row);
    }
  }
  return items;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(204).end();
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const feedUrl = process.env.SUBSTACK_FEED_URL || DEFAULT_FEED;

  try {
    const r = await fetch(feedUrl, {
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml, */*",
        "User-Agent": "jarrydaddinall.com-feed/1.0",
      },
    });
    if (!r.ok) {
      return res.status(502).json({ error: "Feed unavailable" });
    }
    const xml = await r.text();
    const items = parseItems(xml, MAX_ITEMS);
    return res.status(200).json({ items });
  } catch {
    return res.status(500).json({ error: "Could not load feed" });
  }
};
