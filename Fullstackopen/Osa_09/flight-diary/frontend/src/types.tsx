export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
}

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