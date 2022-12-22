import { Dispatch, SetStateAction } from "react";
import { Journey } from "./Journey";
import { Station, StationPopularity, StationType } from "./Station";
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
