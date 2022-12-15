import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Placeholder from 'react-bootstrap/Placeholder';
import './app.css';
import CityMap from './Components/CityMap';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import { formatDistance } from './Functions/formatValues';
import { getStationInfo, getStations, getStation } from './Functions/stations';

export default function MainView() {
    const [stations, setStations] = useState([]);
    const [offCanvas, setOffCanvas] = useState({journeys: false, stations: false});
    // Currently selected station
    const [currentSelectedStation, setCurrentSelectedStation] = useState([]);
    // Departure station of currently viewed journey (marked red)
    const [departureStation, setDepartureStation] = useState([]);
    // Return station of currently viewed journey (marked blue)
    const [returnStation, setReturnStation] = useState([]);
    const [stationInfo, setStationInfo] = useState([]);

    // Initialize station list on start
    useEffect(() => {
        getStations()
        .then(data => setStations(data));
    }, []);

    useEffect(() => {
        setStationInfo([]);

        if(currentSelectedStation.id) {
            getStationInfo(currentSelectedStation.id)
            .then(data => setStationInfo(data));
        }
    }, [currentSelectedStation]);

    return(
        <div className="main-view">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand>
                        {currentSelectedStation.id ? 
                            <>
                                <span>{currentSelectedStation.nameLocaleFi} </span>
                                <span className="secondary">{currentSelectedStation.nameLocaleSe}</span>
                            </> : <>
                                <span>No station selected</span>
                            </>
                        }
                    </Navbar.Brand>
                    <Navbar.Text>
                        {currentSelectedStation.addressLocaleFi}
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Navbar bg="light" className="mb-3">
                <Container fluid>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"> 
                            <Button className="overlay" variant="success" 
                                onClick={() => {
                                    setOffCanvas({...offCanvas, journeys: true})}}>
                                View Journeys
                            </Button>
                            <NavDropdown title="Station info" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    Average journey distance
                                    <NavDropdown.Divider />
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    As departure station<br/>
                                    <span className="secondary">
                                        {stationInfo.averageDistanceCoveredAsDepartureStation ?
                                        formatDistance(stationInfo.averageDistanceCoveredAsDepartureStation) :
                                        <Placeholder as="p" animation="wave">
                                            <Placeholder xs={5} />
                                        </Placeholder>}
                                    </span>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    As return station<br/>
                                    <span className="secondary">
                                        {stationInfo.averageDistanceCoveredAsReturnStation ?
                                        formatDistance(stationInfo.averageDistanceCoveredAsReturnStation) :
                                        <Placeholder as="p" animation="wave">
                                            <Placeholder xs={5} />
                                        </Placeholder>}
                                    </span>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Arrivals" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    People most often travel to...
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {stationInfo.mostPopularReturnStations?.map((station) => { // Get all stations and mark them
                                    return(
                                        <NavDropdown.Item 
                                            key={station.id} 
                                            onClick={() => getStation(station.id)
                                                .then(data => {
                                                    setReturnStation(data)
                                                    setDepartureStation(currentSelectedStation)
                                                })
                                            }>
                                            <span>{station.nameLocaleFi} </span>
                                            <span className="secondary">{station.nameLocaleSe}</span>
                                            <br/>
                                            <span className="secondary">{station.journeyAmount} journeys</span>
                                        </NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                            <NavDropdown title="Departures" id="collasible-nav-dropdown">
                                <NavDropdown.Item>
                                    People most often travel from...
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                {stationInfo.mostPopularDepartureStations?.map((station) => { // Get all stations and mark them
                                    return(
                                        <NavDropdown.Item 
                                        key={station.id}
                                        onClick={() => getStation(station.id)
                                            .then(data => {
                                                setDepartureStation(data);
                                                setReturnStation(currentSelectedStation)
                                            })
                                        }>
                                            <span>{station.nameLocaleFi} </span>
                                            <span className="secondary">{station.nameLocaleSe}</span>
                                            <br/>
                                            <span className="secondary">{station.journeyAmount} journeys</span>
                                        </NavDropdown.Item>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Button className="overlay" variant="primary" onClick={() => setOffCanvas({...offCanvas, stations: true})}>
                                Change station
                            </Button>
                        </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>

            <CityMap 
                stations={stations} 
                departureStation={departureStation}
                returnStation={returnStation}
                setReturnStation={setReturnStation}
                setDepartureStation={setDepartureStation}
                currentSelectedStation={currentSelectedStation}
                setCurrentSelectedStation={setCurrentSelectedStation}
            />

            <JourneyList className="overlay"
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                departureStation={departureStation}
                returnStation={returnStation}
                currentSelectedStation={currentSelectedStation}
                setCurrentSelectedStation={setCurrentSelectedStation}
                setDepartureStation={setDepartureStation}
                setReturnStation={setReturnStation}
            />

            <StationList className="overlay"
                stations={stations}
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                setCurrentSelectedStation={setCurrentSelectedStation}
                setDepartureStation={setDepartureStation}
                setReturnStation={setReturnStation}
            />
        </div>
    )
}