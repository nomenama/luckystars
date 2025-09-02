/**
 * Check out the API repository: https://github.com/pedro-mealha/euromillions-api
* */
import { PAGE_LIMIT } from "@/static";


const BASE_URL = 'https://euromillions.api.pedromealha.dev/v1/draws';
const options = {method: 'GET', headers: {accept: 'application/json'}, next: {revalidate: 60}};

export async function getLatestDraw() {
    const response = await fetch(BASE_URL, options);

    const data = await response.json();

    return data[data.length - 1];
}

export async function getDraws(pageNumber = 1) {
    const response = await fetch(BASE_URL, options);
    const data = await response.json();

    const total = data.length;
    const pageCount = Math.ceil(total / PAGE_LIMIT);

    // Instead of reversing the whole array, compute slice indices from the end
    const start = total - pageNumber * PAGE_LIMIT;
    const end = start + PAGE_LIMIT;

    const pageData = data
        .slice(Math.max(0, start), Math.max(0, end))
        .reverse(); // small slice only

    return {
        data: pageData,
        total,
        pageCount,
    };
}


export async function getDraw(drawId) {
    const response = await fetch(`${BASE_URL}/${drawId}`, options);
    return response.json();
}
