import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Placeholder from 'react-bootstrap/Placeholder';
import { useRecoilState, useRecoilValue } from "recoil";
import { formatDistance } from "../Functions/formatValues";
import { getStation } from "../Functions/stations";
import { 
    offCanvasState, 
    currentStationState, 
    stationInfoState,
    settingsState, 
} from "../GlobalStates";
import { AppSettings, OffCanvasStatus, PopularStationItemProps, CurrentStationState } from "../Types/App";
import { Station, StationInfo, StationPopularity } from "../Types/Station";
import StationName from "./StationName";

export default function Navigation() {

    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const stationInfo = useRecoilValue<StationInfo | null>(stationInfoState);
    const [settings, setSettings] = useRecoilState<AppSettings>(settingsState);

    // Popular stations dropdown item
    const PopularStationItem = ({stationPopularity, selectedStationType}: PopularStationItemProps) => (
        <NavDropdown.Item 
            key={"popular-station-" + selectedStationType + stationPopularity.id}
            onClick={() => 
                getStation(stationPopularity.id)
                .then(station => {
                    if(selectedStationType === "departure") {
                        setCurrentStation({
                            ...currentStation,
                            departure: station,
                            return: currentStation.selected,
                        });
                    } else { // return station
                        setCurrentStation({
                            ...currentStation,
                            departure: currentStation.selected,
                            return: station,
                        });
                    }
                })
            }
        >
            <StationName station={stationPopularity} />
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
                    {currentStation.selected?.id ? 
                        <>
                            <span>{currentStation.selected.nameLocaleEn} </span>
                            <span className="secondary-dark">
                                {currentStation.selected.nameLocaleFi}&nbsp;
                                {currentStation.selected.nameLocaleSe}
                            </span>
                        </> : <>
                            <span>No station selected</span>
                        </>
                    }
                </Navbar.Brand>

                {/* Position right */}
                {/* Station address */}
                <Navbar.Text>
                    {currentStation.selected?.addressLocaleFi}
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
                        {currentStation.selected?.id ?
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
                                        <StationName station={currentStation.selected} />
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
                                        <StationName station={currentStation.selected} />
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
                        <ToggleButton
                            id="settings-show-lines"
                            type="checkbox"
                            variant="primary"
                            checked={settings.showLines}
                            value="1"
                            onChange={(e) => {
                                setSettings({...settings, showLines: Boolean(e.currentTarget.checked)})
                            }}
                        >
                            Show lines on map
                        </ToggleButton>
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