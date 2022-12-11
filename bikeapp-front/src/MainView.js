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

export default function MainView() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [stations, setStations] = useState([]);
    const [descending, setDescending] = useState(false);
    const [offCanvas, setOffCanvas] = useState({journeys: false, stations: false});
    const [showReturns, setShowReturns] = useState(false);
    const [mapFeatures, setMapFeatures ] = useState([]);
    const [station, setStation] = useState([]);
    let urlParams = new URLSearchParams(window.location.search)
    
    function getStation(fid) {
        fetch(`http://localhost:8080/station/${fid}`)
        .then((response) => response.json())
        .then((data) => setStation(data));
    }

    function getStations(_page = page, _pageSize = pageSize) {
        fetch(`http://localhost:8080/stations`)
        .then((response) => response.json())
        .then((data) => setStations(data));
    }

    // Initialize list on start
    useEffect(() => {
        getStations()
    }, [])

    // Show station if it is specified in url params
    useEffect(() => {
        let _station = urlParams.get('station');
        if(_station) {
            getStation(_station)
        }
    }, [])

    return(
        <div className="main-view">
            <div className="station-info">
                <h1>{station.nameLocaleFi}&nbsp;</h1>
                <h3 className="secondary">
                    {station.nameLocaleSe}
                    { // Show English name if its different from Finnish
                        station.nameLocaleEn === station.nameLocaleFi ? 
                        "" : " " + station.nameLocaleEn
                    }
                </h3>
                <hr/>
                <Button className="overlay" variant="primary" onClick={() => setOffCanvas({...offCanvas, stations: true})}>
                    Change station
                </Button>
                <Button className="overlay" variant="primary" 
                    onClick={() => {
                        setShowReturns(false);
                        setOffCanvas({...offCanvas, journeys: true})}}>
                    View Departures
                </Button>
                <Button className="overlay" variant="primary" 
                    onClick={() => {
                        setShowReturns(true);
                        setOffCanvas({...offCanvas, journeys: true})}}>
                    View Returns
                </Button>
            </div>
            <CityMap 
                stations={stations} 
                currentStation={station}
                setStation={setStation}
            />
            <JourneyList className="overlay"
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                departureStation={showReturns ? null : station}
                returnStation={showReturns ? station : null}
            />
            <StationList className="overlay"
                stations={stations}
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                setStation={setStation}
            />
        </div>
    )
}