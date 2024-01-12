'use client';

import OrderItemList from "@/modules/orders/application/list/order-item.list";
import PaymentMethods from "../common/PaymentMethods/payment-methods";
import OrderTotals from "../common/order-totals";
import PatientOverview from "../common/patient-overview";
import { useOrderSummaryModalContext } from "@/contexts/order-summary-modal-context";
import DashboardModal from "@/components/Modal/Modal";
import PatientDeleteConfirmation from "@/modules/patients/application/form/patient.delete-confirmation";

const OrderSummary = () => {

    const { deleteModalOpen, itemModalOpen, checkoutModalOpen, handleModal } = useOrderSummaryModalContext();

    return (
        <>
            <DashboardModal open={deleteModalOpen} handleClose={() => handleModal(false, false, false)} children={ <PatientDeleteConfirmation handleClose={() => handleModal(false, false, false)} /> } title="" /> 
            <DashboardModal open={itemModalOpen} handleClose={() => handleModal(false, false, false)} children={ <PatientDeleteConfirmation handleClose={() => handleModal(false, false, false)} /> } title="" /> 
            <DashboardModal open={checkoutModalOpen} handleClose={() => handleModal(false, false, false)} children={ <PatientDeleteConfirmation handleClose={() => handleModal(false, false, false)} /> } title="" /> 
            <div className="flex flex-row gap-2 mb-2">
                <div className="w-full">
                    <PatientOverview />
                </div>
                <div className="w-full gap-2">
                    <OrderTotals />
                </div>
            </div>
            <div className="mt-6 text-black dark:text-white">
                <h3 className="text-3xl font-extrabold mb-2">Order Items</h3>
                <OrderItemList />
            </div>
            <div className="flex mt-6">
                <div className="w-full gap-2">
                    <PaymentMethods />
                </div>
            </div>
        </>
    );
}

export default OrderSummary;