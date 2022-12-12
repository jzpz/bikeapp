import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"
import "../app.css"

export default function CityMap({stations, departureStation, returnStation, 
    setDepartureStation, setReturnStation, currentSelectedStation, setCurrentSelectedStation}) {
    
    function isDepartureOrReturnStation(station) {
        if(departureStation?.id === station.id) {
            return true
        } else if(returnStation?.id === station.id) {
            return true
        }
        return false
    }

    function markerColor(station) {
        if(departureStation?.id === station.id) {
            return "red"
        } else if(returnStation?.id === station.id) {
            return "blue"
        }
        return null
    }

    return (
        <Map 
            height={1000}
            defaultZoom={12} 
            minZoom={11} // Max zoom out distance
            center={[60.21, 24.95]} // Default location to Helsinki
            onClick={() => { // Remove marker highlights
                setCurrentSelectedStation([])
                setDepartureStation([])
                setReturnStation([])
            }}
            className="city-map"
        >
            {stations.map((station) => { // Get all stations and mark them
                return(
                    <Marker 
                        width={isDepartureOrReturnStation(station) ? 50 : 30} // Make current station larger in map
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={station.id}
                        onClick={() => {
                            setCurrentSelectedStation(station)
                            setDepartureStation(station)
                            setReturnStation([])
                        }}
                        color={markerColor(station)} // Mark current station as red
                        className={isDepartureOrReturnStation(station) ? "active" : ""} // Add class to current station marker
                        title={station.nameLocaleFi}
                    />
                )
            })}
        </Map>
    )
}