export interface Station {
    fid: bigint,
    id: string,
    nameLocaleFi: string,
    nameLocaleSe: string,
    nameLocaleEn: string,
    addressLocaleFi: string,
    addressLocaleSe: string,
    addressLocaleEn: string,
    cityLocaleFi: string,
    cityLocaleSe: string,
    operator: string,
    capacity: bigint,
    coordinateX: number,
    coordinateY: number
}

export type StationType = "departure" | "return";
