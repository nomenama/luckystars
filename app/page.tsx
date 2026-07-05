import { getJackpot, getLatestDraw } from "@/lib/data";
import { getEurToGbpRate } from "@/lib/currency";
import ConstellationBoard from "@/components/ConstellationBoard";
import PrizeTable from "@/components/PrizeTable";

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

export default async function HomePage() {
    const [draw, exchangeRate] = await Promise.all([getLatestDraw(), getEurToGbpRate()]);
    const jackpot = getJackpot(draw);

    const formattedDate = new Date(draw.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="mx-auto max-w-5xl px-6 pb-24">
            <section id="result" className="animate-rise pt-14 text-center sm:pt-20">
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-comet">
                    {formattedDate}
                </p>
                <h1 className="mt-4 font-display text-4xl italic text-cream sm:text-5xl">
                    Tonight&rsquo;s sky
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm text-slate">
                    The five winning numbers and two lucky stars from the latest EuroMillions draw.
                </p>

                <div className="mt-14">
                    <ConstellationBoard numbers={draw.numbers} stars={draw.stars} />
                </div>

                {jackpot && (
                    <div className="mx-auto mt-14 max-w-sm rounded-2xl border border-gold/30 bg-gold/5 px-6 py-5">
                        <p className="text-xs uppercase tracking-wide text-slate">
                            Jackpot (5 + 2)
                        </p>
                        <p className="mt-1 font-display text-3xl text-gold">
                            {eur.format(jackpot.prize)}
                        </p>
                        <p className="mt-1 font-mono text-sm text-comet">
                            Approx {gbp.format(jackpot.prize * exchangeRate.rate)}
                        </p>
                        <p className="mt-1 text-xs text-slate">
                            {jackpot.winners === 1
                                ? "Won by 1 ticket"
                                : jackpot.winners === 0
                                  ? "Rolls over to the next draw"
                                  : `Shared by ${jackpot.winners} tickets`}
                        </p>
                    </div>
                )}
            </section>

            <section id="prizes" className="mt-24 sm:mt-32">
                <PrizeTable prizes={draw.prizes} exchangeRate={exchangeRate} />
            </section>
        </div>
    );
}
