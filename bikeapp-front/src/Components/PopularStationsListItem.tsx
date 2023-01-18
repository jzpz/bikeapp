import React from 'react';
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import StationName from './StationName';
import { getStation } from '../Functions/stations';
import { PopularStationItemProps, CurrentStationState } from '../Types/App';
import { useRecoilState } from 'recoil';
import { currentStationState } from '../GlobalStates';

// Popular stations dropdown item
function PopularStationsListItem ({stationPopularity, selectedStationType}: PopularStationItemProps) {
    
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);

    return(
        <NavDropdown.Item 
            key={"popular-station-" + selectedStationType + stationPopularity.id}
            onClick={() => 
                getStation(stationPopularity.id)
                .then(station => {
                    if(selectedStationType === "departure") {
                        setCurrentStation({
                            ...currentStation,
                            departure: station,
                            return: currentStation.selected,
                        });
                    } else { // return station
                        setCurrentStation({
                            ...currentStation,
                            departure: currentStation.selected,
                            return: station,
                        });
                    }
                })
            }
        >
            <StationName station={stationPopularity} />
            <br/>
            <span className="secondary">
                {stationPopularity.journeyAmount} journeys
            </span>
        </NavDropdown.Item>
    )
}

export default PopularStationsListItem;