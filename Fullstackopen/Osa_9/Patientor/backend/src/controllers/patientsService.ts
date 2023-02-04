import patients from '../../data/patients';
import { NonSensitivePatientData, PatientsEntry } from '../types';


const getEntries = (): Array<PatientsEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose,
  getNonSensitiveEntries
};