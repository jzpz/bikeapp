import { useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';
import { getJourneys } from '../Functions/journeys';
import JourneyListItem from './JourneyListItem';

// An offcanvas view that contains all journeys
export default function JourneyList({offCanvas, setOffCanvas, 
        departureStation, setDepartureStation, currentSelectedStation,
        returnStation, setReturnStation}) {
    const [journeys, setJourneys] = useState([]);
    const [page, setPage] = useState(0);
    // Show departures or returns?
    const [showDepartures, setShowDepartures] = useState(true);

    useEffect(() => {
        setJourneys([])
        getJourneys(page, currentSelectedStation, showDepartures)
        .then(data => setJourneys(data))
        .catch(e => console.log(e));
    }, [currentSelectedStation, showDepartures, page]);

    // Always show departures by default when selecting a station
    useEffect(() => {
        setShowDepartures(true)
    }, [currentSelectedStation]);

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

    function switchPage(page) {
        let newPage;
        if(page < 0) newPage = 0;
        else newPage = page;
        setPage(newPage);
    }

    // Make JSX list from array
    function List() {
        const list = journeys.map((journey) => {
            return(
                <JourneyListItem
                    key={journey.id}
                    journey={journey}
                    returnStation={returnStation}
                    departureStation={departureStation} 
                    setDepartureStation={setDepartureStation}
                    setReturnStation={setReturnStation} />
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
                {currentSelectedStation.nameLocaleFi}
                <hr/>
                <ButtonGroup>
                    <Button 
                        variant="light" 
                        style={{backgroundColor: "#ff036c", color:"white"}}
                        className={showDepartures ? "active" : ""}
                        onClick={() => setShowDepartures(true)}>
                        Departures
                    </Button>
                    <Button 
                        variant="light" 
                        style={{backgroundColor: "#1d63b8", color:"white"}}
                        className={showDepartures ? "" : "active"}
                        onClick={() => setShowDepartures(false)}>
                        Returns
                    </Button>
                </ButtonGroup>
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
