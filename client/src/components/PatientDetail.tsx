import {useNavigate, useParams} from "react-router-dom";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useEffect, useState} from "react";
import {RouteParams} from "../models/RouteParams.ts";
import {Diagnoses, Patients} from "../Api.ts";
import {DiagnoseWithDisease, PatientWithDetails} from "../models/CompoundModels.tsx";
import {http} from "../http.ts";
import toast from "react-hot-toast";

export default function PatientDetail() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom);
    const [diseases, setDiseases] = useAtom(DiseasesAtom);
    const params = useParams();
    const navigate = useNavigate();
    const [currentPatient, setCurrentPatient] = useState<Patients>()

    useEffect(() => {
        if(patients && patients.length > 0){
            setCurrentPatient(patients.find(p => p.id == Number(params['id'])));
        }
    }, [patients]);


    if(!currentPatient){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Patient name: {currentPatient.name}</h1>
            {
                diagnoses.filter(d => d.patient_id == currentPatient?.id).map(d => {
                    const disease = diseases.find(disease => disease.id == d.disease_id);
                    return {...d, disease: disease!};
                }).map(d => {
                    return <div key={d?.id} className="card">
                        <div className="card-body bg-base-200">

                            <h2 className="card-title">Diagnose with: {d?.disease.name}</h2>
                            <h2 className="card-title">The {new Date(d?.diagnosis_date!).toLocaleDateString()}</h2>
                        </div>
                        <button className="btn btn-error" onClick={() => {
                            http.patients.patientsDelete({id: 'eq.'+currentPatient?.id}).then(() => {
                                setPatients(patients.filter(p => p.id != currentPatient.id));
                                setDiagnoses(diagnoses.filter(d => d.patient_id != currentPatient.id));
                                setDiseases(diseases.filter(d => d.id != currentPatient.id));
                                navigate('/patients');
                                toast.success("Patient " + currentPatient?.name + " has been deleted");
                            });
                        }}>Delete patient
                        </button>
                    </div>

                })
            }



        </div>
    );
}