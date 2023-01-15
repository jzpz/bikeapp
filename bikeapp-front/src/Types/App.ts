import { Dispatch, SetStateAction } from "react";
import { Journey } from "./Journey";
import { StationPopularity, StationType } from "./Station";
export interface OffCanvasStatus {
    journeys: boolean,
    stations: boolean,
}

export type OffCanvas = {
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

export interface PaginationMenuProps {
    handlePageSwitch: (page: number) => void,
    currentPage: number,
}