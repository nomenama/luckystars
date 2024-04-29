import Image from "next/image";
import { dateFormatter, getDayOfTheWeek } from "@/utils/helper";
import Link from "next/link";

export const LottoCard = async ({ data }) => {
    return (
        <div className="bg-white rounded-xl flex flex-col lg:flex-row shadow-2xl">
            <aside className="lg:w-5/12 p-6 flex flex-col justify-start items-start gap-4">
                <div className="flex justify-start items-center gap-3 flex-wrap-reverse">
                    <h2 className="text-red-600 text-2xl lg:text-3xl font-bold tracking-wide">
                        UK Lotto
                    </h2>

                    <Image
                        src="/lotto.webp"
                        width={40}
                        height={40}
                        alt="lotto logo"
                        className="bg-white"
                    />
                </div>
                <p>Uk Lotto. Draws take place on Wednesday and Saturday evenings.</p>

                <div className="flex justify-start items-center gap-3">
                    <p className="text-blue-900 sm:text-lg font-bold tracking-wide">
                        {`${getDayOfTheWeek(data.draw_date)}'s Result`}
                    </p>

                    <p className="text-blue-900 sm:text-lg font-bold tracking-wide">-</p>
                    <p className="text-blue-900 sm:text-lg">{dateFormatter(data.draw_date)}</p>
                </div>

                <div className="flex justify-start items-center gap-2 sm:gap-3 my-2 flex-wrap">
                    {data.numbers.map((number, index) => (
                        <div
                            key={index}
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center bg-blue-900 text-white text-lg sm:text-xl font-bold">
                            {number}
                        </div>
                    ))}

                    {data.bonus.map((star, index) => (
                        <div
                            key={index}
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex justify-center items-center bg-red-600 text-white text-lg sm:text-xl font-bold">
                            {star}
                        </div>
                    ))}
                </div>

                <Link
                    href="lotto"
                    className="bg-blue-900 text-white font-medium px-6 py-2 rounded-3xl tracking-wide leading-6 hover:saturate-200">
                    All Results
                </Link>
            </aside>
            <Image
                src="/yacht.webp"
                width={1000}
                height={400}
                alt="boat"
                className="order-first lg:order-none rounded-tl-xl rounded-tr-xl lg:rounded-tl-none lg:rounded-br-xl lg:rounded-tr-xl lg:w-7/12"
            />
        </div>
    );
};
