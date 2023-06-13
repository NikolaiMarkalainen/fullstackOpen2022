import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientData, PatientsEntry } from '../types';
import { v1 as uuid } from 'uuid';
const id = uuid();
const getEntries = (): PatientsEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): PatientsEntry |  undefined => {
  const entry = patients.find(p => p.id === id);
  return entry
}; 

const addPatient = ( entry: NewPatientEntry ): PatientsEntry => {
  const newPatientEntry = {
    id: id,
    ...entry
  };
  
  patients.push(newPatientEntry);
  return newPatientEntry
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findById
};