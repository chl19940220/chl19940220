#!/usr/bin/env node
/**
 * Regenerate assets/contribution-graph.svg
 * ------------------------------------------------------------------
 * Renders a black-terminal contribution heatmap (GitHub-dark green ramp)
 * from public contribution data. No API token required.
 *
 *   Data source : https://github-contributions-api.jogruber.de/v4/<user>?y=last
 *   Usage       : node scripts/gen-contributions.mjs [username] [outfile]
 *   Defaults    : username = $GITHUB_USERNAME or the value below
 *                 outfile  = assets/contribution-graph.svg
 *
 * Keep this file dependency-free: it runs on stock Node >= 18 (global fetch).
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const USER = process.argv[2] || process.env.GITHUB_USERNAME || "chl19940220";
const OUT = resolve(process.argv[3] || "assets/contribution-graph.svg");
const API = "https://github-contributions-api.jogruber.de/v4/" + USER + "?y=last";

/* GitHub dark-theme green ramp: level 0 (empty) -> 4 (busiest) */
const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const GREEN = "#39d353";
const DIM = "#8b949e";
const TEXT = "#c9d1d9";
const LINE = "#30363d";
const PANEL = "#161b22";

const CELL = 12;      /* cell size          */
const PITCH = 15;     /* cell size + gap    */
const PAD_X = 24;
const GRID_LEFT = 62; /* room for Mon/Wed/Fri labels */
const GRID_TOP = 96;  /* below title bar + prompt line */
const FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

const res = await fetch(API);
if (!res.ok) {
  console.error("contributions API responded " + res.status + " " + res.statusText);
  process.exit(1);
}
const payload = await res.json();
const days = payload.contributions || [];
if (!days.length) {
  console.error("no contribution data returned for " + USER);
  process.exit(1);
}

/* ---- lay the year out on a Sunday-first grid ------------------------- */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const dow = (iso) => new Date(iso + "T00:00:00Z").getUTCDay();
const monthOf = (iso) => Number(iso.slice(5, 7)) - 1;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const cells = [];
let week = 0;
for (let i = 0; i < days.length; i++) {
  const d = days[i];
  const row = dow(d.date);
  if (i > 0 && row === 0) week++;          /* new column every Sunday */
  cells.push({ x: week, y: row, level: Math.max(0, Math.min(4, d.level | 0)), count: d.count | 0, date: d.date });
}
const weeks = week + 1;
const total = cells.reduce((n, c) => n + c.count, 0);
const activeDays = cells.filter((c) => c.count > 0).length;
const best = cells.reduce((m, c) => (c.count > m.count ? c : m), cells[0]);

const gridW = weeks * PITCH - (PITCH - CELL);
const W = GRID_LEFT + gridW + PAD_X;
const H = GRID_TOP + 7 * PITCH - (PITCH - CELL) + 60;

/* ---- month labels (drawn above the column where the month flips) ----- */
let monthLabels = "";
let lastMonth = -1;
let lastLabelX = -999;
const colMonth = [];
for (const c of cells) if (colMonth[c.x] === undefined) colMonth[c.x] = monthOf(c.date);
for (let w = 0; w < weeks; w++) {
  const m = colMonth[w];
  if (m === undefined || m === lastMonth) continue;
  const x = GRID_LEFT + w * PITCH;
  if (x - lastLabelX >= 30) {
    monthLabels += '<text x="' + x + '" y="' + (GRID_TOP - 14) + '" fill="' + DIM + '" font-size="11">' + MONTHS[m] + "</text>";
    lastLabelX = x;
  }
  lastMonth = m;
}

/* ---- weekday labels -------------------------------------------------- */
let dowLabels = "";
[["Mon", 1], ["Wed", 3], ["Fri", 5]].forEach(([label, r]) => {
  dowLabels += '<text x="' + (GRID_LEFT - 10) + '" y="' + (GRID_TOP + r * PITCH + CELL - 2) + '" fill="' + DIM + '" font-size="11" text-anchor="end">' + label + "</text>";
});

