import { useEffect, useState } from "react";
import PaymentOption from "../payment-option";
import { PaymentMethod } from "@/modules/payment-methods/domain/payment-method";
import { paymentMethodsFakeData } from "@/modules/payment-methods/infrastructure/payment-methods.fakes";

const PaymentMethods = () => {

    const [selectedOptionId, setSelectedOptionId] = useState<number>(0);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

    useEffect( () => {
        setPaymentMethods(paymentMethodsFakeData);
    })

    return (
        <div className="rounded-sm border border-stroke p-6 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-xl font-extrabold text-black dark:text-white">Payment</h4>
            <div className="mt-5 grid grid-cols-3 gap-2">
                { paymentMethods.map( (method, key) => 
                    <PaymentOption
                        id={method.id} 
                        name={method.name} 
                        setSelectedOptionId={setSelectedOptionId}
                        selected={method.id === selectedOptionId} />
                )}
            </div>
        </div>
    );
        
}

export default PaymentMethods;