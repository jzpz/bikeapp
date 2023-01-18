import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FirstNavbarProps } from "../Types/App";
import StationName from "./StationName";

// Navbar for station name and address
const FirstNavbar = ({station}: FirstNavbarProps) => (
    <Navbar bg="dark" variant="dark" className="top-nav" style={{height:50}}>
        <Container fluid>

            {/* Position left */}
            {/* Station name */}
            <Navbar.Brand>
                {station ? 
                    <>
                        <StationName station={station} en />
                    </> : <>
                        <span>No station selected</span>
                    </>
                }
            </Navbar.Brand>

            {/* Position right */}
            {/* Station address */}
            <Navbar.Text>
                {station?.addressLocaleFi}
            </Navbar.Text>

        </Container>
    </Navbar>
)

export default FirstNavbar;