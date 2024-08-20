import {Diagnoses, Patients} from "../Api.ts";
import {useAtom} from "jotai";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useState} from "react";

export default function NewDiagnosisForPatient({currentPatient}: {currentPatient: Patients}) {

    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom)
    const [diseases, setDiseases] = useAtom(DiseasesAtom)
    const [, setPatients] = useAtom(PatientsAtom)
    const [diseaseId, setDiseaseId] = useState<number>(diseases[0].id || 0)

    return (<>

        <select value={diseaseId}
         onChange={e => {
             setDiseaseId(Number(e.target.value))}}
        >
            {diseases.map(disease => <option value={disease.id} key={disease.id}>{disease.name}</option>)}
        </select>
        <div>{JSON.stringify(diseases.find(d => d.id == diseaseId))}</div>
    </>)
}
