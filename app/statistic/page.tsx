import { getAllSortedResults } from "@/lib/db";
import Ball from "@/components/statistic/Ball";

interface NumberFrequency {
    num: number;
    frequency: number;
}

interface CombinationFrequency {
    combination: number[];
    frequency: number;
}

function getCombinationFrequencies(draws: number[][], size: number): CombinationFrequency[] {
    const frequencies = new Map<string, number>();

    for (const draw of draws) {
        generateCombinations(draw.slice(0, 5), size, 0, [], frequencies);
    }

    return [...frequencies.entries()]
        .map(([key, frequency]) => ({
            combination: key.split(",").map(Number),
            frequency,
        }))
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 20);
}

function generateCombinations(
    numbers: number[],
    size: number,
    start: number,
    current: number[],
    frequencies: Map<string, number>
) {
    if (current.length === size) {
        const key = current.join(",");
        frequencies.set(key, (frequencies.get(key) ?? 0) + 1);
        return;
    }

    for (let i = start; i < numbers.length; i++) {
        current.push(numbers[i]);
        generateCombinations(numbers, size, i + 1, current, frequencies);
        current.pop();
    }
}

function getFrequencies(draws: number[][]) {
    const numbers = new Map<number, number>();
    const stars = new Map<number, number>();

    for (const draw of draws) {
        for (let i = 0; i < 5; i++) {
            const num = draw[i];
            numbers.set(num, (numbers.get(num) ?? 0) + 1);
        }
        for (let i = 5; i < 7; i++) {
            const star = draw[i];
            stars.set(star, (stars.get(star) ?? 0) + 1);
        }
    }

    const toArray = (map: Map<number, number>): NumberFrequency[] =>
        [...map.entries()]
            .map(([num, frequency]) => ({ num, frequency }))
            .sort((a, b) => b.frequency - a.frequency || a.num - b.num);

    return { numbers: toArray(numbers), stars: toArray(stars) };
}

// Thin proportional bar behind each row — length encodes frequency relative to the table's max.
function FrequencyBar({ value, max, star }: { value: number; max: number; star?: boolean }) {
    const pct = Math.max(4, Math.round((value / max) * 100));
    return (
        <div className="absolute inset-y-0 left-0 -z-0" style={{ width: `${pct}%` }}>
            <div
                className="h-full w-full"
                style={{
                    background: star
                        ? "linear-gradient(90deg, rgba(62,95,204,0.16), rgba(62,95,204,0))"
                        : "linear-gradient(90deg, rgba(224,165,38,0.16), rgba(224,165,38,0))",
                }}
            />
        </div>
    );
}

function RankMark({ rank }: { rank: number }) {
    const isTop = rank <= 3;
    const color =
        rank === 1 ? "#F0B429" : rank === 2 ? "#C7CDDB" : rank === 3 ? "#C97A46" : "#5A6178";
    return (
        <span
            className="font-mono text-[13px] tabular-nums"
            style={{ color: isTop ? color : "#5A6178", fontWeight: isTop ? 700 : 500 }}>
            {String(rank).padStart(2, "0")}
        </span>
    );
}

function FrequencyTable({
    title,
    subtitle,
    data,
    star = false,
}: {
    title: string;
    subtitle: string;
    data: NumberFrequency[];
    star?: boolean;
}) {
    const max = data[0]?.frequency ?? 1;

    return (
        <section
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "#232A42", background: "#10152559" }}>
            <div
                className="flex items-baseline justify-between border-b px-6 py-5"
                style={{ borderColor: "#232A42" }}>
                <div>
                    <h2
                        className="font-display text-lg font-semibold tracking-tight"
                        style={{ color: "#E9ECF5" }}>
                        {title}
                    </h2>
                    <p className="mt-0.5 text-xs" style={{ color: "#5A6178" }}>
                        {subtitle}
                    </p>
                </div>
                <span
                    className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                    style={{
                        color: star ? "#8FA8F0" : "#E0A526",
                        background: star ? "#3E5FCC1A" : "#E0A5261A",
                    }}>
                    {star ? "Lucky Star" : "Main"}
                </span>
            </div>

            <table className="w-full">
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={item.num}
                            className="relative border-t transition-colors hover:bg-white/[0.03]"
                            style={{ borderColor: "#1B2138" }}>
                            <td className="relative w-14 px-6 py-3">
                                <FrequencyBar value={item.frequency} max={max} star={star} />
                                <span className="relative">
                                    <RankMark rank={index + 1} />
                                </span>
                            </td>
                            <td className="relative px-2 py-3">
                                <Ball star={star} rank={index + 1}>
                                    {item.num}
                                </Ball>
                            </td>
                            <td
                                className="relative px-6 py-3 text-right font-mono text-sm font-semibold"
                                style={{ color: "#E9ECF5" }}>
                                {item.frequency}
                                <span
                                    className="ml-1 text-[10px] font-normal"
                                    style={{ color: "#5A6178" }}>
                                    draws
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

