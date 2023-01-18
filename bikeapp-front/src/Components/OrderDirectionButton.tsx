import React from 'react';
import Button from "react-bootstrap/Button";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { OrderDirectionButtonProps } from '../Types/App';

export default function OrderDirectionButton({isDescending, handleChange}: OrderDirectionButtonProps): JSX.Element {
    return(
        <Button
            className="order-direction-button"
            style={{overflow:"hidden"}}
            onClick={() => handleChange(!isDescending)}
            variant="outline-dark"
            size="sm"
        >
            {isDescending ?
                <span style={{overflow:"hidden"}}>
                    Descending <IoArrowDown />
                </span>
            :
                <span>
                    Ascending <IoArrowUp />
                </span>
            }
        </Button>
    )
}