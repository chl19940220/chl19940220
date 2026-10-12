#!/usr/bin/env bash
#
# Fetch the five github-profile-summary-cards SVGs into assets/summary/.
#
# WHY SELF-HOST INSTEAD OF HOT-LINKING THE API
#   The public instance rate-limits per visitor IP and renders
#   "ERROR!!! Cards are temporarily rate limited." straight into the image, so a
#   hot-linked card silently turns into an error box on your profile.
#   Fetching once a day from CI and committing the result keeps the page stable.
#
# WHY NOT THE OFFICIAL ACTION
#   The action only takes a THEME name; it cannot override colours. The API can, so
#   going through the API is what lets the cards be pure black (#000000) with the
#   same terminal green (#39d353) as the banner, cards and contribution graph.
#
# Usage: scripts/fetch-summary-cards.sh [username] [output-dir]
#   env: GITHUB_USERNAME (default chl19940220), UTC_OFFSET (default 8)
#
set -euo pipefail

USER="${1:-${GITHUB_USERNAME:-chl19940220}}"
OUT="${2:-assets/summary}"
UTC_OFFSET="${UTC_OFFSET:-8}"
BASE="https://github-profile-summary-cards.vercel.app/api/cards"
QUERY="username=${USER}&theme=github_dark&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d&chart_color=39d353&animation=fade"

CARDS="profile-details repos-per-language most-commit-language stats productive-time"

mkdir -p "$OUT"
ok=0
failed=0
for card in $CARDS; do
  url="${BASE}/${card}?${QUERY}"
  [ "$card" = "productive-time" ] && url="${url}&utcOffset=${UTC_OFFSET}"

  tmp="$(mktemp)"
  if ! curl -fsS --max-time 30 "$url" -o "$tmp"; then
    echo "!! $card: request failed - keeping the committed copy"
    failed=$((failed + 1)); rm -f "$tmp"; continue
  fi

  # The API answers HTTP 200 even while throttled, so the body has to be inspected.
  if ! grep -q "<svg" "$tmp" || grep -qi "rate limited\|ERROR!!!" "$tmp"; then
    echo "!! $card: API returned an error card - keeping the committed copy"
    failed=$((failed + 1)); rm -f "$tmp"; continue
  fi

  if [ -f "$OUT/$card.svg" ] && cmp -s "$tmp" "$OUT/$card.svg"; then
    echo "== $card: unchanged"
    ok=$((ok + 1)); rm -f "$tmp"; continue
  fi

  mv "$tmp" "$OUT/$card.svg"
  echo "ok $card -> $OUT/$card.svg ($(wc -c < "$OUT/$card.svg" | tr -d ' ') bytes)"
  ok=$((ok + 1))
done

echo "----"
echo "$ok/$(echo $CARDS | wc -w | tr -d ' ') cards up to date, $failed kept from the previous run"
# Fail loudly only when nothing could be refreshed at all.
[ "$ok" -gt 0 ]
