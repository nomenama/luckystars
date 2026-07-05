# LuckyStars

A Next.js (App Router) landing page displaying the latest EuroMillions draw result.

## Structure & server/client split

- `app/layout.tsx` — **server component**. Loads fonts, sets metadata, renders `Header` and `Footer` around every page.
- `app/page.tsx` — **server component**. Calls `getLatestDraw()` (server-only data access) and passes plain data down as props.
- `components/Header.tsx`, `components/Footer.tsx` — **server components**. Static, no interactivity needed.
- `components/ConstellationBoard.tsx` — **client component** (`"use client"`). Renders the winning numbers/stars as an interactive constellation with hover/focus states, so it needs to run in the browser.
- `components/PrizeTable.tsx` — **client component** (`"use client"`). Sortable prize-tier table driven by `useState`/`useMemo`.
- `lib/data.ts` — server-only module (`import "server-only"`) that loads the draw data. Swap its body for a real API call to your EuroMillions data provider whenever you have one — the `fetch(...)` example is included in a comment.
- `data/latest-draw.json` — the draw fixture used by `lib/data.ts` (matches the payload you provided).
- `lib/currency.ts` — server-only module that fetches a live EUR → GBP rate from the free [Frankfurter API](https://www.frankfurter.app/) with `next: { revalidate: 3600 }` (refreshed at most once an hour), and falls back to a fixed rate if the request fails so the page never breaks. `page.tsx` fetches this alongside the draw and passes it to the jackpot card and `PrizeTable`, which show every euro amount with an approximate `≈ £…` figure underneath and a disclosure noting whether the live rate or the fallback was used.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Updating the result

Replace the contents of `data/latest-draw.json` with the newest draw payload,
or point `getLatestDraw()` in `lib/data.ts` at a live API/database.
