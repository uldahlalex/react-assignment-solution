import {useParams} from "react-router-dom";
import {DiseasesAtom} from "../../../atoms/DiseasesAtom.tsx";
import {DiagnosesAtom} from "../../../atoms/DiagnosesAtom.tsx";
import {useAtom} from "jotai";
import {PatientsAtom} from "../../../atoms/PatientsAtom.tsx";
import React, {useEffect, useState} from "react";
import {Patients} from "../../../Api.ts";
import UpdatePatientName from "./UpdatePatientName.tsx";
import DeletePatientFloatingActionButton from "../../DeletePatientFloatingActionButton.tsx";
import NewDiagnosisForPatient from "./NewDiagnosisForPatient.tsx";

export default function PatientDetail() {

    const [patients] = useAtom(PatientsAtom);
    const [diagnoses] = useAtom(DiagnosesAtom);
    const [diseases] = useAtom(DiseasesAtom);
    const params = useParams();
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
            </div>
            <UpdatePatientName currentPatient={currentPatient} />
            <NewDiagnosisForPatient currentPatient={currentPatient} />
            <DeletePatientFloatingActionButton currentPatient={currentPatient} />
        </div>
    );
}