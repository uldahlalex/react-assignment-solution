import {Diagnoses, Patients} from "../../../Api.ts";
import {useAtom} from "jotai";
import {DiagnosesAtom} from "../../../atoms/DiagnosesAtom.tsx";
import {DiseasesAtom} from "../../../atoms/DiseasesAtom.tsx";
import {PatientsAtom} from "../../../atoms/PatientsAtom.tsx";
import {useState} from "react";

export default function NewDiagnosisForPatient({currentPatient}: {currentPatient: Patients}) {

    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom)
    const [diseases, setDiseases] = useAtom(DiseasesAtom)
    const [, setPatients] = useAtom(PatientsAtom)
    const [diseaseId, setDiseaseId] = useState<number>(diseases[0].id || 0)

    function diagnose(patient: Patients, diseaseId: number, date: Date) {

    }

    return (<>

        <select className="input w-36 mr-1" value={diseaseId}
         onChange={e => {
             setDiseaseId(Number(e.target.value))}}
        >
            {diseases.map(disease => <option value={disease.id} key={disease.id}>{disease.name}</option>)}
        </select>
        <button onClick={() => diagnose(currentPatient, diseaseId, new Date())} className="btn btn-primary">
            Diagnose {currentPatient.name} with {diseases.find(d => d.id == diseaseId)?.name} at {new Date().toDateString()}
        </button>
    </>)
}
