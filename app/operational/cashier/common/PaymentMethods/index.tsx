import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PaymentOption from "../payment-option";
import { PaymentMethod } from "@/modules/payment-methods/domain/payment-method";
import { paymentMethodsFakeData } from "@/modules/payment-methods/infrastructure/payment-methods.fakes";
import { useOrderSummaryModalContext } from "@/contexts/order-summary-modal-context";

const PaymentMethods = () => {

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const { selectedPayment, setSelectedPayment } = useOrderSummaryModalContext();

    useEffect( () => {
        setPaymentMethods(paymentMethodsFakeData);
    })

    return (
        <div className="rounded-sm border border-stroke p-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-xl font-extrabold text-black dark:text-white">Payment</h4>
            <div className="mt-5 grid grid-cols-3 gap-2">
                { paymentMethods.map( (method, key) => 
                    <PaymentOption
                        method={method}
                        selected={method.id === selectedPayment?.id} />
                )}
            </div>
        </div>
    );
        
}

export default PaymentMethods;