import Currency from "@/components/Currency";

const OrderTotals = () => {

    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Treatment & Exam</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={100000} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Medicines</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={125000} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Subtotal</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={15000} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Discount/Insurance</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={170000} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Tax & Service Fee</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={15000} /></div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-4 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-row-2 text-black dark:text-white">
                    <div>Total</div>
                    <div className="text-left text-xl font-extrabold"><Currency value={395000} /></div>
                </div>
            </div>
        </div>
    )

}

export default OrderTotals;