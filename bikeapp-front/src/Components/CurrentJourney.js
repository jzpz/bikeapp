import { IoBicycle, IoTimeOutline, IoArrowForward } from 'react-icons/io5';
import Button from 'react-bootstrap/Button';

// Displays currently selected journey details
export default function CurrentJourney ({
    departureStation, 
    returnStation, 
    selectedStation
}) {

    function ReturnStation() {
        if(departureStation.id !== returnStation.id) {
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
                    {selectedStation.id ? <>
                        <span className="departure-station" style={{fontWeight:"bold"}}>
                            {departureStation.nameLocaleFi}
                        </span>
                        <ReturnStation />
                    </>:
                        <span>
                            Click a marker on the map
                        </span>
                    }
                </h4>
            </div>
            {selectedStation.id  &&
                <div className="journey-line" />
            }
        </div>
    )
}
