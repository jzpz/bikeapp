import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Placeholder from 'react-bootstrap/Placeholder';
import { useRecoilState, useRecoilValue } from "recoil";
import { formatDistance } from "../Functions/formatValues";
import { 
    offCanvasState, 
    currentStationState, 
    stationInfoState,
    settingsState, 
} from "../GlobalStates";
import { AppSettings, OffCanvasStatus, CurrentStationState } from "../Types/App";
import { StationInfo, StationPopularity } from "../Types/Station";
import StationName from "./StationName";
import FirstNavbar from "./FirstNavbar";
import PopularStationsListItem from "./PopularStationsListItem";
import Badge from "react-bootstrap/Badge";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";

export default function Navigation() {

    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const selectedStation = useRecoilValue<CurrentStationState>(currentStationState);
    const stationInfo = useRecoilValue<StationInfo | null>(stationInfoState);
    const [settings, setSettings] = useRecoilState<AppSettings>(settingsState);

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
                        {selectedStation.selected?.id ?
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
                                        <StationName station={selectedStation.selected} />
                                    </span>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {stationInfo && stationInfo.mostPopularDepartureStations?.map((stationPopularity: StationPopularity) => {
                                    return(
                                        <PopularStationsListItem 
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
                                        <StationName station={selectedStation.selected} />
                                    </span>
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {stationInfo && stationInfo.mostPopularReturnStations.map((stationPopularity: StationPopularity) => {
                                    return(
                                        <PopularStationsListItem 
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
                        <Nav.Item style={{paddingRight:30}}>
                            <span style={{fontSize:"1.3em"}}>
                                <Badge 
                                    className="settings-badge"
                                    pill 
                                    bg={settings.showMarkers ? "primary" : "secondary"}
                                    style={{marginRight:10}}
                                    onClick={() => setSettings({...settings, showMarkers: !settings.showMarkers})}
                                >
                                    {settings.showMarkers ?
                                        <RiCheckboxLine />
                                    :
                                        <RiCheckboxBlankLine />
                                    }
                                    &nbsp;Show markers
                                </Badge>
                                <Badge 
                                    className="settings-badge"
                                    pill 
                                    bg={settings.showLines ? "primary" : "secondary"}
                                    style={{marginRight:10}}
                                    onClick={() => setSettings({...settings, showLines: !settings.showLines})}
                                >
                                    {settings.showLines ?
                                        <RiCheckboxLine />
                                    :
                                        <RiCheckboxBlankLine />
                                    }
                                    &nbsp;Show line
                                </Badge>
                            </span>
                        </Nav.Item>

                        {/* Change station button */}
                        <Nav.Item>
                            <Button 
                                className="overlay" 
                                variant="dark" 
                                onClick={() => setOffCanvas({...offCanvas, stations: true})}
                                style={{backgroundColor:"#66aacc", border:"none"}}
                                data-cy="change-station"
                            >
                                Change Station
                            </Button>
                        </Nav.Item>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    return(
        <div id="navigation">
            <FirstNavbar station={selectedStation.selected} />
            <SecondNavbar />
        </div>
    )
}