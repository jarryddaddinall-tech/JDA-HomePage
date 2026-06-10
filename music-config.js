/**
 * Music page — edit this file only.
 *
 * Profile links (Listen elsewhere row): set each URL; empty string hides that button.
 * Spotify embed: paste iframe src from Spotify → Share → Embed into spotifyEmbedUrl.
 *
 * Demos (In progress tab): add projects under demos[]. Each project can list versions[]
 * with label, date, note, and src (path to .m4a in music/demos/).
 */
window.THE85_SOUND = {
  spotify: "https://open.spotify.com/artist/4u2g7E7RytlmzgomceqVFY",
  appleMusic: "https://music.apple.com/us/artist/the-85-sound/953719221",
  soundcloud: "https://soundcloud.com/the85sound",
  youtubeMusic: "",
  bandcamp: "",
  tidal: "",

  spotifyEmbedUrl:
    "https://open.spotify.com/embed/artist/4u2g7E7RytlmzgomceqVFY?utm_source=generator",

  demos: [
    {
      id: "coming-down",
      title: "Coming Down",
      status: "Work in progress",
      updated: "6 June 2026",
      story:
        "Started as a late-night sketch — moody chords and a vocal idea I wanted to capture before it disappeared. The title’s still shifting (Coming Down / Coming Home) while the arrangement finds its shape. Versions below are session exports, not final mixes.",
      art: "85",
      featured: true,
      versions: [
        {
          label: "v2 — Coming Home sketch",
          date: "6 Jun 2026",
          note: "Newer pass — tighter idea, still rough.",
          src: "music/demos/coming-down-6-june.m4a",
        },
        {
          label: "Session mix",
          date: "26 Mar 2026",
          note: "First pass — rough vocal, no master.",
          src: "music/demos/coming-down-26-march.m4a",
        },
      ],
    },
  ],
};
