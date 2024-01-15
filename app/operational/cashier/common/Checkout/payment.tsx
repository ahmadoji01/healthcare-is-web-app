import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import PaymentProvider from "@/modules/payment-methods/application/payment-provider";
import Image from "next/image";

interface PaymentProps {
    confirmPayment: () => void,
}

const Payment = () => {

    const { selectedPayment, total } = useOrderSummaryContext();


    return (
        <>
            <h4 className="text-black dark:text-white font-extrabold text-center text-2xl mb-4">Pay by {selectedPayment?.name}</h4>
            { selectedPayment && <PaymentProvider name={selectedPayment.name} total={total} /> }
        </>
    )

}

export default Payment;