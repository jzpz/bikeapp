import React from "react";
import { IoArrowForward } from 'react-icons/io5';
import { departureStationState, returnStationState, selectedStationState } from "../GlobalStates";
import { useRecoilValue } from 'recoil';
import { Station } from "../Types/Station";

// Displays currently selected journey details
export default function CurrentJourney () {

    // Global states
    const selectedStation = useRecoilValue<Station | null>(selectedStationState);
    const departureStation = useRecoilValue<Station | null>(departureStationState);
    const returnStation = useRecoilValue<Station | null>(returnStationState);

    const ReturnStation = () => (
        <>
            <IoArrowForward size={26} style={{marginRight:5,marginLeft:5,marginBottom:3}} />
            <span className="return-station" style={{fontWeight:"bold"}}>
                {returnStation?.nameLocaleFi}
            </span>
        </>
    )

    return(
        <div className="journey-item floating-container">
            <div className="text-center" style={{margin:3, display:"inline-flex"}}>
                {/* Add classnames for colorcoding (red=departure, blue=return)*/}
                <h4 
                    style={{marginBottom:0}}
                    data-cy="current-journey"
                >
                    {selectedStation ? <>
                        {departureStation && <>
                            <span className="departure-station" style={{fontWeight:"bold"}}>
                                {departureStation?.nameLocaleFi}
                            </span>
                            {returnStation && departureStation.id !== returnStation.id &&
                                <ReturnStation />
                            }
                        </>}
                    </>:
                        <span>
                            Click a marker on the map
                        </span>
                    }
                </h4>
            </div>
        </div>
    )
}
