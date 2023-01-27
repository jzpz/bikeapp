import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getStations } from "../Functions/stations";
import { stationsState } from "../GlobalStates";
import { Station } from "../Types/Station";

export default function useStations() {
    const [stations, setStations] = useRecoilState<Station[] | null>(stationsState);

    useEffect(() => {
        if(!stations) {
            getStations()
            .then(data => setStations(data))
        }

    // eslint gives a warning if recoil states are not supplied in dependency array

    // This will be ignored, since in this case recoil setstate function wont 
    // change between renders and needlessly supplying the function could cause issues.

    // currently no fix could be found
    }, [stations]); // eslint-disable-line react-hooks/exhaustive-deps

    return stations;
}