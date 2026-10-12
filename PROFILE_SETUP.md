# Profile README - setup guide

Black-terminal academic profile for **github.com/chl19940220**.

> Everything external in this guide was tested on **2026-10-12**. Where a service
> was broken, that is stated explicitly instead of being quietly wired in.

---

## 1. What is in the box

| File | Role | Needs editing |
|---|---|---|
| README.md | the profile page itself | no - every placeholder is filled in |
| assets/banner.svg | hero terminal banner | no |
| assets/cards/paper-1.svg | publication card 1 (real Crossref metadata) | no |
| assets/cards/paper-2.svg | publication card 2 | yes - the author line only |
| assets/summary/*.svg | the five GitHub summary cards in the stats section | no - snapshots, see section 6 |
| scripts/fetch-summary-cards.sh | downloads those five cards | no |
| .github/workflows/profile-summary-cards.yml | daily refresh of the cards | no |
| assets/cards/more-papers.svg | "all publications" card | unused - not referenced by the README any more |
| assets/contribution-graph.svg | 365-day heatmap | unused - not referenced by the README any more |
| scripts/gen-contributions.mjs | heatmap generator | unused |
| .github/workflows/contributions.yml | daily heatmap refresh | consider disabling - it commits a file nobody displays |
| archive/README.v1.md | your previous README | delete when happy |

---

## 2. Quick start

**Step 1 - almost nothing to fill in.** The README itself has no placeholders left; the
only open one is the author line of the second publication card (section 3).

**Step 2 - refresh the summary cards** (optional, they are already committed):

```bash
UTC_OFFSET=8 bash scripts/fetch-summary-cards.sh
```

**Step 3 - enable the daily refresh.** Push the repo, then open
**Actions -> Refresh GitHub summary cards -> Run workflow** once. It runs daily at
01:23 UTC afterwards. The default token is enough; there are no secrets to add.

**Step 4 - push and look at the page.**

```bash
git add -A
git commit -m "docs: add GitHub summary cards"
git push
```

**Step 5 -** visit https://github.com/chl19940220 and check both themes (GitHub
settings -> Appearance -> light / dark). Every image is black-on-black in both, so the
page never looks broken.

---

## 3. Placeholder checklist

Everything is filled in - the sanity check below prints nothing.

| Placeholder | Where | Note |
|---|---|---|
| (none) | - | every placeholder in this repository is filled in |

Placeholders are deliberately written as double braces so they survive markdown,
SVG and sed untouched, and so a single grep finds every one of them.

---

## 4. How the language switch works

GitHub strips JavaScript, CSS and every event attribute from READMEs, so a real
toggle is impossible. The only mechanism that survives sanitisation is
<code>&lt;details&gt;</code> / <code>&lt;summary&gt;</code>:

* Both languages are in the file. English carries the <code>open</code> attribute,
  so it is what visitors see first.
* Each <code>&lt;summary&gt;</code> contains a shields.io badge, which is what makes
  it look like a button: <code>EN | English</code> (green = default) and
  <code>中文 | Chinese</code> (grey = collapsed).
* Clicking a summary expands or collapses that language. No scripts involved.

To make **Chinese** the default instead: move <code>open</code> to the second
<code>&lt;details&gt;</code>, and swap the two <code>color=</code> values in the badge
URLs (39d353 <-> 30363d).

**Why the dashboards are not duplicated.** The prose sections (whoami, research,
publications, news) exist in both languages, but the project pins, GitHub stats,
contribution graph and tech stack appear once, under bilingual captions. Every extra
copy is another request to a third-party card service, and those services rate-limit
hard (see section 5 - one of them rate-limited me during testing).

---

## 5. External service dependencies

| Service | Used for | Auth | Tested 2026-10-12 |
|---|---|---|---|
| github-readme-stats.vercel.app | stats card, top-languages card, 4 repo pin cards | none | works, valid SVG |
| img.shields.io | every badge (contact row, tech stack, language buttons) | none | works |
| github-contributions-api.jogruber.de | the data behind your contribution graph | none | works, 366 days returned |
| github-profile-summary-cards.vercel.app | not used | none | rate limited: "Cards are temporarily rate limited" |
| github-readme-activity-graph.vercel.app | not used - **do not add it** | none | dead: HTTP 402 Payment required |
| streak-stats.demolab.com | not used | none | unreachable from my sandbox, unverified |
| ghchart.rshah.org | not used | none | works, but empty days are hard-coded #EEEEEE |

Notes that matter:

* **github-readme-stats is the only third-party service the page depends on.** It is a
  free public instance, so it can be slow or briefly rate-limited. If the cards ever
  break, self-host it (fork the repo, deploy to your own Vercel account) and replace
  the four <code>github-readme-stats.vercel.app</code> hosts in README.md.
* Everything else is either local (your SVGs, committed in this repo) or shields.io,
  which is extremely stable.
* The contribution graph deliberately does **not** use a card service: a GitHub Action
  renders it into this repository, so there is nothing to rate-limit and nothing to
  go down.

---

## 6. The contribution graph

**Pipeline.** <code>scripts/gen-contributions.mjs</code> fetches your public
contribution calendar, lays the 366 days out on a Sunday-first grid and writes
<code>assets/contribution-graph.svg</code> in the same black-terminal style as the
banner. <code>.github/workflows/contributions.yml</code> runs it daily and commits the
result. No token, no npm install, Node 18+ only.

**Run it by hand:**

```bash
node scripts/gen-contributions.mjs                 # your account, default output
node scripts/gen-contributions.mjs someuser        # someone else's account
node scripts/gen-contributions.mjs someuser out.svg
GITHUB_USERNAME=someone node scripts/gen-contributions.mjs
```

**Tuning** - all of it lives in the constants at the top of the script:
<code>LEVEL_COLORS</code> (the five green shades, level 0 = empty day),
<code>GREEN</code>, <code>CELL</code>, <code>PITCH</code>, <code>GRID_LEFT</code>.
The API endpoint is a single <code>const API</code> line: if the public
contributions API ever disappears, point it at your own JSON with the same
<code>{ contributions: [{ date, count, level }] }</code> shape and the layout code
keeps working.

### The GitHub summary cards

<code>assets/summary/</code> holds the five github-profile-summary-cards panels
(profile details, stats, productive time, languages by repo and by commit). They are
**committed snapshots, not hot links**, for one reason: the public API rate-limits per
visitor IP and writes "ERROR!!! Cards are temporarily rate limited." straight into the
image, so a hot-linked card turns into an error box at random - which is exactly what
the card gallery shows when you browse it.

```bash
UTC_OFFSET=8 bash scripts/fetch-summary-cards.sh            # refresh all five
bash scripts/fetch-summary-cards.sh someuser /tmp/out       # other account, other dir
```

The script downloads each card, inspects the body for the rate-limit card, and only
then replaces the committed file - a throttled API can never overwrite a good card with
an error box. <code>.github/workflows/profile-summary-cards.yml</code> runs it daily.

**Palette.** The HTTP API accepts colour overrides that the official action does not,
which is how the cards end up <code>bg_color=000000</code> with
<code>title_color=39d353</code> instead of the theme's blue-grey. Edit the
<code>QUERY</code> variable in the script to change any of it.

**If you ever switch to the official action** (<code>THEME: "github_dark"</code>), it
writes to <code>profile-summary-card-output/&lt;theme&gt;/</code> and the colours will no
longer match the banner exactly.

**Animation.** The <code>animation=fade</code> parameter bakes a CSS fade-in into the
SVG. Each card starts at <code>opacity: 0</code> and animates to 1 over 3 s in a
browser; the stylesheet also honours <code>prefers-reduced-motion</code>, so the content
is never stuck invisible. Drop the parameter if you prefer the cards to appear instantly.

---

## 7. Editing the publication cards

The cards are plain SVG text - open them in any editor. Character budgets, because
SVG does not wrap text for you:

| Field | Max characters |
|---|---|
| title line (L1 / L2) | 42 per line |
| author list | 52 |
| venue + year | 50 |

Long titles go on two lines: each card has two <code>&lt;text&gt;</code> elements for
the title, one per line. If a title fits on one line, delete the second element.

Bulk replacement from the shell (macOS <code>sed -i ''</code>, GNU/Linux
<code>sed -i</code>):

```bash
sed -i '' 's/{{UNIVERSITY}}/Your University/g' README.md assets/banner.svg
sed -i '' 's/{{PAPER_2_AUTHORS}}/Y. Zhang, H. Cheng, et al./g' assets/cards/paper-2.svg
```

Need a third card? Duplicate one and register it in README.md:

```bash
cp assets/cards/paper-2.svg assets/cards/paper-3.svg
```

then rewrite the text inside the copy (it is plain SVG), add the matching
<code>&lt;a&gt;&lt;img&gt;&lt;/a&gt;</code> line to both language blocks, and keep
<code>width="48.5%"</code> so the rows stay aligned. The Google Scholar card is
optional - drop it if you end up with an even number of papers.

---

## 8. Verification before you publish

```bash
# 1. no placeholders left
grep -o '{{[A-Z0-9_]*}}' README.md assets/banner.svg assets/cards/*.svg | sort -u

# 2. all SVGs are well-formed XML
python3 - <<'PY'
import glob, xml.etree.ElementTree as ET
for f in sorted(glob.glob('assets/**/*.svg', recursive=True)):
    ET.parse(f); print('ok', f)
