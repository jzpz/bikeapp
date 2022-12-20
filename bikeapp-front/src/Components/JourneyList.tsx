import React, { useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';
import { getJourneys } from '../Functions/journeys';
import JourneyListItem from './JourneyListItem';
import { Journey } from '../Types/Journey';
import { Station, StationType } from '../Types/Station';

// An offcanvas view that contains all journeys
export default function JourneyList({
    offCanvas, 
    setOffCanvas,       
    departureStation, 
    selectedStation,
    returnStation, 
    setDepartureStation, 
    setSelectedStation, 
    setReturnStation
}: any) {
    
    const [journeys, setJourneys] = useState<Journey[] | null>(null);
    const [page, setPage] = useState(0);
    // Show departures or returns?
    const [selectedStationType, setSelectedStationType] = useState<StationType>("departure");

    useEffect(() => {
        setJourneys(null)
        getJourneys(page, selectedStation, selectedStationType)
        .then((data: any) => setJourneys(data))
        .catch(e => console.log(e));
    }, [selectedStation, selectedStationType, page]);

    // Always show departures by default when selecting a station
    useEffect(() => {
        setSelectedStationType("departure");
    }, [selectedStation]);

    /* Follow when user changes between departures and arrivals
        and change the states accordingly */
    useEffect(() => {
        if(selectedStationType === "departure") {
            setDepartureStation(returnStation);
            setReturnStation(departureStation);
        } else {
            setReturnStation(departureStation);
            setDepartureStation(returnStation);
        }
    }, [selectedStationType]);

    function switchPage(page: number) {
        let newPage: number;
        if(page < 0) newPage = 0;
        else newPage = page;
        setPage(newPage);
    }

    // Make JSX list from array
    function List() {
        if(journeys) {
            const list = journeys.map((journey: any) => {
                return(
                    <JourneyListItem
                        key={journey.id}
                        setSelectedStation={setSelectedStation}
                        journey={journey}
                        returnStation={returnStation}
                        departureStation={departureStation} 
                        setDepartureStation={setDepartureStation}
                        setReturnStation={setReturnStation} 
                        selectedStationType={selectedStationType} />
                )
            });
            return <>{list}</>
        } else {
            return <span>No journeys found</span>
        }
    }

    return(
        <Offcanvas 
            show={offCanvas.journeys} 
            onHide={() => setOffCanvas({...offCanvas, journeys: false})}>
            
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                {selectedStation && selectedStation.nameLocaleFi}
                <ButtonGroup>
                    <Button 
                        style={{backgroundColor: "#ff036c",border:"none"}}
                        className={selectedStationType === "departure" ? "active" : ""}
                        onClick={() => setSelectedStationType("departure")}>
                        Departures
                    </Button>
                    <Button 
                        style={{backgroundColor: "#1d63b8",border:"none"}}
                        className={selectedStationType === "return" ? "active" : ""}
                        onClick={() => setSelectedStationType("return")}>
                        Returns
                    </Button>
                </ButtonGroup>
            </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {journeys &&
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
