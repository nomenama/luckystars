import "server-only";

const FALLBACK_EUR_TO_GBP = 0.86;

export interface RawExchangeRate {
    date: Date | string;
    base: string;
    quote: string;
    rate: number;
}

export type ExchangeRate = Omit<RawExchangeRate, "date" | "base" | "quote"> & {
    isLive: boolean;
};

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
        const data: ExchangeRate[] = await res.json();
        const rate = data[0].rate;

        return { rate, isLive: true };
    } catch (error) {
        console.log(error);
        return { rate: FALLBACK_EUR_TO_GBP, isLive: false };
    }
}
