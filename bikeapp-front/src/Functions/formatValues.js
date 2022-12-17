export function formatDate(date) {
    return ( // Takes only the relevant information from iso timestamp string y-d-m h.m)
        date.substring(0, 10) + " " + 
        date.substring(11, 16).replaceAll(":", '.')
    );
}

export function formatDuration(seconds) {
    let value = // sec -> min, sec
        Math.floor(seconds / 60) + "m " +
        (seconds % 60 ? seconds % 60 : '00') + "s";
    return value
}

export function formatDistance(meters) {
    let distance = (meters / 1000) // m -> km
    distance = Math.round(distance * 100) / 100 // round to 2 decimals
    return distance.toString()
        .replaceAll(".", ',') + " km";
}
