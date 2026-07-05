/**
 * Check out the API repository: https://github.com/pedro-mealha/euromillions-api
 * These APIs are not used because Trigger is set in MongoDB Atlas to pull the latest draws and store them in the database.
 * Use MongoDB APIs instead.
 * */
import { DrawResult } from "@/lib/types";

const BASE_URL = "https://euromillions.api.pedromealha.dev/v1/draws";

const options = {
    method: "GET",
    headers: { accept: "application/json" },
    next: { revalidate: 60 },
};

export async function getDrawsFromAPI() {
    const response = await fetch(BASE_URL, options);
    const data = await response.json();

    return data as DrawResult[];
}