function CombinationTable({
    title,
    subtitle,
    data,
}: {
    title: string;
    subtitle: string;
    data: CombinationFrequency[];
}) {
    const max = data[0]?.frequency ?? 1;

    return (
        <section
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "#232A42", background: "#10152559" }}>
            <div className="border-b px-6 py-5" style={{ borderColor: "#232A42" }}>
                <h2
                    className="font-display text-lg font-semibold tracking-tight"
                    style={{ color: "#E9ECF5" }}>
                    {title}
                </h2>
                <p className="mt-0.5 text-xs" style={{ color: "#5A6178" }}>
                    {subtitle}
                </p>
            </div>

            <div className="divide-y" style={{ borderColor: "#1B2138" }}>
                {data.map((item, index) => {
                    const pct = Math.max(4, Math.round((item.frequency / max) * 100));
                    return (
                        <div
                            key={item.combination.join("-")}
                            className="relative flex items-center gap-5 px-6 py-4"
                            style={{ borderColor: "#1B2138" }}>
                            <div
                                className="absolute inset-y-0 left-0 -z-0"
                                style={{ width: `${pct}%` }}>
                                <div
                                    className="h-full w-full"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, rgba(224,165,38,0.10), rgba(224,165,38,0))",
                                    }}
                                />
                            </div>

                            <span className="relative w-6 shrink-0">
                                <RankMark rank={index + 1} />
                            </span>

                            <div className="relative flex flex-1 flex-wrap items-center gap-2">
                                {item.combination.map((num, i) => (
                                    <span key={num} className="flex items-center gap-2">
                                        <Ball>{num}</Ball>
                                        {i < item.combination.length - 1 && (
                                            <span style={{ color: "#2C3452" }}>+</span>
                                        )}
                                    </span>
                                ))}
                            </div>

                            <span
                                className="relative shrink-0 font-mono text-sm font-semibold"
                                style={{ color: "#E9ECF5" }}>
                                {item.frequency}
                                <span
                                    className="ml-1 text-[10px] font-normal"
                                    style={{ color: "#5A6178" }}>
                                    ×
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default async function Statistic() {
    const draws = await getAllSortedResults();
    const { numbers, stars } = getFrequencies(draws);

    const pairs = getCombinationFrequencies(draws, 2);
    const triplets = getCombinationFrequencies(draws, 3);
    const quadruplets = getCombinationFrequencies(draws, 4);

    return (
        <div className="mx-auto max-w-5xl px-6 py-16">
            <header className="mb-12">
                <span
                    className="font-mono text-xs uppercase tracking-[0.2em]"
                    style={{ color: "#5A6178" }}>
                    Draw analysis · {draws.length} draws recorded
                </span>
                <h1
                    className="mt-3 font-display text-5xl font-bold tracking-tight"
                    style={{ color: "#E9ECF5" }}>
                    Statistics
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "#8B93AB" }}>
                    Frequency of every EuroMillions number and Lucky Star, ranked across every
                    recorded draw — plus the pairs, triplets, and quadruplets that keep showing up
                    together.
                </p>
            </header>

            <div className="grid gap-6 lg:grid-cols-2">
                <FrequencyTable
                    title="Main Numbers"
                    subtitle="1–50, ranked by how often each has been drawn"
                    data={numbers}
                />
                <FrequencyTable
                    title="Lucky Stars"
                    subtitle="1–12, ranked by how often each has been drawn"
                    data={stars}
                    star
                />
            </div>

            <div className="mt-6 grid gap-6">
                <CombinationTable
                    title="Most Common Pairs"
                    subtitle="Two-number groups that appear together most often"
                    data={pairs}
                />
                <CombinationTable
                    title="Most Common Triplets"
                    subtitle="Three-number groups that appear together most often"
                    data={triplets}
                />
                <CombinationTable
                    title="Most Common Quadruplets"
                    subtitle="Four-number groups that appear together most often"
                    data={quadruplets}
                />
            </div>
        </div>
    );
}
