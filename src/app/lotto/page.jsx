import { getData } from "@/utils/mongoDB/api";
import { Pagination } from "@/app/components/Pagination";

export const metadata = {
    title: "UK Lotto Results: Past Draw Results and History",
    description:
        "Explore a comprehensive database of all Lotto results since the" +
        " first draw. Download or search for past winning numbers, including historical data and draw details.",
};

export default async function Lotto({ searchParams }) {
    //cannot be negative integer
    let pageNum = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const pageLimit = 10;
    const { draws, count } = await getData("lotto", pageLimit, pageNum);

    const tableHeading = "Past UK Lotto Draws";
    const tableSubHeading =
        "Past draw results from 1995. Draw every" + " Wednesday" + " and Saturday.";

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
                                    Bonus
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {draws.map((draw, index) => (
                                <tr key={draw._id}>
                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        {new Date(draw.draw_date).toLocaleDateString("en-GB")}
                                        <dl className="font-normal lg:hidden">
                                            <dt className="sr-only">Draw Date</dt>
                                            <dd className="mt-1 text-gray-700">
                                                {[
                                                    draw.num_one,
                                                    draw.num_two,
                                                    draw.num_three,
                                                    draw.num_four,
                                                    draw.num_five,
                                                    draw.num_six,
                                                ].map((num, index) =>
                                                    num ? (
                                                        <button
                                                            key={index}
                                                            className="w-[33px] h-[33px] p-2 rounded-full bg-red-50 mr-2 font-bold text-center shadow-2xl"
                                                            disabled>
                                                            {num}
                                                        </button>
                                                    ) : null
                                                )}

                                                <button
                                                    key={index}
                                                    className="w-[33px] h-[33px] p-2 rounded-full bg-red-500 text-white mr-2 font-bold text-center shadow-2xl"
                                                    disabled>
                                                    {draw.bonus}
                                                </button>
                                            </dd>
                                            <dt className="sr-only sm:hidden">Ball Numbers</dt>
                                        </dl>
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <div className="flex gap-3">
                                            {[
                                                draw.num_one,
                                                draw.num_two,
                                                draw.num_three,
                                                draw.num_four,
                                                draw.num_five,
                                                draw.num_six,
                                            ].map((num, index) =>
                                                num ? (
                                                    <span
                                                        key={index}
                                                        className="w-8 h-8 p-2 rounded-full bg-red-100 font-bold text-center shadow-2xl flex justify-center items-center">
                                                        {num}
                                                    </span>
                                                ) : null
                                            )}
                                        </div>
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <span
                                            key={index}
                                            className="w-8 h-8 p-2 rounded-full bg-red-500 text-white font-bold text-center shadow-2xl flex justify-center items-center">
                                            {draw.bonus}
                                        </span>
                                    </td>
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
