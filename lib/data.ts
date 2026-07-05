import "server-only";
import type { DrawResult } from "./types";

/** The jackpot tier is always 5 matched numbers + 2 matched stars. */
export function getJackpot(draw: DrawResult) {
    return draw.prizes.find((p) => p.matched_numbers === 5 && p.matched_stars === 2);
}
