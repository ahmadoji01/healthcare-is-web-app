import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import moment from 'moment';
import PatientAvatar from "./patient-avatar";
import { useEffect } from "react";


const PatientOverview = () => {

    const { selectedPatient, setSelectedPatient } = useOrderSummaryContext();
    let age = 0;

    useEffect( () => {
        if (typeof(selectedPatient) !== 'undefined') {
            age = moment().diff(selectedPatient.birthday, 'years');
        }
    })

    return (
        <div className="rounded-sm border border-stroke p-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="grid grid-cols-2">
                <div>
                    <div className="w-full flex align-center justify-center mb-4">
                        <PatientAvatar name={selectedPatient ? selectedPatient.name : "Jedi Force" } />
                    </div>
                    <h2 className="text-3xl text-center font-extrabold text-black dark:text-white mb-2">{selectedPatient ? selectedPatient.name : "Jedi Force" }</h2>
                </div>
                <div className="grid gap-1 px-1 md:px-2 lg:px-3">
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Age</div>
                        <div className="text-left font-extrabold">{ selectedPatient ? moment().diff(selectedPatient.birthday, 'years') : 0} y/o</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Rep.</div>
                        <div className="text-left font-extrabold">Mr. Shane Fillan</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Treated by</div>
                        <div className="text-left font-extrabold">dr. Tika Panggabean</div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-black dark:text-white">
                        <div>Visit</div>
                        <div className="text-left font-extrabold">#12</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientOverview;