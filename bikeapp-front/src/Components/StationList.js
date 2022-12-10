import { formatDistance, formatDate, formatDuration } from '../Functions/formatValues';
import { useState, useEffect, useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';

// An offcanvas view that contains all stations
export default function StationList({offCanvas, setOffCanvas}) {
    const [stations, setStations] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const [descending, setDescending] = useState(false);
    
    function getStations(_page = page, _pageSize = pageSize) {
        fetch(`http://localhost:8080/stations?page=${_page}&size=${_pageSize}`)
        .then((response) => response.json())
        .then((data) => setStations(data));
    }

    function switchPage(page, pageSize = 25) {
        let newPage;
        // Check page validity and get items from backend
        if(page < 0) newPage = 0;
        else newPage = page;
        setPage(newPage);
        getStations(newPage);
    }

    // Initialize list on start
    useEffect(() => {
        getStations()
    }, [])

    function List() {
        const list = stations.map((station, index) => {
            return(
                <div key={station.fid} className="list-item">
                    <span>{station.nameLocaleFi}</span><br/>
                    <hr/>
                </div>
            )
        });
        return <>{list}</>
    }

    return(
        <Offcanvas 
            placement="end" 
            show={offCanvas.stations} 
            onHide={() => setOffCanvas({...offCanvas, stations: false})}>
            
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Stations</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {stations?.length > 0 &&
                    <List />
                }
                <Pagination>
                    <Pagination.Prev onClick={() => switchPage(page - 1)} />
                    {page > 1 &&
                        <Pagination.Item onClick={() => switchPage(page - 2)}>{page - 2}</Pagination.Item>
                    }
                    {page > 0 &&
                        <Pagination.Item onClick={() => switchPage(page - 1)}>{page - 1}</Pagination.Item>
                    }
                    <Pagination.Item active>{page}</Pagination.Item>
                    <Pagination.Item onClick={() => switchPage(page + 1)}>{page + 1}</Pagination.Item>
                    <Pagination.Item onClick={() => switchPage(page + 2)}>{page + 2}</Pagination.Item>
                    <Pagination.Next onClick={() => switchPage(page + 1)} />
                </Pagination>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
