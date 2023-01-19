import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import React, { useEffect } from "react";
import CityMap from './Components/CityMap';
import CurrentJourney from './Components/CurrentJourney';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import Navigation from './Components/Navigation';
import { RecoilRoot } from 'recoil';
import SelectDate from './Components/SelectDate';
import { getStations } from './Functions/stations';

function App() {
    return(
        <div className="App">
            <RecoilRoot>
                <Navigation />
                <SelectDate />
                <CityMap /> 
                <JourneyList />
                <StationList />
                <CurrentJourney />
            </RecoilRoot>
        </div>
    );
}

export default App;
