import { connectToDb } from "@/utils/mongoDB/connection";
import { unstable_noStore as noStore } from "next/cache";
import euromillions from "@/test_data/euromillions_sorted.json";
import lotto from "@/test_data/lotto_sorted.json";

export async function getData(collectionName, limit = 20, pageNum) {
    noStore();

    try {
        if (process.env.NODE_ENV === "development") {
            const startIndex = limit * (pageNum - 1);
            const endIndex = startIndex + limit;
            const limitedTestData =
                collectionName === "euromillions"
                    ? euromillions.slice(startIndex, endIndex)
                    : lotto.slice(startIndex, endIndex);

            return {
                draws: limitedTestData,
                count: collectionName === "euromillions" ? euromillions.length : lotto.length,
            };
        }

        const client = await connectToDb();
        const db = client.db();

        const draws = await db
            .collection(collectionName)
            .find({})
            .limit(limit)
            .skip(limit * (pageNum - 1))
            .toArray();
        const count = await db.collection(collectionName).countDocuments();

        return { draws, count };
    } catch (err) {
        console.error(err);
        return { draws: [], count: 0 };
    }
}
