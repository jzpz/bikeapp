import React from 'react';
import { StationNameProps } from "../Types/Station";

const StationName = ({station, fi, se}: StationNameProps) => (
    <span>
        {station?.nameLocaleEn}&nbsp;
        {fi &&
            <span className="secondary">
                <br/>{station?.nameLocaleFi}
            </span>
        }
        {se &&
            <span className="secondary">
                &nbsp;- {station?.nameLocaleSe}
            </span>
        }
    </span>
)

export default StationName;