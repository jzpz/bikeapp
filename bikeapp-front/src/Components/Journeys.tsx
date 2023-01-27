import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getJourneys } from '../Functions/journeys';
import { dateFilterState, offCanvasState, currentStationState,} from '../GlobalStates';
import { DateFilter, OffCanvasStatus, CurrentStationState } from '../Types/App';
import { Journey, JourneyOrderColumn, JourneyOrderColumns, JourneyParams } from '../Types/Journey';
import { StationType } from '../Types/Station';
import OrderDirectionButton from './OrderDirectionButton';
import PaginationMenu from './PaginationMenu';
import OrderJourneysDropdown from './OrderJourneysDropdown';
import Button from 'react-bootstrap/esm/Button';
import StationName from './StationName';
import { getPageNum } from '../Functions/getPageNum';
import JourneyList from './JourneyList';

// An offcanvas view that contains all journeys
export default function Journeys() {

    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const [currentStation, setCurrentStation] = useRecoilState<CurrentStationState>(currentStationState);
    const dateFilter = useRecoilValue<DateFilter>(dateFilterState);

    const [journeys, setJourneys] = useState<Journey[] | null>(null);
    const [page, setPage] = useState(0);
    const [selectedStationType, setSelectedStationType] = useState<StationType>("departure");
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState<JourneyOrderColumn>(JourneyOrderColumns.departureDate);
    const [orderDescending, setOrderDescending] = useState(false);

    const handleOrderColumnChange = (column: JourneyOrderColumn) => setOrderBy(column);
    const handleOrderDirectionChange = (isDescending: boolean) => setOrderDescending(isDescending);
    const handlePageChange = (page: number) => setPage(getPageNum(page));

    // Fetch journeys with params
    useEffect(() => {
        let cancel = false;

        if(offCanvas.journeys) {
            setJourneys(null)
            setLoading(true);

            let params: JourneyParams = {
                page: page,
                stationType: selectedStationType,
                orderBy: orderBy.column,
                descending: orderDescending,
            };

            if(currentStation.selected)
                params = {
                    ...params, 
                    station: currentStation.selected, 
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
        currentStation.selected, 
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
    }, [currentStation.selected]);

    function switchDepartureAndReturn(type: StationType) {
        if(selectedStationType !== type) {
            setSelectedStationType(type);
            setJourneys(null);
            setPage(0);
            setCurrentStation({
                ...currentStation, 
                departure: currentStation.return, 
                return: currentStation.departure,
            });
        }
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
                    {currentStation.selected ?
                        <StationName station={currentStation.selected} en />
                    : 
                        <span>All Journeys</span>
                    }
                    <hr />
                    <div className="tab-buttons" style={{display:"inline-flex", width:"100%"}}>
                        <Button
                            onClick={() => switchDepartureAndReturn("departure")}
                            className={selectedStationType === "departure" ? "active" : ""}
                            id="departures-tab"
                        >
                            Departures
                        </Button>
                        <Button
                            onClick={() => switchDepartureAndReturn("return")}
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
                            <Spinner 
                                style={{alignSelf:"center",marginTop:40}} 
                                animation="border" 
                                variant="primary" 
                            />
                        </div>
                    :
                        <>
                            <JourneyList
                                journeys={journeys}
                                selectedStationType={selectedStationType}
                                loading={loading}
                            />
                            <PaginationMenu 
                                handlePageSwitch={handlePageChange}
                                currentPage={page}
                            />
                        </>
                    }
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
