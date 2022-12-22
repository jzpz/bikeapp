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