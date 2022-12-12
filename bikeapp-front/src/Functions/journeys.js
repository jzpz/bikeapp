export function getJourneys(page, currentSelectedStation, showDepartures = false) {
    let searchParams = "";

    // Fetch journeys from the selected station
    if(currentSelectedStation.id) {
        if(showDepartures) 
        searchParams += "&departureStationId=" + currentSelectedStation.id
    else
        searchParams += "&returnStationId=" + currentSelectedStation.id
    }

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/journeys?page=${page + searchParams}`)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}