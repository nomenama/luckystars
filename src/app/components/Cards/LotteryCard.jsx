import Image from "next/image";
import { dateFormatter, getDayOfTheWeek } from "@/utils/helper";
import Link from "next/link";
import { getLatestDraw } from "@/utils/mongoDB/api";
import { ErrorCard } from "@/app/components/Cards/ErrorCard";
import { Fragment, Suspense } from "react";

export function LotteryCard({
    route,
    title,
    logo,
    description,
    primaryColor = "blue-900",
    accentColor = "yellow-500",
    backgroundImage = "/island.webp",
    backgroundAlt = "lottery background",
}) {
    const primaryColorClasses = {
        "blue-900": "bg-blue-900 text-blue-900 hover:bg-blue-800",
        "green-700": "bg-green-700 text-green-700 hover:bg-green-600",
        "purple-700": "bg-purple-700 text-purple-700 hover:bg-purple-600",
        "red-700": "bg-red-700 text-red-700 hover:bg-red-600",
    };

    const accentColorClasses = {
        "yellow-500": "bg-yellow-500 text-yellow-500",
        "orange-500": "bg-orange-500 text-orange-500",
        "pink-500": "bg-pink-500 text-pink-500",
        "cyan-500": "bg-cyan-500 text-cyan-500",
    };

    return (
        <div className="group bg-white rounded-2xl flex flex-col lg:flex-row shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            <aside className="lg:w-5/12 p-8 flex flex-col justify-start items-start gap-6 relative">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white pointer-events-none" />

                <div className="relative z-10 w-full">
                    <div className="flex justify-start items-center gap-4 flex-wrap-reverse mb-1">
                        <h2
                            className={`${accentColorClasses[accentColor]?.split(" ")[1] || "text-yellow-500"} text-3xl lg:text-4xl font-bold tracking-wide`}>
                            {title}
                        </h2>

                        <div className="relative group-hover:scale-110 transition-transform duration-300">
                            <Image
                                src={logo}
                                width={65}
                                height={65}
                                alt={`${title} logo`}
                                className="drop-shadow-lg"
                            />
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 text-sm lg:text-base">
                        {description}
                    </p>

                    <Suspense
                        fallback={
                            <LoadingComponent
                                primaryColor={primaryColor}
                                accentColor={accentColor}
                                primaryColorClasses={primaryColorClasses}
                                accentColorClasses={accentColorClasses}
                            />
                        }>
                        <LatestDrawCard
                            route={route}
                            primaryColor={primaryColor}
                            accentColor={accentColor}
                            primaryColorClasses={primaryColorClasses}
                            accentColorClasses={accentColorClasses}
                        />
                    </Suspense>

                    <Link
                        href={route}
                        className={`inline-flex items-center gap-2 ${primaryColorClasses[primaryColor]?.split(" ")[0] || "bg-blue-900"} text-white font-semibold px-8 py-3 rounded-full tracking-wide leading-6 ${primaryColorClasses[primaryColor]?.split(" ")[2] || "hover:bg-blue-800"} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}>
                        All Results
                        <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </Link>
                </div>
            </aside>

            <div className="relative lg:w-7/12 order-first lg:order-none overflow-hidden">
                <Image
                    src={backgroundImage}
                    width={1000}
                    height={400}
                    alt={backgroundAlt}
                    className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
        </div>
    );
}

const LatestDrawCard = async ({
    route,
    primaryColor,
    accentColor,
    primaryColorClasses,
    accentColorClasses,
}) => {
    const currentDraw = await getLatestDraw(route);

    if (!currentDraw)
        return (
            <p className="mb-8 text-red-500">
                Error retrieving result. Refresh the page to try again!
            </p>
        );

    return (
        <Fragment>
            <div className="flex justify-start items-center gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <p
                        className={`${primaryColorClasses[primaryColor]?.split(" ")[1] || "text-blue-900"} text-base lg:text-xl font-bold tracking-wide`}>
                        {`${getDayOfTheWeek(currentDraw.date)}'s Result`}
                    </p>
                </div>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                <p className="text-gray-600 text-base lg:text-xl font-medium">
                    {dateFormatter(currentDraw.date)}
                </p>
            </div>

            <div className="flex justify-start items-center gap-3 my-6 flex-wrap">
                {currentDraw.numbers.map((number, index) => (
                    <div
                        key={`number-${index}`}
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex justify-center items-center ${primaryColorClasses[primaryColor]?.split(" ")[0] || "bg-blue-900"} text-white text-sm sm:text-xl font-bold shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl`}>
                        {number}
                    </div>
                ))}

                {currentDraw.stars &&
                    currentDraw.stars.map((star, index) => (
                        <div
                            key={`star-${index}`}
                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex justify-center items-center ${accentColorClasses[accentColor]?.split(" ")[0] || "bg-yellow-500"} text-white text-sm sm:text-xl font-bold shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl relative`}>
                            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                            {star}
                        </div>
                    ))}
            </div>
        </Fragment>
    );
};

const LoadingComponent = ({
    primaryColor,
    accentColor,
    primaryColorClasses,
    accentColorClasses,
}) => {
    return (
        <>
            <div className="flex justify-start items-center gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-6 lg:h-7 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>

                <div className="h-4 w-px bg-gray-300 mx-1" />

                <div className="h-6 lg:h-7 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>

            <div className="flex justify-start items-center gap-3 my-6 flex-wrap">
                {/* Main numbers skeleton */}
                {[...Array(5)].map((_, index) => (
                    <div
                        key={`number-skeleton-${index}`}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 animate-pulse"></div>
                ))}

                {/* Stars skeleton */}
                {[...Array(2)].map((_, index) => (
                    <div
                        key={`star-skeleton-${index}`}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 animate-pulse"></div>
                ))}
            </div>
        </>
    );
};
