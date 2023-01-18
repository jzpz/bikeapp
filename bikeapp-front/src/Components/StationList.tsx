import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { offCanvasState, currentStationState, stationsState } from '../GlobalStates';
import { OffCanvasStatus, CurrentStationState } from '../Types/App';
import { Station } from '../Types/Station';
import StationName from './StationName';

// An offcanvas view that contains all stations
export default function StationList() {
    
    // Global states
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const stations = useRecoilValue<Station[] | null>(stationsState);
    const setCurrentStation = useSetRecoilState<CurrentStationState>(currentStationState);

    const [filterWord, setFilterWord] = useState('');

    function filterStationsList(list: Station[]): Station[] {
        return list.filter((station: Station) => 
            station.nameLocaleEn.toLowerCase().includes(filterWord.toLowerCase()) ||
            station.nameLocaleFi.toLowerCase().includes(filterWord.toLowerCase())
        )
    }

    function sortStationsList(list: Station[]): Station[] {
        return [...list].sort((a: Station, b: Station) => {
            const a_NameLocaleEn = a.nameLocaleEn.toLowerCase();
            const b_NameLocaleEn = b.nameLocaleEn.toLowerCase();

            if(a_NameLocaleEn < b_NameLocaleEn) {
                return -1;
            } else if(a_NameLocaleEn > b_NameLocaleEn) {
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
                let stationFirstLetter = station.nameLocaleEn.charAt(0);
                if(i === 0 || array[i - 1].nameLocaleEn.charAt(0) !== stationFirstLetter) {
                    elements.push(
                        <div 
                            style={{margin:3}} 
                            key={"station-list-heading-" + stationFirstLetter}
                        >
                            <span style={{fontWeight:"bold",color:"#27255c",fontSize:"1.1em"}}>
                                {stationFirstLetter}
                            </span>
                        </div>
                    )
                }

                elements.push(
                    <div 
                        onClick={() => {
                            setCurrentStation({
                                selected: station,
                                departure: station,
                                return: station,
                            });
                            setOffCanvas({...offCanvas, stations: false})
                        }}
                        key={"station-list-item" + station.id} 
                        className="list-item station">
                        <StationName station={station} fi se />
                    </div>
                )

                return elements;
            })

            if(list.length > 0) {
                return(
                    <>{list}</>
                )
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
                    Stations
                    <hr />
                    <Form.Group className="mb-3" controlId="formStationSearch">
                        <Form.Control 
                            value={filterWord}
                            onChange={(e) => setFilterWord(e.target.value)}
                            type="text" 
                            placeholder="Search by name"
                            data-cy="station-search"
                        />
                    </Form.Group>
                </Offcanvas.Title>
            </Offcanvas.Header>
            {/* Station list and search */}
            <Offcanvas.Body>
                <div className="station-list">
                    <Stations />
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
