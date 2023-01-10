import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import React from "react";
import CityMap from './Components/CityMap';
import CurrentJourney from './Components/CurrentJourney';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import Navigation from './Components/Navigation';
import { RecoilRoot } from 'recoil';
import SelectDate from './Components/SelectDate';

function App() {
    return(
        <div className="App">
            <RecoilRoot>
                <Navigation />
                <SelectDate />
                <CityMap /> 
                <JourneyList />
                <StationList />
                <div id="journey-info">
                    <CurrentJourney />
                </div>
            </RecoilRoot>
        </div>
    );
}

export default App;
