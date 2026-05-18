import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nficcysmymokvxdamvwr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWNjeXNteW1va3Z4ZGFtdndyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwNjk4MDMsImV4cCI6MjA5NDY0NTgwM30.rJb5XaDwpvdRWZasa0RPA0_YhLjSPXfke0nQtO10GM4'
)

// ============================================================
// VIVID — Roblox Script Review Site
// ============================================================
// CONFIGURATION GUIDE (search "CONFIG:" to jump to each section)
//
// CONFIG: SITE_META       — name, discord link, social links
// CONFIG: ANNOUNCEMENTS   — add/edit announcements
// CONFIG: LIVE_TICKER     — the "live" banner text
// CONFIG: SPONSORS        — sponsor name, image, link
// CONFIG: MARKET_ITEMS    — paid marketplace listings
// CONFIG: INDEX_ITEMS     — free script listings
// CONFIG: TAGS            — master tag list you can add to
// CONFIG: BACKEND_NOTES   — read for auth/comments setup
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// CONFIG: SITE_META
// Change DISCORD_URL to your actual Discord invite link.
// Change each social href to your real profile URL.
// ============================================================
const DISCORD_URL = "https://discord.gg/YOURINVITE";
const SOCIAL_LINKS = {
  youtube:  "https://youtube.com/@YOURCHANNEL",
  tiktok:   "https://tiktok.com/@YOURHANDLE",
  twitter:  "https://x.com/YOURHANDLE",
  discord:  DISCORD_URL,
};

// ============================================================
// CONFIG: LIVE_TICKER
// Change this string. It shows in the top hero banner.
// ============================================================
const LIVE_TICKER = "Latest review: Solara Executor v3.2 — full breakdown on YouTube now";

// ============================================================
// CONFIG: ANNOUNCEMENTS
// type: "new" | "info" | "warn"
// Add objects to the top of the array for newest-first.
// ============================================================
const ANNOUNCEMENTS = [
  { type: "new",  title: "VIVID v1.0 — Site is live", date: "May 17, 2026" },
  { type: "info", title: "New marketplace section: Externals",  date: "May 14, 2026" },
  { type: "warn", title: "Fluxus key delays — read before purchasing", date: "May 10, 2026" },
  { type: "info", title: "YouTube: 10,000 subscribers — thank you", date: "May 3, 2026" },
];

// ============================================================
// CONFIG: SPONSORS
// Add a sponsor object: { name, tagline, logo, url }
// logo: put a URL to their logo image, or null for initials.
// Sponsors appear on the home page AND the Get modal.
// ============================================================
const SPONSORS = [
  { id: "s1", name: "KeySystem.io", tagline: "Key Management Platform", logo: null, url: "https://keysystem.io" },
  { id: "s2", name: "ScriptBlox",   tagline: "Script Discovery",         logo: null, url: "https://scriptblox.com" },
  { id: "s3", name: "ExecHub",      tagline: "Premium Script Hub",       logo: null, url: "https://exchub.gg" },
];

// ============================================================
// CONFIG: TAGS
// This is the master list. Add any tag string here and it
// becomes available to assign on any item.
// ============================================================
const MASTER_TAGS = [
  "Level 6","Level 7","UNC","iOS","Android","PC",
  "Free Tier","Lifetime","Premium","Budget",
  "Script Hub","Admin","ESP","Dev Tool","External",
  "Stable","Frequent Updates","Key System","Open Source",
  "LUA","Community","Curated","Anti-bypass","Remote","Debug",
  "Universal","Dark UI","Hub",
];

// ============================================================
// CONFIG: MARKET_ITEMS
// Fields:
//   id        — unique string, never change once set
//   name      — display name
//   cat       — category string
//   desc      — description paragraph
//   rating    — your rating, 0–5 (one decimal)
//   badge     — "paid" | "new"
//   tags      — array of strings from MASTER_TAGS (or custom)
//   video     — YouTube URL string, or null
//   img       — URL to thumbnail image, or null
//   sponsorId — id from SPONSORS if this item is sponsored, else null
//   shops     — array of { name, price, rating (0-5), url }
// ============================================================
const MARKET_ITEMS = [
  {
    id: "m1", name: "Solara Executor", cat: "Executor",
    desc: "Level 7 executor with full UNC support, a custom UI theme engine, and built-in script hub. One of the most stable picks right now with consistent weekly updates.",
    rating: 4.8, badge: "paid", tags: ["Level 7","UNC","Script Hub","Stable","Frequent Updates"],
    video: "https://youtube.com", img: null, sponsorId: "s1",
    shops: [
      { name: "Solara Shop",   price: "$4.99/mo", rating: 4.7, url: "https://solara.gg" },
      { name: "KeySystem.io",  price: "$3.49/mo", rating: 4.5, url: "https://keysystem.io" },
    ],
  },
  {
    id: "m2", name: "Hydrogen Executor", cat: "Executor",
    desc: "Premium-tier executor known for reliability and iOS support. Minimal UI, solid update schedule, and one of the few that works consistently on mobile.",
    rating: 4.5, badge: "paid", tags: ["iOS","Premium","Stable"],
    video: "https://youtube.com", img: null, sponsorId: null,
    shops: [
      { name: "Official Site", price: "$6.99/mo", rating: 4.6, url: "https://hydrogen.gg" },
      { name: "AltStore",      price: "$5.99/mo", rating: 4.2, url: "https://altstore.io" },
    ],
  },
  {
    id: "m3", name: "Delta External", cat: "External",
    desc: "External executor that sidesteps most anti-cheat detection. Solid entry-level choice, no injection required.",
    rating: 3.9, badge: "paid", tags: ["External","Anti-bypass","Budget"],
    video: null, img: null, sponsorId: null,
    shops: [
      { name: "DeltaExec", price: "$2.99/mo", rating: 3.8, url: "https://deltaexec.gg" },
    ],
  },
  {
    id: "m4", name: "SirHurt V3", cat: "Executor",
    desc: "One-time purchase executor with lifetime updates. One of the oldest executors on the market, still surprisingly competitive against subscription-based options.",
    rating: 4.2, badge: "paid", tags: ["Lifetime","Level 7","LUA","PC"],
    video: null, img: null, sponsorId: null,
    shops: [
      { name: "SirHurt.co", price: "$12.99 once", rating: 4.3, url: "https://sirhurt.net" },
      { name: "G2A",        price: "$9.99 once",  rating: 3.9, url: "https://g2a.com" },
    ],
  },
];

// ============================================================
// CONFIG: INDEX_ITEMS
// Fields: same as market but no shops.
//   link — URL the "Get" button redirects to (through your
//           link shortener / monetized redirect).
// ============================================================
const INDEX_ITEMS = [
  {
    id: "i1", name: "Infinite Yield", cat: "Admin",
    desc: "The definitive free admin script. Fully featured, broadly compatible, actively maintained. If you only get one admin script, get this one.",
    rating: 4.9, badge: "free", tags: ["Admin","Open Source","Universal"],
    video: "https://youtube.com", img: null,
    link: "https://yourredirect.com/iy",
  },
  {
    id: "i2", name: "Dex Explorer", cat: "Dev Tool",
    desc: "Powerful workspace GUI explorer. Browse the hierarchy, inspect and edit properties live inside any game.",
    rating: 4.7, badge: "free", tags: ["Dev Tool","Explorer"],
    video: null, img: null,
    link: "https://yourredirect.com/dex",
  },
  {
    id: "i3", name: "Universal ESP", cat: "Visual",
    desc: "ESP script with player boxes, health bars, names, and distance indicators. Works across most games without modification.",
    rating: 4.3, badge: "free", tags: ["ESP","Universal","PC"],
    video: null, img: null,
    link: "https://yourredirect.com/esp",
  },
  {
    id: "i4", name: "Dark Dex v3", cat: "Dev Tool",
    desc: "Updated Dex fork with a redesigned dark UI, better search, and improved performance on larger experiences.",
    rating: 4.6, badge: "free", tags: ["Dev Tool","Dark UI"],
    video: null, img: null,
    link: "https://yourredirect.com/darkdex",
  },
  {
    id: "i5", name: "Owl Hub", cat: "Script Hub",
    desc: "Community-maintained hub with hundreds of game-specific scripts. Simple to navigate, updated regularly by contributors.",
    rating: 4.4, badge: "free", tags: ["Hub","Community","Open Source"],
    video: "https://youtube.com", img: null,
    link: "https://yourredirect.com/owlhub",
  },
  {
    id: "i6", name: "RemoteSpy", cat: "Dev Tool",
    desc: "Intercepts RemoteEvents and RemoteFunctions in real time. Indispensable for reverse-engineering game logic.",
    rating: 4.8, badge: "new", tags: ["Dev Tool","Remote","Debug"],
    video: "https://youtube.com", img: null,
    link: "https://yourredirect.com/remotespy",
  },
];

