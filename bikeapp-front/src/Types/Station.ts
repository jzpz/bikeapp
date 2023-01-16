export interface Station {
    fid: bigint,
    id: string,
    nameLocaleFi: string,
    nameLocaleSe: string,
    nameLocaleEn: string,
    addressLocaleFi: string,
    addressLocaleSe: string,
    addressLocaleEn: string,
    cityLocaleFi: string,
    cityLocaleSe: string,
    operator: string,
    capacity: bigint,
    coordinateX: number,
    coordinateY: number
}

export interface StationPopularity {
    id: string,
    nameLocaleFi: string,
    nameLocaleSe: string,
    nameLocaleEn: string,
    journeyAmount: number,
}

export interface StationInfo {
    averageDistanceCoveredAsDepartureStation: number,
    averageDistanceCoveredAsReturnStation: number,
    journeysStarting: number,
    journeysEnding: number,
    mostPopularDepartureStations: StationPopularity[],
    mostPopularReturnStations: StationPopularity[],
}

export type StationType = "departure" | "return";

export interface StationNameProps {
    station: Station | StationPopularity,
}