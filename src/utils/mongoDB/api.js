import { connectToDb } from "@/utils/mongoDB/connection";
import { unstable_noStore as noStore } from "next/cache";

export async function getData(collectionName, limit = 6) {
    noStore();

    try {
        const client = await connectToDb();
        const db = client.db();

        //Db query
        return await db.collection(collectionName).find({}).limit(limit).toArray();
    } catch (err) {
        console.error(err);
    }
}
