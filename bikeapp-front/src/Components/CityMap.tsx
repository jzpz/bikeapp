import { Map, Marker, Overlay } from "pigeon-maps";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getStationInfo, getStations } from "../Functions/stations";
import { 
    stationsState, 
    selectedStationState, 
    departureStationState, 
    returnStationState, 
    stationInfoState,
    dateFilterState,
} from "../GlobalStates";
import { DateFilter } from "../Types/App";
import { Station, StationInfo } from "../Types/Station";

export default function CityMap() {

    // Global states
    const [stations, setStations] = useRecoilState<Station[] | null>(stationsState);
    const [selectedStation, setSelectedStation] = useRecoilState<Station | null>(selectedStationState);
    const [departureStation, setDepartureStation] = useRecoilState<Station | null>(departureStationState);
    const [returnStation, setReturnStation] = useRecoilState<Station | null>(returnStationState);
    const dateFilter = useRecoilValue<DateFilter>(dateFilterState);
    const setStationInfo = useSetRecoilState<StationInfo | null>(stationInfoState);

    const [error, setError] = useState<string | null>(null);
    const [currentMapSettings, setCurrentMapSettings] = useState({zoom: 12, center: [60.21, 24.95] as [number, number]});
    const stationInfoboxRefs = useRef<HTMLDivElement[]>([]);

    const stationMapMemo = useMemo(() => <StationMap />, [stations, departureStation, returnStation]);

    useEffect(() => {
        getStations()
        .then(data => setStations(data))
        .catch(e => setError(e));
    }, []);

    // Fetch station info (avg journeys, top stations) on station select
    useEffect(() => {
        let cancel = false;
        setStationInfo(null);

        if(selectedStation) {
            getStationInfo(selectedStation.id)
            .then(data => {
                if(!cancel)
                    setStationInfo(data)
            })
            .catch(e => setError(e));
        }

        return () => {
            cancel = true;
        }
    }, [selectedStation, dateFilter]);

    // Determines if a marker is departure/return station and returns color or null
    function markerColor(station: Station | null): string | null {
        if(station && departureStation?.id === station.id) {
            return "#ff036c";
        } else if(station && returnStation?.id === station.id) {
            return "#1d63b8";
        }
        return null;
    }

    function selectStation(station: Station | null) {
        if(station) {
            setSelectedStation(station);
            setDepartureStation(station);
            setReturnStation(station);
        } else {
            setSelectedStation(null);
            setDepartureStation(null);
            setReturnStation(null);
        }
    }

    function StationMap() { 
        if(!stations) {
            if(!error) 
                return <span>Loading map...</span>
            else 
                return <span>An error occurred while loading the map: {error}</span>
        }

        return(
            // Need to rerender the map on station change, otherwise markers dont work
            <Map 
                height={window.innerHeight - 110} // Height excluding top nav
                defaultZoom={currentMapSettings.zoom} 
                minZoom={11} // Max zoom out distance
                center={currentMapSettings.center}
                onClick={() => {
                    selectStation(null)
                }}
                onBoundsChanged={(e) => { // Keep the settings when map rerenders
                    setCurrentMapSettings({...currentMapSettings, zoom: e.zoom, center: e.center})
                }}
            >
                {stations && stations.map((station: Station, i: number) => // Get all stations and mark them
                    <Marker 
                        width={markerColor(station) ? 50 : 30} // Make current station larger in map
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={"station-marker" + station.id}
                        onClick={() => {
                            if(selectedStation && selectedStation.id === station.id) {
                                selectStation(null)
                            } else {
                                selectStation(station)
                            }
                        }}
                        color={markerColor(station) ?? "#66aacc"} // Mark current and departure stations
                        className={markerColor(station) ? "active" : ""} // Add class to active station
                        onMouseOver={() => {
                            stationInfoboxRefs.current[i].style.display = "block";
                        }}
                        onMouseOut={() => {
                            stationInfoboxRefs.current[i].style.display = "none";
                        }}
                    />
                )}

                {stations && stations.map((station: Station, i: number) => // Get all stations and mark them
                    <Overlay 
                        anchor={[station.coordinateY, station.coordinateX]}
                        key={"station-infobox" + station.id}
                    >
                        <div 
                            id={"station-infobox" + station.id}
                            className="selected-station-info"
                            ref={(el: HTMLDivElement) => stationInfoboxRefs.current[i] = el}
                        >
                            {station.nameLocaleFi}&nbsp;
                            <span className="secondary">
                                {station.nameLocaleSe}
                            </span>
                            <br/>
                            <span className="secondary">
                                {station.addressLocaleFi}
                            </span>
                        </div>
                    </Overlay>
                )}
            </Map>
        )
    }

    return (
        <div 
            className="map-container"
            data-cy="map-container"
        >
            {stationMapMemo}
        </div>
    )
}