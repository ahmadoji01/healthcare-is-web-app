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
            <div className="mt-2 text-black dark:text-white">
                <h3 className="text-3xl font-extrabold">Order Items</h3>
            </div>
        </>
    );
}

export default OrderSummary;