// ============================================================
// CONFIG: BACKEND_NOTES
//
// AUTH & ACCOUNTS (email + password signup):
//   Recommended: Supabase (free tier, easy setup)
//   1. Create account at supabase.com
//   2. New project → Authentication → enable Email provider
//   3. In your site code, replace the mock auth functions
//      (handleLogin / handleRegister below) with:
//        import { createClient } from '@supabase/supabase-js'
//        const supabase = createClient(YOUR_URL, YOUR_ANON_KEY)
//        // Sign up:
//        await supabase.auth.signUp({ email, password })
//        // Log in:
//        await supabase.auth.signInWithPassword({ email, password })
//        // Get user:
//        const { data: { user } } = await supabase.auth.getUser()
//
// COMMENTS:
//   Same Supabase project → Table Editor → New table: "comments"
//   Columns: id (uuid), item_id (text), user_id (uuid),
//            username (text), body (text), created_at (timestamp)
//   Enable Row Level Security → allow insert for authenticated users,
//   allow select for everyone.
//   Replace mock comment functions with supabase.from('comments').insert(...)
//
// ANNOUNCEMENTS (update for all visitors):
//   Option A (simplest): Edit ANNOUNCEMENTS array above, redeploy.
//   Option B (no redeploy): Add a "announcements" table in Supabase,
//   fetch on page load, display dynamically.
//
// LIVE TICKER:
//   Same approach — either edit LIVE_TICKER string and redeploy,
//   or store in a Supabase "config" table and fetch on load.
//
// ITEM IMAGES:
//   Replace img: null with a URL string to any hosted image.
//   Recommended: upload to Cloudflare Images or Supabase Storage,
//   then use the public URL here.
//
// AFFILIATE LINKS:
//   Replace shop url values and index item link values with your
//   actual affiliate URLs. Most executors give you a code like
//   ?ref=YOURCODE appended to their shop URL.
//
// DISCORD REDIRECT:
//   Change DISCORD_URL at the top of this file.
//
// ROUTING (/terms, /privacy, /faq etc.):
//   This file handles routing in-app via the `page` state.
//   When you deploy to a real host (Vercel, Netlify, Cloudflare Pages):
//   - Vercel/Netlify: add a _redirects or vercel.json that rewrites
//     all paths to index.html so React handles routing.
//   - The paths like /terms, /faq already work in this app's
//     internal router — the URL bar won't update unless you add
//     window.history.pushState() calls, which you can add later.
// ============================================================

// ─── Seed comments (replace with DB fetch in production) ────
const SEED_COMMENTS = {
  m1: [
    { id:1, user:"voidscript", av:"VS", body:"Solara has been my daily for 6 months. Most stable executor I've used.", time:"2 days ago", likes:14 },
    { id:2, user:"rxblox",     av:"RB", body:"Key system is annoying but worth it for the feature set.",             time:"5 days ago", likes:7  },
  ],
  i1: [
    { id:1, user:"luarush", av:"LR", body:"IY is essential. Nothing else comes close for admin commands.", time:"1 week ago", likes:23 },
  ],
};

// ─── Palette ─────────────────────────────────────────────────
// Electric cyan-blue on deep charcoal. Sharp, technical, no AI-slop.
const P = {
  bg:      "#08090c",
  surface: "#0f1015",
  card:    "#13141a",
  cardHov: "#171820",
  border:  "#1f2029",
  borderH: "#2c2d3a",
  accent:  "#38bdf8",   // sky-400 — electric but not yellow
  accentD: "#0ea5e9",   // sky-500
  accentG: "rgba(56,189,248,0.08)",
  text:    "#e8eaf0",
  muted:   "#52546a",
  dim:     "#8486a0",
  red:     "#f87171",
  green:   "#34d399",
  orange:  "#fb923c",
  purple:  "#a78bfa",
};

// ─── Global styles ────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: ${P.bg};
  --surface: ${P.surface};
  --card: ${P.card};
  --card-hov: ${P.cardHov};
  --border: ${P.border};
  --border-h: ${P.borderH};
  --accent: ${P.accent};
  --accent-d: ${P.accentD};
  --accent-g: ${P.accentG};
  --text: ${P.text};
  --muted: ${P.muted};
  --dim: ${P.dim};
}

html { font-size: 15px; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: #252630; border-radius: 3px; }

a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; color: inherit; }
input, textarea, select {
  font-family: inherit;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 6px;
  padding: 9px 13px;
  font-size: 14px;
  width: 100%;
  outline: none;
  transition: border-color .2s;
  -webkit-appearance: none;
}
input:focus, textarea:focus, select:focus { border-color: var(--accent); }
input::placeholder, textarea::placeholder { color: var(--muted); }

.page { padding-top: 58px; min-height: 100vh; }

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 58px;
  background: rgba(8,9,12,0.92);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center;
  padding: 0 1.5rem;
  gap: 1.5rem;
}
.nav-logo {
  font-size: 1.15rem; font-weight: 800; letter-spacing: -0.5px;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  flex-shrink: 0;
}
.nav-logo-mark {
  width: 26px; height: 26px;
  background: var(--accent);
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: var(--bg);
}
.nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
.nav-link {
  padding: 6px 13px; border-radius: 6px;
  font-size: 14px; font-weight: 500; color: var(--dim);
  cursor: pointer; transition: all .15s; white-space: nowrap;
}
.nav-link:hover { color: var(--text); background: rgba(255,255,255,0.04); }
.nav-link.active { color: var(--text); background: rgba(255,255,255,0.06); }
.nav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* BUTTONS */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px; border-radius: 7px; font-family: inherit;
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all .15s; white-space: nowrap; padding: 8px 18px;
}
.btn-sm { font-size: 13px; padding: 6px 13px; border-radius: 6px; }
.btn-lg { font-size: 15px; padding: 11px 24px; border-radius: 8px; }
.btn-primary { background: var(--accent); color: var(--bg); }
.btn-primary:hover { background: var(--accent-d); }
.btn-ghost { border: 1px solid var(--border); color: var(--dim); background: transparent; }
.btn-ghost:hover { border-color: var(--border-h); color: var(--text); background: rgba(255,255,255,0.03); }
.btn-accent-ghost { border: 1px solid rgba(56,189,248,0.3); color: var(--accent); background: var(--accent-g); }
.btn-accent-ghost:hover { background: rgba(56,189,248,0.14); }
.btn:disabled { opacity: 0.38; cursor: not-allowed; }

