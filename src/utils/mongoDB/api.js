import { connectToDb } from "@/utils/mongoDB/connection";
import { unstable_noStore as noStore } from "next/cache";
import { PAGE_LIMIT } from "@/static";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getLatestDraw(collectionName) {
    noStore();

    process.env.NODE_ENV === "development" && (await delay(3000));

    try {
        const client = await connectToDb();
        const db = client.db();

        const latestDraw = await db
            .collection(collectionName)
            .find({})
            .sort({ id: -1 })
            .limit(1)
            .toArray();

        if (latestDraw.length > 0) {
            return latestDraw[0];
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
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
