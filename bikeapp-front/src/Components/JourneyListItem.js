import { IoBicycle, IoTimeOutline, IoArrowForward } from 'react-icons/io5';
import { formatDate, formatDistance, formatDuration } from '../Functions/formatValues';
import { getStation } from '../Functions/stations';

// List item for journey lists
export default function JourneyListItem ({
    setSelectedStation, 
    journey, 
    departureStation, 
    returnStation, 
    setDepartureStation, 
    setReturnStation, 
    showDepartures
}) {

    function selectJourney() {
        if(departureStation.id !== journey.departureStationId) {
            // Set departure station to departure station of this journey
            getStation(journey.departureStationId)
            .then(data => {
                setDepartureStation(data)
                if(showDepartures)
                    setSelectedStation(data)
            })
        }

        if(returnStation.id !== journey.returnStationId) {
            // Set return station to return station of this journey
            getStation(journey.returnStationId)
            .then(data => {
                setReturnStation(data)
                if(!showDepartures)
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
                    {formatDate(journey.departureDate)}
                </span>
            </div>

            {/* Station info */}
            <div className="text-center" style={{padding:3}}>
                {/* Add classnames for colorcoding (red=departure, blue=return)*/}
                <span 
                    className={`${journey.departureStationId === departureStation.id ? "departure-station" : ""}`} 
                    style={{fontWeight:"bold"}}
                >
                    {journey.departureStationName}
                </span>
                <IoArrowForward size={18} style={{marginRight:5,marginLeft:5}} />
                <span 
                    className={`float-right ${journey.returnStationId === returnStation.id ? "return-station": ""}`}
                    style={{fontWeight:"bold"}}
                    >
                        {journey.returnStationName}
                </span>
            </div>

            {/* Journey info */}
            <div>
                <span className="journey-item-data">
                    <IoTimeOutline style={{marginRight:5}} /> 
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
                            ${journey.departureStationId === departureStation.id ? "#ff036c" : "#fc81b4"},
                            ${journey.returnStationId === returnStation.id ? "#1d63b8" : "#5e9be6"}`
                }}
            />
        </div>
    )
}
