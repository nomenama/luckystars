"use client";

export function ErrorCard({
    title = "Lottery Results",
    error = "Unable to load lottery results",
    onRetry,
    primaryColor = "blue-900",
}) {
    const primaryColorClasses = {
        "blue-900": "bg-blue-900 hover:bg-blue-800 focus:ring-blue-300",
        "green-700": "bg-green-700 hover:bg-green-600 focus:ring-green-300",
        "purple-700": "bg-purple-700 hover:bg-purple-600 focus:ring-purple-300",
        "red-700": "bg-red-700 hover:bg-red-600 focus:ring-red-300",
    };

    return (
        <div className="w-full bg-white rounded-2xl flex flex-col lg:flex-row shadow-xl overflow-hidden border border-red-100">
            <aside className="lg:w-5/12 p-8 flex flex-col justify-center items-center text-center gap-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Oops! Something went wrong
                    </h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                </div>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className={`inline-flex items-center gap-2 ${primaryColorClasses[primaryColor]?.split(" ")[0] || "bg-blue-900"} text-white font-semibold px-8 py-3 rounded-full tracking-wide ${primaryColorClasses[primaryColor]?.split(" ")[1] || "hover:bg-blue-800"} transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-4 ${primaryColorClasses[primaryColor]?.split(" ")[2] || "focus:ring-blue-300"} focus:ring-opacity-50`}>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>
                )}
            </aside>

            <div className="lg:w-7/12 order-first lg:order-none bg-gradient-to-br from-red-50 to-orange-50">
                <div className="w-full h-64 lg:h-full flex items-center justify-center">
                    <div className="text-center opacity-50">
                        <svg
                            className="w-24 h-24 text-red-300 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.485 0-4.75.974-6.413 2.561L3 12l2.587-5.561A7.962 7.962 0 0112 9c2.485 0 4.75-.974 6.413-2.561L21 12l-2.587 5.561z"
                            />
                        </svg>
                        <p className="text-red-400 font-medium">Unable to load image</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
