/**
 * @param {*} date ISO datetime
 * @returns formatted datetime string y-d-m h.m
 */
export function formatDate(date: string): string {
    return (
        date.substring(0, 10) + " " + 
        date.substring(11, 16).replaceAll(":", '.')
    );
}

/**
 * @param {*} seconds duration in seconds
 * @returns duration in minutes and seconds
 */
export function formatDuration(seconds: number): string {
    let value = // sec -> min, sec
        Math.floor(seconds / 60) + "m " +
        (seconds % 60 ? seconds % 60 : '00') + "s";
    return value
}

/**
 * @param {*} meters distance in meters
 * @returns distance in kilometers and meters
 */
export function formatDistance(meters: number): string {
    let distance = (meters / 1000) // m -> km
    distance = Math.round(distance * 100) / 100 // round to 2 decimals
    return distance.toString()
        .replaceAll(".", ',') + " km";
}
