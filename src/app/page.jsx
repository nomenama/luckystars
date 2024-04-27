import Image from "next/image";
import Link from "next/link";
import { getLatestData } from "@/utils/mongoDB/api";
import { dateFormatter, getDayOfTheWeek } from "@/utils/helper";

export default async function Home() {
    const euromillions_latest_draw = await getLatestData("euromillions");

    return (
        <main className="flex-1 mx-auto max-w-7xl flex flex-col items-center p-6 lg:px-8 overflow-auto">
            <div className="bg-white rounded-xl flex flex-col lg:flex-row shadow-2xl">
                <aside className="lg:w-5/12 p-6 flex flex-col justify-start items-start gap-4">
                    <div className="flex justify-start items-center gap-3 flex-wrap-reverse">
                        <h2 className="text-yellow-500 text-2xl lg:text-3xl font-bold tracking-wide">
                            Euromillions
                        </h2>

                        <Image
                            src="/euromillions.webp"
                            width={80}
                            height={80}
                            alt="euromillions logo"
                        />
                    </div>
                    <p>
                        EuroMillions is a lottery that is played across nine European countries.
                        Draws take place on Tuesday and Friday evenings.
                    </p>

                    <div className="flex justify-start items-center gap-3">
                        <p className="text-blue-900 sm:text-lg font-bold tracking-wide">
                            {`${getDayOfTheWeek(euromillions_latest_draw.date)}'s Result`}
                        </p>

                        <p className="text-blue-900 sm:text-lg font-bold tracking-wide">-</p>
                        <p className="text-blue-900 sm:text-lg">
                            {dateFormatter(euromillions_latest_draw.date)}
                        </p>
                    </div>

                    <div className="flex justify-start items-center gap-2 sm:gap-3 my-2 flex-wrap">
                        {euromillions_latest_draw.numbers.map((number, index) => (
                            <div
                                key={index}
                                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center bg-blue-900 text-white text-lg sm:text-xl font-bold">
                                {number}
                            </div>
                        ))}

                        {euromillions_latest_draw.stars.map((star, index) => (
                            <div
                                key={index}
                                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center bg-yellow-500 text-white text-lg sm:text-xl font-bold">
                                {star}
                            </div>
                        ))}
                    </div>

                    {/*                    <div className="flex justify-start items-center gap-2 flex-wrap">
                        <p className="text-gray-700">Uk Millionaire Maker:</p>

                        <p className="text-blue-900 text-lg sm:text-2xl font-bold">TPZG 11349</p>
                    </div>*/}

                    <Link
                        href="euromillions"
                        className="bg-blue-900 text-white font-medium px-6 py-2 rounded-3xl tracking-wide leading-6 hover:saturate-200">
                        All Results
                    </Link>
                </aside>
                <Image
                    src="/island.webp"
                    width={1000}
                    height={400}
                    alt="boat"
                    className="order-first lg:order-none rounded-tl-xl rounded-tr-xl lg:rounded-tl-none lg:rounded-br-xl lg:rounded-tr-xl lg:w-7/12"
                />
            </div>
        </main>
    );
}
