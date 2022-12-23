import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Placeholder from 'react-bootstrap/Placeholder';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { formatDistance } from "../Functions/formatValues";
import { getStation } from "../Functions/stations";
import { offCanvasState, selectedStationState, departureStationState, returnStationState, stationInfoState } from "../GlobalStates";
import { OffCanvasStatus, PopularStationItemProps } from "../Types/App";
import { Station, StationInfo, StationPopularity } from "../Types/Station";

export default function Navigation() {

    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const selectedStation = useRecoilValue<Station | null>(selectedStationState);
    const setDepartureStation = useSetRecoilState<Station | null>(departureStationState);
    const setReturnStation = useSetRecoilState<Station | null>(returnStationState);
    const stationInfo = useRecoilValue<StationInfo | null>(stationInfoState);

    // Popular stations dropdown item
    function PopularStationItem({stationPopularity, selectedStationType}: PopularStationItemProps) {

        return(
            <NavDropdown.Item 
                key={"popular-station-" + selectedStationType + stationPopularity.id}
                onClick={() => 
                    getStation(stationPopularity.id)
                    .then(data => {
                        if(selectedStationType === "departure") {
                            setDepartureStation(data);
                            setReturnStation(selectedStation);
                        } else { // return station
                            setReturnStation(data)
                            setDepartureStation(selectedStation)
                        }
                    })
                }
            >
                <span>{stationPopularity.nameLocaleFi} </span>
                <span className="secondary">
                    {stationPopularity.nameLocaleSe}
                </span>
                <br/>
                <span className="secondary">
                    {stationPopularity.journeyAmount} journeys
                </span>
            </NavDropdown.Item>
        )
    }

    // Navbar for station name and address
    function FirstNavbar() {
        return(
            <Navbar bg="dark" variant="dark" className="top-nav" style={{height:50}}>
                <Container fluid>

                    {/* Position left */}
                    {/* Station name */}
                    <Navbar.Brand>
                        {selectedStation && selectedStation.id ? 
                            <>
                                <span>{selectedStation.nameLocaleFi} </span>
                                <span className="secondary">
                                    {selectedStation.nameLocaleSe}
                                </span>
                            </> : <>
                                <span>No station selected</span>
                            </>
                        }
                    </Navbar.Brand>

                    {/* Position right */}
                    {/* Station address */}
                    <Navbar.Text>
                        {selectedStation && selectedStation.addressLocaleFi}
                    </Navbar.Text>

                </Container>
            </Navbar>
        )
    }

    // Navbar for station info and buttons
    function SecondNavbar() {
        return(
            <Navbar bg="light" className="top-nav">
                <Container fluid>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        {/* Position left */}
                        <Nav className="me-auto"> 

                            {/* View journeys button */}
                            <Button 
                                className="overlay" 
                                variant="success" 
                                onClick={() => {setOffCanvas({...offCanvas, journeys: true})}}
                                style={{backgroundColor:"#02a35d",border:"none",marginRight:10}}
                            >
                                View Journeys
                            </Button>

                            {/* Station info */}
                            {selectedStation && selectedStation.id ?
                                <>
                                <NavDropdown title="Station info" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        Average journey distance
                                        <NavDropdown.Divider />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        Starting from this station<br/>
                                        <span className="secondary">
                                            {stationInfo && stationInfo.averageDistanceCoveredAsDepartureStation ?
                                                formatDistance(stationInfo.averageDistanceCoveredAsDepartureStation) :
                                                <Placeholder as="p" animation="wave">
                                                    <Placeholder xs={5} />
                                                </Placeholder>
                                            }
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        Ending at this station<br/>
                                        <span className="secondary">
                                            {stationInfo && stationInfo.averageDistanceCoveredAsReturnStation ?
                                                formatDistance(stationInfo.averageDistanceCoveredAsReturnStation) :
                                                <Placeholder as="p" animation="wave">
                                                    <Placeholder xs={5} />
                                                </Placeholder>
                                            }
                                        </span>
                                    </NavDropdown.Item>
                                </NavDropdown>

                                {/* Most popular departure stations */}
                                <NavDropdown title="Departures" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        Most popular departure stations<br/>
                                        for&nbsp;
                                        <span className="return-station">
                                            {selectedStation.nameLocaleFi}
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {stationInfo && stationInfo.mostPopularReturnStations.map((stationPopularity: StationPopularity) => {
                                        return(
                                            <PopularStationItem 
                                                key={"popular-return-station" + stationPopularity.id}
                                                stationPopularity={stationPopularity}
                                                selectedStationType={"return"} 
                                            /> 
                                        )
                                    })}
                                </NavDropdown>

                                {/* Most popular return stations */}
                                <NavDropdown title="Arrivals" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        Most popular arrival stations <br/>
                                        for&nbsp;
                                        <span className="departure-station">
                                            {selectedStation.nameLocaleFi}
                                        </span>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {stationInfo && stationInfo.mostPopularDepartureStations?.map((stationPopularity: StationPopularity) => {
                                        return(
                                            <PopularStationItem 
                                                key={"popular-departure-station" + stationPopularity.id}
                                                stationPopularity={stationPopularity}
                                                selectedStationType={"departure"} 
                                            /> 
                                        )
                                    })}
                                </NavDropdown>
                                </>
                            : null}
                        </Nav>
                        
                        {/* Position right */}
                        <Nav>
                            {/* Change station button */}
                            <Button 
                                className="overlay" 
                                variant="dark" 
                                onClick={() => setOffCanvas({...offCanvas, stations: true})}
                                style={{backgroundColor:"#66aacc", border:"none"}}
                            >
                                Change station
                            </Button>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }

    return(
        <div id="navigation">
            <FirstNavbar />
            <SecondNavbar />
        </div>
    )
}