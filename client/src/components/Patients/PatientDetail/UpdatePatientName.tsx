import {apiClient} from "../../../apiClient.ts";
import toast from "react-hot-toast";
import React, {useState} from "react";
import {useAtom} from "jotai";
import {PatientsAtom} from "../../../atoms/PatientsAtom.tsx";
import {Patients} from "../../../Api.ts";

export default function UpdatePatientName({currentPatient}: {currentPatient: Patients}) {

    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState('');
    const [patients, setPatients] = useAtom(PatientsAtom);

    return(<>

        <h1 className="menu-title text-xl">Patient name: &nbsp;
            {
                isEdit ?
                    <><input placeholder={currentPatient.name} className="input-md"
                             value={newName}
                             onChange={e => setNewName(e.target.value)}/>
                        <button className="btn btn-primary" onClick={() => {
                            apiClient.patients.patientsPartialUpdate({name: newName,}, {id: 'eq.' + currentPatient.id}).then(() => {
                                setPatients(patients.map(p => p.id == currentPatient.id ? {...p, name: newName} : p));
                                setIsEdit(false);
                                toast.success("Patient name updated to " + newName);
                            });
                        }}>Update!
                        </button>
                    </> :
                    <button onClick={() => setIsEdit(true)} className="btn text-xl">{currentPatient.name} ✍️</button>
            }


        </h1> </>)

}