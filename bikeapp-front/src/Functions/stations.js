export function getStation(stationId) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/station/${stationId}`)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    })
}

export function getStations() {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/stations`)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    })
}

/**
 * @param {*} stationId
 * @returns station info (journey amount, average values, top stations)
 */
export function getStationInfo(stationId) {
    let url = "http://localhost:8080/stationinfo"
    
    if(stationId) {
        url += `?stationId=${stationId}`
    }
    
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
