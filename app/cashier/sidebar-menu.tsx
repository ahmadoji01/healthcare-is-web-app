import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useTranslation } from "react-i18next";
import { Order, OrderCreator, defaultOrder, orderCreatorMapper } from "@/modules/orders/domain/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DashboardModal from "@/components/Modal/Modal";
import CashierPatientSearch from "./common/cashier-patient-search";
import { Patient, defaultPatient, patientMapper, patientNoIDMapper } from "@/modules/patients/domain/patient";
import { createAPatient, getPatientsWithFilter, searchPatients } from "@/modules/patients/domain/patients.actions";
import { useUserContext } from "@/contexts/user-context";
import { nameFilter } from "@/modules/patients/domain/patient.specifications";
import { useAlertContext } from "@/contexts/alert-context";
import { ALERT_MESSAGE } from "@/constants/alert";
import { createAnOrder } from "@/modules/orders/domain/order.actions";
import { defaultVisit } from "@/modules/visits/domain/visit";
import { ORDER_STATUS } from "@/modules/orders/domain/order.constants";
import { useRouter } from "next/navigation";

interface SidebarItemProps {
    sidebarExpanded: Boolean,
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>,
}

const SidebarMenu = ({ sidebarExpanded, setSidebarExpanded }: SidebarItemProps) => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [openAddOrderModal, setOpenAddOrderModal] = useState(false);
    const [patient, setPatient] = useState(defaultPatient);
    
    const { orders, selectedOrder, setSelectedOrder, loadAnOrder } = useOrderSummaryContext();
    const {accessToken, organization} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const {t} = useTranslation();
    const router = useRouter();

    useEffect( () => {
        setOrderList(orders);
    }, [orders]);

    const handleSubmit = async (patient:Patient) => {
        let pat:Patient = defaultPatient;
        let isError = false;

        if (patient.name === "Guest") {
            await getPatientsWithFilter(accessToken, nameFilter("Guest"))
                .then( res => {
                    if (res.length > 0)
                        pat = patientMapper(res[0]);
                })
                .catch( () => { isError = true; });
            if (pat.id === 0) {
                pat.name = "Guest";
                pat.fathers_name = "Guest";
                pat.mothers_name = "Guest";
                pat.family_id_number = "123456";
                pat.id_card_number = "123456";
                let createPatient = patientNoIDMapper(pat, organization.id);
                await createAPatient(accessToken, createPatient)
                    .then( res => {
                        pat = patientMapper(res);
                    })
                    .catch( () => { isError = true; });
            }
        } else {
            pat = patient;
        }

        if (isError) {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
            return;
        }

        let order = defaultOrder;
        order.visit = defaultVisit;
        order.patient = pat;
        order.order_items = [];
        order.status = ORDER_STATUS.waiting_to_pay;
        order.total = 0;
        order.doctor_paid = "Unpaid";
        let orderCreator = orderCreatorMapper(order, null, organization.id);
        createAnOrder(accessToken, orderCreator)
            .then( () => {
                openSnackbarNotification(ALERT_MESSAGE.success, "success");
                window.location.reload();
            }).catch( () => {
                isError = true;
            })
        
        if (isError) {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
            return;
        }
    }

    return (
        <>
            <DashboardModal open={openAddOrderModal} handleClose={() => setOpenAddOrderModal(false)} children={ <CashierPatientSearch handleSubmit={handleSubmit} /> } title="" /> 
            <div>
                <button 
                    onClick={() => setOpenAddOrderModal(true)} 
                    className="block w-full mb-6 rounded bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                    <span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span> {t('cashier.add_order')}
                </button>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    { t('patients_on_queue') }
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                    { orderList?.map((order, key) => (
                        <li>
                            <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                    (order.id === selectedOrder?.id) &&
                                    "bg-graydark dark:bg-meta-4"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    sidebarExpanded
                                    ? loadAnOrder(order)
                                    : setSidebarExpanded(true);
                                }}
                                >
                                { order.patient?.name }
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default SidebarMenu;