import {atom} from "jotai";
import {Diagnoses} from "../Api.ts";

export const DiagnosesAtom = atom<Diagnoses[]>([]);