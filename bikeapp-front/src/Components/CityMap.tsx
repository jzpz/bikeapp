import { Map, Marker } from "pigeon-maps";
import React from "react";
import "../app.css";
import { Station } from "../Types/Station";

export default function CityMap({
    stations, 
    departureStation, 
    returnStation, 
    setDepartureStation, 
    setReturnStation, 
    selectedStation, 
    setSelectedStation
}: any) {

    function markerColor(station: Station | null) {
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

    return (
        <Map 
            height={1000}
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
                        key={station.id}
                        onClick={() => {
                            if(selectedStation && selectedStation.id === station.id) {
                                selectStation(null)
                            } else {
                                selectStation(station)
                            }
                        }}
                        color={markerColor(station) ?? "#66aacc"} // Mark current and departure stations
                        className={markerColor(station) ? "active" : ""} // Add class to active station
                        //onMouseOver={()=> } TODO: show station name
                    />
                )
            })}
        </Map>
    )
}