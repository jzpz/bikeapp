import { useState, useEffect } from "react";

export default function JourneyList() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/journeys?page=0&size=25', {
        })
        .then((response) => response.json())
        .then((data) => setJourneys(data));
    }, [])

    const JourneyList = () => {
        const list = journeys.map((journey, index) => {
            return(
                <div key={journey.id}>
                    <p>{journey.durationInSeconds}</p>
                </div>
            )
        })

        return <>{list}</>
    }

    return(
        <>
            <JourneyList />
        </>
    )
}