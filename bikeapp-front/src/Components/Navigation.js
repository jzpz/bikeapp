import { getStation } from "../Functions/stations"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Placeholder from 'react-bootstrap/Placeholder';
import { formatDistance } from "../Functions/formatValues";

export default function Navigation({
    selectedStation, 
    offCanvas, 
    setOffCanvas, 
    stationInfo, 
    setDepartureStation, 
    setReturnStation
}) {

    // Popular stations dropdown item
    function PopularStationItem({station, isDepartureStation}) {
        return(
            <NavDropdown.Item 
                key={station.id}
                onClick={() => 
                    getStation(station.id)
                    .then(data => {
                        if(isDepartureStation) {
                            setDepartureStation(data);
                            setReturnStation(selectedStation);
                        } else {
                            setReturnStation(data)
                            setDepartureStation(selectedStation)
                        }
                    })
                }
            >
                <span>{station.nameLocaleFi} </span>
                <span className="secondary">
                    {station.nameLocaleSe}
                </span>
                <br/>
                <span className="secondary">
                    {station.journeyAmount} journeys
                </span>
            </NavDropdown.Item>
        )
    }

    // Navbar for station name and address
    function FirstNavbar() {
        return(
            <Navbar bg="dark" variant="dark" className="top-nav">
                <Container fluid>

                    {/* Position left */}
                    {/* Station name */}
                    <Navbar.Brand>
                        {selectedStation.id ? 
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
                        {selectedStation.addressLocaleFi}
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
                            {selectedStation.id ?
                                <>
                                <NavDropdown title="Station info" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        Average journey distance
                                        <NavDropdown.Divider />
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        Starting from this station<br/>
                                        <span className="secondary">
                                            {stationInfo.averageDistanceCoveredAsDepartureStation ?
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
                                            {stationInfo.averageDistanceCoveredAsReturnStation ?
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
                                    {stationInfo.mostPopularReturnStations?.map((station) => {
                                        return(
                                            <PopularStationItem 
                                                station={station}
                                                isDepartureStation={false} 
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
                                    {stationInfo.mostPopularDepartureStations?.map((station) => {
                                        return(
                                            <PopularStationItem 
                                                station={station}
                                                isDepartureStation={true} 
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