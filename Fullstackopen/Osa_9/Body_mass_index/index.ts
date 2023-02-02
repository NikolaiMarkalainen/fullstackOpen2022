import express from 'express'
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    console.log(height, weight);
    console.log(req.query.height);
    res.send(calculateBmi(height, weight));
}) 
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})