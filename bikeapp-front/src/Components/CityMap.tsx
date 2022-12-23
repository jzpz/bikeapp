import { Map, Marker } from "pigeon-maps";
import React, { memo, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import "../app.css";
import { getStationInfo, getStations } from "../Functions/stations";
import { stationsState, selectedStationState, departureStationState, returnStationState, stationInfoState } from "../GlobalStates";
import { Station, StationInfo } from "../Types/Station";

export default function CityMap() {

    // Global states
    const [stations, setStations] = useRecoilState<Station[] | null>(stationsState);
    const [selectedStation, setSelectedStation] = useRecoilState<Station | null>(selectedStationState);
    const [departureStation, setDepartureStation] = useRecoilState<Station | null>(departureStationState);
    const [returnStation, setReturnStation] = useRecoilState<Station | null>(returnStationState);
    const [stationInfo, setStationInfo] = useRecoilState<StationInfo | null>(stationInfoState);

    const stationMapMemo = useMemo((): JSX.Element => <StationMap />, [stations, departureStation, returnStation])

    useEffect(() => {
        getStations()
        .then(data => setStations(data));
    }, []);

    // Fetch station info (avg journeys, top stations) on station select
    useEffect(() => {
        setStationInfo(null);

        if(selectedStation) {
            getStationInfo(selectedStation.id)
            .then(data => setStationInfo(data));
        }
    }, [selectedStation]);

    // Determines if a marker is departure/return station and returns color or null
    function markerColor(station: Station | null): string | null {
        if(station && departureStation?.id === station.id) {
            return "#ff036c";
        } else if(station && returnStation?.id === station.id) {
            return "#1d63b8";
        }
        return null;
    }

    function selectStation(station: Station | null): void {
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
        if(!stations) return <></>
        console.log("render")
        return(
            <Map 
                height={window.innerHeight - 110} // Height excludin top nav
                defaultZoom={12} 
                minZoom={11} // Max zoom out distance
                center={[60.21, 24.95]} // Default location to Helsinki
                onClick={() => { // Remove marker highlights
                    selectStation(null)
                }}
            >
                {stations && stations.map((station: Station) => { // Get all stations and mark them
                    
                    return(
                        <Marker 
                            width={markerColor(station) ? 50 : 30} // Make current station larger in map
                            anchor={[station.coordinateY, station.coordinateX]} 
                            key={"station-marker" + station.id}
                            onClick={() => {
                                console.log(station.coordinateY, station.coordinateX, station.id)
                                if(selectedStation && selectedStation.id === station.id) {
                                    selectStation(null)
                                } else {
                                    selectStation(station)
                                }
                            }}
                            color={markerColor(station) ?? "#66aacc"} // Mark current and departure stations
                            className={markerColor(station) ? "active" : ""} // Add class to active station
                            //onMouseOver={()=> } TODO: show station name
                        ></Marker>
                    )
                })}
            </Map>
        )
    }

    return (
        <div>
            {stationMapMemo}
        </div>
    )
}