/* ---- heatmap cells --------------------------------------------------- */
let rects = "";
for (const c of cells) {
  rects += '<rect x="' + (GRID_LEFT + c.x * PITCH) + '" y="' + (GRID_TOP + c.y * PITCH) + '" width="' + CELL + '" height="' + CELL + '" rx="2.5" fill="' + LEVEL_COLORS[c.level] + '"/>';
}

/* ---- legend ---------------------------------------------------------- */
const legendY = GRID_TOP + 7 * PITCH - (PITCH - CELL) + 24;
let legend = '<text x="' + (W - PAD_X - 5 * PITCH - 74) + '" y="' + (legendY + 10) + '" fill="' + DIM + '" font-size="11">Less</text>';
for (let i = 0; i < 5; i++) {
  legend += '<rect x="' + (W - PAD_X - 5 * PITCH - 44 + i * PITCH) + '" y="' + legendY + '" width="' + CELL + '" height="' + CELL + '" rx="2.5" fill="' + LEVEL_COLORS[i] + '"/>';
}
legend += '<text x="' + (W - PAD_X - 22) + '" y="' + (legendY + 10) + '" fill="' + DIM + '" font-size="11">More</text>';

/* ---- assemble -------------------------------------------------------- */
const svg = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="GitHub contribution graph for ' + esc(USER) + '">',
  "  <defs>",
  '    <clipPath id="frame"><rect x="0" y="0" width="' + W + '" height="' + H + '" rx="14"/></clipPath>',
  '    <radialGradient id="glow" cx="50%" cy="0%" r="80%"><stop offset="0%" stop-color="' + GREEN + '" stop-opacity="0.10"/><stop offset="100%" stop-color="' + GREEN + '" stop-opacity="0"/></radialGradient>',
  "  </defs>",
  '  <g clip-path="url(#frame)">',
  '    <rect width="' + W + '" height="' + H + '" fill="#000000"/>',
  '    <rect width="' + W + '" height="36" fill="' + PANEL + '"/>',
  '    <rect y="36" width="' + W + '" height="' + (H - 36) + '" fill="url(#glow)"/>',
  "  </g>",
  '  <rect x="0.5" y="0.5" width="' + (W - 1) + '" height="' + (H - 1) + '" rx="13.5" fill="none" stroke="' + LINE + '"/>',
  '  <line x1="0" y1="36.5" x2="' + W + '" y2="36.5" stroke="' + LINE + '"/>',
  '  <circle cx="22" cy="18" r="5.5" fill="#ff5f56"/><circle cx="40" cy="18" r="5.5" fill="#ffbd2e"/><circle cx="58" cy="18" r="5.5" fill="#27c93f"/>',
  '  <text x="76" y="23" fill="' + DIM + '" font-size="12" font-family="' + FONT + '">' + esc(USER) + "@github: ~/contributions</text>",
  '  <text x="' + (W - 16) + '" y="23" fill="' + LINE + '" font-size="12" text-anchor="end" font-family="' + FONT + '">last 365 days</text>',
  '  <text x="24" y="64" font-size="12.5" font-family="' + FONT + '"><tspan fill="' + GREEN + '">$</tspan><tspan fill="' + TEXT + '"> ./contributions.sh --last-year --user ' + esc(USER) + "</tspan></text>",
  monthLabels,
  dowLabels,
  rects,
  '  <text x="' + PAD_X + '" y="' + (legendY + 10) + '" font-size="12" font-family="' + FONT + '"><tspan fill="' + GREEN + '">' + total + '</tspan><tspan fill="' + DIM + '"> contributions in the last year  ·  </tspan><tspan fill="' + GREEN + '">' + activeDays + '</tspan><tspan fill="' + DIM + '"> active days  ·  best day </tspan><tspan fill="' + GREEN + '">' + best.count + '</tspan><tspan fill="' + DIM + '"> (' + best.date + ")</tspan></text>",
  legend,
  "</svg>",
  "",
].join("\n");

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, svg, "utf8");
console.log("wrote " + OUT + "  (" + weeks + " weeks, " + total + " contributions, " + svg.length + " bytes)");