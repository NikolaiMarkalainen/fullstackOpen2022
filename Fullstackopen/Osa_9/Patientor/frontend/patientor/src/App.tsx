import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";
import { apiBaseUrl } from "./constants";
import { useStateValue, usePatientList} from "./state";
import { Patient } from "./types";
import PatientListPage from "./PatientListPage/PatientList";
import { Typography } from "@material-ui/core";
import SinglePatient from "./components/SinglePatient";

const App = () => {
  const [{ patients }, dispatch] = useStateValue();
  const {setPatientList} = usePatientList();

  const patientMatch = useMatch('/patients/:id');
  const foundPatient = patientMatch
  ? Object.values(patients).find(patient => patient.id === patientMatch.params.id)
  : null;
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<SinglePatient patient= {foundPatient}/>} />
          </Routes>
        </Container>
    </div>
  );
};

const AppWraper = () => {
  return(
    <Router>
      <App />
    </Router>
  );
};

export default AppWraper;

