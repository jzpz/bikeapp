import React, { Dispatch, SetStateAction } from 'react';
import Button from "react-bootstrap/Button";
import { IoArrowDown, IoArrowUp } from "react-icons/io5";
import { OrderDirectionButtonProps } from '../Types/App';

export default function OrderDirectionButton({isDescending, handleChange}: OrderDirectionButtonProps): JSX.Element {
    return(
        <Button
            variant="light"
            onClick={() => handleChange(!isDescending)}
        >
            {isDescending ?
                <IoArrowDown />
            :
                <IoArrowUp />
            }
        </Button>
    )
}