export function getJourneys(page, currentSelectedStation, showDepartures = false) {
    let url = `http://localhost:8080/journeys?page=${page}`;

    // Fetch journeys from the selected station
    // fetch all if no station is specified
    if(currentSelectedStation.id) {
        if(showDepartures) {
            url += "&departureStationId=" + currentSelectedStation.id
        } else {
            url += "&returnStationId=" + currentSelectedStation.id
        }
    }

    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
