import React from "react";
import { IoBicycle, IoTimerOutline } from "react-icons/io5";
import { formatDistance, formatDuration } from "../Functions/formatValues";
import { JourneyStatsProps } from "../Types/Journey";

const JourneyStats = ({journey}: JourneyStatsProps) => (
    <>
        <span className="journey-item-data">
            <IoTimerOutline style={{marginRight:5,marginTop:-3}} /> 
            {formatDuration(journey.durationInSeconds)}
        </span>
        <span className="journey-item-data">
            <IoBicycle style={{marginLeft:10,marginRight:5,marginTop:-3}} /> 
            {formatDistance(journey.distanceCoveredInMeters)}
        </span>
    </>
);

export default JourneyStats;