export interface Journey {
    id: bigint;
    departureDate: Date,
    returnDate: Date,
    departureStationId: string,
    departureStationName: string,
    returnStationId: string,
    returnStationName: string,
    distanceCoveredInMeters: number,
    durationInSeconds: number
}