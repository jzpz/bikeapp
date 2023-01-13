import React from "react";
import { useRecoilState } from "recoil";
import { dateFilterState } from "../GlobalStates";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import { IoClose } from "react-icons/io5";
import { DateFilter } from "../Types/App";

export default function SelectDate() {

    const [dateFilter, setDateFilter] = useRecoilState<DateFilter>(dateFilterState);

    return(
        <div 
            id="date-selector" 
            className="floating-container" 
            style={{position:"absolute",zIndex:1}}
            data-cy="date-selector"
        >
            <h4>Select date</h4>
            <div className="date-selector-picker" style={{display:"inline-flex"}}>
                <div
                    data-cy="datepicker-datefrom"
                >
                    <span>From</span>
                    <DatePicker 
                        selected={dateFilter.dateFrom}
                        dateFormat="yyyy-MM-dd"
                        onChange={(newDate: Date) => {
                            if(!dateFilter.dateTo)
                                setDateFilter({dateFrom: newDate, dateTo: newDate})
                            else
                                setDateFilter({...dateFilter, dateFrom: newDate})
                        }}
                    />
                </div>
                <div
                    data-cy="datepicker-dateto"
                >
                    <span>To</span>
                    <DatePicker 
                        selected={dateFilter.dateTo}
                        dateFormat="yyyy-MM-dd"
                        onChange={(newDate: Date) => {
                            if(!dateFilter.dateFrom)
                                setDateFilter({dateFrom: newDate, dateTo: newDate})
                            else
                                setDateFilter({...dateFilter, dateTo: newDate})    
                        }}
                    />
                </div>
            </div>
            <div className="text-center">
                <Button 
                    className="mt-2"
                    variant="outline-danger"
                    onClick={() => {
                        setDateFilter({dateFrom: null, dateTo: null});
                    }}
                >
                    <IoClose size={20} />
                    Clear
                </Button>
            </div>
        </div>
    )
}