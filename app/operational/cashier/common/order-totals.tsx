import Currency from "@/components/Currency";
import { TAX_RATE } from "@/config/tax";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useEffect, useState } from "react";

const OrderTotals = () => {

    const { selectedOrder, total, setTotal } = useOrderSummaryContext();
    const [treatmentFee, setTreatmentFee] = useState<number>(0);
    const [medicineFee, setMedicineFee] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    useEffect( () => {
        if (typeof(selectedOrder) !== 'undefined') {
            let treatFee = 0, medFee = 0;
            selectedOrder.orderItems.map( (item) => 
            {
                console.log(item); 
                if (item.medication !== null) {
                    medFee += item.medication.medicine.price * item.quantity;
                    return; 
                }
                if (item.treatment !== null) {
                    treatFee += item.treatment.price;
                    return;
                }
            });
            setTreatmentFee(treatFee);
            setMedicineFee(medFee);
        }
        setTax((treatmentFee + medicineFee - discount) * TAX_RATE);
        setTotal(treatmentFee + medicineFee + tax - discount);   
    })

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Treatment & Exam</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={treatmentFee} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Medicines</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={medicineFee} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Subtotal</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={treatmentFee + medicineFee} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Discount/Insurance</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={discount} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Tax & Service Fee</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={tax} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Total</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={total} /></div>
                </div>
            </div>
        </div>
    )

}

export default OrderTotals;