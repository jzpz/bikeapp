import React from 'react';
import { StationNameProps } from "../Types/Station";

const StationName = ({station}: StationNameProps) => (
    <span>
        {station.nameLocaleEn}&nbsp;
        {station.nameLocaleEn !== station.nameLocaleFi &&
            <span className="secondary">
                {station.nameLocaleFi}
            </span>
        }
    </span>
)

export default StationName;