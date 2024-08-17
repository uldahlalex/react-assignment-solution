import {useNavigate, useParams} from "react-router-dom";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {useAtom} from "jotai";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {useEffect} from "react";
import {RouteParams} from "../models/RouteParams.ts";

export default function PatientDetail() {

    const [patients, setPatients] = useAtom(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom(DiagnosesAtom);
    const [disease, setDisease] = useAtom(DiseasesAtom);
    const navigate = useNavigate();

    let patient;

    useEffect(() => {

    }, []);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Patient Details for {}</h1>
        </div>
    );
}