import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"

export default function CityMap({stations, setStation}) {
    const [stationCoords, setStationCoords] = useState([]);

    return (
        <Map 
            height={"80vh"} 
            defaultZoom={12} 
            minZoom={11} // Max zoom out distance
            center={[60.21, 24.95]} // Default location to Helsinki
        >
            {stations.map((station) => { // Get all stations and mark them
                return(
                    <Marker 
                        width={30} 
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={station.fid}
                        onClick={() => setStation(station)}
                        title={station.nameLocaleFi}
                    />
                )
            })}
        </Map>
    )
}