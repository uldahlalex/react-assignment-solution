import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useNavigate} from "react-router-dom";
import EnrollPatientModal, {EnrollPatientModalAtom} from "./EnrollPatientModalAtom.tsx";
import React from "react";

export default function PatientsList() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [modalController, setModalController] = useAtom(EnrollPatientModalAtom);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-between">
            <div>
                {patients.map((patient) => {
                    return <div key={patient.id} className="card bg-base-100 w-1/2 shadow-xl m-10">
                        <div className="card-body"><h2 className="card-title">{patient.name}</h2>

                            <div className="card-actions flex justify-end">

                                <button onClick={() => navigate('/patients/' + patient.id)}
                                        className="btn btn-secondary">See details for {patient.name}
                                </button>
                            </div>
                        </div>
                    </div>

                })}
            </div>
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => {
                        setModalController({modalOpen: true});
                        console.log(modalController.modalOpen);
                    }}
                    className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
            </div>
            <EnrollPatientModal/>

        </div>
    )
}