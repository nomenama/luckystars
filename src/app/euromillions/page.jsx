import { getData } from "@/utils/mongoDB/api";
import ContentTable from "@/app/components/ContentTable";

export default async function EuroMillions({ searchParams }) {
    //cannot be negative integer
    let pageNum = Math.max(parseInt(searchParams.page, 10) || 1, 1);
    const pageLimit = 10;
    const { draws, count } = await getData("euromillions", pageLimit, pageNum);

    return (
        <main className="flex-1 mx-auto max-w-7xl flex flex-col items-center p-6 lg:px-8 overflow-auto">
            <ContentTable
                heading="Past Euromillions Draws"
                subHeading="Out of this world jackpots. The first draw was held on 13 February 2004."
                draws={draws}
                drawCount={count}
                pageLimit={pageLimit}
            />
        </main>
    );
}
