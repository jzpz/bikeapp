import React from "react";
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
    const PopularStationItem = ({stationPopularity, selectedStationType}: PopularStationItemProps) => (
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

    // Navbar for station name and address
    const FirstNavbar = () => (
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

    // Navbar for station info and buttons
    const SecondNavbar = () => (
        <Navbar bg="light" className="top-nav" style={{height:60}}>
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
                            data-cy="view-journeys"
                        >
                            View Journeys
                        </Button>

                        {/* Station info */}
                        {selectedStation && selectedStation.id ?
                            <>
                            <NavDropdown title="Station Info" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    Journeys
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    Starting from this station<br/>
                                    <span className="secondary">
                                        {stationInfo && stationInfo.journeysStarting ?
                                            stationInfo.journeysStarting + " journeys" :
                                            <Placeholder as="p" animation="wave">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        }
                                    </span><br/>
                                    Average distance<br/>
                                    <span className="secondary">
                                        {stationInfo && stationInfo.averageDistanceCoveredAsDepartureStation ?
                                            formatDistance(stationInfo.averageDistanceCoveredAsDepartureStation) :
                                            <Placeholder as="p" animation="wave">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        }
                                    </span>
                                <NavDropdown.Divider />
                                    Ending at this station<br/>
                                    <span className="secondary">
                                        {stationInfo && stationInfo.journeysEnding ?
                                            stationInfo.journeysEnding + " journeys" :
                                            <Placeholder as="p" animation="wave">
                                                <Placeholder xs={5} />
                                            </Placeholder>
                                        }
                                    </span><br/>
                                    Average distance<br/>
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
                            <NavDropdown title="Departure Stations" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    Most popular departure stations <br/>
                                    for&nbsp;
                                    <span className="return-station">
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

                            {/* Most popular return stations */}
                            <NavDropdown title="Return Stations" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    Most popular return stations<br/>
                                    for&nbsp;
                                    <span className="departure-station">
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
                            data-cy="change-station"
                        >
                            Change Station
                        </Button>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    return(
        <div id="navigation">
            <FirstNavbar />
            <SecondNavbar />
        </div>
    )
}