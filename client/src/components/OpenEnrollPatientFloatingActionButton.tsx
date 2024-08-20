import {useAtom} from "jotai/index";
import {EnrollPatientModalAtom} from "./EnrollPatientModalAtom.tsx";
import React from "react";

export default function OpenEnrollPatientFloatingActionButton() {

    const [modalController, setModalController] = useAtom(EnrollPatientModalAtom);

    return (<>
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => {
                    setModalController({modalOpen: true});
                    console.log(modalController.modalOpen);
                }}
                className="btn btn-circle btn-primary shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
            </button>
        </div>
    </>)
}