/* CARDS */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}
.card {
  background: var(--card);
  cursor: pointer;
  display: flex; flex-direction: column;
  transition: background .15s;
}
.card:hover { background: var(--card-hov); }
.card-thumb {
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  background: var(--surface);
}
.card-thumb img { width: 100%; height: 100%; object-fit: cover; }
.card-thumb-bg {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 6px;
}
.card-thumb-icon { font-size: 2rem; opacity: 0.12; }
.card-thumb-cat { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.card-body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
.card-title { font-size: 15px; font-weight: 700; letter-spacing: -0.2px; line-height: 1.3; }
.card-desc { font-size: 13px; color: var(--dim); line-height: 1.5; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card-foot { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.card-fav { margin-left: auto; font-size: 16px; color: var(--muted); padding: 2px 4px; transition: color .15s; line-height: 1; }
.card-fav:hover, .card-fav.on { color: var(--accent); }

/* BADGES */
.badge {
  display: inline-block; font-size: 10px; font-weight: 700;
  padding: 2px 7px; border-radius: 4px; letter-spacing: .04em; text-transform: uppercase;
}
.badge-pos { position: absolute; top: 10px; right: 10px; }
.badge-paid  { background: rgba(56,189,248,0.14); color: var(--accent); }
.badge-free  { background: rgba(52,211,153,0.13); color: ${P.green}; }
.badge-new   { background: rgba(167,139,250,0.15); color: ${P.purple}; }
.badge-sponsored { background: rgba(251,146,60,0.15); color: ${P.orange}; }

/* TAG */
.tag {
  display: inline-block; font-size: 11px; font-weight: 500;
  padding: 2px 8px; border-radius: 4px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  color: var(--dim);
}

/* STARS */
.stars { font-size: 12px; letter-spacing: -1px; color: var(--accent); }
.rating-num { font-size: 13px; font-weight: 700; font-family: 'JetBrains Mono', monospace; }

/* SECTION */
.section { max-width: 1080px; margin: 0 auto; padding: 3.5rem 1.5rem; }
.section-head { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.5rem; }
.section-title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.3px; }
.section-more { font-size: 13px; color: var(--accent); cursor: pointer; margin-left: auto; }
.section-more:hover { color: var(--accent-d); }

/* DIVIDER */
.divider { height: 1px; background: var(--border); max-width: 1080px; margin: 0 auto; }

/* ANNOUNCE */
.announce-list { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; gap: 1px; background: var(--border); }
.announce-row {
  background: var(--card); padding: 13px 16px;
  display: flex; align-items: flex-start; gap: 12px;
  cursor: pointer; transition: background .15s;
}
.announce-row:hover { background: var(--card-hov); }
.announce-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }

/* SOCIALS */
.social-grid { display: flex; gap: 10px; flex-wrap: wrap; }
.social-card {
  display: flex; align-items: center; gap: 10px;
  background: var(--card); border: 1px solid var(--border);
  border-radius: 8px; padding: 10px 14px;
  cursor: pointer; transition: border-color .15s;
}
.social-card:hover { border-color: var(--border-h); }
.social-icon {
  width: 32px; height: 32px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 800; flex-shrink: 0;
}

/* SPONSORS */
.sponsor-grid { display: flex; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.sponsor-card {
  background: var(--card); flex: 1;
  display: flex; align-items: center; gap: 12px;
  padding: 16px 20px; cursor: pointer; transition: background .15s;
}
.sponsor-card:hover { background: var(--card-hov); }
.sponsor-logo {
  width: 44px; height: 44px; border-radius: 8px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; flex-shrink: 0; overflow: hidden;
}
.sponsor-logo img { width: 100%; height: 100%; object-fit: cover; }

/* FILTER TABS */
.filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 1.25rem; }
.filter-tab {
  padding: 5px 13px; border-radius: 20px; font-size: 13px; font-weight: 500;
  border: 1px solid var(--border); color: var(--dim);
  cursor: pointer; transition: all .15s; font-family: inherit;
}
.filter-tab:hover { border-color: var(--border-h); color: var(--text); }
.filter-tab.on { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 700; }

/* SEARCH BAR */
.search-wrap { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); pointer-events: none; font-size: 15px; }
.search-input { padding-left: 36px !important; }

/* DETAIL PAGE */
.detail-layout { display: grid; grid-template-columns: 1fr 360px; gap: 2rem; }
.detail-thumb { aspect-ratio: 16/9; background: var(--surface); border-radius: 8px; overflow: hidden; border: 1px solid var(--border); margin-bottom: 1.25rem; }
.detail-title { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.5px; margin-bottom: .5rem; line-height: 1.2; }
.detail-desc { color: var(--dim); line-height: 1.8; }

.side-box { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.side-label { font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
.info-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; padding: 5px 0; border-bottom: 1px solid var(--border); }
.info-row:last-child { border-bottom: none; }
.info-row-key { color: var(--dim); }

/* COMMENTS */
.comment-list { display: flex; flex-direction: column; gap: 16px; margin-top: 1.5rem; }
.comment { display: flex; gap: 12px; }
.comment-av { width: 32px; height: 32px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; font-family: 'JetBrains Mono', monospace; }
.comment-body { flex: 1; }
.comment-user { font-size: 13px; font-weight: 600; }
.comment-time { font-size: 11px; color: var(--muted); }
.comment-text { font-size: 13px; color: var(--dim); line-height: 1.6; margin-top: 3px; }
.comment-acts { display: flex; gap: 12px; margin-top: 6px; }
.comment-act { font-size: 12px; color: var(--muted); cursor: pointer; transition: color .15s; font-family: inherit; }
.comment-act:hover { color: var(--text); }

/* MODAL */
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 400; display: flex; align-items: center; justify-content: center; padding: 1rem; backdrop-filter: blur(8px); }
.modal { background: var(--card); border: 1px solid var(--border-h); border-radius: 10px; padding: 2rem; width: 100%; max-width: 440px; max-height: 90vh; overflow-y: auto; }
.modal-title { font-size: 1.3rem; font-weight: 800; letter-spacing: -0.3px; margin-bottom: 4px; }
.modal-sub { font-size: 13px; color: var(--muted); margin-bottom: 1.5rem; }
.form-group { margin-bottom: 14px; }
.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--dim); margin-bottom: 5px; letter-spacing: .03em; }
.form-footer { text-align: center; font-size: 13px; color: var(--muted); margin-top: 14px; }
.form-footer span { color: var(--accent); cursor: pointer; }

/* GET MODAL */
.get-shop-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.get-shop-row:last-child { border-bottom: none; }
.get-shop-name { font-size: 14px; font-weight: 600; }
.get-shop-price { font-family: 'JetBrains Mono', monospace; font-size: 1.05rem; font-weight: 700; color: var(--accent); }

/* SORT ROW */
.sort-row { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; margin-bottom: 14px; }
.sort-btn { padding: 4px 10px; border-radius: 5px; font-size: 12px; font-weight: 500; border: 1px solid var(--border); color: var(--dim); cursor: pointer; transition: all .15s; font-family: inherit; }
.sort-btn.on { background: rgba(56,189,248,0.1); border-color: var(--accent); color: var(--accent); }

/* TOAST */
.toast {
  position: fixed; bottom: 20px; right: 20px; z-index: 500;
  background: var(--card); border: 1px solid var(--border-h);
  border-radius: 8px; padding: 11px 18px;
  font-size: 13px; font-weight: 500;
  opacity: 0; transform: translateY(6px);
  transition: all .22s; pointer-events: none;
}
.toast.show { opacity: 1; transform: translateY(0); }

/* HERO */
.hero { max-width: 1080px; margin: 0 auto; padding: 4.5rem 1.5rem 3.5rem; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 4px 13px;
  font-size: 12px; color: var(--dim); margin-bottom: 1.25rem;
}
.hero-eyebrow-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }
.hero-title { font-size: clamp(2.75rem, 6vw, 4.75rem); font-weight: 800; letter-spacing: -2.5px; line-height: 1.0; margin-bottom: 1.1rem; }
.hero-title em { color: var(--accent); font-style: normal; }
.hero-sub { font-size: 1.05rem; color: var(--dim); max-width: 480px; line-height: 1.75; margin-bottom: 1.75rem; }
.hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; }

.ticker {
  display: inline-flex; align-items: center; gap: 10px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 6px; padding: 6px 13px;
  font-size: 12px; color: var(--dim); margin-bottom: 1.25rem;
}
.ticker-live {
  font-size: 10px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase; color: ${P.green};
  background: rgba(52,211,153,0.12); border-radius: 4px;
  padding: 2px 7px; flex-shrink: 0;
}

/* STATS */
.stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border-top: 1px solid var(--border); }
.stat-cell { background: var(--surface); padding: 1.5rem 1.25rem; }
.stat-num { font-size: 2.1rem; font-weight: 800; letter-spacing: -1.5px; font-family: 'JetBrains Mono', monospace; line-height: 1; margin-bottom: 4px; }
.stat-label { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }

