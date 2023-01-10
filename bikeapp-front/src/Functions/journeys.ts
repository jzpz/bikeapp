import { Journey, JourneyParams } from "../Types/Journey";
import { dateToString } from "./formatValues";

/**
 * @returns Journey promise
 */
export function getJourneys(params: JourneyParams): Promise<Journey[]> {
    let url = `http://localhost:8080/journeys?page=${params.page}`;

    // Fetch journeys from the selected station
    // fetch all if no station is specified
    if(params.selectedStation) {
        if(params.selectedStationType === "departure") {
            url += "&departureStationId=" + params.selectedStation.id
        } else {
            url += "&returnStationId=" + params.selectedStation.id
        }
    }

    if(params.dateFrom && params.dateTo) {
        url += "&dateFrom=" + dateToString(params.dateFrom) + 
            "&dateTo=" + dateToString(params.dateTo)
    }

    console.log("fetch",url)
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
