import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import moment from 'moment';
import PatientAvatar from "./patient-avatar";
import { useEffect, useState } from "react";
import { Patient } from "@/modules/patients/domain/patient";
import { Order } from "@/modules/orders/domain/order";
import { DoctorName } from "@/modules/doctors/domain/doctor.specifications";


const PatientOverview = () => {

    const { selectedOrder } = useOrderSummaryContext();
    const [patient, setPatient] = useState<Patient>();
    const [order, setOrder] = useState<Order>();

    useEffect( () => {
        if (typeof(selectedOrder) !== 'undefined') {
            setPatient(selectedOrder.patient);
            setOrder(selectedOrder);
        }
    }, [patient]);

    return (
        <div className="rounded-sm border border-stroke p-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-rows">
                <div>
                    <div className="w-full flex align-center justify-center mb-4">
                        <PatientAvatar name={patient ? patient.name : "Jedi Force" } />
                    </div>
                    <h2 className="text-3xl text-center font-extrabold text-black dark:text-white mb-2">{patient ? patient.name : "Jedi Force" }</h2>
                </div>
                <div className="items-center justify-center grid px-1 md:px-2 lg:px-3">
                    <div className="grid grid-cols-2 text-black dark:text-white">
                        <div>Visit Number</div>
                        <div className="text-left font-extrabold">#12</div>
                    </div>
                    <div className="grid grid-cols-2 text-black dark:text-white">
                        <div>Treated by</div>
                        <div className="text-left font-extrabold">{ order ? DoctorName(order.visit.doctor.name, order.visit.doctor.specialization) : "" }</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientOverview;