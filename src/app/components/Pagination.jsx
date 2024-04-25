"use client";

import { Button } from "@/app/components/Buttons/Button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Pagination({ totalCount, pageLimit }) {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const pageNum = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
    const totalPages = Math.ceil(totalCount / pageLimit);

    const prevPage = pageNum - 1 > 0 ? pageNum - 1 : 1;
    const nextPage = pageNum + 1;

    const countStart = (pageNum - 1) * pageLimit + 1;
    const countEnd = Math.min(pageNum * pageLimit, totalCount);

    const handlePrevious = () => {
        const params = new URLSearchParams(searchParams);

        params.set("page", prevPage);
        replace(`${pathname}?${params.toString()}`);
    };
    const handleNext = () => {
        const params = new URLSearchParams(searchParams);

        params.set("page", nextPage);

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white py-3"
            aria-label="Pagination">
            <div className="sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{countStart}</span> to{" "}
                    <span className="font-medium">{countEnd}</span> of{" "}
                    <span className="font-medium">{totalCount}</span> results
                </p>
            </div>
            <div className="flex flex-1 justify-between sm:justify-end">
                {pageNum === 1 ? (
                    <div
                        aria-disabled
                        className="opacity-60 relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 mr-2">
                        Previous
                    </div>
                ) : (
                    <Button
                        type="button"
                        onClick={handlePrevious}
                        text="Previous"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 mr-2"
                    />
                )}

                {pageNum === totalPages ? (
                    <div
                        aria-disabled
                        className="opacity-60 relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">
                        Next
                    </div>
                ) : (
                    <Button
                        type="button"
                        onClick={handleNext}
                        text="Next"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    />
                )}
            </div>
        </nav>
    );
}
