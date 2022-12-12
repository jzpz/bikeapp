export function getStation(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/station/${id}`)
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
