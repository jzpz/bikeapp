import { Journey, JourneyParams } from "../Types/Journey";
import { dateToString } from "./formatValues";

/**
 * @returns Journey promise
 */
export function getJourneys(params: JourneyParams): Promise<Journey[]> {
    let url = `http://localhost:8080/journeys?page=${params.page}`;

    // Fetch journeys from the selected station
    // fetch all if no station is specified
    if(params.station) {
        if(params.stationType === "departure") {
            url += "&departureStationId=" + params.station.id
        } else {
            url += "&returnStationId=" + params.station.id
        }
    }

    if(params.dateFrom && params.dateTo) {
        url += "&dateFrom=" + dateToString(params.dateFrom) + 
            "&dateTo=" + dateToString(params.dateTo)
    }

    if(params.orderBy) {
        url += "&orderBy=" + params.orderBy
    }

    if(params.descending) {
        url += "&descending=" + params.descending
    }

    console.log("fetch", url);
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
