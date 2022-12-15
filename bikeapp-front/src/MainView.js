import { useState, useEffect, useMemo } from 'react';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './app.css';
import CityMap from './Components/CityMap';
import { getStations } from './Functions/stations';

export default function MainView() {
    const [stations, setStations] = useState([]);
    const [offCanvas, setOffCanvas] = useState({journeys: false, stations: false});
    // Currently selected station
    const [currentSelectedStation, setCurrentSelectedStation] = useState([]);
    // Departure station of currently viewed journey (marked red)
    const [departureStation, setDepartureStation] = useState([]);
    // Return station of currently viewed journey (marked blue)
    const [returnStation, setReturnStation] = useState([]);

    // Initialize station list on start
    useEffect(() => {
        getStations()
        .then(data => setStations(data))
    }, [])

    return(
        <div className="main-view">
            <div className="station-info">
                <Row>
                    {currentSelectedStation.id ? <>
                        <h1>{currentSelectedStation.nameLocaleFi}&nbsp;</h1>
                        <h3 className="secondary">
                            {currentSelectedStation.nameLocaleSe}
                            { // Show English name if its different from Finnish
                                currentSelectedStation.nameLocaleEn === currentSelectedStation.nameLocaleFi ? 
                                "" : " - " + currentSelectedStation.nameLocaleEn
                            }
                        </h3>
                        <hr/>
                        <Button className="overlay" variant="primary" onClick={() => setOffCanvas({...offCanvas, stations: true})}>
                            Change station
                        </Button>
                        <Button className="overlay" variant="primary" 
                            onClick={() => {
                                setOffCanvas({...offCanvas, journeys: true})}}>
                            View Departures
                        </Button>
                    </> : <>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <h1>No station selected</h1>
                            <h3>Click a marker or select a station from the Station list
                            <br/>to view journeys that start or end at that station.</h3>
                        </Col>
                        <Col xs={3}>
                            <Button className="overlay" variant="primary" onClick={() => setOffCanvas({...offCanvas, stations: true})}>
                                Change station
                            </Button>
                        </Col>
                    </>}
                </Row>
            </div>

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
            />
        </div>
    )
}