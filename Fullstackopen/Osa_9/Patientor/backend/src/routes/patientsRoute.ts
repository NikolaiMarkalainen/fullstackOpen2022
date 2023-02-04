import express from 'express';
import patientsService from '../controllers/patientsService';

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
    const { name, ssn, dateOfBirth, occupation, gender} = req.body;
    const newPatient = patientsService.addPatient({
        name,
        ssn,
        dateOfBirth,
        occupation,
        gender,
    });
    res.json(newPatient);
    console.log(newPatient)
})
export default router;