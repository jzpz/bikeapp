import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

// An offcanvas view that contains all stations
export default function StationList({
    stations, 
    offCanvas, 
    setOffCanvas, 
    setDepartureStation, 
    setReturnStation, 
    setSelectedStation
}) {
    const [filterWord, setFilterWord] = useState('');

    // Check station names for filter word
    function filteredList(list) {
        return list.filter(el => 
            el.nameLocaleFi.toLowerCase().includes(filterWord.toLowerCase()) ||
            el.nameLocaleSe.toLowerCase().includes(filterWord.toLowerCase())
        )
    }

    // Make JSX list from array
    function List() {
        const list = filteredList(stations).map((station, index) => {
            return(
                <div 
                    onClick={() => {
                        setSelectedStation(station)
                        setDepartureStation(station)
                        setReturnStation(station)
                        setOffCanvas({...offCanvas, stations: false})
                    }}
                    key={station.id} 
                    className="list-item station">
                    <span>{station.nameLocaleFi} </span>
                    <span className="secondary">{station.nameLocaleSe}</span>
                </div>
            )
        });
        return <>{list}</>
    }

    return(
        <Offcanvas 
            placement="end" 
            show={offCanvas.stations} 
            onHide={() => setOffCanvas({...offCanvas, stations: false})}
        >
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Station</Offcanvas.Title>
            </Offcanvas.Header>
            {/* Station list and search */}
            <Offcanvas.Body>
                <Form.Group className="mb-3" controlId="formStationSearch">
                    <Form.Label>Search by name</Form.Label>
                    <Form.Control 
                        value={filterWord}
                        onChange={(e) => setFilterWord(e.target.value)}
                        type="text" 
                        placeholder="Type station name" 
                    />
                </Form.Group>
                {stations?.length > 0 &&
                    <List />
                }
            </Offcanvas.Body>

        </Offcanvas>
    )
}
