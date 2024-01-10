import OrderDetails from "../common/order-details";
import PatientOverview from "../common/patient-overview";

const OrderSummary = () => {

    return ( 
        <div className="flex flex-row gap-2">
            <div className="w-full">
                <PatientOverview />
            </div>
            <div className="w-full">
                <OrderDetails />
            </div>
        </div>
    );
}

export default OrderSummary;