import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faBank, faCreditCard, faMoneyBill, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface PaymentOptionProps {
    id: number,
    name: string,
    selected: boolean,
    setSelectedOptionId: Dispatch<SetStateAction<number>>,
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

const PaymentOption = ({ id, name, selected, setSelectedOptionId }:PaymentOptionProps) => {

    return (
        <div onClick={() => setSelectedOptionId(id)} className={`flex rounded-lg border ${selected ? 'border-4 border-black dark:border-white' : 'border-stroke' }
            px-2 py-6 bg-white dark:border-strokedark dark:bg-boxdark`}>
            <div className="ml-2 mr-4">
                <FontAwesomeIcon icon={getIcon(name)} width={32} height={32} />
            </div>
            <div className="text-black dark:text-white font-bold">
                { name }
            </div>
        </div>
    )
}

export default PaymentOption;