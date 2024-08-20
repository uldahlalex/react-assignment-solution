import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Home from "./Home.tsx";
import {DevTools} from "jotai-devtools";
import Navigation from "./Navigation.tsx";
import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import useInitializeData from "./useInitializeData.ts";
import PatientsList from "./Patients/PatientsList.tsx";
import PatientDetail from "./Patients/PatientDetail/PatientDetail.tsx";


const App = () => {

    useInitializeData();

    return (<div >

            <Navigation />
            <Toaster/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/patients" element={<PatientsList/>}/>
                <Route path="/patients/:id" element={<PatientDetail/>}/>
            </Routes>
            <DevTools />

    </div>)
}
export default App;