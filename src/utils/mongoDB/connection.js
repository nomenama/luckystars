import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
let client = null;
let options = {};

export async function connectToDb() {
    if (client) {
        return client;
    }

    if (!MONGODB_URI) throw new Error("MongoDB URI not specified");

    try {
        client = await MongoClient.connect(MONGODB_URI, options);
        console.log("Successfully connected to database");
        return client;
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
}
