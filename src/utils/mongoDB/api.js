import { connectToDb } from "@/utils/mongoDB/connection";

export async function getData(collectionName) {
    try {
        const client = await connectToDb();
        const db = client.db();

        //Db query
        return await db.collection(collectionName).find({}).toArray();
    } catch (err) {
        console.error(err);
    }
}
