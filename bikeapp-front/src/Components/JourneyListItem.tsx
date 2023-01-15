import React from "react";
import { IoBicycle, IoTimerOutline, IoArrowForward } from 'react-icons/io5';
import { useRecoilState } from "recoil";
import { formatDateString, formatDistance, formatDuration } from '../Functions/formatValues';
import { getStation } from '../Functions/stations';
import { selectedStationState, departureStationState, returnStationState } from "../GlobalStates";
import { JourneyListItemProps } from "../Types/App";
import { Station } from "../Types/Station";

// List item for journey lists
export default function JourneyListItem ({journey, selectedStationType}: JourneyListItemProps) {

    // Global states
    const [selectedStation, setSelectedStation] = useRecoilState<Station | null>(selectedStationState);
    const [departureStation, setDepartureStation] = useRecoilState<Station | null>(departureStationState);
    const [returnStation, setReturnStation] = useRecoilState<Station | null>(returnStationState);

    function selectJourney() {
        if(departureStation?.id !== journey.departureStationId) {
            // Set departure station to departure station of this journey
            getStation(journey.departureStationId)
            .then(data => {
                setDepartureStation(data)
                if(selectedStationType === "departure")
                    setSelectedStation(data)
            })
        }

        if(returnStation?.id !== journey.returnStationId) {
            // Set return station to return station of this journey
            getStation(journey.returnStationId)
            .then(data => {
                setReturnStation(data)
                if(selectedStationType === "return")
                    setSelectedStation(data)
            })
        }
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
                    className={journey.departureStationId === departureStation?.id ? "departure-station" : ""} 
                    style={{fontWeight:"bold"}}
                >
                    {journey.departureStationName}
                </span>
                <IoArrowForward size={18} style={{marginRight:5,marginLeft:5}} />
                <span 
                    className={`float-right ${journey.returnStationId === returnStation?.id ? "return-station": ""}`}
                    style={{fontWeight:"bold"}}
                    >
                        {journey.returnStationName}
                </span>
            </div>

            {/* Journey info */}
            <div>
                <span className="journey-item-data">
                    <IoTimerOutline style={{marginRight:5}} /> 
                    {formatDuration(journey.durationInSeconds)}
                </span>
                <span className="journey-item-data">
                    <IoBicycle style={{marginLeft:10,marginRight:5}} /> 
                    {formatDistance(journey.distanceCoveredInMeters)}
                </span>
            </div>
            <div className="journey-line" 
                style={{
                    // Color code the journey underline to match station colors
                    backgroundImage: 
                        `linear-gradient(to right, 
                            ${journey.departureStationId === departureStation?.id ? "#ff036c" : "darkgray"},
                            ${journey.returnStationId === returnStation?.id ? "#1d63b8" : "darkgray"}`
                }}
            />
        </div>
    )
}