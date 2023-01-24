import { Station } from "../Types/Station";

export function filterStationList(list: Station[], filterWord: string): Station[] {
    return list.filter((station: Station) => 
        station.nameLocaleEn.toLowerCase().includes(filterWord.toLowerCase()) ||
        station.nameLocaleFi.toLowerCase().includes(filterWord.toLowerCase())
    )
}

export function sortStationList(list: Station[]): Station[] {
    return [...list].sort((a: Station, b: Station) => {
        const a_NameLocaleEn = a.nameLocaleEn.toLowerCase();
        const b_NameLocaleEn = b.nameLocaleEn.toLowerCase();

        if(a_NameLocaleEn < b_NameLocaleEn) {
            return -1;
        } else if(a_NameLocaleEn > b_NameLocaleEn) {
            return 1;
        }
        
        return 0;
    });
}