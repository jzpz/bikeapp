import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import { formatDistance, formatDate, formatDuration } from './Functions/formatValues';
import './app.css';

export default function JourneyList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [descending, setDescending] = useState(false);
    const [journeys, setJourneys] = useState([]);
    const [offCanvas, setOffCanvas] = useState(null);
    //const JourneyList = useMemo(() => getJourneys(), [page, pageSize, descending])
    const toggleOffCanvas = (name = null) => 
        offCanvas === null ? setOffCanvas("journeys") : setOffCanvas(null);

    useEffect(() => {
        getJourneys()
    }, [])

    function switchPage(page, pageSize = 25) {
        let newPage;
        if(page < 0) newPage = 0;
        else newPage = page;
        setPage(newPage);
        getJourneys(newPage)
    }

    function getJourneys(_page = page, _pageSize = pageSize) {
        fetch(`http://localhost:8080/journeys?page=${_page}&size=${_pageSize}`)
        .then((response) => response.json())
        .then((data) => setJourneys(data));
    }

    function JourneyList() {
        const list = journeys.map((journey, index) => {
            return(
                <div key={journey.id} className="list-item">
                    <span title="Departed at">{formatDate(journey.departureDate)}</span><br/>
                    <span> From </span>
                    <span style={{fontWeight:"bold"}}>{journey.departureStationName}</span>
                    <span> to </span>
                    <span style={{fontWeight:"bold"}}>{journey.returnStationName}</span>
                    <br/>
                    <span>Duration: {formatDuration(journey.durationInSeconds)} </span>
                    <span>Length: {formatDistance(journey.distanceCoveredInMeters)}</span>
                    <hr/>
                </div>
            )
        });
        return <>{list}</>
    }

    return(
        <div>
            <Button variant="primary" onClick={() => toggleOffCanvas()}>
                Launch
            </Button>
            <Offcanvas show={offCanvas === "journeys"} onHide={() => setOffCanvas(null)}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Journeys</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {journeys?.length > 0 &&
                        <JourneyList />
                    }
                    <Pagination>
                        <Pagination.Prev onClick={() => switchPage(page - 1)} />
                        {page > 1 &&
                            <Pagination.Item onClick={() => switchPage(page - 2)}>{page - 2}</Pagination.Item>
                        }
                        {page > 0 &&
                            <Pagination.Item onClick={() => switchPage(page - 1)}>{page - 1}</Pagination.Item>
                        }
                        <Pagination.Item active>{page}</Pagination.Item>
                        <Pagination.Item onClick={() => switchPage(page + 1)}>{page + 1}</Pagination.Item>
                        <Pagination.Item onClick={() => switchPage(page + 2)}>{page + 2}</Pagination.Item>
                        <Pagination.Next onClick={() => switchPage(page + 1)} />
                    </Pagination>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

    )
}