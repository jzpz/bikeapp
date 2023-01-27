import React from 'react';
import NavDropdown from "react-bootstrap/esm/NavDropdown";
import { useRecoilState } from 'recoil';
import { findStation } from '../../Functions/stations';
import { currentStationState } from '../../GlobalStates';
import useStations from '../../Hooks/useStations';
import { CurrentStationState, PopularStationItemProps } from '../../Types/App';
import { Station } from '../../Types/Station';
import StationName from '../StationName';

// Popular stations dropdown item
function PopularStationsListItem ({stationPopularity, selectedStationType}: PopularStationItemProps) {
    
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const stations = useStations();

    function selectJourney(station: Station | null) {
        if(!station) return;

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
    }

    return(
        <NavDropdown.Item 
            key={"popular-station-" + selectedStationType + stationPopularity.id}
            onClick={() => {
                if(stations) {
                    selectJourney(findStation(stations, stationPopularity.id));
                }
            }}
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