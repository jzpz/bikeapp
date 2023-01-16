import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { departureStationState, offCanvasState, returnStationState, selectedStationState, stationsState } from '../GlobalStates';
import { OffCanvasStatus } from '../Types/App';
import { Station } from '../Types/Station';

// An offcanvas view that contains all stations
export default function StationList() {
    
    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const stations = useRecoilValue<Station[] | null>(stationsState);
    const setSelectedStation = useSetRecoilState<Station | null>(selectedStationState);
    const setDepartureStation = useSetRecoilState<Station | null>(departureStationState);
    const setReturnStation = useSetRecoilState<Station | null>(returnStationState);

    const [filterWord, setFilterWord] = useState('');

    function filterStationsList(list: Station[]): Station[] {
        return list.filter((station: Station) => 
            station.nameLocaleFi.toLowerCase().includes(filterWord.toLowerCase()) ||
            station.nameLocaleSe.toLowerCase().includes(filterWord.toLowerCase())
        )
    }

    function sortStationsList(list: Station[]): Station[] {
        return [...list].sort((a: Station, b: Station) => {
            const a_NameLocaleFi = a.nameLocaleFi.toLowerCase();
            const b_NameLocaleFi = b.nameLocaleFi.toLowerCase();

            if(a_NameLocaleFi < b_NameLocaleFi) {
                return -1;
            } else if(a_NameLocaleFi > b_NameLocaleFi) {
                return 1;
            }
            
            return 0;
        });
    }

    // Make JSX list from array
    function Stations(): JSX.Element {
        if(stations) {
            const list = filterStationsList(sortStationsList(stations))
            .map((station: Station, i: number, array: Station[]) => {
                let elements: JSX.Element[] = [];

                // Alphabetically group station names by adding first letter as heading
                if(i === 0 || array[i - 1].nameLocaleFi.charAt(0) !== station.nameLocaleFi.charAt(0)) {
                    elements.push(
                        <div style={{margin:3}}>
                            <span style={{fontWeight:"bold",color:"#27255c",fontSize:"1.1em"}}>
                                {station.nameLocaleFi.charAt(0)}
                            </span>
                        </div>
                    )
                }

                elements.push(
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

                return elements;
            })

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
            data-cy="offcanvas-stations"
        >
            <Offcanvas.Header 
                closeButton
                data-cy="station-list-close"
            >
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
                        data-cy="station-search"
                    />
                </Form.Group>

                <div className="station-list">
                    <Stations />
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
