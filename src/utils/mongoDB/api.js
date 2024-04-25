import { connectToDb } from "@/utils/mongoDB/connection";
import { unstable_noStore as noStore } from "next/cache";

export async function getData(collectionName, limit = 20, pageNum) {
    noStore();

    try {
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
