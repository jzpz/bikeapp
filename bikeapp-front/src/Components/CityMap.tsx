import { GeoJson, GeoJsonFeature, Map, Marker, Overlay, ZoomControl } from "pigeon-maps";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getStationInfo, getStations } from "../Functions/stations";
import { 
    stationsState, 
    currentStationState, 
    stationInfoState,
    dateFilterState,
    settingsState,
    currentJourneyState,
} from "../GlobalStates";
import { DateFilter, AppSettings, CurrentStationState } from "../Types/App";
import { Journey } from "../Types/Journey";
import { Station, StationInfo } from "../Types/Station";
import JourneyStats from "./JourneyStats";
import StationName from "./StationName";

export default function CityMap() {

    // Global states
    const [stations, setStations] = useRecoilState<Station[] | null>(stationsState);
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const dateFilter = useRecoilValue<DateFilter>(dateFilterState);
    const setStationInfo = useSetRecoilState<StationInfo | null>(stationInfoState);
    const settings = useRecoilValue<AppSettings>(settingsState);
    const [currentJourney, setCurrentJourney] = useRecoilState<Journey | null>(currentJourneyState);
    
    const [error, setError] = useState<string | null>(null);
    const [currentMapSettings, setCurrentMapSettings] = useState({zoom: 12, center: [60.21, 24.95] as [number, number]});
    const stationInfoboxRefs = useRef<HTMLDivElement[]>([]);

    const stationMapMemo = useMemo(() => <StationMap />, [stations, currentStation.departure, currentStation.return, settings.showLines]);
    
    useEffect(() => {
        getStations()
        .then(data => setStations(data))
        .catch(e => setError(e));
    }, []);

    // Fetch station info (avg journeys, top stations) on station select
    useEffect(() => {
        let cancel = false;
        setStationInfo(null);

        if(currentStation.selected) {
            getStationInfo(currentStation.selected.id)
            .then(data => {
                if(!cancel)
                    setStationInfo(data)
            })
            .catch(e => setError(e));
        }

        return () => {
            cancel = true;
        }
    }, [currentStation.selected, dateFilter]);

    // Determines if a marker is departure/return station and returns color or null
    function markerColor(station: Station | null): string | null {
        if(station && currentStation.departure?.id === station.id) {
            return "#ff036c";
        } else if(station && currentStation.return?.id === station.id) {
            return "#1d63b8";
        }
        return null;
    }

    function selectStation(station: Station | null) {
        if(station) {
            setCurrentStation({
                selected: station,
                departure: station,
                return: station,
            })
        } else {
            setCurrentStation({
                selected: null,
                departure: null,
                return: null,
            });

            setCurrentJourney(null);
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
                <ZoomControl />

                {/* Markers */}
                {stations && stations.map((station: Station, i: number) => // Get all stations and mark them
                    <Marker 
                        width={markerColor(station) ? 50 : 30} // Make current station larger in map
                        anchor={[station.coordinateY, station.coordinateX]} 
                        key={"station-marker" + station.id}
                        onClick={() => {
                            if(currentStation.selected && currentStation.selected.id === station.id) {
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

                {/* Marker Infoboxes */}
                {stations && stations.map((station: Station, i: number) => // Get all stations and mark them
                    <Overlay 
                        anchor={[station.coordinateY, station.coordinateX]}
                        key={"station-infobox" + station.id}
                    >
                        <div 
                            id={"station-infobox" + station.id}
                            className="selected-station-info map-overlay"
                            ref={(el: HTMLDivElement) => stationInfoboxRefs.current[i] = el}
                        >
                            <StationName station={station} />
                            <br/>
                            <span className="secondary">
                                {station.addressLocaleFi}
                                <hr style={{margin:2}} />
                                <div style={{fontSize:"0.9em"}}>
                                    Click to mark as<br/>
                                    <span className="departure-station">
                                        departure station
                                    </span>
                                </div>
                            </span>
                        </div>
                    </Overlay>
                )}

                {/* Journey line */}
                {settings.showLines && currentStation.departure && currentStation.return && 
                currentStation.return.id !== currentStation.departure.id &&
                    <GeoJson
                        svgAttributes={{
                            fill: "#1f1f1f",
                            strokeWidth: "3",
                            stroke: "#4a4a4a",
                            r: "20",
                        }}
                    >
                        <GeoJsonFeature
                            feature={{
                                type: "Feature",
                                properties: {},
                                geometry: {
                                    coordinates: [
                                        [
                                            currentStation.departure?.coordinateX,
                                            currentStation.departure?.coordinateY
                                        ],
                                        [
                                            currentStation.return?.coordinateX,
                                            currentStation.return?.coordinateY
                                        ],
                                    ],
                                    type: "LineString"
                                }
                            }}  
                        />
                    </GeoJson>
                }
                {/* Journey line infobox */}
                {settings.showLines && currentStation.departure && currentStation.return && 
                currentStation.return.id !== currentStation.departure.id && currentJourney &&
                    <Overlay 
                        anchor={[
                            (currentStation.departure.coordinateY + currentStation.return.coordinateY) / 2,
                            (currentStation.departure.coordinateX + currentStation.return.coordinateX) / 2,
                        ]}
                        offset={[200, 30]}
                    >
                        <div 
                            style={{}}
                            className="map-overlay"
                        >
                            <JourneyStats journey={currentJourney} />
                        </div>
                    </Overlay>
                }
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