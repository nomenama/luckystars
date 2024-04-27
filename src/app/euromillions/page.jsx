import { getData } from "@/utils/mongoDB/api";
import { Pagination } from "@/app/components/Pagination";

export const metadata = {
    title: "Euromillions Results: Past Draw Results and History",
    description:
        "Explore a comprehensive database of all Euromillions results since the first draw. Download or search for past winning numbers, including historical data and draw details.",
};

export default async function EuroMillions({ searchParams }) {
    //cannot be negative integer
    let pageNum = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const pageLimit = 10;
    const { draws, count } = await getData("euromillions", pageLimit, pageNum);

    const tableHeading = "Past Euromillions Draws";
    const tableSubHeading =
        "The first draw was held on 13 February 2004. Draw every Tuesday and Friday.";

    return (
        <main className="flex-1 mx-auto max-w-7xl flex flex-col items-center p-6 lg:px-8 overflow-auto">
            <div className="w-full bg-white p-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h2 className="text-base font-semibold leading-6 text-gray-900">
                            {tableHeading}
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">{tableSubHeading}</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            disabled
                            className="block rounded-md bg-blue-900 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm disabled:bg-blue-300 hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Download PDF
                        </button>
                    </div>
                </div>
                <div className="-mx-4 mt-8 sm:-mx-0">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                    Draw Date
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Ball numbers
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                    Lucky Stars
                                </th>
                                {draws[1]?.uk_millionaire_maker ? (
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        UK Millionaire Maker Codes
                                    </th>
                                ) : null}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {draws.map((draw) => (
                                <tr key={draw._id}>
                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        {new Date(draw.date).toLocaleDateString("en-GB")}
                                        <dl className="font-normal lg:hidden">
                                            <dt className="sr-only">Draw Date</dt>
                                            <dd className="mt-1 text-gray-700">
                                                {draw.numbers.map((num, index) =>
                                                    num ? (
                                                        <button
                                                            key={index}
                                                            className="w-[33px] h-[33px] p-2 rounded-full bg-red-50 mr-2 font-bold text-center shadow-2xl"
                                                            disabled>
                                                            {num}
                                                        </button>
                                                    ) : null
                                                )}

                                                {draw.stars.map((star, index) =>
                                                    star ? (
                                                        <button
                                                            key={index}
                                                            className="w-[33px] h-[33px] p-2 rounded-full bg-yellow-500 text-white mr-2 font-bold text-center shadow-2xl"
                                                            disabled>
                                                            {star}
                                                        </button>
                                                    ) : null
                                                )}
                                            </dd>
                                            <dt className="sr-only sm:hidden">Ball Numbers</dt>
                                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                                {draw?.uk_millionaire_maker
                                                    ? `Uk Millionaire Maker: ${draw?.uk_millionaire_maker}`
                                                    : null}
                                            </dd>
                                        </dl>
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {draw.numbers.map((num, index) =>
                                            num ? (
                                                <button
                                                    key={index}
                                                    className="w-[33px] h-[33px] p-2 rounded-full bg-red-50 mr-2 font-bold text-center shadow-2xl"
                                                    disabled>
                                                    {num}
                                                </button>
                                            ) : null
                                        )}
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {draw.stars.map((star, index) =>
                                            star ? (
                                                <button
                                                    disabled
                                                    key={index}
                                                    className="w-8 h-8 p-2 rounded-full bg-yellow-500 text-white mr-2 font-bold text-center shadow-2xl">
                                                    {star}
                                                </button>
                                            ) : null
                                        )}
                                    </td>

                                    {draw?.uk_millionaire_maker ? (
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {draw.uk_millionaire_maker}
                                        </td>
                                    ) : null}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination totalCount={count} pageLimit={pageLimit} />
            </div>
        </main>
    );
}
