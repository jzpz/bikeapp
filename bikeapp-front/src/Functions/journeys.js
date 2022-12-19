/**
 * @param {*} page page number
 * @param {*} selectedStation station object
 * @param {*} showDepartures show departures for selectedStation? true/false
 * @returns Journey promise
 */
export function getJourneys(page, selectedStation, showDepartures = true) {
    let url = `http://localhost:8080/journeys?page=${page}`;

    // Fetch journeys from the selected station
    // fetch all if no station is specified
    if(selectedStation.id) {
        if(showDepartures) {
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
