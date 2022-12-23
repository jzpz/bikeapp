import React from "react";
import { IoBicycle, IoTimeOutline, IoArrowForward } from 'react-icons/io5';
import { departureStationState, returnStationState, selectedStationState } from "../GlobalStates";
import { useRecoilValue } from 'recoil';
import { Station } from "../Types/Station";

// Displays currently selected journey details
export default function CurrentJourney () {

    // Global states
    const selectedStation = useRecoilValue<Station | null>(selectedStationState);
    const departureStation = useRecoilValue<Station | null>(departureStationState);
    const returnStation = useRecoilValue<Station | null>(returnStationState);

    function ReturnStation() {
        if(departureStation && returnStation 
        && departureStation.id !== returnStation.id) {
            return(
                <>
                    <IoArrowForward size={26} style={{marginRight:5,marginLeft:5,marginBottom:3}} />
                    <span className="return-station" style={{fontWeight:"bold"}}>
                        {returnStation.nameLocaleFi}
                    </span>
                </>
            )
        } 

        return null;
    }

    return(
        <div className="journey-item">
            <div className="text-center" style={{margin:3, display:"inline-flex"}}>
                {/* Add classnames for colorcoding (red=departure, blue=return)*/}
                <h4>
                    {selectedStation && selectedStation.id ? <>
                        <span className="departure-station" style={{fontWeight:"bold"}}>
                            {departureStation?.nameLocaleFi}
                        </span>
                        <ReturnStation />
                    </>:
                        <span>
                            Click a marker on the map
                        </span>
                    }
                </h4>
            </div>
            {selectedStation && selectedStation.id  &&
                <div className="journey-line" />
            }
        </div>
    )
}
