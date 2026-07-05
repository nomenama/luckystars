import { getJackpot } from "@/lib/data";
import DrawRow from "@/components/results/DrawRow";
import Pagination from "@/components/results/Pagination";
import { getPaginatedDraws } from "@/lib/db";

export default async function PastResultsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const sp = await searchParams;

    const requestedPage = Number(sp.page ?? "1");
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;

    const { data, totalPages } = await getPaginatedDraws({ page });

    return (
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-14 sm:pt-20">
            <header className="text-center">
                <h1 className="mt-3 font-display text-3xl text-cream sm:text-4xl">Past results</h1>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
                    Select a draw to see its full prize breakdown.
                </p>
            </header>

            {data.length === 0 ? (
                <p className="mt-12 text-center text-sm text-slate">No past draws found yet.</p>
            ) : (
                <div className="mt-10 flex flex-col gap-3">
                    {data.map((draw) => {
                        const jackpot = getJackpot(draw);
                        return (
                            <DrawRow
                                key={draw.id}
                                draw={{
                                    id: draw.id,
                                    draw_id: draw.draw_id,
                                    date: draw.date,
                                    numbers: draw.numbers,
                                    stars: draw.stars,
                                    jackpotPrize: jackpot?.prize,
                                    jackpotWinners: jackpot?.winners,
                                }}
                            />
                        );
                    })}
                </div>
            )}

            <Pagination page={page} totalPages={totalPages} />
        </div>
    );
}
