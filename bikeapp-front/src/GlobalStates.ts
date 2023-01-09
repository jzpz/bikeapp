import { atom } from "recoil";
import { DateFilter, OffCanvasStatus } from "./Types/App";
import { Station, StationInfo } from "./Types/Station";

// Setup global Recoil states for data that needs to be
// accessed by multiple components

export const stationsState = atom({
    key: 'stationsState' as string,
    default: null as Station[] | null,
});

export const selectedStationState = atom({
    key: 'selectedStationState' as string,
    default: null as Station | null,
});

export const departureStationState = atom({
    key: 'departureStationState' as string,
    default: null as Station | null,
});

export const returnStationState = atom({
    key: 'returnStationState' as string,
    default: null as Station | null,
});

export const dateFilterState = atom({
    key: 'dateFilterState' as string,
    default: {dateFrom: null, dateTo: null} as DateFilter,
});

export const offCanvasState = atom({
    key: 'offCanvasState' as string,
    default: {journeys: false, stations: false} as OffCanvasStatus,
});

export const stationInfoState = atom({
    key: 'stationInfoState' as string,
    default: null as StationInfo | null,
});