/* FEATURED STRIP */
.featured-strip { display: flex; gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 1.25rem; }
.featured-cell { background: var(--card); flex: 1; padding: 14px 16px; cursor: pointer; transition: background .15s; min-width: 0; }
.featured-cell:hover { background: var(--card-hov); }
.featured-cell-label { font-size: 10px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
.featured-cell-name { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.featured-cell-sub { font-size: 12px; color: var(--accent); margin-top: 2px; }

/* PROFILE */
.profile-tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 1.5rem; }
.profile-tab { padding: 10px 18px; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all .15s; font-family: inherit; background: none; }
.profile-tab.on { color: var(--text); border-bottom-color: var(--accent); }
.profile-tab:hover { color: var(--text); }

/* STATIC PAGES */
.static-page { max-width: 760px; margin: 0 auto; padding: 3rem 1.5rem; }
.static-page h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 0.5rem; }
.static-page h2 { font-size: 1.15rem; font-weight: 700; margin: 2rem 0 0.5rem; color: var(--text); }
.static-page p { font-size: 14px; color: var(--dim); line-height: 1.8; margin-bottom: .75rem; }
.static-page ul { padding-left: 1.25rem; }
.static-page ul li { font-size: 14px; color: var(--dim); line-height: 1.8; margin-bottom: .25rem; }
.static-page .page-date { font-size: 12px; color: var(--muted); margin-bottom: 2rem; }

/* CONTACT/FORMS */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

/* EMPTY */
.empty { padding: 4rem 2rem; text-align: center; color: var(--muted); font-size: 14px; }
.empty-icon { font-size: 2rem; opacity: .2; margin-bottom: .75rem; }

