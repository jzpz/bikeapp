import { CurrentStationState } from './../Types/App';
import { Station } from "../Types/Station";

// Determines if a marker is departure/return station and returns color or null
export function getMarkerColor(station: Station | null, currentStation: CurrentStationState): string | null {
    if(station && currentStation.departure?.id === station.id) {
        return "#ff036c";
    } else if(station && currentStation.return?.id === station.id) {
        return "#1d63b8";
    }
    return null;
}