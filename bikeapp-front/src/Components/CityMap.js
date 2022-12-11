import React, { useEffect, useState } from "react"
import { Map, Marker } from "pigeon-maps"

export default function CityMap({stations, setStation}) {
    const [stationCoords, setStationCoords] = useState([]);

    // Make JSX list from array
    function MarkerList() {
        const list = stations.map((station) => {
            console.log(station.coordinateX, station.coordinateY)
            return(
                <Marker 
                    width={30} 
                    anchor={[station.coordinateX, station.coordinateY]} 
                    key={station.fid}
                />
            )
        });
        return <>{list}</>
    }

    return (
        <Map 
            height={"80vh"} 
            defaultZoom={12} 
            minZoom={11} // Max zoom out distance
            center={[60.21, 24.95]} // Default location to Helsinki
        >
            {stations.map((station) => {
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