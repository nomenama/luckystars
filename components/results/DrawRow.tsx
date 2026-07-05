"use client";

import { useRouter } from "next/navigation";
import MiniBalls from "./MiniBalls";
import { eur, formattedDate } from "@/lib/helper";

export interface DrawSummary {
    id: number;
    draw_id: number;
    date: string;
    numbers: string[];
    stars: string[];
    jackpotPrize?: number;
    jackpotWinners?: number;
}

export default function DrawRow({ draw }: { draw: DrawSummary }) {
    const router = useRouter();

    const date = formattedDate(draw.date);

    function goToDetail() {
        router.push(`/results/${draw.id}`);
    }

    return (
        <div
            role="link"
            tabIndex={0}
            aria-label={`View prize breakdown for draw ${draw.draw_id} on ${date}`}
            onClick={goToDetail}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToDetail();
                }
            }}
            className="group grid cursor-pointer grid-cols-1 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-gold/40 hover:bg-white/[0.05] sm:grid-cols-[7rem_1fr_9rem_1.5rem]">
            <div className="text-center sm:text-left">
                <p className="font-display text-sm text-cream">{date}</p>
            </div>

            <MiniBalls numbers={draw.numbers} stars={draw.stars} />

            <div className="text-center sm:text-right">
                {draw.jackpotPrize !== undefined ? (
                    <>
                        <p className="font-mono text-sm text-gold">
                            {eur.format(draw.jackpotPrize)}
                        </p>
                        <p className="text-[11px] text-slate">
                            {draw.jackpotWinners
                                ? `${draw.jackpotWinners} winner${draw.jackpotWinners > 1 ? "s" : ""}`
                                : "Rolled over"}
                        </p>
                    </>
                ) : (
                    <p className="text-[11px] text-slate">No jackpot data</p>
                )}
            </div>

            <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto h-4 w-4 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-gold sm:mx-0">
                <path d="M9 18l6-6-6-6" />
            </svg>
        </div>
    );
}
