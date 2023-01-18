import React from "react";
import { IoArrowForward, IoTimeOutline } from 'react-icons/io5';
import { currentJourneyState, departureStationState, returnStationState, currentStationState } from "../GlobalStates";
import { useRecoilValue } from 'recoil';
import { Station } from "../Types/Station";
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
            <div className="container-title">
                {currentStation.selected && currentJourney ? 
                    <Row>
                        <Col>
                            <h5 className="secondary-dark">
                                <IoTimeOutline />&nbsp;
                                {formatDateString(currentJourney.departureDate)}
                            </h5>
                        </Col>
                        <Col>
                            <h4>
                                <JourneyStats journey={currentJourney} />
                            </h4>
                        </Col>
                        <Col>
                            <h5 className="secondary-dark">
                                <IoTimeOutline />&nbsp;
                                {formatDateString(currentJourney.returnDate)}
                            </h5>
                        </Col>
                    </Row>
                :
                    <h4>Click a station marker on the map</h4>
                }
            </div>
            {/* Add classnames for colorcoding (red=departure, blue=return)*/}
            {currentStation.selected ? 
                <>
                    <div style={{display:"inline-flex"}}>
                        <div
                            className="journey-info-content"
                            style={{backgroundColor:"var(--departure-station)",color:"white",width:400}}
                        >
                                <h2><StationName station={currentStation.departure} /></h2>
                        </div>
                        <div className="journey-info-content">
                            <IoArrowForward size={50} style={{marginRight:5,marginLeft:5,marginBottom:3,overflow:"hidden"}} />
                        </div>
                        <div 
                            className="journey-info-content"
                            style={{backgroundColor:"var(--return-station)",color:"white",width:400}}
                        >
                            <h2><StationName station={currentStation.return} /></h2>
                        </div>
                    </div>
                </>
            : null}
        </div>
    )
}
