import {atom, useAtom} from "jotai";
import {useState} from "react";
import {apiClient} from "../apiClient.ts";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {AxiosResponse} from "axios";
import {Patients} from "../Api.ts";

export interface ModalControllerForm {
    modalOpen: boolean;
}
export const EnrollPatientModalAtom = atom<ModalControllerForm>({modalOpen: false});


export default function EnrollPatientModal() {

    const [modalController, setModalController] = useAtom(EnrollPatientModalAtom);
    const [patients, setPatients] = useAtom(PatientsAtom);
    const [newPatient, setNewPatient] = useState("");

    if(!modalController.modalOpen) return null;

    return <div className="modal modal-open">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm?</h3>
            <input value={newPatient} onChange={e => setNewPatient(e.target.value)} placeholder="New patient name" />
            <div className="modal-action">
                <button className="btn btn-outline" onClick={() => {
                    const closed = {...modalController, modalOpen: false};
                    setModalController(closed);
                }}>Cancel
                </button>
                <button className="btn btn-primary" onClick={() => {
                    apiClient.patients.patientsCreate({name: newPatient}).then((result) => {
                        setNewPatient("");
                        setPatients([...patients, result.data[0]]);
                    })
                    const closed = {...modalController, modalOpen: false};
                    setModalController(closed);

                }}>Confirm and close
                </button>
            </div>
        </div>
    </div>
}