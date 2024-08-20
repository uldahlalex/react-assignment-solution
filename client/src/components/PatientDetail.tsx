import {useNavigate, useParams} from "react-router-dom";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import React, {useEffect, useState} from "react";
import {RouteParams} from "../models/RouteParams.ts";
import {Diagnoses, Patients} from "../Api.ts";
import {DiagnoseWithDisease, PatientWithDetails} from "../models/CompoundModels.tsx";
import {apiClient} from "../apiClient.ts";
import toast from "react-hot-toast";

export default function PatientDetail() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom);
    const [diseases, setDiseases] = useAtom(DiseasesAtom);
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState('');
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

            <h3 className="card-title text-3xl m-5">Diseases for {currentPatient.name}:</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Disease</th>
                        <th>Diagnosis Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {diagnoses
                        .filter(d => d.patient_id == currentPatient?.id)
                        .map((d, index) => {
                            const disease = diseases.find(disease => disease.id == d.disease_id);
                            return (
                                <tr key={d.id} className={index % 2 === 0 ? "bg-base-200" : ""}>
                                    <th>{index + 1}</th>
                                    <td>{disease ? disease.name : 'Unknown'}</td>
                                    <td>{new Date(d.diagnosis_date!).toLocaleDateString()}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <h1 className="menu-title text-xl">Patient name: &nbsp;
                    {
                        isEdit ?
                            <><input  placeholder={currentPatient.name} className="input-md"
                                          value={newName}
                                          onChange={e => setNewName(e.target.value)}  />
                            <button className="btn btn-primary" onClick={() => {
                                apiClient.patients.patientsPartialUpdate({ name: newName,}, {id: 'eq.' + currentPatient.id}).then(() => {
                                    setPatients(patients.map(p => p.id == currentPatient.id ? {...p, name: newName} : p));
                                    setIsEdit(false);
                                    toast.success("Patient name updated to " + newName);
                                });
                            }}>Update!</button>
                        </> : <button onClick={() => setIsEdit(true)} className="btn text-xl">{currentPatient.name} ✍️</button>
                    }


                </h1>
            </div>


            <div className="fixed bottom-4 right-4 z-50">
                <button className="btn btn-error" onClick={() => {
                    apiClient.patients.patientsDelete({id: 'eq.' + currentPatient?.id}).then(() => {
                        setPatients(patients.filter(p => p.id != currentPatient.id));
                        setDiagnoses(diagnoses.filter(d => d.patient_id != currentPatient.id));
                        setDiseases(diseases.filter(d => d.id != currentPatient.id));
                        navigate('/patients');
                        toast.success("Patient " + currentPatient?.name + " has been deleted");
                    });
                }}>Delete patient "{currentPatient.name}"
                </button>
            </div>


        </div>
    );
}