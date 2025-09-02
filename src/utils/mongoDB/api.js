import { connectToDb } from "@/utils/mongoDB/connection";
import { unstable_noStore as noStore } from "next/cache";
import { PAGE_LIMIT } from "@/static";

export async function getLatestDraw(collectionName) {
    try {
        const client = await connectToDb();
        const db = client.db();

        const latestDraw = await db.collection(collectionName).find({}).limit(1).toArray();

        if (latestDraw.length > 0) {
            return latestDraw[latestDraw.length - 1];
        } else {
            return {};
        }
    } catch (err) {
        console.error(err);
        return {};
    }
}

export async function getDraws(collectionName, pageNumber) {
    try {
        const client = await connectToDb();
        const db = client.db();

        const draws = await db
            .collection(collectionName)
            .find({})
            .sort({ id: -1 })
            .limit(PAGE_LIMIT)
            .skip(PAGE_LIMIT * (pageNumber - 1))
            .toArray();
        const count = await db.collection(collectionName).countDocuments();

        return { draws, count };
    } catch (err) {
        console.error(err);
        return { draws: [], count: 0 };
    }
}
