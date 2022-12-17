import { IoBicycle, IoTimeOutline, IoArrowForward } from 'react-icons/io5';

// Displays currently selected journey details
export default function CurrentJourney ({departureStation, returnStation}) {

    return(
        <div className="journey-item">
            <div className="text-center" style={{padding:3}}>
                {/* Add classnames for colorcoding (red=departure, blue=return)*/}
                <span style={{display:"inline-flex"}}>
                    <h4
                        className="departure-station"
                        style={{fontWeight:"bold"}}>{departureStation.nameLocaleFi}
                    </h4>
                    <IoArrowForward size={26} style={{marginRight:5,marginLeft:5,marginTop:2}} />
                    <h4
                        className="return-station"
                        style={{fontWeight:"bold"}}>{returnStation.nameLocaleFi}
                    </h4>
                </span>
            </div>
            <div className="journey-line" />
        </div>
    )
}
