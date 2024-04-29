import { EuromillionCard } from "@/app/components/Cards/EuromillionCard";
import { getLatestData } from "@/utils/mongoDB/api";
import { LottoCard } from "@/app/components/Cards/LottoCard";

export default async function Home() {
    const [euromillionsData, lottoData] = await Promise.all([
        getLatestData("euromillions"),
        getLatestData("lotto"),
    ]);

    return (
        <main className="flex-1 mx-auto max-w-7xl flex flex-col gap-10 items-center p-6 lg:px-8 overflow-auto">
            <EuromillionCard data={euromillionsData} />
            <LottoCard data={lottoData} />
        </main>
    );
}
