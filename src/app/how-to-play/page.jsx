import {
    CheckCircleIcon,
    SparklesIcon,
    CurrencyDollarIcon,
    CalendarIcon,
    TicketIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/20/solid";

const lotteryGames = [
    {
        name: "EuroMillions",
        description: "Europe's biggest lottery with jackpots up to €240 million",
        icon: SparklesIcon,
        color: "from-blue-500 to-purple-600",
        accentColor: "text-blue-600",
        steps: [
            "Choose 5 numbers from 1 to 50",
            "Choose 2 Lucky Star numbers from 1 to 12",
            "Match all 7 numbers to win the jackpot",
            "Draws every Tuesday & Friday at 8:45 PM",
        ],
        drawDays: ["Tuesday", "Friday"],
        drawTime: "8:45 PM",
        ticketPrice: "£2.50",
        maxJackpot: "€240 million",
    },
    {
        name: "UK Lotto",
        description: "The UK's original lottery game with great odds",
        icon: TicketIcon,
        color: "from-purple-500 to-pink-600",
        accentColor: "text-purple-600",
        steps: [
            "Choose 6 numbers from 1 to 59",
            "Match all 6 numbers to win the jackpot",
            "Prize tiers start from matching 2 numbers",
            "Draws every Wednesday & Saturday at 7:45 PM",
        ],
        drawDays: ["Wednesday", "Saturday"],
        drawTime: "7:45 PM",
        ticketPrice: "£2.00",
        maxJackpot: "£22 million",
    },
];

const generalSteps = [
    {
        step: 1,
        title: "Choose Your Game",
        description:
            "Select between EuroMillions or UK Lotto based on your preference for jackpot size and odds.",
        icon: TicketIcon,
    },
    {
        step: 2,
        title: "Pick Your Numbers",
        description:
            "Choose your lucky numbers or use Quick Pick for random selection. You can play the same numbers for multiple draws.",
        icon: SparklesIcon,
    },
    {
        step: 3,
        title: "Buy Your Ticket",
        description:
            "Purchase your ticket from authorized retailers or online before the draw closes.",
        icon: CurrencyDollarIcon,
    },
    {
        step: 4,
        title: "Check Results",
        description:
            "Watch the live draw or check results on our website. Winners have 180 days to claim prizes.",
        icon: CheckCircleIcon,
    },
];

const prizeInfo = [
    {
        game: "EuroMillions",
        tiers: [
            { match: "5 + 2 stars", odds: "1 in 139,838,160", prize: "Jackpot" },
            { match: "5 + 1 star", odds: "1 in 6,991,908", prize: "£100,000+" },
            { match: "5 + 0 stars", odds: "1 in 3,107,515", prize: "£10,000+" },
            { match: "4 + 2 stars", odds: "1 in 621,503", prize: "£1,000+" },
            { match: "4 + 1 star", odds: "1 in 31,075", prize: "£100+" },
        ],
    },
    {
        game: "UK Lotto",
        tiers: [
            { match: "6 numbers", odds: "1 in 45,057,474", prize: "Jackpot" },
            { match: "5 + Bonus", odds: "1 in 7,509,579", prize: "£1 million" },
            { match: "5 numbers", odds: "1 in 144,415", prize: "£1,750" },
            { match: "4 numbers", odds: "1 in 2,180", prize: "£140" },
            { match: "3 numbers", odds: "1 in 97", prize: "£30" },
        ],
    },
];

export default function HowToPlayPage() {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0 bg-black opacity-10" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                            How to Play
                        </h1>
                        <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Your complete guide to playing EuroMillions and UK Lotto. Learn the
                            rules, understand the odds, and start winning today!
                        </p>
                    </div>
                </div>
            </div>

            {/* General Steps */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            4 Simple Steps to Start Playing
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Playing the lottery is easy and fun. Follow these simple steps to get
                            started.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {generalSteps.map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <item.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mb-4">
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                {index < generalSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300 z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Game Details */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Game Rules & Details
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Learn the specific rules and requirements for each lottery game.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {lotteryGames.map((game, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                    <div className="flex items-center mb-6">
                                        <div
                                            className={`w-14 h-14 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <game.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                {game.name}
                                            </h3>
                                            <p className="text-gray-600">{game.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                                            <div className="flex items-center mb-2">
                                                <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    Draw Days
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-bold">
                                                {game.drawDays.join(" & ")}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                                            <div className="flex items-center mb-2">
                                                <ClockIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    Draw Time
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-bold">
                                                {game.drawTime}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                                            <div className="flex items-center mb-2">
                                                <TicketIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    Ticket Price
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-bold">
                                                {game.ticketPrice}
                                            </p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                                            <div className="flex items-center mb-2">
                                                <CurrencyDollarIcon className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    Max Jackpot
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-bold">
                                                {game.maxJackpot}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-3">
                                            How to Play:
                                        </h4>
                                        <div className="space-y-2">
                                            {game.steps.map((step, stepIndex) => (
                                                <div key={stepIndex} className="flex items-start">
                                                    <CheckCircleIcon
                                                        className={`w-5 h-5 ${game.accentColor} mr-3 mt-0.5 flex-shrink-0`}
                                                    />
                                                    <span className="text-gray-700">{step}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prize Structure */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Prize Structure & Odds
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Understand your chances of winning and the prize amounts for each tier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {prizeInfo.map((game, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                                    <h3 className="text-xl font-bold text-white">
                                        {game.game} Prize Tiers
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {game.tiers.map((tier, tierIndex) => (
                                            <div
                                                key={tierIndex}
                                                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                                <div>
                                                    <div className="font-semibold text-gray-900">
                                                        {tier.match}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        Odds: {tier.odds}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-blue-600">
                                                        {tier.prize}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                        Ready to Start Playing?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                        Join millions of players and try your luck today. Remember to play
                        responsibly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/check-numbers"
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                            <TicketIcon className="w-5 h-5" />
                            Check My Numbers
                        </a>
                        <a
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300">
                            <SparklesIcon className="w-5 h-5" />
                            View Latest Results
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
