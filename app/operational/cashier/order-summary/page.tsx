import OrderTotals from "../common/order-totals";
import PatientOverview from "../common/patient-overview";

const OrderSummary = () => {

    return ( 
        <div className="flex flex-row gap-2">
            <div className="w-full">
                <PatientOverview />
            </div>
            <div className="w-full gap-2">
                <OrderTotals />
            </div>
        </div>
    );
}

export default OrderSummary;