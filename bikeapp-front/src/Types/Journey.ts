import { Station, StationType } from "./Station";

export interface Journey {
    id: bigint;
    departureDate: string,
    returnDate: string,
    departureStationId: string,
    departureStationName: string,
    returnStationId: string,
    returnStationName: string,
    distanceCoveredInMeters: number,
    durationInSeconds: number,
}

export interface JourneyParams {
    page: number, 
    selectedStation?: Station, 
    selectedStationType?: StationType,
    dateFrom?: Date, 
    dateTo?: Date,
}