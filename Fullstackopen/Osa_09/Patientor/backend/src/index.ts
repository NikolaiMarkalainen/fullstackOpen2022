import express from 'express';
import diagnoseRouter from './routes/diagnoseRoute'
import patientsRoute from './routes/patientsRoute'
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});