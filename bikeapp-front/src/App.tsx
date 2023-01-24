import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import React from "react";
import CityMap from './Components/CityMap';
import CurrentJourney from './Components/CurrentJourney';
import Stations from './Components/Stations';
import Navigation from './Components/Navigation';
import { RecoilRoot } from 'recoil';
import SelectDate from './Components/SelectDate';
import Journeys from './Components/Journeys';

function App() {
    return(
        <div className="App">
            <RecoilRoot>
                <Navigation />
                <SelectDate />
                <CityMap /> 
                <Journeys />
                <Stations />
                <CurrentJourney />
            </RecoilRoot>
        </div>
    );
}

export default App;
