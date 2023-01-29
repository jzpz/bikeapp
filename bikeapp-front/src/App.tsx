import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { RecoilRoot } from 'recoil';
import './app.css';
import CityMap from './Components/CityMap';
import CurrentJourney from './Components/CurrentJourney';
import FileUploadModal from './Components/FileUploadModal';
import Journeys from './Components/Journeys/Journeys';
import Navigation from './Components/Navigation/Navigation';
import SelectDate from './Components/SelectDate';
import Stations from './Components/Stations/Stations';

function App() {
    return(
        <div className="App">
            <RecoilRoot>
                <FileUploadModal />
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
