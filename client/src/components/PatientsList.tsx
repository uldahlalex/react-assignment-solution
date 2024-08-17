import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useNavigate} from "react-router-dom";

export default function PatientsList() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const navigate = useNavigate();

    return(<>
        <h1>Patients</h1>
        <ul>
            {patients.map((patient) => {
                return <>
                    <div className="card">
                    {/*    DaisyUI card for patient*/}
                        <div className="card-body bg-base-200">
                            <h2 className="card-title">{patient.name}</h2>
                            <button onClick={() => navigate('/patients/'+patient.id)} className="btn btn-primary">See details</button>
                        </div>
                    </div>
                </>
            })}
        </ul>
    </>)
}