PY

# 3. the generator still runs and the file changes size as expected
node scripts/gen-contributions.mjs && ls -l assets/contribution-graph.svg

# 4. every remote card really resolves (expect four 200s)
for r in Deductive-Steering llm4se-research chl19940220.github.io mtef-latex; do
  curl -s -o /dev/null -w "$r %{http_code}\n" \
    "https://github-readme-stats.vercel.app/api/pin/?username=chl19940220&repo=$r"
done
```

---

## 9. Optional upgrades

* **Snake animation over the contribution graph.** Add the
  <code>Platane/snk</code> action, let it write to an <code>output</code> branch, then
  embed the raw URL of <code>github-snake-dark.svg</code>. It needs one manual run
  before the image exists, so enable it only after the first successful run.
* **lowlighter/metrics with the terminal template.** Renders a genuine black terminal
  panel with an isocalendar plugin. Also needs one workflow run before the image
  resolves; it is the closest thing to this design that is still self-hosted.
* **Local summary cards.** You already have
  <code>.github/workflows/profile-summary-cards.yml</code> in the repo, but it has
  never run and it is configured with <code>THEME: "vue"</code> (white background).
  Either set <code>THEME: "github_dark"</code> and embed the committed output, or
  delete the workflow - the README does not depend on it.
* **Streak card.** <code>streak-stats.demolab.com</code> was unreachable when I tested,
  so it is not wired in. Check it in a browser first; if it loads, add
  <code>&amp;background=000000&amp;border=30363d&amp;stroke=39d353&amp;ring=39d353</code>
  to match the theme.

---

## 10. Hosting your CV

<code>{{CV_PDF_URL}}</code> is the only placeholder that points at a file instead of a
profile page, so here are the options with the response headers I actually measured:

| Where the PDF lives | URL you paste | Trade-off |
|---|---|---|
| Your GitHub Pages site (recommended) | https://chl19940220.github.io/files/cv.pdf | GitHub Pages serves a real <code>application/pdf</code>, so browsers preview it inline. Your site is already live, so this is zero extra setup. |
| This profile repository | https://raw.githubusercontent.com/chl19940220/chl19940220/main/assets/cv.pdf | Only one repo to manage, but raw.githubusercontent.com returns <code>application/octet-stream</code> plus <code>nosniff</code>, so the browser downloads the file instead of showing it. Every update also stores another full copy in git history. |
| A GitHub Release asset | https://github.com/chl19940220/chl19940220/releases/download/cv-2026-10/cv.pdf | Keeps binary churn out of the repository, but the URL contains the tag, so it changes on every release. |

Steps for the recommended option:

```bash
# in your chl19940220.github.io checkout (default branch: master)
mkdir -p files
cp /path/to/CV.pdf files/cv.pdf
git add files/cv.pdf && git commit -m "docs: add CV" && git push

