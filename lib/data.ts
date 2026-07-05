import "server-only";
import type { DrawResult } from "./types";
import latestDraw from "@/data/latest-draw.json";

/**
 * Loads the latest EuroMillions draw.
 *
 * This runs only on the server (enforced by the `server-only` import above).
 * Swap the body of this function for a real network call, e.g.:
 *
 *   const res = await fetch("https://api.your-provider.com/euromillions/latest", {
 *     next: { revalidate: 3600 },
 *   });
 *   return res.json();
 *
 * For now it reads the bundled JSON fixture so the page works out of the box.
 */
export async function getLatestDraw(): Promise<DrawResult> {
  return latestDraw as DrawResult;
}

/** The jackpot tier is always 5 matched numbers + 2 matched stars. */
export function getJackpot(draw: DrawResult) {
  return draw.prizes.find(
    (p) => p.matched_numbers === 5 && p.matched_stars === 2
  );
}
