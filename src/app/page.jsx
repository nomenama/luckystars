import { EuroMillionCard } from "@/app/components/Cards/EuromillionCard";
import { LottoCard } from "@/app/components/Cards/LottoCard";
import { Suspense } from "react";
import { getLatestDraw } from "@/utils/mongoDB/api";

export default async function Home() {
    const currentDraw = await getLatestDraw("euromillions");

    return (
        <main className="flex-1 mx-auto max-w-7xl flex flex-col gap-10 items-center p-6 lg:px-8 overflow-auto">
            <Suspense fallback={<div>Loading...</div>}>
                <EuroMillionCard data={currentDraw} />
            </Suspense>
            {/*<LottoCard data={lottoData} />*/}
        </main>
    );
}
