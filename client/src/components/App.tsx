import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import Home from "./Home.tsx";
import {DevTools} from "jotai-devtools";
import Navigation from "./Navigation.tsx";
import {useAtom} from "jotai";
import {ThemeAtom} from "../atoms/ThemeAtom.tsx";
import useInitializeData from "./useInitializeData.ts";


const App = () => {

    useInitializeData();

    return (<>

            <Navigation />
            <Toaster/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <DevTools />

    </>)
}
export default App;