# then point the README at it, from this repository
sed -i '' 's|{{CV_PDF_URL}}|https://chl19940220.github.io/files/cv.pdf|g' README.md   # macOS
sed -i    's|{{CV_PDF_URL}}|https://chl19940220.github.io/files/cv.pdf|g' README.md   # GNU/Linux
```

Open the URL once before pushing to be sure it renders instead of downloading.

One caveat worth knowing: both <code>*.github.io</code> and
<code>raw.githubusercontent.com</code> are GitHub-hosted and can be slow or unreachable
from mainland China. If most of your readers are there, host the PDF on a university
homepage or a domestic service and paste that URL instead - the badge does not care
where it points.

---

## 11. Troubleshooting

| Symptom | Cause and fix |
|---|---|
| An image shows as a broken icon | The file path is wrong, or the workflow that generates it has not run yet. Check with <code>ls assets/</code>. |
| A card shows an error or "rate limit" text | github-readme-stats throttling. Wait, or self-host it (section 5). |
| Markdown inside a language block renders as plain text | There must be a blank line after <code>&lt;/summary&gt;</code> and before <code>&lt;/details&gt;</code>. Keep them. |
| A pin card says "Repo not found" | The repo is private, renamed, or the <code>repo=</code> value does not match exactly. |
| Updated SVG or badge does not appear | GitHub proxies images through camo and caches aggressively. Hard-refresh, or wait a few minutes. |
| The graph did not update today | Actions -> the workflow run -> check the log. The job exits cleanly with "Graph unchanged" when nothing changed. |

---

Generated for this repository - see README.md for the live page and
archive/README.v1.md for what it replaced.
