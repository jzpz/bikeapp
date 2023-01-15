/**
 * @param {*} date ISO datetime
 * @returns formatted datetime string y-m-d h.m
 */
export function formatDateString(date: string): string {
    return (
        date.substring(0, 10) + " " + 
        date.substring(11, 16).replaceAll(":", '.')
    );
}

/**
 * @param date 
 * @returns date as y-m-d
 */
export function dateToString(date: Date): string {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return(year + "-" + month + "-" + day)
}

/**
 * @param {*} seconds duration in seconds
 * @returns duration in minutes and seconds
 */
export function formatDuration(seconds: number): string {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds % 3600 / 60);
    seconds = (seconds % 3600) % 60;

    return(
        (hours ? hours + "h " : "") +
        (minutes ? minutes + "m " : "") +
        seconds + "s"
    )
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
