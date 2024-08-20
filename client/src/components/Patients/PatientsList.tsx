import {useAtom} from "jotai";
import {PatientsAtom} from "../../atoms/PatientsAtom.tsx";
import {useNavigate} from "react-router-dom";
import EnrollPatientModal, {EnrollPatientModalAtom} from "../EnrollPatientModalAtom.tsx";
import React from "react";
import OpenEnrollPatientFloatingActionButton from "./OpenEnrollPatientFloatingActionButton.tsx";

export default function PatientsList() {

    const [patients] = useAtom(PatientsAtom);
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
            <OpenEnrollPatientFloatingActionButton/>
            <EnrollPatientModal />

        </div>
    )
}