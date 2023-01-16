import React from 'react';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoArrowBack, IoArrowForward, IoBicycleOutline, IoTimeOutline, IoTimerOutline } from 'react-icons/io5';
import { OrderJourneysDropdownProps } from "../Types/App";
import { JourneyOrderColumns } from "../Types/Journey";

const OrderJourneysDropdown = ({currentOrderColumn, handleChange}: OrderJourneysDropdownProps) => (
    <DropdownButton 
        style={{marginRight:5}}
        title={currentOrderColumn.name}
        size="sm"
        variant="outline-dark"
    >
        <Dropdown.Item
            onClick={() => handleChange(JourneyOrderColumns.departureDate)}
        >
            <IoTimeOutline />&nbsp;
            {JourneyOrderColumns.departureDate.name}
        </Dropdown.Item>
        <Dropdown.Item 
            onClick={() => handleChange(JourneyOrderColumns.departureStationName)}
        >
            <IoArrowForward />&nbsp;
            {JourneyOrderColumns.departureStationName.name}
        </Dropdown.Item>
        <Dropdown.Item 
            onClick={() => handleChange(JourneyOrderColumns.returnStationName)}
        >
            <IoArrowBack />&nbsp;
            {JourneyOrderColumns.returnStationName.name}
        </Dropdown.Item>
        <Dropdown.Item 
            onClick={() => handleChange(JourneyOrderColumns.distanceCoveredInMeters)}
        >
            <IoBicycleOutline />&nbsp;
            {JourneyOrderColumns.distanceCoveredInMeters.name}
        </Dropdown.Item>
        <Dropdown.Item 
            onClick={() => handleChange(JourneyOrderColumns.durationInSeconds)}
        >
            <IoTimerOutline />&nbsp;
            {JourneyOrderColumns.durationInSeconds.name}
        </Dropdown.Item>
    </DropdownButton>
)

export default OrderJourneysDropdown;