import React from "react";
import { IoArrowForward, IoTimeOutline } from 'react-icons/io5';
import { currentJourneyState, currentStationState } from "../GlobalStates";
import { useRecoilValue } from 'recoil';
import StationName from "./StationName";
import JourneyStats from "./JourneyStats";
import { Journey } from "../Types/Journey";
import { Col, Row } from "react-bootstrap";
import { formatDateString } from "../Functions/formatValues";
import { CurrentStationState } from "../Types/App";

// Displays currently selected journey details
export default function CurrentJourney () {

    // Global states
    const currentStation = useRecoilValue<CurrentStationState>(currentStationState);
    const currentJourney = useRecoilValue<Journey | null>(currentJourneyState);
    
    return(
        <div className="floating-container" id="journey-info">
            <div className="container-title" data-cy="current-journey-data">
                {currentStation.selected ?
                    <Row>
                        {currentJourney ?
                            <>
                                <Col xs={3}>
                                    <h5 className="secondary-dark">
                                        <IoTimeOutline />&nbsp;
                                        {formatDateString(currentJourney.departureDate)}
                                    </h5>
                                </Col>
                                <Col xs={6}>
                                    <h4>
                                        <JourneyStats journey={currentJourney} />
                                    </h4>
                                </Col>
                                <Col xs={3}>
                                    <h5 className="secondary-dark">
                                        <IoTimeOutline />&nbsp;
                                        {formatDateString(currentJourney.returnDate)}
                                    </h5>
                                </Col>
                            </>
                        :
                            <Col>
                                <h4>No journey selected</h4>
                            </Col>
                        }
                    </Row>
                :
                    <h4>Click a station marker on the map</h4>
                }
            </div>

            {currentStation.selected ? 
                <div style={{display:"inline-flex"}}>
                    {/* Departure station name */}
                    <div
                        className="journey-info-content"
                        style={{backgroundColor:"var(--departure-station)",color:"white",width:400}}
                    >
                        <h2 
                            style={{fontWeight:"bold"}}
                            data-cy="current-journey-departure-station"
                        >
                            <StationName station={currentStation.departure} />
                        </h2>
                    </div>
                    <div className="journey-info-content">
                        <IoArrowForward size={50} style={{marginRight:5,marginLeft:5,marginBottom:3,overflow:"hidden"}} />
                    </div>
                    {/* Departure station name */}
                    <div 
                        className="journey-info-content"
                        style={{backgroundColor:"var(--return-station)",color:"white",width:400}}
                    >
                        <h2 
                            style={{fontWeight:"bold"}}
                            data-cy="current-journey-return-station"
                        >
                            <StationName station={currentStation.return} />
                        </h2>
                    </div>
                </div>
            : null}
        </div>
    )
}
