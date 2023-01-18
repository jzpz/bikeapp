import React from "react";
import { IoArrowForward } from 'react-icons/io5';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { formatDateString } from '../Functions/formatValues';
import { findStation } from "../Functions/stations";
import { 
    currentStationState, 
    currentJourneyState,
    stationsState, 
} from "../GlobalStates";
import { JourneyListItemProps, CurrentStationState } from "../Types/App";
import { Journey } from "../Types/Journey";
import { Station, StationType } from "../Types/Station";
import JourneyStats from "./JourneyStats";

// List item for journey lists
export default function JourneyListItem ({journey, selectedStationType}: JourneyListItemProps) {

    // Global states
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const stations = useRecoilValue<Station[] | null>(stationsState);
    const setCurrentJourney = useSetRecoilState<Journey | null>(currentJourneyState);

    function selectJourney() {
        if(!stations) return;

        let departureStation: Station | null = currentStation.departure;
        let returnStation: Station | null = currentStation.return;
        let selectedStation: Station | null = currentStation.selected;

        if(currentStation.departure?.id !== journey.departureStationId) {
            departureStation = findStation(stations, journey.departureStationId,);
            console.log(departureStation)
        }

        if(currentStation.return?.id !== journey.returnStationId) {
            returnStation = findStation(stations, journey.returnStationId);
            console.log(departureStation)
        }

        if(selectedStationType === "departure") {
            selectedStation = departureStation;
        } else {
            selectedStation = returnStation;
        }

        setCurrentStation({
            selected: selectedStation,
            departure: departureStation,
            return: returnStation,
        })

        setCurrentJourney(journey);
    }

    return(
        <div 
            onClick={() => selectJourney()}
            className="list-item journey-item"
        >
            {/* Departure date */}
            <div>
                <span className="secondary" title="Departed at">
                    {formatDateString(journey.departureDate)}
                </span>
            </div>

            {/* Station info */}
            <div className="text-center" style={{padding:3}}>
                {/* Add classnames for colorcoding (red=departure, blue=return)*/}
                <span 
                    className={journey.departureStationId === currentStation.departure?.id ? "departure-station" : ""} 
                    style={{fontWeight:"bold"}}
                >
                    {journey.departureStationName}
                </span>
                <IoArrowForward size={18} style={{marginRight:5,marginLeft:5}} />
                <span 
                    className={`float-right ${journey.returnStationId === currentStation.return?.id ? "return-station": ""}`}
                    style={{fontWeight:"bold"}}
                    >
                        {journey.returnStationName}
                </span>
            </div>

            {/* Journey info */}
            <JourneyStats journey={journey} />
            <div className="journey-line" 
                style={{
                    // Color code the journey underline to match station colors
                    backgroundImage: 
                        `linear-gradient(to right, 
                            ${journey.departureStationId === currentStation.departure?.id ? "#ff036c" : "darkgray"},
                            ${journey.returnStationId === currentStation.return?.id ? "#1d63b8" : "darkgray"}`
                }}
            />
        </div>
    )
}