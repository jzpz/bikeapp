import React, { ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { useRecoilState } from 'recoil';
import apiUrl from '../api';
import { formatDateString } from '../Functions/formatValues';
import { importData } from '../Functions/importData';
import { offCanvasState } from '../GlobalStates';
import { FileContentType, ImportStatus, OffCanvasStatus } from '../Types/App';

export default function FileUploadModal() {
    const [offCanvas, setOffCanvas] = useRecoilState<OffCanvasStatus>(offCanvasState);

    const [fileContentType, setFileContentType] = useState<FileContentType>("journeys");
    const [file, setFile] = useState<File | null>(null);
    const [importInProgress, setImportInProgress] = useState<boolean>(false);
    const [importStatus, setImportStatus] = useState<ImportStatus | null>(null);

    const closeModal = () => setOffCanvas({...offCanvas, fileUpload: false});

    function changeFileContentType() {
        if(fileContentType === "journeys")
            setFileContentType("stations")
        else
            setFileContentType("journeys")
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if(e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    function handleImport() {
        if(file) {
            setImportInProgress(true);
            importData(file, fileContentType)
            .then((status) => {
                setImportStatus(status);
                setImportInProgress(false);
            })
            .catch((e) => console.log(e));
        }
    }

    function reset() {
        setFile(null);
        setImportStatus(null);
        setImportInProgress(false);
        setFileContentType("journeys");
    }

    const ImportResult = () => (
        <div>
            <h4>Import status: {importStatus?.importStatus}</h4>
            <hr/>
            <p>
                Total rows in file: <strong>{importStatus?.readCount}</strong><br/>
                Valid rows: <strong>{importStatus?.writeCount}</strong><br/>
                Invalid rows: <strong>{importStatus?.filterCount}</strong><br/>
                {importStatus?.startTime && importStatus?.endTime ?
                    <span>
                        Start time: <strong>{formatDateString(importStatus.startTime)}</strong><br/>
                        End time: <strong>{formatDateString(importStatus.endTime)}</strong>
                    </span>
                : null}
            </p>
        </div>
    )

    return(
        <Modal 
            show={offCanvas.fileUpload} 
            onHide={closeModal}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Import data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {apiUrl as String !== "https://api.jesse.ovh" ?
                    <div>
                        {importStatus ?
                            <ImportResult />
                        :
                            importInProgress ?
                                <div className="text-center">
                                    <Spinner 
                                        style={{alignSelf:"center"}} 
                                        animation="border" 
                                        variant="primary" 
                                    />
                                </div>
                            :
                                <div>
                                    <Form>
                                        <Form.Group controlId="formFileLg" className="mb-3">
                                            <Form.Label>Import CSV</Form.Label>
                                            <Form.Control 
                                                type="file" 
                                                size="lg"
                                                onChange={handleFileChange} 
                                            />
                                        </Form.Group>
                                    </Form>
                                    <div style={{textAlign:"center"}}>
                                        <ButtonGroup>
                                            <Button
                                                onClick={changeFileContentType}
                                                variant="outline-dark"
                                                className={fileContentType === "journeys" ? "active" : ""}
                                            >
                                                Journey data
                                            </Button>
                                            <div style={{width:10}} />
                                            <Button
                                                onClick={changeFileContentType}
                                                variant="outline-dark"
                                                className={fileContentType === "stations" ? "active" : ""}
                                            >
                                                Station data
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                        }
                    </div>
                :
                    <h4>File import is not enabled for {apiUrl}</h4>
                }
            </Modal.Body>
            <Modal.Footer>
                {importStatus && !importInProgress ?
                    <Button 
                        variant="primary"
                        onClick={reset}
                    >
                        OK
                    </Button>
                :
                <Button 
                    variant={file && !importInProgress ? "primary" : "secondary"} 
                    type="submit"
                    disabled={file && !importInProgress ? false : true}
                    onClick={handleImport}
                >
                    Import
                </Button>
                }
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}