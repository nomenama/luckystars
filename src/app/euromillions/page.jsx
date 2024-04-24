import { getData } from "@/utils/mongoDB/api";

export default async function EuroMillions() {
    const draws = await getData("euromillions");

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <h1>Euromillions Draws</h1>

            {draws.map((draw) => (
                <p key={draw._id.toString()}>{draw.draw_date}</p>
            ))}
        </main>
    );
}
