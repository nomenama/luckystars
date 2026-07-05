import { getJackpot } from "@/lib/data";
import { getEurToGbpRate } from "@/lib/currency";
import PrizeTable from "@/components/PrizeTable";
import { Ball } from "@/components/Ball";
import { getLatestDraw } from "@/lib/db";

const eur = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
});

const gbp = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
});

function jackpotStatus(winners: number) {
    if (winners === 0) return "Rolls over to the next draw";
    if (winners === 1) return "Won by 1 ticket";
    return `Shared by ${winners} tickets`;
}

export default async function HomePage() {
    const [draw, exchangeRate] = await Promise.all([getLatestDraw(), getEurToGbpRate()]);

    if (!draw) {
        return (
            <div className="mx-auto max-w-5xl px-6 pb-24 text-center">
                <p className="mt-20 text-lg text-slate">No draw data available at the moment.</p>
            </div>
        );
    }

    const jackpot = getJackpot(draw);

    const formattedDate = new Date(draw.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="mx-auto max-w-5xl px-6 pb-24">
            <section id="result" className="text-center">
                <p className="pt-12 text-sm font-medium uppercase tracking-widest text-slate">
                    Latest EuroMillions Results
                </p>

                <h1 className="mt-2 text-2xl font-semibold text-cream sm:text-4xl">
                    {formattedDate}
                </h1>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {draw.numbers.map((number) => (
                            <Ball key={number}>{number}</Ball>
                        ))}

                        {draw.stars.map((star) => (
                            <Ball key={star} star>
                                {star}
                            </Ball>
                        ))}
                    </div>

                    {jackpot && (
                        <div className="mt-10 border-t border-white/10 pt-8">
                            <p className="text-sm uppercase tracking-widest text-slate">Jackpot</p>

                            <p className="relative mt-2 text-4xl font-bold text-gold">
                                <span className="absolute inset-0 -z-10 blur-2xl opacity-30 bg-gold" />
                                {eur.format(jackpot.prize)}
                            </p>

                            <p className="mt-2 text-lg text-slate">
                                ≈ {gbp.format(jackpot.prize * exchangeRate.rate)}
                            </p>

                            <p className="mt-4 text-sm text-slate">
                                {jackpotStatus(jackpot.winners)}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section id="prizes" className="mt-24 sm:mt-32">
                <PrizeTable prizes={draw.prizes} exchangeRate={exchangeRate} />
            </section>
        </div>
    );
}
