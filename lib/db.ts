import { MongoClient, Db } from "mongodb";
import { DrawResult } from "@/lib/types";

if (!process.env.MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    // eslint-disable-next-line no-var
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
        client = new MongoClient(process.env.MONGODB_URI);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect();
}

export async function getDb(dbName = "luckystars"): Promise<Db> {
    const client = await clientPromise;
    return client.db(dbName);
}

export async function getLatestDraw(): Promise<DrawResult | null> {
    const db = await getDb();

    const latest = await db
        .collection<DrawResult>("euromillions")
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray();

    return latest[0] ?? null;
}

export async function getDrawById(drawId: number): Promise<DrawResult | null> {
    const db = await getDb();

    const data = await db
        .collection<DrawResult>("euromillions")
        .find({
            id: drawId,
        })
        .toArray();

    return data[0] ?? null;
}

export async function getPaginatedDraws(params: { page?: number; limit?: number }): Promise<{
    data: DrawResult[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}> {
    const db = await getDb();

    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const collection = db.collection<DrawResult>("euromillions");

    const [data, total] = await Promise.all([
        collection
            .find()
            .sort({ id: -1 }) // latest first
            .skip(skip)
            .limit(limit)
            .toArray(),

        collection.countDocuments(),
    ]);

    return {
        data,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
}
