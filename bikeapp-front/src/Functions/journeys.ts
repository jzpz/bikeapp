import { Journey } from "../Types/Journey";
import { Station, StationType } from "../Types/Station";

/**
 * @param {*} page page number
 * @param {*} selectedStation station object
 * @param {*} selectedStationType is selected station arrival or return station of a journey?
 * @returns Journey promise
 */
export function getJourneys(page: number, selectedStation: Station, selectedStationType: StationType): Promise<Journey[]> {
    let url = `http://localhost:8080/journeys?page=${page}`;

    // Fetch journeys from the selected station
    // fetch all if no station is specified
    if(selectedStation) {
        if(selectedStationType === "departure") {
            url += "&departureStationId=" + selectedStation.id
        } else {
            url += "&returnStationId=" + selectedStation.id
        }
    }

    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
