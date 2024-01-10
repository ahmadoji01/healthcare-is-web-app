
const PhysicalCheckupForm = () => {
    return (
        <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Physical Information
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Height
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Weight
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Tension
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Respiratory Rate
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Heart Rate
                        </label>
                        <input
                            type="text"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Conditions
                        </label>
                        <div className="relative z-20 bg-white dark:bg-form-input">
                            <select className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                <option value="">Male</option>
                                <option value="">Female</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Initial Diagnosis
                        </label>
                        <input
                            type="textarea"
                            placeholder="Input Your Full Name"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhysicalCheckupForm;