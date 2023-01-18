import React from "react";
import { IoBicycle, IoTimerOutline, IoArrowForward } from 'react-icons/io5';
import { useRecoilState, useSetRecoilState } from "recoil";
import { formatDateString, formatDistance, formatDuration } from '../Functions/formatValues';
import { getStation } from '../Functions/stations';
import { 
    currentStationState, 
    currentJourneyState, 
} from "../GlobalStates";
import { JourneyListItemProps, CurrentStationState } from "../Types/App";
import { Journey } from "../Types/Journey";
import JourneyStats from "./JourneyStats";

// List item for journey lists
export default function JourneyListItem ({journey, selectedStationType}: JourneyListItemProps) {

    // Global states
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const setCurrentJourney = useSetRecoilState<Journey | null>(currentJourneyState);
    
    function selectJourney() {
        if(currentStation.departure?.id !== journey.departureStationId) {
            // Set departure station to departure station of this journey
            getStation(journey.departureStationId)
            .then(departureStation => {
                setCurrentStation({
                    ...currentStation,
                    departure: departureStation,
                })

                if(selectedStationType === "departure") {
                    setCurrentStation({
                        ...currentStation,
                        selected: departureStation,
                    })
                }
            })
        }

        if(currentStation.return?.id !== journey.returnStationId) {
            // Set return station to return station of this journey
            getStation(journey.returnStationId)
            .then(returnStation => {
                setCurrentStation({
                    ...currentStation,
                    return: returnStation,
                })

                if(selectedStationType === "return") {
                    setCurrentStation({
                        ...currentStation,
                        selected: returnStation,
                    })
                }
            })
        }

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