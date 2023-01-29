import { atom } from "recoil";
import { DateFilter, OffCanvasStatus, AppSettings, CurrentStationState } from "./Types/App";
import { Journey } from "./Types/Journey";
import { Station, StationInfo } from "./Types/Station";

// Setup global Recoil states for data that needs to be
// accessed by multiple components

export const stationsState = atom({
    key: 'stationsState' as string,
    default: null as Station[] | null,
});

export const currentStationState = atom({
    key: 'currentStationState' as string,
    default: {
        selected: null,
        departure: null,
        return: null,
    } as CurrentStationState,
});

export const departureStationState = atom({
    key: 'departureStationState' as string,
    default: null as Station | null,
});

export const returnStationState = atom({
    key: 'returnStationState' as string,
    default: null as Station | null,
});

export const currentJourneyState = atom({
    key: 'currentJourneyStationState' as string,
    default: null as Journey | null,
});

export const dateFilterState = atom({
    key: 'dateFilterState' as string,
    default: {dateFrom: null, dateTo: null} as DateFilter,
});

export const offCanvasState = atom({
    key: 'offCanvasState' as string,
    default: {journeys: false, stations: false, fileUpload: false} as OffCanvasStatus,
});

export const stationInfoState = atom({
    key: 'stationInfoState' as string,
    default: null as StationInfo | null,
});

export const settingsState = atom({
    key: 'settingsState' as string,
    default: {
        showLines: true, 
        showMarkers: true,
    } as AppSettings,
});