'use client';

import { Dispatch, SetStateAction, useState } from "react";
import { Staff } from "../../domain/staff";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";

interface StaffAccountFormProps {
    staff: Staff,
    setStaff: Dispatch<SetStateAction<Staff>>,
}

const StaffAccountForm = ({ staff, setStaff }:StaffAccountFormProps) => {

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
                                    defaultValue={staff.name}
                                    required
                                    onChange={ e => setStaff({ ...staff, name: e.target.value })}
                                    placeholder="Input Staff's Full Name"
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
                                        defaultValue={moment(staff.birthday).format("l")}
                                        onChange={ e => setStaff({ ...staff, birthday: new Date(e.target.value) })}
                                        required
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Marrital Status
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select 
                                        defaultValue={staff.marrital_status}
                                        onChange={ e => setStaff({ ...staff, marrital_status: e.target.value }) }
                                        required 
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        >
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                        <option value="divorced">Divorced</option>
                                        <option value="widow">Widow</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Education
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <select 
                                        defaultValue={staff.education}
                                        onChange={ e => setStaff({ ...staff, education: e.target.value }) }
                                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                        >
                                        <option value="uneducated">Uneducated</option>
                                        <option value="elementary">SD</option>
                                        <option value="junior_secondary">SMP</option>
                                        <option value="senior_secondary">SMA</option>
                                        <option value="associate">D3/equivalent</option>
                                        <option value="bachelor">S1</option>
                                        <option value="master">S2</option>
                                        <option value="doctorate">S3</option>
                                        <option value="postdoctorate">Postdoctorate</option>
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
                                    defaultValue={staff.id_card_number}
                                    onChange={ e => setStaff({ ...staff, id_card_number: e.target.value }) }
                                    type="text"
                                    placeholder="Input Your ID Card Number"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    KK
                                </label>
                                <input
                                    defaultValue={staff.family_id_number}
                                    onChange={ e => setStaff({ ...staff, family_id_number: e.target.value }) }
                                    type="text"
                                    placeholder="Input Your KK"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Address
                                </label>
                                <input
                                    defaultValue={staff.address}
                                    onChange={ e => setStaff({ ...staff, address: e.target.value }) }
                                    type="text"
                                    placeholder="Input Address"
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

export default StaffAccountForm;