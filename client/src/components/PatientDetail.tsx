import {useNavigate, useParams} from "react-router-dom";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useEffect, useState} from "react";
import {RouteParams} from "../models/RouteParams.ts";
import {Patients} from "../Api.ts";
import {DiagnoseWithDisease, PatientWithDetails} from "../models/CompoundModels.tsx";

export default function PatientDetail() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom);
    const [disease, setDisease] = useAtom(DiseasesAtom);
    const navigate = useNavigate();
    const params = useParams();

    const [currentPatient, setCurrentPatient] = useState<PatientWithDetails>()

    useEffect(() => {
        const patientId = (params as RouteParams).id;
        const patient = patients.find((patient: Patients) => patient.id === (patientId));
        console.log(patient);
        if (patient) {
            const diagnosesForPatient = diagnoses.filter((diagnose) => diagnose.patient_id === patientId);
            const diagnosesWithDiseases = diagnosesForPatient.map((diagnose) => { return {...diagnose, disease: disease.find((disease) => disease.id === diagnose.disease_id) }}) as DiagnoseWithDisease[];
            const patientWithDetails: PatientWithDetails = {
                diagnosesWithDiseases: diagnosesWithDiseases,
                ...patient
            };
            setCurrentPatient(patientWithDetails);
            console.log(patientWithDetails);
        }
    }, []);


    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Patient Details {JSON.stringify(currentPatient!)}</h1>
        </div>
    );
}