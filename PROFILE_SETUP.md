# Profile README - setup guide

Black-terminal academic profile for **github.com/chl19940220**.

> Everything external in this guide was tested on **2026-10-12**. Where a service
> was broken, that is stated explicitly instead of being quietly wired in.

---

## 1. What is in the box

| File | Role | Needs editing |
|---|---|---|
| README.md | the profile page itself | yes - 26 placeholders |
| assets/banner.svg | hero terminal banner | yes - 3 placeholders |
| assets/cards/paper-1.svg | publication card 1 (real Crossref metadata) | no |
| assets/cards/paper-2.svg | publication card 2 | yes - authors only |
| assets/cards/more-papers.svg | "all publications" card, links to Google Scholar | no |
| assets/contribution-graph.svg | rolling 365-day heatmap | no - generated, commit as-is |
| scripts/gen-contributions.mjs | the generator (zero npm dependencies) | no |
| .github/workflows/contributions.yml | daily refresh job | no |
| archive/README.v1.md | your previous README, kept as a backup | delete when happy |

---

## 2. Quick start

**Step 1 - fill in the placeholders.** Every one is listed in section 3. A one-shot
sanity check that nothing is left (must print nothing):

```bash
grep -o '{{[A-Z0-9_]*}}' README.md assets/banner.svg assets/cards/*.svg | sort -u
```

**Step 2 - check the graph renders** (optional, it is already committed):

```bash
node scripts/gen-contributions.mjs
```

**Step 3 - let the workflow keep it fresh.** Push the repo, then open
**Actions -> Refresh contribution graph -> Run workflow** once. After that it runs
daily at 01:17 UTC. The job needs the default token only; there are no secrets to add.

**Step 4 - push and look at the page.**

```bash
git add -A
git commit -m "feat: black-terminal academic profile"
git push
```

**Step 5 -** visit https://github.com/chl19940220 and check both themes (GitHub
settings -> Appearance -> light / dark). The banner, cards and graph are black in
both, so the page never looks broken.

---

## 3. Placeholder checklist

All 26 placeholders, generated from the files themselves:

| Placeholder | Appears in | Replace with |
|---|---|---|
| <code>{{ADVISOR_NAME}}</code> | README | Supervisor, e.g. Prof. Jane Doe. |
| <code>{{AVAILABLE_FROM}}</code> | README | Earliest start date, e.g. 2026-09 or immediately. |
| <code>{{BIO_EN}}</code> | README | 2-3 English sentences: what you build, what you study, what you are known for. Keep it factual. |
| <code>{{BIO_ZH}}</code> | README | The same bio written in Chinese. |
| <code>{{CITY}}</code> | README | City you are based in. |
| <code>{{COUNTRY}}</code> | README | Country you are based in. |
| <code>{{CV_PDF_URL}}</code> | README | Link to your CV: raw GitHub URL, personal site, or a release asset. |
| <code>{{LAB_NAME}}</code> | README | Lab or group name, e.g. AI Agent Lab. Delete it if you do not have one. |
| <code>{{LINKEDIN_URL}}</code> | README | Full LinkedIn profile URL. |
| <code>{{NEWS_1_DATE}}</code> | README | Date of the newest item, e.g. 2026-09. |
| <code>{{NEWS_1_EN}}</code> | README | One-line English news item: paper accepted, award, talk, new preprint. |
| <code>{{NEWS_1_ZH}}</code> | README | The same news item in Chinese. |
| <code>{{NEWS_2_DATE}}</code> | README | Date of the second item. |
| <code>{{NEWS_2_EN}}</code> | README | Second English news item. |
| <code>{{NEWS_2_ZH}}</code> | README | Second news item in Chinese. |
| <code>{{NEWS_3_DATE}}</code> | README | Date of the third item. |
| <code>{{NEWS_3_EN}}</code> | README | Third English news item. |
| <code>{{NEWS_3_ZH}}</code> | README | Third news item in Chinese. |
| <code>{{ORCID_URL}}</code> | README | Full ORCID URL, e.g. https://orcid.org/0000-0000-0000-0000. |
| <code>{{PAPER_2_AUTHORS}}</code> | cards/paper-2 | Author list for the Journal of Software paper (max 52 characters). Left unfilled on purpose - only you can confirm the author order. The related ASE 2017 paper by the same group lists: Chucheng Zhang, Haoliang Cheng, Enyi Tang, Xin Chen, Lei Bu, Xuandong Li. |
| <code>{{RESEARCH_AREA_3}}</code> | README | Third research direction. Delete that branch of the tree if you only have two. |
| <code>{{RESEARCH_TOPIC_1}}</code> | README | Concrete topic under AI Agent, e.g. tool-use planning. |
| <code>{{RESEARCH_TOPIC_2}}</code> | README | Second topic under AI Agent. |
| <code>{{RESEARCH_TOPIC_3}}</code> | README | Topic under Software Engineering. |
| <code>{{RESEARCH_TOPIC_4}}</code> | README | Topic under research area 3. |
| <code>{{TARGET_ROLE}}</code> | README | Optional - what you are looking for, e.g. research scientist / postdoc / LLM engineer. You dropped it from the banner; delete it here too if you do not want it. |

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

## 10. Troubleshooting

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
