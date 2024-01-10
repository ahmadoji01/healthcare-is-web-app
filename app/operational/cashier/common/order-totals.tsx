
const OrderTotals = () => {

    return (
        <>
            <div className="rounded-sm border border-stroke p-6 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-2 text-black dark:text-white">
                    <div>Discount</div>
                    <div className="text-right font-extrabold">Rp. 170000</div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-6 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-2 text-black dark:text-white">
                    <div>Treatment & Exam</div>
                    <div className="text-right font-extrabold">Rp. 100000</div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-6 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-2 text-black dark:text-white">
                    <div>Medicines</div>
                    <div className="text-right font-extrabold">Rp. 125000</div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-6 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-2 text-black dark:text-white">
                    <div>Tax & Service Fee</div>
                    <div className="text-right font-extrabold">Rp. 15000</div>
                </div>
            </div>
            <div className="rounded-sm border border-stroke p-6 mb-1 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="grid grid-cols-2 gap-2 text-black dark:text-white">
                    <div>Total</div>
                    <div className="text-right font-extrabold">Rp. 395000</div>
                </div>
            </div>
        </>
    )

}

export default OrderTotals;