import { Station, StationInfo, StationType } from "../Types/Station";

export function getStations(): Promise<Station[]> {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8080/stations")
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => {
            console.count("Unable to connect to backend, trying again");
            resolve(getStations()); // retry
        });
    })
}

/** 
 * Searches station from global stations array
 * @returns station
 */
export function findStation(stations: Station[], stationId: string): Station | null { 
    let station;
    station = stations.find((station, i) => station.id === stationId)
    
    if(station) {
        return station;
    }

    return null;
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

    console.log("fetch", url)
    
    return new Promise((resolve, reject) => {
        fetch(url)
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => resolve(data))
        .catch((e) => reject(e))
    })
}