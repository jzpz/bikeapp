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
    station?: Station, 
    stationType?: StationType,
    dateFrom?: Date, 
    dateTo?: Date,
    orderBy?: string,
    descending?: boolean,
}

export interface JourneyOrderColumn {
    column: string,
    name: string,
}

export const JourneyOrderColumns = {
    departureDate: {column: "departureDate", name: "Departure Date"},
    returnDate: {column: "returnDate", name: "Return Date"},
    distanceCoveredInMeters: {column: "distanceCoveredInMeters", name: "Journey Distance"},
    durationInSeconds: {column: "durationInSeconds", name: "Journey Duration"},
    departureStationName: {column: "departureStationName", name: "Departure Station"},
    returnStationName: {column: "returnStationName", name: "Return Station"},
};

export interface JourneyStatsProps {
    journey: Journey,
}