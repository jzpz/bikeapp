import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"
import "../app.css"

export default function CityMap({stations, currentStation, setStation}) {
    const [stationCoords, setStationCoords] = useState([]);

    return (
        <Map 
            height={"100vh"} 
            defaultZoom={12} 
            minZoom={11} // Max zoom out distance
            center={[60.21, 24.95]} // Default location to Helsinki
            onClick={() => setStation([])} // Remove selected station
            className="city-map"
        >
            {stations.map((station) => { // Get all stations and mark them
                return(
                    <Marker 
                        width={station.fid === currentStation.fid ? 50 : 30} // Make current station larger in map
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={station.fid}
                        onClick={() => setStation(station)}
                        color={station.fid === currentStation.fid ? "red" : null} // Mark current station as red
                        className={station.fid === currentStation.fid ? "active" : ""} // Add class to current station marker
                        title={station.nameLocaleFi}
                    />
                )
            })}
        </Map>
    )
}