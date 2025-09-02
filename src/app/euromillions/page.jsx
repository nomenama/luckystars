import { getDraws } from "@/utils/mongoDB/api";
import { Pagination } from "@/app/components/Pagination";
import { CalendarDaysIcon, StarIcon, TrophyIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { formatCurrency, formatNumber } from "@/utils/helper";

export const metadata = {
    title: "Euromillions Results: Past Draw Results and History",
    description:
        "Explore a comprehensive database of all Euromillions results since the first draw. Download or search for past winning numbers, including historical data and draw details.",
};

// Component for number balls
function NumberBall({ number, isLucky = false }) {
    return (
        <div
            className={`
            inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm
            transition-all duration-200 hover:scale-105 shadow-lg
            ${
                isLucky
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                    : "bg-gradient-to-br from-blue-500 to-blue-700 text-white"
            }
        `}>
            {number}
        </div>
    );
}

// Component for draw card (mobile view)
function DrawCard({ draw }) {
    const hasJackpotWinner = draw.prizes?.some(
        (prize) => prize.matched_numbers === 5 && prize.matched_stars === 2 && prize.winners > 0
    );
    const jackpotPrize = draw.prizes?.find(
        (prize) => prize.matched_numbers === 5 && prize.matched_stars === 2
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-4 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">
                        {new Date(draw.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
                {hasJackpotWinner && (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        <TrophyIcon className="h-4 w-4" />
                        <span>Jackpot Won!</span>
                    </div>
                )}
            </div>

            {/* Numbers */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Winning Numbers</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                    {draw.numbers.map((num, index) => (
                        <NumberBall key={index} number={num} />
                    ))}
                </div>

                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                    Lucky Stars
                </h3>
                <div className="flex gap-2">
                    {draw.stars.map((star, index) => (
                        <NumberBall key={index} number={star} isLucky={true} />
                    ))}
                </div>
            </div>

            {/* Prize Info */}
            {jackpotPrize && (
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 flex items-center">
                            <BanknotesIcon className="h-4 w-4 mr-1" />
                            Jackpot
                        </span>
                        <span className="text-lg font-bold text-green-600">
                            {jackpotPrize.winners > 0
                                ? formatCurrency(jackpotPrize.prize)
                                : "No Winner"}
                        </span>
                    </div>
                    {jackpotPrize.winners > 0 && (
                        <p className="text-xs text-gray-500 text-right mt-1">
                            {formatNumber(jackpotPrize.winners)} winner
                            {jackpotPrize.winners > 1 ? "s" : ""}
                        </p>
                    )}
                </div>
            )}

            {/* UK Millionaire Maker */}
            {draw.uk_millionaire_maker && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-purple-900 mb-1">
                            UK Millionaire Maker
                        </h4>
                        <p className="text-purple-800 font-mono text-sm tracking-wider">
                            {draw.uk_millionaire_maker}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default async function EuroMillions({ searchParams }) {
    const { page } = await searchParams;
    let pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const { draws, count } = await getDraws("euromillions", pageNum);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-4 p-1 shadow-lg">
                        <Image
                            src="/euromillions-logo.webp"
                            alt="EuroMillions Logo"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">EuroMillions Results</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Complete history of EuroMillions draws since February 13, 2004. Draws held
                        every Tuesday and Friday at 8:45 PM CET.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-gray-700">
                                {formatNumber(count)} Total Draws
                            </span>
                        </div>
                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Download Results PDF
                        </button>
                    </div>
                </div>

                {/* Mobile View - Cards */}
                <div className="lg:hidden">
                    {draws?.map((draw) => (
                        <DrawCard key={draw._id} draw={draw} />
                    ))}
                </div>

                {/* Desktop View - Table */}
                <div className="hidden lg:block">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                            <h2 className="text-xl font-semibold text-white">Draw History</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                            Draw Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                            Winning Numbers
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                            Lucky Stars
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                            Jackpot
                                        </th>
                                        {draws?.[0]?.uk_millionaire_maker && (
                                            <th
                                                scope="col"
                                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                                UK Millionaire Maker
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {draws?.map((draw, index) => {
                                        const hasJackpotWinner = draw.prizes?.some(
                                            (prize) =>
                                                prize.matched_numbers === 5 &&
                                                prize.matched_stars === 2 &&
                                                prize.winners > 0
                                        );
                                        const jackpotPrize = draw.prizes?.find(
                                            (prize) =>
                                                prize.matched_numbers === 5 &&
                                                prize.matched_stars === 2
                                        );

                                        return (
                                            <tr
                                                key={draw._id}
                                                className={`hover:bg-blue-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <CalendarDaysIcon className="h-5 w-5 text-blue-600 mr-2" />
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {new Date(
                                                                    draw.date
                                                                ).toLocaleDateString("en-GB", {
                                                                    weekday: "short",
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })}
                                                            </div>
                                                            {hasJackpotWinner && (
                                                                <div className="flex items-center mt-1">
                                                                    <TrophyIcon className="h-3 w-3 text-green-600 mr-1" />
                                                                    <span className="text-xs text-green-600 font-medium">
                                                                        Jackpot Winner!
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        {draw.numbers.map((num, idx) => (
                                                            <NumberBall key={idx} number={num} />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        {draw.stars.map((star, idx) => (
                                                            <NumberBall
                                                                key={idx}
                                                                number={star}
                                                                isLucky={true}
                                                            />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {jackpotPrize && (
                                                        <div>
                                                            <div
                                                                className={`text-sm font-semibold ${jackpotPrize.winners > 0 ? "text-green-600" : "text-gray-500"}`}>
                                                                {jackpotPrize.winners > 0
                                                                    ? formatCurrency(
                                                                          jackpotPrize.prize
                                                                      )
                                                                    : "No Winner"}
                                                            </div>
                                                            {jackpotPrize.winners > 0 && (
                                                                <div className="text-xs text-gray-500">
                                                                    {formatNumber(
                                                                        jackpotPrize.winners
                                                                    )}{" "}
                                                                    winner
                                                                    {jackpotPrize.winners > 1
                                                                        ? "s"
                                                                        : ""}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                {draw.uk_millionaire_maker && (
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="bg-purple-100 border border-purple-200 rounded-lg px-3 py-2 inline-block">
                                                            <span className="text-purple-900 font-mono text-sm tracking-wider">
                                                                {draw.uk_millionaire_maker}
                                                            </span>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-8 bg-transparent">
                    <Pagination totalCount={count} />
                </div>
            </div>
        </main>
    );
}
