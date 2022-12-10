// Removes unnecessary parts from iso date string
// and formats it
export function formatDate(date) {
    return (
        date.substring(0, 10) + " " + 
        date.substring(11, 16).replaceAll(":", '.')
    );
}

export function formatDuration(seconds) {
    let value = 
        Math.floor(seconds / 60) + "m " + 
        (seconds % 60 ? seconds % 60 : '00') + "s";
    return value
}

export function formatDistance(meters) {
    return (meters / 1000)
    .toString()
    .replaceAll(".", ',') + " km";
}
