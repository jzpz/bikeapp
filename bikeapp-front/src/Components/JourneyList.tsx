import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getJourneys } from '../Functions/journeys';
import {
    dateFilterState, 
    departureStationState, 
    offCanvasState, 
    returnStationState, 
    selectedStationState,
} from '../GlobalStates';
import { DateFilter, OffCanvasStatus } from '../Types/App';
import { Journey, JourneyOrderColumn, JourneyOrderColumns, JourneyParams } from '../Types/Journey';
import { Station, StationType } from '../Types/Station';
import JourneyListItem from './JourneyListItem';
import OrderDirectionButton from './OrderDirectionButton';
import PaginationMenu from './PaginationMenu';
import OrderJourneysDropdown from './OrderJourneysDropdown';
import Button from 'react-bootstrap/esm/Button';

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

    const handleOrderColumnChange = (column: JourneyOrderColumn) => setOrderBy(column);
    const handleOrderDirectionChange = (isDescending: boolean) => setOrderDescending(isDescending);

    // Fetch journeys with params
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

    function handlePageSwitch(page: number) {
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
                    {selectedStation ?
                        <>
                            <span>
                                {selectedStation.nameLocaleEn}&nbsp;
                            </span>
                            <span className="secondary">
                                {selectedStation.nameLocaleFi}
                            </span>
                        </>
                    : 
                        <span>All Journeys</span>
                    }
                    <hr />
                    <div className="tab-buttons" style={{display:"inline-flex", width:"100%"}}>
                        <Button
                            onClick={() => setSelectedStationType("departure")}
                            className={selectedStationType === "departure" ? "active" : ""}
                            id="departures-tab"
                        >
                            Departures
                        </Button>
                        <Button
                            onClick={() => setSelectedStationType("return")}
                            className={selectedStationType === "return" ? "active" : ""}
                            id="returns-tab"
                        >
                            Returns
                        </Button>
                    </div>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <span className="secondary">
                    Order by:
                </span>
                <div className="journey-list-options pb-2" style={{width:"100%",display:"inline-flex"}}>
                    {/* Ordering */}
                    <OrderJourneysDropdown
                        currentOrderColumn={orderBy}
                        handleChange={handleOrderColumnChange}
                    />
                    <OrderDirectionButton
                        isDescending={orderDescending}
                        handleChange={handleOrderDirectionChange}
                    />
                </div>
                <div 
                    className="journey-list"
                    data-cy="journey-list"
                >
                    {loading ?
                        <div className="text-center">
                            <Spinner style={{alignSelf:"center",marginTop:40}} animation="border" variant="primary" />
                        </div>
                    :
                        <>
                            <Journeys />
                            <PaginationMenu 
                                handlePageSwitch={handlePageSwitch}
                                currentPage={page}
                            />
                        </>
                    }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
