import { IoBicycle, IoTimeOutline, IoArrowForward } from 'react-icons/io5';
import { formatDate, formatDistance, formatDuration } from '../Functions/formatValues';
import { getStation } from '../Functions/stations';

// List item for journey lists
export default function JourneyListItem ({journey, departureStation, returnStation, 
    setDepartureStation, setReturnStation}) {

    return(
        <div 
        onClick={() => {
            if(departureStation.id !== journey.departureStationId) {
                // Set departure station to departure station of this journey
                getStation(journey.departureStationId)
                .then(data => {
                    setDepartureStation(data)
                })
            }

            if(returnStation.id !== journey.returnStationId) {
                // Set return station to return station of this journey
                getStation(journey.returnStationId)
                .then(data => {
                    setReturnStation(data)
                })
            }
        }}
        className="list-item journey-item">
            <span title="Departed at">{formatDate(journey.departureDate)}</span><br/>
            
            {/* Add classnames for colorcoding (red=departure, blue=return)*/}
            <span 
                className={journey.departureStationId === departureStation.id ? "departure-station" : ""} 
                style={{fontWeight:"bold"}}>{journey.departureStationName}
            </span>
            <span> 
                <IoArrowForward />
            </span>
            <span 
                className={journey.returnStationId === returnStation.id ? "return-station": ""}
                style={{fontWeight:"bold"}}>{journey.returnStationName}
            </span>
            <br/>
            <span className="journey-item-data">
                <IoTimeOutline /> 
                {formatDuration(journey.durationInSeconds)}
            </span>
            <span className="journey-item-data">
                <IoBicycle /> 
                {formatDistance(journey.distanceCoveredInMeters)}
            </span>
            <div className="journey-line" 
                style={{
                    // Color code the journey underline to match station colors
                    backgroundImage: 
                        `linear-gradient(to right, 
                            ${journey.departureStationId === departureStation.id ? "red" : "#4b4b4b"},
                            ${journey.returnStationId === returnStation.id ? "blue" : "#4b4b4b"}`
                }} 
            />
        </div>
    )
}
