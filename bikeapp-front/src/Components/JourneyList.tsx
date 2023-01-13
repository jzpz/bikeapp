import React, { useEffect, useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';
import { getJourneys } from '../Functions/journeys';
import JourneyListItem from './JourneyListItem';
import { Journey, JourneyParams } from '../Types/Journey';
import { Station, StationType } from '../Types/Station';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
    offCanvasState, 
    selectedStationState, 
    departureStationState, 
    returnStationState,
    dateFilterState
} from '../GlobalStates';
import { DateFilter, OffCanvasStatus } from '../Types/App';

// An offcanvas view that contains all journeys
export default function JourneyList() {

    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const [departureStation, setDepartureStation] = useRecoilState<Station | null>(departureStationState);
    const [returnStation, setReturnStation] = useRecoilState<Station | null>(returnStationState);
    const selectedStation = useRecoilValue<Station | null>(selectedStationState);
    const dateFilter = useRecoilValue<DateFilter>(dateFilterState);

    const [journeys, setJourneys] = useState<Journey[] | null>(null);
    const [page, setPage] = useState(0);
    const [selectedStationType, setSelectedStationType] = useState<StationType>("departure");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancel = false;

        if(offCanvas.journeys) {
            setJourneys(null)
            setLoading(true);

            let params: JourneyParams = {
                page: page,
                selectedStationType: selectedStationType,
            };

            if(selectedStation)
                params = {
                    ...params, 
                    selectedStation: selectedStation, 
                }

            if(dateFilter.dateFrom && dateFilter.dateTo) 
                params = {
                    ...params,
                    dateFrom: dateFilter.dateFrom,
                    dateTo: dateFilter.dateTo,
                }

            getJourneys(params)
            .then((data: Journey[]) => {
                if(!cancel) {
                    setJourneys(data);
                    setLoading(false);
                }
            })
            .catch(e => console.log(e));
        }

        return () => {
            cancel = true;
        }
    }, [selectedStation, selectedStationType, page, offCanvas, dateFilter.dateFrom, dateFilter.dateTo]);

    // Reset values on station change
    useEffect(() => {
        setJourneys(null)
        setPage(0)
        setSelectedStationType("departure");
    }, [selectedStation]);

    useEffect(() => {
        setJourneys(null)
        setPage(0)

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

    function Journeys() {
        if(journeys) {
            const list = journeys.map((journey: Journey) => 
                <JourneyListItem
                    key={"journey-list-item" + journey.id}
                    journey={journey}
                    selectedStationType={selectedStationType} 
                />
            );
            return <>{list}</>
        } else if(!loading) {
            return(
                <span data-cy="empty-list-item">
                    No journeys found
                </span>
            )
        }

        return null;
    }

    return(
        <Offcanvas 
            show={offCanvas.journeys} 
            onHide={() => setOffCanvas({...offCanvas, journeys: false})}
        >
            <Offcanvas.Header 
                closeButton
                data-cy="journey-list-close"
            >
            <Offcanvas.Title>
                {selectedStation && selectedStation.nameLocaleFi}&nbsp;
                <span className="secondary">
                    {selectedStation?.nameLocaleSe}
                </span>
                <hr />
                <ButtonGroup>
                    <Button 
                        style={{backgroundColor: "#ff036c",border:"none",marginRight:10}}
                        className={selectedStationType === "departure" ? "active" : ""}
                        onClick={() => setSelectedStationType("departure")}
                    >
                        Departures
                    </Button>
                    <Button 
                        style={{backgroundColor: "#1d63b8",border:"none"}}
                        className={selectedStationType === "return" ? "active" : ""}
                        onClick={() => setSelectedStationType("return")}
                    >
                        Returns
                    </Button>
                </ButtonGroup>
            </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div 
                    className="journey-list"
                    data-cy="journey-list"
                >
                    <Journeys />
                </div>
                <Pagination
                    data-cy="journey-list-pagination"
                >
                    <Pagination.Prev onClick={() => switchPage(page - 1)} />
                    {page > 1 &&
                        <Pagination.Item onClick={() => switchPage(page - 2)}>{page - 2}</Pagination.Item>
                    }
                    {page > 0 &&
                        <Pagination.Item onClick={() => switchPage(page - 1)}>{page - 1}</Pagination.Item>
                    }
                    <Pagination.Item active>
                        {page}
                    </Pagination.Item>
                    <Pagination.Item onClick={() => switchPage(page + 1)}>{page + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => switchPage(page + 2)}>{page + 2}</Pagination.Item>
                    <Pagination.Next onClick={() => switchPage(page + 1)} />
                </Pagination>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
