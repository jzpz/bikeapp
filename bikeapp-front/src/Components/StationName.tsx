import React from 'react';
import { StationNameProps } from "../Types/Station";

const StationName = ({station, en}: StationNameProps) => (
    <span>
        {station?.nameLocaleFi}
        {en &&
            <span className="secondary">
                &nbsp;{station?.nameLocaleEn}
            </span>
        }
    </span>
)

export default StationName;