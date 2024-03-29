import express from 'express';
import patientsService from '../controllers/patientsService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);
    
    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
})

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatientEntry(req.body);
        const addedEntry = patientsService.addPatient(newPatient);
        res.json(addedEntry)
    }catch (error: unknown) {
        let errorMessage =  'Something went wrong';
        if( error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
})
export default router;