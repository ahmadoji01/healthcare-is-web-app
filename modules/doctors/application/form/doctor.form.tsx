'use client';

import { useState } from "react";
import { Doctor } from "../../domain/doctor";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";

interface DoctorFormProps {
    initDoctor: Doctor,
    handleSubmit: (doctor:Doctor) => void,
}

const DoctorForm = ({ initDoctor, handleSubmit }:DoctorFormProps) => {
    const [doctor, setDoctor] = useState(initDoctor);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(doctor) } }>
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
                                        defaultValue={doctor.name}
                                        required
                                        onChange={ e => setDoctor({ ...doctor, name: e.target.value })}
                                        placeholder="Input Doctor's Full Name"
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
                                            defaultValue={moment(doctor.birthday).format('YYYY-MM-DD')}
                                            required
                                            onChange={ e => setDoctor({ ...doctor, birthday: new Date(e.target.value) })}
                                            className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                            />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Gender
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            defaultValue={doctor.gender}
                                            required
                                            onChange={ e => setDoctor({ ...doctor, gender: e.target.value })}    
                                            className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Marrital Status
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select
                                            defaultValue={doctor.marrital_status}
                                            required
                                            onChange={ e => setDoctor({ ...doctor, marrital_status: e.target.value })}     
                                            className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="widow">Widow</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={doctor.address}
                                        onChange={ e => setDoctor({ ...doctor, address: e.target.value }) }
                                        required
                                        placeholder="Input Doctor's Address"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Professional Information
                                </h3>
                            </div>
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        License Number
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={doctor.license_number}
                                        onChange={ e => setDoctor({ ...doctor, license_number: e.target.value }) }
                                        required
                                        placeholder="Input Doctor's License Number"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Education
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select
                                            defaultValue={doctor.education}
                                            required
                                            onChange={ e => setDoctor({ ...doctor, education: e.target.value })}     
                                            className="celative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
                                            <option value="general">General Practitioner</option>
                                            <option value="specialist">Specialist</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Specialization
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={doctor.specialization}
                                        onChange={ e => setDoctor({ ...doctor, specialization: e.target.value }) }
                                        required
                                        placeholder="Input Doctor's Specialization"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </>
    )
}

export default DoctorForm;