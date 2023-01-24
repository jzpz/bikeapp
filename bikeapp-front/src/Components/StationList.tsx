import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { filterStationList, sortStationList } from "../Functions/stationList";
import { currentJourneyState, currentStationState, offCanvasState, stationsState } from "../GlobalStates";
import { CurrentStationState, OffCanvasStatus, StationListProps } from "../Types/App";
import { Journey } from "../Types/Journey";
import { Station } from "../Types/Station";
import StationName from "./StationName";

export default function StationList({filterWord}: StationListProps): JSX.Element {
    const stations = useRecoilValue<Station[] | null>(stationsState);
    const setCurrentStation = useSetRecoilState<CurrentStationState>(currentStationState);
    const setCurrentJourney = useSetRecoilState<Journey | null>(currentJourneyState);
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);

    if(stations) {
        const list = filterStationList(sortStationList(stations), filterWord)
        .map((station: Station, i: number, array: Station[]) => {
            let elements: JSX.Element[] = [];

            // Alphabetically group station names by adding first letter as heading
            let stationFirstLetter = station.nameLocaleEn.charAt(0);
            if(i === 0 || array[i - 1].nameLocaleEn.charAt(0) !== stationFirstLetter) {
                elements.push(
                    <div 
                        style={{margin:3}} 
                        key={"station-list-heading-" + stationFirstLetter}
                    >
                        <span style={{fontWeight:"bold",color:"#27255c",fontSize:"1.1em"}}>
                            {stationFirstLetter}
                        </span>
                    </div>
                )
            }

            elements.push(
                <div 
                    onClick={() => {
                        setCurrentStation({
                            selected: station,
                            departure: station,
                            return: station,
                        });
                        setOffCanvas({...offCanvas, stations: false});
                        setCurrentJourney(null);
                    }}
                    key={"station-list-item" + station.id} 
                    className="list-item station"
                    data-cy="station-list-item"
                >
                    <StationName station={station} en />
                </div>
            )

            return elements;
        })

        if(list.length > 0) {
            return(
                <>{list}</>
            )
        }
    }

    return(
        <span>
            No stations match the specified filter
        </span>
    )
}
