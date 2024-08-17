import {Diseases} from "../Api.ts";
import {atom} from "jotai";

export const DiseasesAtom = atom<Diseases[]>([]);