import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { PaymentMethod } from "@/modules/payment-methods/domain/payment-method";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBank, faCreditCard, faMoneyBill, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface PaymentOptionProps {
    selected: boolean,
    method: PaymentMethod,
}

function getIcon(name:string): IconDefinition {
    if (name.toLowerCase().includes("cash")) {
        return faMoneyBill;
    }
    if (name.toLowerCase().includes("card")) {
        return faCreditCard;
    }
    if (name.toLowerCase().includes("bank")) {
        return faBank;
    }
    if (name.toLowerCase().includes("qr")) {
        return faQrcode;
    }

    return faMoneyBill;
}

const PaymentOption = ({ selected, method }:PaymentOptionProps) => {

    const { setSelectedPayment } = useOrderSummaryContext();

    return (
        <div onClick={() => setSelectedPayment(method)} className={`flex rounded-lg border ${selected ? 'border-4 border-black dark:border-white' : 'border-stroke' }
            px-2 py-6 bg-white dark:border-strokedark dark:bg-boxdark`}>
            <div className="ml-2 mr-4">
                <FontAwesomeIcon icon={getIcon(method.name)} width={32} height={32} />
            </div>
            <div className={`${!selected ? 'text-black dark:text-white font-bold' : 'text-red-100 dark:text-orange-100 font-extrabold'}`}>
                { method.name }
            </div>
        </div>
    )
}

export default PaymentOption;