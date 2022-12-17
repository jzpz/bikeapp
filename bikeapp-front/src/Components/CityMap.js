import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"
import "../app.css"

export default function CityMap({stations, departureStation, returnStation, 
    setDepartureStation, setReturnStation, currentSelectedStation, setCurrentSelectedStation}) {

    function markerColor(station) {
        if(departureStation?.id === station.id) {
            return "#ff036c"
        } else if(returnStation?.id === station.id) {
            return "#1d63b8"
        }
        return null
    }

    function selectStation(station) {
        if(station) {
            setCurrentSelectedStation(station)
            setDepartureStation(station)
            setReturnStation(station)
        } else {
            setCurrentSelectedStation([])
            setDepartureStation([])
            setReturnStation([])
        }
    }

    return (
        <Map 
            height={1000}
            defaultZoom={12} 
            minZoom={11} // Max zoom out distance
            center={[60.21, 24.95]} // Default location to Helsinki
            onClick={() => { // Remove marker highlights
                selectStation()
            }}
            className="city-map"
        >
            {stations.map((station) => { // Get all stations and mark them
                return(
                    <Marker 
                        width={markerColor(station) ? 50 : 30} // Make current station larger in map
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={station.id}
                        onClick={() => {
                            if(currentSelectedStation.id === station.id) {
                                selectStation()
                            } else {
                                selectStation(station)
                            }
                        }}
                        color={markerColor(station) ?? "#66aacc"} // Mark current and departure stations
                        className={markerColor(station) ? "active" : ""} // Add class to active station
                        title={station.nameLocaleFi}
                        onMouseOver={()=>console.log(station.nameLocaleFi)}
                    />
                )
            })}
        </Map>
    )
}