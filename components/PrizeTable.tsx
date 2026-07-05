"use client";

import { useMemo, useState } from "react";
import type { Prize } from "@/lib/types";
import type { ExchangeRate } from "@/lib/currency";
import { Crown, Star, Trophy } from "lucide-react";

interface PrizeTableProps {
    prizes: Prize[];
    exchangeRate: ExchangeRate;
}

type SortKey = "prize" | "winners";

const eur = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
});

const gbp = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
});

const count = new Intl.NumberFormat("en-IE");

export default function PrizeTable({ prizes, exchangeRate }: PrizeTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>("prize");

    const sorted = useMemo(
        () => [...prizes].sort((a, b) => b[sortKey] - a[sortKey]),
        [prizes, sortKey]
    );

    return (
        <div>
            <div className="mb-1 flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl text-cream">Prize breakdown</h2>
                <div
                    role="group"
                    aria-label="Sort prize tiers"
                    className="flex rounded-full border border-white/15 p-0.5 text-xs">
                    {(
                        [
                            { key: "prize", label: "By prize" },
                            { key: "winners", label: "By winners" },
                        ] as const
                    ).map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setSortKey(opt.key)}
                            aria-pressed={sortKey === opt.key}
                            className={`rounded-full px-3 py-1.5 transition-colors ${
                                sortKey === opt.key
                                    ? "bg-gold text-midnight"
                                    : "text-slate hover:text-cream"
                            }`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <p className="my-4 md:mt-0 md:mb-4 text-xs text-slate">
                GBP amounts are approximate, converted at{" "}
                <span className="font-mono text-comet">
                    &pound;1 &asymp; &euro;{(1 / exchangeRate.rate).toFixed(2)}.
                </span>
                Please check with the official operator for the exact prize amount.
            </p>

            <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-white/5 text-xs uppercase tracking-wide text-slate">
                            <th scope="col" className="px-4 py-3 font-medium">
                                Match
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium">
                                Prize per winner
                            </th>
                            <th scope="col" className="px-4 py-3 font-medium text-right">
                                Winners
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((p) => {
                            const isJackpot = p.matched_numbers === 5 && p.matched_stars === 2;
                            return (
                                <tr
                                    key={`${p.matched_numbers}-${p.matched_stars}`}
                                    className={`border-t border-white/5 tabular ${
                                        isJackpot ? "bg-gold/10" : ""
                                    }`}>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center gap-1.5 text-cream">
                                            <span className="font-mono">{p.matched_numbers}</span>
                                            <span className="text-slate">nums</span>
                                            <span className="text-slate">+</span>
                                            <span className="font-mono">{p.matched_stars}</span>
                                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                            {isJackpot && (
                                                <Crown className="h-5 w-5 text-gold fill-gold" />
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-mono">
                                        <span className="text-comet">{eur.format(p.prize)}</span>
                                        <span className="block text-xs text-slate">
                                            &asymp; {gbp.format(p.prize * exchangeRate.rate)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-mono text-cream">
                                        {count.format(p.winners)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
