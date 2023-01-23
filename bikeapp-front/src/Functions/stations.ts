import { Station, StationInfo } from "../Types/Station";
import apiUrl from "../api";

export function getStations(): Promise<Station[]> {
    return new Promise((resolve, reject) => {
        fetch(apiUrl + "/stations")
        .then((response) => response.status === 200 ? response.json() : null)
        .then((data) => {
            console.log("Connected to backend: " + apiUrl);
            resolve(data);
        })
        .catch((e) => {
            console.count("Unable to connect to backend, trying again in 5 sec");
            setTimeout(() => {
                resolve(getStations()); // retry
            }, 5000);
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
    let url = apiUrl + "/stationinfo";
    
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