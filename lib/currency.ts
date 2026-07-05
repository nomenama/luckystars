import "server-only";

const FALLBACK_EUR_TO_GBP = 0.86;

export interface ExchangeRate {
  rate: number;
  isLive: boolean;
  fetchedAt: string;
}

/**
 * Fetches an approximate, live-ish EUR -> GBP rate.
 *
 * Uses the free Frankfurter API (no key required) and caches the result for
 * an hour via Next's fetch cache. If the request fails for any reason
 * (offline build, provider down, etc.) it falls back to a fixed rate so the
 * page always renders.
 */
export async function getEurToGbpRate(): Promise<ExchangeRate> {
  try {
    const res = await fetch("https://api.frankfurter.dev/v2/rates?quotes=GBP", {
      next: { revalidate: 3600 }, // refresh at most once an hour
    });

    if (!res.ok) throw new Error(`Rate request failed with ${res.status}`);

    const data = await res.json();
    const rate = data?.rates?.GBP;

    if (typeof rate !== "number" || Number.isNaN(rate)) {
      throw new Error("Malformed rate response");
    }

    return { rate, isLive: true, fetchedAt: new Date().toISOString() };
  } catch {
    return {
      rate: FALLBACK_EUR_TO_GBP,
      isLive: false,
      fetchedAt: new Date().toISOString(),
    };
  }
}
