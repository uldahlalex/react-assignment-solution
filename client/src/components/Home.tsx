import React, {useEffect, useState} from "react";
import {http} from "../http.ts";
import {AxiosResponse} from "axios";
import {Patients} from "../Api.ts";
import {useAtom} from "jotai";
import toast from "react-hot-toast";


export default function Home() {


    useEffect(() => {
        toast('Welcome to the Hospital App', {position: 'bottom-center'});
    }, []);

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">The Hospital App</h1>

        </div>
    );
}