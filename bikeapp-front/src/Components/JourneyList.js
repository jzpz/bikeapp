import { formatDistance, formatDate, formatDuration } from '../Functions/formatValues';
import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getStation } from '../Functions/stations';

// An offcanvas view that contains all journeys
export default function JourneyList({offCanvas, setOffCanvas, 
        departureStation, setDepartureStation, currentSelectedStation,
        setCurrentSelectedStation, returnStation, setReturnStation}) {
    const [journeys, setJourneys] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    // Show departures or returns?
    const [showDepartures, setShowDepartures] = useState(true);

    useEffect(() => {
        getJourneys();
    }, [currentSelectedStation, showDepartures]);

    /* Follow when user changes between departures and arrivals
        and change the states accordingly */
    useEffect(() => {
        if(showDepartures) {
            setDepartureStation(returnStation);
            setReturnStation([]);
        } else {
            setReturnStation(departureStation);
            setDepartureStation([]);
        }
    }, [showDepartures]);

    function getJourneys(_page = page) {
        let searchParams = "";

        // Fetch journeys from the selected station
        if(currentSelectedStation.id) {
            if(showDepartures) 
            searchParams += "&departureStationId=" + currentSelectedStation.id
        else
            searchParams += "&returnStationId=" + currentSelectedStation.id
        }

        fetch(`http://localhost:8080/journeys?page=${_page}&size=${pageSize + searchParams}`)
        .then((response) => response.json())
        .then((data) => setJourneys(data))
        .catch((e) => console.log(e))
    }

    function switchPage(page, pageSize = 25) {
        let newPage;
        // Check page validity and get items from backend
        if(page < 0) newPage = 0;
        else newPage = page;
        setPage(newPage);
        getJourneys(newPage);
    }

    // Make JSX list from array
    function List() {
        const list = journeys.map((journey, index) => {
            return(
                <div 
                    onClick={() => {
                        if(departureStation.id !== journey.departureStationId) {
                            // Set departure station to departure station of this journey
                            getStation(journey.departureStationId)
                            .then(data => {
                                setDepartureStation(data)
                            })
                        }

                        if(returnStation.id !== journey.returnStationId) {
                            // Set return station to return station of this journey
                            getStation(journey.returnStationId)
                            .then(data => {
                                setReturnStation(data)
                            })
                        }
                    }}
                    key={journey.id} className="list-item">
                    <span title="Departed at">{formatDate(journey.departureDate)}</span><br/>
                    <span> From </span>
                    <span className={journey.departureStationId === departureStation.id ? "departure-station" : ""} style={{fontWeight:"bold"}}>{journey.departureStationName}</span>
                    <span> to </span>
                    <span className={journey.returnStationId === returnStation.id ? "return-station": ""}
                    style={{fontWeight:"bold"}}>{journey.returnStationName}</span>
                    <br/>
                    <span>Duration: {formatDuration(journey.durationInSeconds)} </span>
                    <span>Length: {formatDistance(journey.distanceCoveredInMeters)}</span>
                </div>
            )
        });
        return <>{list}</>
    }

    return(
        <Offcanvas 
            show={offCanvas.journeys} 
            onHide={() => setOffCanvas({...offCanvas, journeys: false})}>
            
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                {departureStation.nameLocaleFi}
                <hr/>
                <Button 
                    variant="dark" 
                    style={{backgroundColor: "red"}}
                    onClick={() => setShowDepartures(true)}>
                    Show Departures
                </Button>
                <Button 
                    variant="dark" 
                    style={{backgroundColor: "blue"}}
                    onClick={() => setShowDepartures(false)}>
                    Show Arrivals
                </Button>
            </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {journeys?.length > 0 &&
                    <List />
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
    )
}
