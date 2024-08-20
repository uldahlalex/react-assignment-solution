import {apiClient} from "../apiClient.ts";
import toast from "react-hot-toast";
import React from "react";
import {useAtom} from "jotai/index";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {Patients} from "../Api.ts";
import {useNavigate} from "react-router-dom";

export default function DeletePatientFloatingActionButton({currentPatient}: { currentPatient: Patients }) {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom);
    const [diseases, setDiseases] = useAtom(DiseasesAtom);
    const navigate = useNavigate();


    return (
        <>

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
        </>
    );
}