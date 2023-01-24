import React from "react";
import { JourneyListProps } from "../Types/App";
import { Journey } from "../Types/Journey";
import JourneyListItem from "./JourneyListItem";

export default function JourneyList({journeys, loading, selectedStationType}: JourneyListProps) {
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

    return null; // loading
}