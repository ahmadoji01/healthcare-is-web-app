import { useOrderSummaryModalContext } from "@/contexts/order-summary-modal-context";
import Image from "next/image";

interface PaymentProps {
    payment: string,
}

const Payment = () => {

    const { selectedPayment } = useOrderSummaryModalContext();

    return (
        <>
            <h4>Selected Payment Method: {selectedPayment?.name}</h4>
            <Image src="/qrcode.svg" alt="qrcode" width={256} height={256} />
        </>
    )

}

export default Payment;