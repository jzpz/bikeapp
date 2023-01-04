import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { departureStationState, offCanvasState, returnStationState, selectedStationState, stationsState } from '../GlobalStates';
import { OffCanvasStatus } from '../Types/App';
import { Station } from '../Types/Station';

// An offcanvas view that contains all stations
export default function StationList() {
    
    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const [stations, setStations] = useRecoilState<Station[] | null>(stationsState);
    const setSelectedStation = useSetRecoilState<Station | null>(selectedStationState);
    const setDepartureStation = useSetRecoilState<Station | null>(departureStationState);
    const setReturnStation = useSetRecoilState<Station | null>(returnStationState);

    const [filterWord, setFilterWord] = useState('');

    // Check station names for filter word
    function filteredList(list: Station[]) {
        return list.filter((station: Station) => 
            station.nameLocaleFi.toLowerCase().includes(filterWord.toLowerCase()) ||
            station.nameLocaleSe.toLowerCase().includes(filterWord.toLowerCase())
        )
    }

    // Make JSX list from array
    function List() {
        if(stations) {
            const list = filteredList(stations).map((station: Station) => 
                <div 
                    onClick={() => {
                        setSelectedStation(station)
                        setDepartureStation(station)
                        setReturnStation(station)
                        setOffCanvas({...offCanvas, stations: false})
                    }}
                    key={"station-list-item" + station.id} 
                    className="list-item station">
                    <span>{station.nameLocaleFi} </span>
                    <span className="secondary">{station.nameLocaleSe}</span>
                </div>
            )

            if(list.length > 0) {
                return <>{list}</>
            }
        }

        return(
            <span>
                No stations match the specified filter
            </span>
        )
    }

    return(
        <Offcanvas 
            placement="end" 
            show={offCanvas.stations} 
            onHide={() => setOffCanvas({...offCanvas, stations: false})}
        >
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>
                Station
            </Offcanvas.Title>
            </Offcanvas.Header>
            {/* Station list and search */}
            <Offcanvas.Body>
                <Form.Group className="mb-3" controlId="formStationSearch">
                    <Form.Label>
                        Search by name
                    </Form.Label>
                    <Form.Control 
                        value={filterWord}
                        onChange={(e) => setFilterWord(e.target.value)}
                        type="text" 
                        placeholder="Type station name" 
                    />
                </Form.Group>

                <List />
            </Offcanvas.Body>
        </Offcanvas>
    )
}