/* RESPONSIVE */
@media (max-width: 900px) {
  .detail-layout { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .stats-bar { grid-template-columns: 1fr 1fr; }
  .hero { padding: 3rem 1rem 2.5rem; }
  .section { padding: 2.5rem 1rem; }
  .sponsor-grid { flex-direction: column; }
  .featured-strip { display: none; }
  .static-page { padding: 2rem 1rem; }
}
`;

// ─── Helpers ──────────────────────────────────────────────────
function Stars({ r }) {
  const f = Math.floor(r);
  const h = r % 1 >= 0.5;
  return (
    <span className="stars">
      {"★".repeat(f)}{h ? "½" : ""}{"☆".repeat(5 - f - (h ? 1 : 0))}
    </span>
  );
}
function Badge({ type }) {
  const map = { paid: "badge-paid", free: "badge-free", new: "badge-new" };
  const lbl = { paid: "PAID", free: "FREE", new: "NEW" };
  return <span className={`badge ${map[type] || "badge-free"}`}>{lbl[type] || "FREE"}</span>;
}
function Tag({ children }) {
  return <span className="tag">{children}</span>;
}
function Stars5({ val }) {
  return (
    <span className="stars" style={{ fontSize: 11 }}>
      {"★".repeat(Math.round(val))}{"☆".repeat(5 - Math.round(val))}
    </span>
  );
}

function Thumb({ item }) {
  const icons = { Executor:"⬡", External:"◈", "Dev Tool":"◉", Admin:"⬢", Visual:"◇", "Script Hub":"⊕", "Key System":"⊗", Hub:"⊕" };
  const bgs = { Executor:"#0b0e17", External:"#0e0c11", "Dev Tool":"#0b110e", Admin:"#11100b", Visual:"#100b11", "Script Hub":"#0b0e14", Hub:"#0b0e14" };
  return (
    <div className="card-thumb">
      {item.img
        ? <img src={item.img} alt={item.name} />
        : (
          <div className="card-thumb-bg" style={{ background: bgs[item.cat] || "#0e0f14" }}>
            <span className="card-thumb-icon" style={{ color: P.accent }}>{icons[item.cat] || "⬡"}</span>
            <span className="card-thumb-cat">{item.cat}</span>
          </div>
        )}
      <span className={`badge badge-pos badge-${item.badge}`}>{item.badge.toUpperCase()}</span>
      {item.sponsorId && <span className="badge badge-sponsored" style={{ position:"absolute", top:10, left:10 }}>SPONSORED</span>}
    </div>
  );
}

function ItemCard({ item, onOpen, favorites, toggleFav }) {
  const fav = favorites.includes(item.id);
  return (
    <div className="card" onClick={onOpen}>
      <Thumb item={item} />
      <div className="card-body">
        <div className="card-title">{item.name}</div>
        <div className="card-desc">{item.desc}</div>
        <div className="card-foot">
          <Stars r={item.rating} />
          <span className="rating-num">{item.rating.toFixed(1)}</span>
          <button
            className={`card-fav${fav ? " on" : ""}`}
            onClick={e => { e.stopPropagation(); toggleFav(item.id); }}
          >
            {fav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GET MODAL ────────────────────────────────────────────────
function GetModal({ item, sponsors, onClose, showToast }) {
  const [sort, setSort] = useState("rating-desc");
  const sponsorIds = sponsors.map(s => s.id);
  const sponsored = item.shops?.filter(s => s.sponsored) || [];
  const regular   = item.shops?.filter(s => !s.sponsored) || [];

  const sorted = [...regular].sort((a, b) => {
    if (sort === "rating-desc") return b.rating - a.rating;
    if (sort === "rating-asc")  return a.rating - b.rating;
    const pa = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
    const pb = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
    if (sort === "price-asc")  return pa - pb;
    if (sort === "price-desc") return pb - pa;
    return 0;
  });

  const sponsoredShops = sponsored.length
    ? sponsored
    : item.shops?.filter(s => sponsors.find(sp => sp.url && s.url && s.url.includes(sp.name.toLowerCase().split(".")[0]))) || [];

  const finalSponsored = item.shops?.filter(s =>
    sponsors.find(sp => s.sponsorId && s.sponsorId === sp.id)
  ) || [];

  const go = (url) => {
    showToast("Opening link…");
    setTimeout(() => window.open(url, "_blank", "noopener"), 300);
  };

  const ShopRow = ({ shop, isSponsored }) => (
    <div className="get-shop-row">
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="get-shop-name">{shop.name}</span>
          {isSponsored && <span className="badge badge-sponsored">Sponsor</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <Stars5 val={shop.rating} />
          <span style={{ fontSize: 12, color: P.muted }}>{shop.rating.toFixed(1)}</span>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div className="get-shop-price">{shop.price}</div>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }} onClick={() => go(shop.url)}>
          Get →
        </button>
      </div>
    </div>
  );

  const allShops = item.shops || [];
  const sponsShops = allShops.filter(s => s.sponsorId);
  const regShops   = allShops.filter(s => !s.sponsorId);

  const sortedReg = [...regShops].sort((a, b) => {
    if (sort === "rating-desc") return b.rating - a.rating;
    if (sort === "rating-asc")  return a.rating - b.rating;
    const pa = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
    const pb = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
    if (sort === "price-asc")  return pa - pb;
    if (sort === "price-desc") return pb - pa;
    return 0;
  });

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 500 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div>
            <div className="modal-title">{item.name}</div>
            <div className="modal-sub">Pick where you want to buy from.</div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ flexShrink: 0, marginTop: 2 }}>✕</button>
        </div>

        {sponsShops.length > 0 && (
          <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.18)", borderRadius: 8, padding: "4px 14px 0", marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: P.orange, padding: "10px 0 2px" }}>
              My Sponsors — listed first, not necessarily highest rated
            </div>
            {sponsShops.map(s => <ShopRow key={s.name} shop={s} isSponsored />)}
          </div>
        )}

        {regShops.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: P.muted }}>All Shops</span>
              <div className="sort-row" style={{ margin: 0 }}>
                {[["rating-desc","Rating ↓"],["rating-asc","Rating ↑"],["price-asc","Price ↑"],["price-desc","Price ↓"]].map(([v,l]) => (
                  <button key={v} className={`sort-btn${sort === v ? " on" : ""}`} onClick={() => setSort(v)}>{l}</button>
                ))}
              </div>
            </div>
            {sortedReg.map(s => <ShopRow key={s.name} shop={s} />)}
          </>
        )}

        <p style={{ fontSize: 11, color: P.muted, marginTop: 14, lineHeight: 1.5 }}>
          Links may be affiliate. I earn a small commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
}

// ─── AUTH MODAL ───────────────────────────────────────────────
function AuthModal({ mode: initMode, onClose, onAuth }) {
  const [mode, setMode]     = useState(initMode);
  const [username, setUsername] = useState("");
  const [email, setEmail]   = useState("");
  const [pass, setPass]     = useState("");
  const [err, setErr]       = useState("");

  const submit = async () => {
    setErr("");
    if (!username.trim()) { setErr("Username is required."); return; }
    if (mode === "register" && !email.trim()) { setErr("Email is required."); return; }
    if (mode === "register" && !/\S+@\S+\.\S+/.test(email)) { setErr("Enter a valid email."); return; }
    if (pass.length < 6) { setErr("Password must be at least 6 characters."); return; }

    if (mode === "register") {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: pass,
        options: { data: { username: username } }
      });
      if (error) { setErr(error.message); return; }
      onAuth({ username, email });
      onClose();
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass
      });
      if (error) { setErr(error.message); return; }
      const meta = data.user.user_metadata;
      onAuth({ username: meta.username, email: data.user.email });
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div className="modal-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
            <div className="modal-sub">{mode === "login" ? "Log in to comment and save favorites." : "An email is required to register."}</div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">✕</button>
        </div>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input placeholder="your_username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        {mode === "register" && (
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        {err && <div style={{ fontSize: 12, color: P.red, marginBottom: 10 }}>{err}</div>}
        <button className="btn btn-primary" style={{ width: "100%", borderRadius: 7, padding: "10px" }} onClick={submit}>
          {mode === "login" ? "Log in" : "Create account"}
        </button>
        <div className="form-footer">
          {mode === "login"
            ? <>No account? <span onClick={() => setMode("register")}>Register</span></>
            : <>Already have one? <span onClick={() => setMode("login")}>Log in</span></>
          }
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [page, setPage]         = useState("home");
  const [detail, setDetail]     = useState(null);
  const [detailSec, setDetailSec] = useState(null);
  const [modal, setModal]       = useState(null); // "login" | "register" | "get"
  const [getItem, setGetItem]   = useState(null);
  const [user, setUser]         = useState(null);
  const [favs, setFavs]         = useState([]);
  const [comments, setComments] = useState(SEED_COMMENTS);
  const [mFilter, setMFilter]   = useState("All");
  const [iFilter, setIFilter]   = useState("All");
  const [search, setSearch]     = useState("");
  const [profileTab, setProfileTab] = useState("favorites");
  const [toast, setToast]       = useState({ msg: "", show: false });
  const toastRef                = useRef(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const meta = session.user.user_metadata;
        setUser({ username: meta.username, email: session.user.email });
      }
    });
  }, []);

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
  }, []);

  const navTo = (p) => {
    setPage(p);
    setDetail(null);
    setSearch("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDetail = (item, sec) => {
    setDetail(item);
    setDetailSec(sec);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFav = (id) => {
    if (!user) { setModal("login"); return; }
    setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
    showToast(favs.includes(id) ? "Removed from favorites" : "Added to favorites");
  };

  const openGet = (item, e) => {
    e?.stopPropagation();
    setGetItem(item);
    setModal("get");
  };

  const addComment = (itemId, c) => {
    setComments(prev => ({ ...prev, [itemId]: [...(prev[itemId] || []), c] }));
  };

  const mCats = ["All", ...([...new Set(MARKET_ITEMS.map(i => i.cat))])];
  const iCats = ["All", ...([...new Set(INDEX_ITEMS.map(i => i.cat))])];

  const fMarket = MARKET_ITEMS
    .filter(i =>
      (mFilter === "All" || i.cat === mFilter) &&
      (!search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => (b.sponsorId ? 1 : 0) - (a.sponsorId ? 1 : 0));

  const fIndex = INDEX_ITEMS.filter(i =>
    (iFilter === "All" || i.cat === iFilter) &&
    (!search || i.name.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const navLinks = [
    { id: "home",        label: "Home"       },
    { id: "marketplace", label: "Marketplace" },
    { id: "index",       label: "Scripts"     },
  ];

  const staticPages = ["terms","privacy","disclaimer","faq","issue","contact","advertise"];
  const currentPageIsStatic = staticPages.includes(page);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navTo("home")}>
          <div className="nav-logo-mark">V</div>
          VIVID
        </div>
        <div className="nav-links">
          {navLinks.map(l => (
            <div key={l.id} className={`nav-link${page === l.id ? " active" : ""}`} onClick={() => navTo(l.id)}>
              {l.label}
            </div>
          ))}
          {user && (
            <div className={`nav-link${page === "profile" ? " active" : ""}`} onClick={() => navTo("profile")}>
              Profile
            </div>
          )}
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <div
                className="btn btn-ghost btn-sm"
                style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}
                onClick={() => navTo("profile")}
              >
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: P.accent, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: P.bg }}>
                  {user.username[0].toUpperCase()}
                </span>
                {user.username}
              </div>
<button className="btn btn-ghost btn-sm" onClick={async () => { await supabase.auth.signOut(); setUser(null); setFavs([]); showToast("Signed out"); }}>
  Sign out
</button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => setModal("login")}>Log in</button>
              <button className="btn btn-primary btn-sm" onClick={() => setModal("register")}>Register</button>
            </>
          )}
        </div>
      </nav>

      <div className="page">
        {!detail && page === "home" && (
          <HomePage navTo={navTo} openDetail={openDetail} openGet={openGet} />
        )}
        {!detail && page === "marketplace" && (
          <MarketPage
            items={fMarket} cats={mCats}
            filter={mFilter} setFilter={setMFilter}
            search={search} setSearch={setSearch}
            onOpen={i => openDetail(i, "marketplace")}
            onGet={openGet}
            favorites={favs} toggleFav={toggleFav}
          />
        )}
        {!detail && page === "index" && (
          <IndexPage
            items={fIndex} cats={iCats}
            filter={iFilter} setFilter={setIFilter}
            search={search} setSearch={setSearch}
            onOpen={i => openDetail(i, "index")}
            onGet={openGet}
            favorites={favs} toggleFav={toggleFav}
          />
        )}
        {!detail && page === "profile" && (
          <ProfilePage
            user={user} favs={favs}
            allItems={[...MARKET_ITEMS, ...INDEX_ITEMS]}
            comments={comments}
            profileTab={profileTab} setProfileTab={setProfileTab}
            openDetail={openDetail}
          />
        )}
        {!detail && currentPageIsStatic && (
          <StaticPage page={page} navTo={navTo} />
        )}
        {detail && (
          <DetailPage
            item={detail} section={detailSec}
            onBack={() => setDetail(null)}
            user={user} favorites={favs} toggleFav={toggleFav}
            commentsData={comments} onComment={addComment}
            showToast={showToast}
            onGet={openGet}
            setModal={setModal}
          />
        )}
      </div>

      <Footer navTo={navTo} />

      {modal === "login"    && <AuthModal mode="login"    onClose={() => setModal(null)} onAuth={u => { setUser(u); showToast(`Welcome, ${u.username}!`); }} />}
      {modal === "register" && <AuthModal mode="register" onClose={() => setModal(null)} onAuth={u => { setUser(u); showToast(`Welcome, ${u.username}!`); }} />}
      {modal === "get" && getItem && (
        <GetModal item={getItem} sponsors={SPONSORS} onClose={() => { setModal(null); setGetItem(null); }} showToast={showToast} />
      )}

      <div className={`toast${toast.show ? " show" : ""}`}>{toast.msg}</div>
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────
function HomePage({ navTo, openDetail, openGet }) {
  return (
    <>
      <div style={{ borderBottom: `1px solid ${P.border}` }}>
        <div className="hero">
          <div className="ticker">
            <span className="ticker-live">Live</span>
            {LIVE_TICKER}
          </div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Roblox Script & Executor Reviews
          </div>
          <h1 className="hero-title">
            Know exactly<br />
            what you're<br />
            <em>running.</em>
          </h1>
          <p className="hero-sub">
            Honest, independent reviews of Roblox executors, scripts, and tools.
            No pay-to-rank. No bias. Just breakdowns.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={() => navTo("marketplace")}>Browse Marketplace</button>
            <button className="btn btn-ghost btn-lg" onClick={() => navTo("index")}>Free Scripts</button>
          </div>
        </div>
        <div className="stats-bar">
          {[["48","Executors Reviewed"],["120+","Scripts Indexed"],["10K","Subscribers"],["4.8","Avg Score"]].map(([n, l]) => (
            <div key={l} className="stat-cell">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Announcements</h2>
        </div>
        <div className="announce-list">
          {ANNOUNCEMENTS.map((a, i) => {
            const col  = { new: P.accent, info: P.dim, warn: P.orange }[a.type];
            const bMap = { new: "badge-paid", info: "badge-free", warn: "badge-new" };
            const bLbl = { new: "NEW", info: "INFO", warn: "NOTICE" };
            return (
              <div key={i} className="announce-row">
                <div className="announce-dot" style={{ background: col }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: P.muted, marginTop: 2 }}>{a.date}</div>
                </div>
                <span className={`badge ${bMap[a.type]}`}>{bLbl[a.type]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Featured Picks</h2>
          <span className="section-more" onClick={() => navTo("marketplace")}>View all →</span>
        </div>
        <div className="featured-strip">
          {[
            { l:"Top Executor", n:"Solara Executor", s:"#1 this month" },
            { l:"Best Value",   n:"SirHurt V3",      s:"One-time pay"  },
            { l:"Free Pick",    n:"Infinite Yield",  s:"Still unbeaten" },
            { l:"Latest Review",n:"RemoteSpy",        s:"Just published" },
          ].map((f, i) => (
            <div key={i} className="featured-cell">
              <div className="featured-cell-label">{f.l}</div>
              <div className="featured-cell-name">{f.n}</div>
              <div className="featured-cell-sub">{f.s}</div>
            </div>
          ))}
        </div>
        <div className="card-grid">
          {[...MARKET_ITEMS.slice(0, 3), ...INDEX_ITEMS.slice(0, 3)].map(item => (
            <ItemCard key={item.id} item={item}
              onOpen={() => openDetail(item, item.id[0] === "m" ? "marketplace" : "index")}
              favorites={[]} toggleFav={() => {}}
            />
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Find me everywhere</h2>
        </div>
        <div className="social-grid">
          {[
            { ic:"YT", name:"YouTube",   sub:"Reviews & walkthroughs",   color:"#ff4444", href: SOCIAL_LINKS.youtube  },
            { ic:"TT", name:"TikTok",    sub:"Short clips & highlights",  color:"#e040fb", href: SOCIAL_LINKS.tiktok   },
            { ic:"X",  name:"Twitter / X",sub:"Updates & announcements",  color:"#1d9bf0", href: SOCIAL_LINKS.twitter  },
            { ic:"DC", name:"Discord",   sub:"Community & support",       color:"#5865f2", href: SOCIAL_LINKS.discord  },
          ].map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
              <div className="social-card">
                <div className="social-icon" style={{ background: s.color + "22", color: s.color }}>{s.ic}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: P.muted }}>{s.sub}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Sponsors</h2>
        </div>
        <div className="sponsor-grid">
          {SPONSORS.map(s => (
            <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
              <div className="sponsor-card">
                <div className="sponsor-logo">
                  {s.logo ? <img src={s.logo} alt={s.name} /> : s.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: P.muted }}>{s.tagline}</div>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 18, color: P.muted }}>→</span>
              </div>
            </a>
          ))}
        </div>
        <p style={{ fontSize: 12, color: P.muted, marginTop: 10, lineHeight: 1.6 }}>
          Sponsorships don't influence review scores. All opinions are independent.
        </p>
      </div>
    </>
  );
}

// ─── MARKETPLACE PAGE ─────────────────────────────────────────
function MarketPage({ items, cats, filter, setFilter, search, setSearch, onOpen, onGet, favorites, toggleFav }) {
  const sponsored = items.filter(i => i.sponsorId);
  const regular   = items.filter(i => !i.sponsorId);

  return (
    <div className="section">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 5 }}>Marketplace</h1>
        <p style={{ color: P.muted, fontSize: 14 }}>Paid executors and tools I've reviewed. Links are affiliate — I earn a commission at no extra cost to you.</p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: "1.25rem" }}>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input className="search-input" placeholder="Search marketplace…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="filter-tabs">
        {cats.map(c => <button key={c} className={`filter-tab${filter === c ? " on" : ""}`} onClick={() => setFilter(c)}>{c}</button>)}
      </div>
      {items.length === 0 ? (
        <div className="empty"><div className="empty-icon">⬡</div>Nothing matches your search.</div>
      ) : (
        <>
          {sponsored.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: P.orange, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <span className="badge badge-sponsored">Sponsored</span>
                <span style={{ color: P.muted, fontWeight: 400, fontSize: 11, textTransform: "none", letterSpacing: 0 }}>Listed first — sponsored, not necessarily highest rated</span>
              </div>
              <div className="card-grid" style={{ marginBottom: 20 }}>
                {sponsored.map(i => <ItemCard key={i.id} item={i} onOpen={() => onOpen(i)} favorites={favorites} toggleFav={toggleFav} />)}
              </div>
            </>
          )}
          {regular.length > 0 && (
            <div className="card-grid">
              {regular.map(i => <ItemCard key={i.id} item={i} onOpen={() => onOpen(i)} favorites={favorites} toggleFav={toggleFav} />)}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── INDEX PAGE ───────────────────────────────────────────────
function IndexPage({ items, cats, filter, setFilter, search, setSearch, onOpen, onGet, favorites, toggleFav }) {
  return (
    <div className="section">
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 5 }}>Script Index</h1>
        <p style={{ color: P.dim, fontSize: 14 }}>
          Free scripts I've used and recommend. Links redirect through a monetized shortener —{" "}
          <a href="https://fmhy.net/privacy#adblocking" target="_blank" rel="noopener noreferrer" style={{ color: P.accent, textDecoration: "underline" }}>
            use an adblocker and link bypasser
          </a>
          .
        </p>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: "1.25rem" }}>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input className="search-input" placeholder="Search scripts…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="filter-tabs">
        {cats.map(c => <button key={c} className={`filter-tab${filter === c ? " on" : ""}`} onClick={() => setFilter(c)}>{c}</button>)}
      </div>
      {items.length === 0 ? (
        <div className="empty"><div className="empty-icon">⬡</div>Nothing matches your search.</div>
      ) : (
        <div className="card-grid">
          {items.map(i => <ItemCard key={i.id} item={i} onOpen={() => onOpen(i)} favorites={favorites} toggleFav={toggleFav} />)}
        </div>
      )}
    </div>
  );
}

// ─── DETAIL PAGE ──────────────────────────────────────────────
function DetailPage({ item, section, onBack, user, favorites, toggleFav, commentsData, onComment, showToast, onGet, setModal }) {
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked]             = useState([]);
  const [itemComments, setItemComments] = useState([]);
  const fav      = favorites.includes(item.id);
  const isMarket = section === "marketplace";

  useEffect(() => {
    supabase.from('comments')
      .select('*')
      .eq('item_id', item.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setItemComments(data || []));
  }, [item.id]);

  const postComment = async () => {
    if (!user) { setModal("login"); return; }
    if (!commentText.trim()) return;
    const { error } = await supabase.from('comments').insert({
      item_id: item.id,
      user_id: (await supabase.auth.getUser()).data.user.id,
      username: user.username,
      body: commentText.trim(),
    });
    if (error) { showToast("Failed to post"); return; }
    const { data } = await supabase.from('comments')
      .select('*')
      .eq('item_id', item.id)
      .order('created_at', { ascending: true });
    setItemComments(data || []);
    setCommentText("");
    showToast("Comment posted");
  };

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ marginBottom: "1.5rem" }}>
        ← Back to {isMarket ? "Marketplace" : "Scripts"}
      </button>

      <div className="detail-layout">
        <div>
          <div className="detail-thumb">
            <Thumb item={item} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Badge type={item.badge} />
            <Tag>{item.cat}</Tag>
            {item.tags?.map(t => <Tag key={t}>{t}</Tag>)}
          </div>

          <h1 className="detail-title">{item.name}</h1>
          <p className="detail-desc" style={{ marginBottom: "1.25rem" }}>{item.desc}</p>

          {item.video && (
            <a href={item.video} target="_blank" rel="noopener noreferrer">
              <div className="btn btn-ghost" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                <span style={{ color: "#ff4444" }}>▶</span> Watch my full review on YouTube
              </div>
            </a>
          )}

          <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: "1.75rem" }}>
            <div style={{ fontWeight: 700, marginBottom: "1.25rem", fontSize: 15 }}>
              Comments <span style={{ color: P.muted, fontWeight: 400, fontSize: 13 }}>({itemComments.length})</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: "1.5rem" }}>
              <div className="comment-av" style={{ color: P.accent }}>{user ? user.username[0].toUpperCase() : "?"}</div>
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <textarea
                  placeholder={user ? "Write a comment…" : "Log in to comment"}
                  disabled={!user}
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  style={{ resize: "none", minHeight: 66, flex: 1 }}
                />
                <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-end", padding: "8px 14px" }} onClick={postComment} disabled={!user || !commentText.trim()}>
                  Post
                </button>
              </div>
            </div>
            {itemComments.length === 0 && (
              <p style={{ fontSize: 13, color: P.muted }}>No comments yet. Leave the first one.</p>
            )}
            <div className="comment-list">
              {itemComments.map(c => (
                <div key={c.id} className="comment">
                  <div className="comment-av" style={{ color: P.accent }}>{c.av}</div>
                  <div className="comment-body">
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span className="comment-user">{c.user}</span>
                      <span className="comment-time">{c.time}</span>
                    </div>
                    <p className="comment-text">{c.body}</p>
                    <div className="comment-acts">
                      <button className="comment-act" style={{ color: liked.includes(c.id) ? P.accent : P.muted }}
                        onClick={() => !liked.includes(c.id) && setLiked(l => [...l, c.id])}>
                        ♥ {c.likes + (liked.includes(c.id) ? 1 : 0)}
                      </button>
                      <button className="comment-act">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Quick Info — above rating */}
          <div className="side-box">
            <div className="side-label">Quick Info</div>
            {[
              ["Category", item.cat],
              ["Type",     isMarket ? "Paid" : "Free"],
              ["Badge",    item.badge.toUpperCase()],
            ].map(([k, v]) => (
              <div key={k} className="info-row">
                <span className="info-row-key">{k}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div className="side-box">
            <div className="side-label">My Rating</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Stars r={item.rating} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.5rem", fontWeight: 700 }}>
                {item.rating.toFixed(1)}
              </span>
            </div>
            {[["Performance","9"],["Stability","8"],["UI / UX","8"],["Support","7"],["Value","9"]].map(([k, v]) => (
              <div key={k} className="info-row">
                <span className="info-row-key">{k}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{v}/10</span>
              </div>
            ))}
          </div>

          {/* Fav + Get */}
          <div className="side-box">
            <button
              onClick={() => toggleFav(item.id)}
              className={`btn ${fav ? "btn-accent-ghost" : "btn-ghost"}`}
              style={{ width: "100%", marginBottom: 8 }}
            >
              {fav ? "♥ Saved" : "♡ Save to Favorites"}
            </button>
            {isMarket ? (
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={e => onGet(item, e)}>
                Buy / Get →
              </button>
            ) : (
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-primary" style={{ width: "100%" }}>Get Script →</button>
              </a>
            )}
            {isMarket && (
              <p style={{ fontSize: 11, color: P.muted, marginTop: 10, lineHeight: 1.5 }}>
                Affiliate links — I earn a small commission at no extra cost to you.
              </p>
            )}
          </div>

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div className="side-box">
              <div className="side-label">Tags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────
function ProfilePage({ user, favs, allItems, comments, profileTab, setProfileTab, openDetail }) {
  if (!user) return (
    <div className="empty" style={{ paddingTop: "6rem" }}>
      <div className="empty-icon">⬡</div>
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>You're not logged in</div>
      <div>Log in or register to view your profile.</div>
    </div>
  );

  const favItems = allItems.filter(i => favs.includes(i.id));
  const myComments = Object.entries(comments).flatMap(([id, coms]) =>
    coms.filter(c => c.user === user.username).map(c => ({
      ...c, itemId: id, itemName: allItems.find(i => i.id === id)?.name,
    }))
  );

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <div style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 10, padding: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{ width: 66, height: 66, borderRadius: "50%", background: P.surface, border: `2px solid ${P.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "1.75rem", fontWeight: 700, flexShrink: 0, color: P.accent }}>
          {user.username[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.3px", marginBottom: 3 }}>{user.username}</div>
          {user.email && <div style={{ fontSize: 12, color: P.muted, marginBottom: 6 }}>{user.email}</div>}
          <div style={{ display: "flex", gap: "1.25rem", fontSize: 13, color: P.muted }}>
            <span><strong style={{ color: P.text, fontFamily: "'JetBrains Mono', monospace" }}>{favItems.length}</strong> saved</span>
            <span><strong style={{ color: P.text, fontFamily: "'JetBrains Mono', monospace" }}>{myComments.length}</strong> comments</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        {[["favorites","Saved"],["comments","Comments"]].map(([id, l]) => (
          <button key={id} className={`profile-tab${profileTab === id ? " on" : ""}`} onClick={() => setProfileTab(id)}>{l}</button>
        ))}
      </div>

      {profileTab === "favorites" && (
        favItems.length === 0 ? (
          <div className="empty"><div className="empty-icon">♡</div>Nothing saved yet.</div>
        ) : (
          <div className="card-grid">
            {favItems.map(i => (
              <ItemCard key={i.id} item={i}
                onOpen={() => openDetail(i, i.id[0] === "m" ? "marketplace" : "index")}
                favorites={favs} toggleFav={() => {}}
              />
            ))}
          </div>
        )
      )}

      {profileTab === "comments" && (
        myComments.length === 0 ? (
          <div className="empty"><div className="empty-icon">💬</div>No comments yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: P.border, border: `1px solid ${P.border}`, borderRadius: 8, overflow: "hidden" }}>
            {myComments.map(c => (
              <div key={c.id} style={{ background: P.card, padding: "13px 16px" }}>
                <div style={{ fontSize: 11, color: P.muted, marginBottom: 4 }}>
                  On <span style={{ color: P.accent }}>{c.itemName}</span> · {c.time}
                </div>
                <p style={{ fontSize: 13, color: P.dim }}>{c.body}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

// ─── STATIC PAGES ─────────────────────────────────────────────
function StaticPage({ page, navTo }) {
  const pages = {
    terms: {
      title: "Terms of Service",
      date: "Last updated: May 17, 2026",
      content: [
        ["Overview", "By using VIVID (\"the site\"), you agree to the following terms. If you do not agree, please do not use the site."],
        ["Accounts", "You must be 13 or older to create an account. You are responsible for keeping your credentials secure. I reserve the right to suspend or terminate accounts that violate these terms."],
        ["Content", "Comments and content you post must not be illegal, harassing, defamatory, or spam. I reserve the right to remove any content without notice."],
        ["Affiliate Disclosure", "Some links on this site are affiliate links. I may earn a commission when you click them and make a purchase. This never affects my review scores."],
        ["Sponsored Content", "Sponsors pay to be listed on the site. Sponsorship does not influence review ratings or written content. Sponsored items are always clearly labeled."],
        ["Accuracy", "Reviews and information are provided in good faith. I cannot guarantee the accuracy of third-party product descriptions or pricing."],
        ["Limitation of Liability", "VIVID is not responsible for any issues arising from the use of products linked on this site, including but not limited to account bans, data loss, or software damage. Use all scripts and executors at your own risk."],
        ["Changes", "These terms may be updated at any time. Continued use of the site constitutes acceptance of any changes."],
      ],
    },
    privacy: {
      title: "Privacy Policy",
      date: "Last updated: May 17, 2026",
      content: [
        ["What I Collect", "When you register, I collect your username and email address. Comments you post are stored and publicly visible."],
        ["How It's Used", "Your email is used only for account authentication. It is never sold, shared with third parties, or used for marketing without consent."],
        ["Cookies", "The site may use cookies to keep you logged in. No tracking or advertising cookies are used by the site itself. Third-party embeds (e.g. YouTube) may set their own cookies."],
        ["Third Parties", "Affiliate links redirect to third-party shops. Those shops have their own privacy policies and I am not responsible for their data practices."],
        ["Data Deletion", "To request deletion of your account and associated data, contact me via the contact page."],
        ["Security", "Account passwords are hashed and never stored in plain text."],
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      date: "Last updated: May 17, 2026",
      content: [
        ["General", "The information on VIVID is for informational purposes only. Reviews represent my personal opinion based on my own testing and experience."],
        ["Roblox Terms of Service", "Using executors and scripts may violate Roblox's Terms of Service and can result in account bans. By using any products linked on this site, you accept full responsibility for any consequences."],
        ["No Warranty", "Products and scripts listed on this site are provided without any warranty of fitness or merchantability. I am not responsible for any harm caused by their use."],
        ["External Links", "Links to external sites are provided for convenience. I do not endorse and am not responsible for the content of linked sites."],
        ["Affiliate Links", "I participate in affiliate programs. Clicking affiliate links and making purchases may earn me a commission at no extra cost to you."],
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      date: null,
      content: [
        ["What is VIVID?", "VIVID is a personal review site for Roblox executors, scripts, and related tools. I test everything myself and post my findings here."],
        ["Are the reviews paid for?", "No. Review scores are entirely independent. Sponsors can pay to be featured on the site but cannot influence ratings."],
        ["What are affiliate links?", "When you click a marketplace link and buy something, I may earn a small commission from the shop at no extra cost to you."],
        ["Why do script links redirect?", "Index links go through a monetized shortener to support the site. I recommend using an adblocker and link bypasser — see the note on the Scripts page."],
        ["Is it safe to use executors?", "Using executors violates Roblox's Terms of Service. Your account can be banned. I review them for informational purposes — use at your own risk."],
        ["Can I suggest a script or executor?", "Yes — use the contact page to suggest something for review."],
        ["How do I delete my account?", "Use the contact page and I'll handle it manually until an automated option is available."],
      ],
    },
    issue: {
      title: "Report an Issue",
      date: null,
      isForm: true,
      formType: "issue",
      content: [
        ["", "Found a broken link, incorrect information, or something else wrong? Let me know using the form below."],
      ],
    },
    contact: {
      title: "Contact",
      date: null,
      isForm: true,
      formType: "contact",
      content: [
        ["", "Send me a message for general inquiries, suggestions, or account deletion requests."],
      ],
    },
    advertise: {
      title: "Advertise / Sponsor",
      date: null,
      content: [
        ["Sponsorship Opportunities", "I offer sponsorship placements on the homepage and inside the marketplace Get panel. Sponsored items appear first in their category, clearly labeled as sponsored."],
        ["What I Don't Do", "I do not sell review scores or positive coverage. Any partnership is limited to placement and visibility — not editorial control."],
        ["Pricing", "Pricing varies depending on placement and duration. Reach out via Discord or the contact page for a quote."],
        ["Requirements", "I only sponsor products I consider legitimate. I reserve the right to decline any partnership."],
        ["Get in Touch", "Use the contact page or reach out directly on Discord."],
      ],
    },
  };

  const data = pages[page];
  if (!data) return null;

  return (
    <div className="static-page">
      <button onClick={() => navTo("home")} className="btn btn-ghost btn-sm" style={{ marginBottom: "1.5rem" }}>← Home</button>
      <h1>{data.title}</h1>
      {data.date && <p className="page-date">{data.date}</p>}
      {!data.date && <div style={{ height: "1rem" }} />}

      {data.content.map(([heading, body], i) => (
        <div key={i}>
          {heading && <h2>{heading}</h2>}
          <p>{body}</p>
        </div>
      ))}

      {data.isForm && <ContactForm type={data.formType} />}
    </div>
  );
}

function ContactForm({ type }) {
  const [sent, setSent]       = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody]       = useState("");

  // In production: POST to your backend/Supabase edge function or Formspree
const submit = async () => {
  if (!email.trim() || !body.trim()) return
  const res = await fetch('https://formspree.io/f/XXXXXXXX', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message: body })
  })
  if (res.ok) setSent(true)
}

  if (sent) return (
    <div style={{ background: P.card, border: `1px solid ${P.border}`, borderRadius: 8, padding: "1.5rem", marginTop: "1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>✓</div>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>Sent</div>
      <p style={{ fontSize: 13, color: P.muted }}>I'll get back to you as soon as I can.</p>
    </div>
  );

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div className="contact-grid">
        <div className="form-group">
          <label className="form-label">Your Name</label>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
      {type === "issue" && (
        <div className="form-group">
          <label className="form-label">What's the issue?</label>
          <input placeholder="e.g. Broken link on Solara page" value={subject} onChange={e => setSubject(e.target.value)} />
        </div>
      )}
      {type === "contact" && (
        <div className="form-group">
          <label className="form-label">Subject</label>
          <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Message</label>
        <textarea placeholder="Your message…" value={body} onChange={e => setBody(e.target.value)} style={{ minHeight: 120, resize: "vertical" }} />
      </div>
      <button className="btn btn-primary" onClick={submit} disabled={!email.trim() || !body.trim()}>
        Send message
      </button>
      <p style={{ fontSize: 12, color: P.muted, marginTop: 10, lineHeight: 1.6 }}>
        Note: contact forms require a backend integration (Formspree, Supabase Edge Functions, or similar) to actually send emails. See CONFIG: BACKEND_NOTES in the source file.
      </p>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer({ navTo }) {
  const legal   = [["Terms of Service","terms"],["Privacy Policy","privacy"],["Disclaimer","disclaimer"]];
  const support = [
    ["Discord Server", null, DISCORD_URL],
    ["FAQ",            "faq",  null],
    ["Report an Issue","issue",null],
    ["Contact",        "contact",null],
    ["Advertise",      "advertise",null],
  ];

  return (
    <footer style={{ borderTop: `1px solid ${P.border}` }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, fontSize: "1.1rem", marginBottom: 10 }}>
              <div className="nav-logo-mark" style={{ width: 22, height: 22, fontSize: 11 }}>V</div>
              VIVID
            </div>
            <p style={{ fontSize: 13, color: P.muted, lineHeight: 1.7, maxWidth: 280 }}>
              Honest, independent reviews of Roblox executors and scripts. No bias, no pay-to-rank.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: P.muted, marginBottom: 12 }}>Navigate</div>
            {[["Home","home"],["Marketplace","marketplace"],["Scripts","index"],["Profile","profile"]].map(([l,p]) => (
              <div key={l} onClick={() => navTo(p)} style={{ fontSize: 13, color: P.dim, marginBottom: 8, cursor: "pointer", transition: "color .15s" }}
                onMouseEnter={e => e.target.style.color = P.text} onMouseLeave={e => e.target.style.color = P.dim}>
                {l}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: P.muted, marginBottom: 12 }}>Legal</div>
            {legal.map(([l, p]) => (
              <div key={l} onClick={() => navTo(p)} style={{ fontSize: 13, color: P.dim, marginBottom: 8, cursor: "pointer", transition: "color .15s" }}
                onMouseEnter={e => e.target.style.color = P.text} onMouseLeave={e => e.target.style.color = P.dim}>
                {l}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: P.muted, marginBottom: 12 }}>Support</div>
            {support.map(([l, p, href]) => (
              href
                ? <a key={l} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontSize: 13, color: P.dim, marginBottom: 8, transition: "color .15s" }}
                    onMouseEnter={e => e.target.style.color = P.text} onMouseLeave={e => e.target.style.color = P.dim}>{l}</a>
                : <div key={l} onClick={() => navTo(p)} style={{ fontSize: 13, color: P.dim, marginBottom: 8, cursor: "pointer", transition: "color .15s" }}
                    onMouseEnter={e => e.target.style.color = P.text} onMouseLeave={e => e.target.style.color = P.dim}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.25rem", borderTop: `1px solid ${P.border}`, fontSize: 12, color: P.muted, flexWrap: "wrap", gap: 8 }}>
          <span>© 2026 VIVID. All rights reserved.</span>
          <span>Affiliate links may earn me a commission at no extra cost to you.</span>
        </div>
      </div>
    </footer>
  );
}
