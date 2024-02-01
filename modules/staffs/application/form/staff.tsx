'use client';

const StaffForm = () => {

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Personal Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your Full Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Birthday
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Gender
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
                                    Marrital Status
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value="">Single</option>
                                        <option value="">Married</option>
                                        <option value="">Divorce</option>
                                        <option value="">Widow</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Toggle switch input --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Family Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Father's Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your Father's Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Mother's Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your Mother's Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Professional Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your Occupation"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Education
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select className="elative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                        <option value="">Uneducated</option>
                                        <option value="">SD</option>
                                        <option value="">SMP</option>
                                        <option value="">SMA</option>
                                        <option value="">S1</option>
                                        <option value="">S2</option>
                                        <option value="">S3</option>
                                        <option value="">Postdoctorate</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Resident Information
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    NIK
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your NIK"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Your Occupation"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StaffForm;