import { useState, useEffect, useMemo } from 'react';
import JourneyList from './Components/JourneyList';
import StationList from './Components/StationList';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import './app.css';

export default function MainView() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [descending, setDescending] = useState(false);
    const [offCanvas, setOffCanvas] = useState({journeys: false, stations: false});
    //const JourneyList = useMemo(() => getJourneys(), [page, pageSize, descending])

    return(
        <div>
            <Button variant="primary" onClick={() => setOffCanvas({...offCanvas, journeys: true, stations: true})}>
                Launch
            </Button>
            <JourneyList 
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
            />
            <StationList 
                offCanvas={offCanvas}
                setOffCanvas={setOffCanvas}
            />
        </div>

    )
}