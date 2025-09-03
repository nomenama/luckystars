import { LotteryCard } from "@/app/components/Cards/LotteryCard";

export default function Home() {
    return (
        <main className="flex-1 w-full mx-auto max-w-7xl flex flex-col gap-10 items-center p-6 lg:px-8 overflow-auto">
            <LotteryCard
                route="euromillions"
                title="EuroMillions"
                logo="/euromillions-logo.webp"
                description="EuroMillions is a lottery that is played across nine European countries. Draws take place on Tuesday and Friday evenings."
                primaryColor="blue-900"
                accentColor="yellow-500"
                backgroundImage="/island.webp"
                backgroundAlt="tropical island"
            />

            <LotteryCard
                route="uk-lotto"
                title="UK Lotto"
                logo="/lotto-logo.png"
                description="The UK National Lottery is the state-franchised national lottery in the United Kingdom. Draws take place on Wednesday and Saturday evenings."
                primaryColor="red-700"
                accentColor="pink-500"
                backgroundImage="/sunset.webp"
                backgroundAlt="yacht"
            />
        </main>
    );
}
