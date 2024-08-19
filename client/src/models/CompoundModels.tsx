import {Diagnoses, Diseases, Patients} from "../Api.ts";

export interface PatientWithDetails extends Patients {
    diagnosesWithDiseases: DiagnoseWithDisease[];
}
export interface DiagnoseWithDisease extends Diagnoses {
    disease: Diseases;
}