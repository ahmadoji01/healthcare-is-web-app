'use client';

import OrderItemList from "@/modules/orders/application/list/order-item.list";
import PaymentMethods from "../common/PaymentMethods/payment-methods";
import OrderTotals from "../common/order-totals";
import PatientOverview from "../common/patient-overview";

const OrderSummary = () => {

    return (
        <> 
            <div className="flex flex-row gap-2">
                <div className="w-full">
                    <PatientOverview />
                </div>
                <div className="w-full gap-2">
                    <OrderTotals />
                </div>
            </div>
            <div className="flex">
                <div className="w-full gap-2">
                    <PaymentMethods />
                </div>
            </div>
            <div className="mt-6 text-black dark:text-white">
                <h3 className="text-3xl font-extrabold mb-2">Order Items</h3>
                <OrderItemList />
            </div>
        </>
    );
}

export default OrderSummary;