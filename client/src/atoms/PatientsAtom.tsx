import {Patients} from "../Api.ts";
import {atom} from "jotai";

export const PatientsAtom = atom<Patients[]>([]);