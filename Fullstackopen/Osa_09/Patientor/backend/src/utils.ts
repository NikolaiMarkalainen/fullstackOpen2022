import { NewPatientEntry } from "./types";
import { Gender } from "./types";
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isGender = (param: any): param is Gender => {

    return Object.values(Gender).includes(param);
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date ' + date);
    }
    return date
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing content');
    }
    return name;
}


const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing content');
    }
    return ssn
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender '+ gender);
    }
    return gender;
}


const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorerect or missing content');
    }
    return occupation
}


type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: [],
    };
    return newEntry;
};

export default toNewPatientEntry