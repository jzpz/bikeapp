import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from 'react-bootstrap/Pagination';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getJourneys } from '../Functions/journeys';
import {
    dateFilterState, departureStationState, offCanvasState, returnStationState, selectedStationState
} from '../GlobalStates';
import { DateFilter, OffCanvasStatus } from '../Types/App';
import { Journey, JourneyOrderColumn, JourneyOrderColumns, JourneyParams } from '../Types/Journey';
import { Station, StationType } from '../Types/Station';
import JourneyListItem from './JourneyListItem';
import OrderDirectionButton from './OrderDirectionButton';

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
    const [orderBy, setOrderBy] = useState<JourneyOrderColumn>(JourneyOrderColumns.departureDate);
    const [orderDescending, setOrderDescending] = useState(false);

    useEffect(() => {
        let cancel = false;

        if(offCanvas.journeys) {
            setJourneys(null)
            setLoading(true);

            let params: JourneyParams = {
                page: page,
                selectedStationType: selectedStationType,
                orderBy: orderBy.column,
                descending: orderDescending,
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
    }, [
        selectedStation, 
        selectedStationType, 
        page, 
        offCanvas, 
        dateFilter.dateFrom, 
        dateFilter.dateTo,
        orderBy.column,
        orderDescending,
    ]);

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

    function handleOrderChange(isDescending: boolean) {
        setOrderDescending(isDescending);
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
                <div className="journey-list-options pb-2" style={{display:"inline-flex"}}>
                    <span className="p-1">Order by</span>
                    <DropdownButton title={orderBy.name}>
                        <Dropdown.Item href="#/action-1"
                            onClick={() => setOrderBy(JourneyOrderColumns.departureDate)}
                        >
                            {JourneyOrderColumns.departureDate.name}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setOrderBy(JourneyOrderColumns.departureStationName)}
                        >
                            {JourneyOrderColumns.departureStationName.name}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setOrderBy(JourneyOrderColumns.returnStationName)}
                        >
                            {JourneyOrderColumns.returnStationName.name}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setOrderBy(JourneyOrderColumns.distanceCoveredInMeters)}
                        >
                            {JourneyOrderColumns.distanceCoveredInMeters.name}
                        </Dropdown.Item>
                        <Dropdown.Item 
                            onClick={() => setOrderBy(JourneyOrderColumns.durationInSeconds)}
                        >
                            {JourneyOrderColumns.durationInSeconds.name}
                        </Dropdown.Item>
                    </DropdownButton>
                    <OrderDirectionButton
                        isDescending={orderDescending}
                        handleChange={handleOrderChange}
                     />
                </div>
                <div 
                    className="journey-list"
                    data-cy="journey-list"
                >
                    <Journeys />
                </div>
                <Pagination
                    data-cy="journey-list-pagination"
                >
                    <Pagination.Prev 
                        onClick={() => switchPage(page - 1)} 
                        data-cy="journey-list-page-prev"
                    />
                    {page > 1 &&
                        <Pagination.Item 
                            onClick={() => switchPage(page - 2)}
                            data-cy="journey-list-page-minus-2"
                        >
                            {page - 2}
                        </Pagination.Item>
                    }
                    {page > 0 &&
                        <Pagination.Item 
                            onClick={() => switchPage(page - 1)}
                            data-cy="journey-list-page-minus-1"
                        >
                            {page - 1}
                        </Pagination.Item>
                    }
                    <Pagination.Item 
                        active
                        data-cy="journey-list-page-current"
                    >
                        {page}
                    </Pagination.Item>
                    <Pagination.Item 
                        onClick={() => switchPage(page + 1)}
                        data-cy="journey-list-page-plus-1"
                    >
                        {page + 1}
                    </Pagination.Item>
                    <Pagination.Item 
                        onClick={() => switchPage(page + 2)}
                        data-cy="journey-list-page-plus-2"
                    >
                        {page + 2}
                    </Pagination.Item>
                    <Pagination.Next 
                        onClick={() => switchPage(page + 1)} 
                        data-cy="journey-list-page-next"
                    />
                </Pagination>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
