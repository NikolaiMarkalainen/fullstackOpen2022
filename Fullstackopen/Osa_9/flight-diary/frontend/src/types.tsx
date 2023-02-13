export interface Diaries {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment: string
}

export type newDiaries = Omit<Diaries, 'id'>