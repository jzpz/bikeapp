import { Dispatch, SetStateAction } from "react";
import { Journey, JourneyOrderColumn } from "./Journey";
import { Station, StationPopularity, StationType } from "./Station";

export interface OffCanvasStatus {
    journeys: boolean,
    stations: boolean,
    fileUpload: boolean,
}

export interface OffCanvas {
    offCanvas: OffCanvasStatus,
    setOffCanvas: Dispatch<SetStateAction<OffCanvasStatus>>,
};

export interface JourneyListItemProps {
    journey: Journey,
    selectedStationType: StationType,
}

export interface PopularStationItemProps {
    stationPopularity: StationPopularity,
    selectedStationType: StationType,
}

export interface DateFilter {
    dateFrom: Date | null,
    dateTo: Date | null,
}

export interface SelectDateProps {
    dateFrom: Date | null,
    setDateFrom: Dispatch<SetStateAction<Date | null>>,
    dateTo: Date | null,
    setDateTo: Dispatch<SetStateAction<Date | null>>,
}

export interface OrderDirectionButtonProps {
    isDescending: boolean, 
    handleChange: (isDescending: boolean) => void,
}

export interface OrderJourneysDropdownProps {
    currentOrderColumn: JourneyOrderColumn,
    handleChange: (newOrderColumn: JourneyOrderColumn) => void,
}

export interface PaginationMenuProps {
    handlePageSwitch: (page: number) => void,
    currentPage: number,
}

export interface AppSettings {
    showLines: boolean,
    showMarkers: boolean,
}

export interface FirstNavbarProps {
    station: Station | null,
}

export interface CurrentStationState {
    selected: Station | null,
    departure: Station | null,
    return: Station | null,
}

export interface JourneyListProps {
    journeys: Journey[] | null,
    loading: boolean,
    selectedStationType: StationType,
}

export interface StationListProps {
    filterWord: string,
}

export type FileContentType = "stations" | "journeys";

export interface ImportStatus {
    writeCount?: number,
    readCount?: number,
    filterCount?: number,
    importStatus?: string,
    startTime?: string,
    endTime?: string,
}