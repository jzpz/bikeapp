import { Station, StationInfo } from "../Types/Station";

export function getStation(stationId: string): Promise<Station> {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/station/${stationId}`)
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    })
}

export function getStations(): Promise<Station[]> {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/stations")
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    })
}

/**
 * @param {*} stationId
 * @returns station info (journey amount, average values, top stations)
 */
export function getStationInfo(stationId: string, dateFrom?: Date, dateTo?: Date): Promise<StationInfo> {
    let url = "http://localhost:8080/stationinfo"
    
    if(stationId) {
        url += `?stationId=${stationId}`
    }
    
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}
