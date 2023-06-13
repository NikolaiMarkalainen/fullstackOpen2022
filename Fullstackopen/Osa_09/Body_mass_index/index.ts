import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculate } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.log(height, weight);
    console.log(req.query.height);
    res.send(calculateBmi(height, weight));
}); 

app.post('/calculate', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { days, target } = req.body;

    if( !target || !days ){
       return res.status(400).send({ error: ' parameters missing '});
    }
    if (isNaN(Number(target))){
        return res.status(400).send({ error: ' malformatted parameters '});
    }
    const numberArray: Array<number> = [];
    for(let i = 0; i < days.length; i++){
        if(!isNaN(Number(days[i]))) {
            numberArray.push(Number(days[i]));
        }
        else{
            return res.status(400).send({ error: ' malformatted parameters '});
        }
    }
    const result = calculate(numberArray, Number(target));
    res.send(result);
    return result;
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});