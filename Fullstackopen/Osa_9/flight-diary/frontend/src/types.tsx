export interface Diaries {
    id: number,
    date: string,
    weather: string,
    visibility: string,
    comment: string
}

export interface Notification {
    message: string;
}

export type newDiaries = Omit<Diaries, 'id'>