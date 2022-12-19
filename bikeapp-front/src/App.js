import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { useEffect, useState } from 'react';
import './app.css';
import CityMap from './Components/CityMap';
import CurrentJourney from './Components/CurrentJourney';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import { getStationInfo, getStations, getStation } from './Functions/stations';
import Navigation from './Components/Navigation';

function App() {
    const [stations, setStations] = useState([]);
    const [offCanvas, setOffCanvas] = useState({journeys: false, stations: false});
    // Currently selected station
    const [selectedStation, setSelectedStation] = useState([]);
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

    // Fetch station info (avg journeys, top stations)
    useEffect(() => {
        setStationInfo([]);

        if(selectedStation.id) {
            getStationInfo(selectedStation.id)
            .then(data => setStationInfo(data));
        }
    }, [selectedStation]);
    
    return(
        <div className="App">
            <Navigation
                selectedStation={selectedStation}
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                stationInfo={stationInfo}
                setDepartureStation={setDepartureStation}
                setReturnStation={setReturnStation}
            />

            <CityMap 
                stations={stations} 
                departureStation={departureStation}
                returnStation={returnStation}
                setReturnStation={setReturnStation}
                setDepartureStation={setDepartureStation}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
            />

            <JourneyList className="overlay"
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                departureStation={departureStation}
                returnStation={returnStation}
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
                setDepartureStation={setDepartureStation}
                setReturnStation={setReturnStation}
            />

            <StationList className="overlay"
                stations={stations}
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
                setSelectedStation={setSelectedStation}
                setDepartureStation={setDepartureStation}
                setReturnStation={setReturnStation}
            />

            <div id="journey-info">
                <CurrentJourney
                    selectedStation={selectedStation}
                    departureStation={departureStation}
                    returnStation={returnStation} />
            </div>
        </div>
    );
}

export default App;
