import React from "react";
import { IoArrowForward } from 'react-icons/io5';
import { departureStationState, returnStationState, selectedStationState } from "../GlobalStates";
import { useRecoilValue } from 'recoil';
import { Station } from "../Types/Station";
import StationName from "./StationName";

// Displays currently selected journey details
export default function CurrentJourney () {

    // Global states
    const selectedStation = useRecoilValue<Station | null>(selectedStationState);
    const departureStation = useRecoilValue<Station | null>(departureStationState);
    const returnStation = useRecoilValue<Station | null>(returnStationState);

    return(
        <div className="floating-container" id="journey-info">
            <div className="container-title">
                {selectedStation ? 
                    <h4>Selected Journey</h4>
                :
                    <h4>Click a station marker on the map</h4>
                }
            </div>
            {/* Add classnames for colorcoding (red=departure, blue=return)*/}
            {selectedStation ? 
                <div style={{display:"inline-flex"}}>
                    <div
                        className="journey-info-content"
                        style={{backgroundColor:"var(--departure-station)",color:"white",width:400}}
                    >
                            <h2><StationName station={departureStation} /></h2>
                    </div>
                    <div className="journey-info-content">
                        <IoArrowForward size={50} style={{marginRight:5,marginLeft:5,marginBottom:3,overflow:"hidden"}} />
                    </div>
                    <div 
                        className="journey-info-content"
                        style={{backgroundColor:"var(--return-station)",color:"white",width:400}}
                    >
                        <h2><StationName station={returnStation} /></h2>
                    </div>
                </div>
            : null}
        </div>
    )
}
