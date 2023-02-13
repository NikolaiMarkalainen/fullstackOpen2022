import axios from "axios";

import { Diaries, newDiaries } from '../types';

const baseUrl = 'http://localhost:3001/api';

export const getAllNotes = () => {
    return axios
    .get<Diaries[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
};


export const createNote = (object: newDiaries) => {
    return axios
    .post<Diaries[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
};
