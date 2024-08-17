import {useAtom} from "jotai/index";
import {Diagnoses, Diseases, Patients} from "../Api.ts";
import {useEffect} from "react";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {PatientsAtom} from "../atoms/PatientsAtom.tsx";
import {DiagnosesAtom} from "../atoms/DiagnosesAtom.tsx";
import {DiseasesAtom} from "../atoms/DiseasesAtom.tsx";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";

export default function useInitializeData() {
    const [patients, setPatients] = useAtom<Patients[]>(PatientsAtom);
    const [diagnoses, setDiagnoses] = useAtom<Diagnoses[]>(DiagnosesAtom);
    const [disease, setDisease] = useAtom<Diseases[]>(DiseasesAtom);
    const [theme, setTheme] = useAtom(ThemeAtom);

    useEffect(() => {
        http.patients.patientsList().then((result: AxiosResponse<Patients[]>) => {
            setPatients(result.data);
        })
        http.diagnoses.diagnosesList().then((result: AxiosResponse<Diagnoses[]>) => {
            setDiagnoses(result.data);
        });
        http.diseases.diseasesList().then((result: AxiosResponse<Diseases[]>) => {
            setDisease(result.data);
        });


    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

}