import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState } from 'recoil';
import { offCanvasState } from '../GlobalStates';
import { OffCanvasStatus } from '../Types/App';
import StationList from './StationList';

// An offcanvas view that contains all stations
export default function Stations() {
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);
    const [filterWord, setFilterWord] = useState<string>('');

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
                    <StationList
                        filterWord={filterWord}
                    />
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
