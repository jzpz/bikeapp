import { Map, Marker, Overlay } from "pigeon-maps";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getStationInfo, getStations } from "../Functions/stations";
import { dateFromState, dateToState } from "../GlobalStates";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import { IoClose } from "react-icons/io5";

export default function SelectDate() {

    const [dateFrom, setDateFrom] = useRecoilState<Date | null>(dateFromState);
    const [dateTo, setDateTo] = useRecoilState<Date | null>(dateToState);

    useEffect(() => {
        console.log(dateFrom, dateTo)
    }, [dateFrom, dateTo])

    return(
        <div className="date-selector" style={{position:"absolute",zIndex:1}}>
            <h4>Select date</h4>
            <div className="date-selector-picker" style={{display:"inline-flex"}}>
                <div>
                    <span>From</span>
                    <DatePicker 
                        selected={dateFrom}
                        dateFormat="yyyy-MM-dd"
                        onChange={(newDate: Date) => {
                            setDateFrom(newDate);
                            if(!dateTo)
                                setDateTo(newDate);
                        }}
                    />
                </div>
                <div>
                    <span>To</span>
                    <DatePicker 
                        selected={dateTo}
                        dateFormat="yyyy-MM-dd"
                        onChange={(newDate: Date) => {
                            setDateTo(newDate);
                            if(!dateFrom)
                                setDateFrom(newDate);      
                        }}
                    />
                </div>
            </div>
            <div className="text-center">
                <Button 
                    className="mt-2"
                    variant="outline-danger"
                    onClick={() => {
                        setDateFrom(null);
                        setDateTo(null);
                    }}
                >
                    <IoClose size={20} />
                    Clear
                </Button>
            </div>
        </div>
    )
}