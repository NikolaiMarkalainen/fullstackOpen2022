import axios from "axios";

import { Diaries, newDiaries } from '../types';

const baseUrl = 'http://localhost:3001/api';

export const getAllDiaries = () => {
    return axios
    .get<Diaries[]>(`${baseUrl}/diaries`)
    .then(response => response.data)
};


export const createDiary = (object: newDiaries) => {
    return axios
    .post<Diaries[]>(`${baseUrl}/diaries`, object)
    .then(response => response.data)
};
