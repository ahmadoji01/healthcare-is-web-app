import Currency from "@/components/Currency";
import { TAX_RATE } from "@/config/tax";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { useUserContext } from "@/contexts/user-context";
import { isMedicine, isTreatment } from "@/modules/categories/domain/category.specifications";
import { ORDER_ITEM_TYPE } from "@/modules/orders/domain/order.constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const OrderTotals = () => {

    const { selectedOrder, total, setTotal, examFee } = useOrderSummaryContext();
    const { organization } = useUserContext();
    const { t } = useTranslation();
    const [treatmentFee, setTreatmentFee] = useState<number>(0);
    const [medicineFee, setMedicineFee] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    useEffect( () => {
        if (typeof(selectedOrder) !== 'undefined') {
            let treatFee = 0, medFee = 0;
            selectedOrder.order_items.map( (item) => 
            {
                if (item.type === ORDER_ITEM_TYPE.medicine) {
                    medFee += item.item.price * item.quantity;
                    return; 
                }
                if (item.type === ORDER_ITEM_TYPE.treatment) {
                    treatFee += item.item.price;
                    return;
                }
            });
            setTreatmentFee(treatFee);
            setMedicineFee(medFee);
        }
        let taxRate = organization.tax_rate? (organization.tax_rate/100) : TAX_RATE;
        setTax((examFee + treatmentFee + medicineFee - discount) * taxRate);
        setTotal(examFee + treatmentFee + medicineFee + tax - discount);   
    })

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>{ t("cashier.treatment_exam") }</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={treatmentFee + examFee} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>{ t("medicines") }</div>
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
                    <div>{ t("cashier.discount") }</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={discount} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>{ t("tax") }</div>
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