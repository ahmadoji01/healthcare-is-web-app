'use client';

import { useState } from "react";
import { Patient } from "../../domain/patient";
import moment from "moment";
import SubmitButton from "@/components/Dashboard/Submit";

interface PatientFormProps {
    initPatient: Patient,
    handleSubmit: (patient:Patient) => void,
}

const PatientForm = ({ initPatient, handleSubmit }:PatientFormProps) => {
    const [patient, setPatient] = useState(initPatient);console.log(patient.birthday)

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(patient) } }>
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
                                        defaultValue={patient.name}
                                        required
                                        name="name"
                                        onChange={ e => setPatient({ ...patient, name: e.target.value })}
                                        placeholder="Input Patient's Full Name"
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
                                            name="birthday"
                                            defaultValue={moment(patient.birthday).format("YYYY-MM-DD")}
                                            onChange={ e => setPatient({ ...patient, birthday: new Date(e.target.value) })}
                                            required
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
                                            defaultValue={patient.gender}
                                            name="gender"
                                            onChange={ e => setPatient({ ...patient, gender: e.target.value })} 
                                            required 
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
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
                                            defaultValue={patient.marrital_status}
                                            name="marrital_status"
                                            onChange={ e => setPatient({ ...patient, marrital_status: e.target.value }) }
                                            required 
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="divorced">Divorced</option>
                                            <option value="widow">Widow</option>
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
                                        KK
                                    </label>
                                    <input
                                        name="family_id_number"
                                        defaultValue={patient.family_id_number? patient.family_id_number : ''}
                                        onChange={ e => setPatient({ ...patient, family_id_number: e.target.value }) }
                                        type="text"
                                        placeholder="Input Your KK"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Father's Name
                                    </label>
                                    <input
                                        name="fathers_name"
                                        defaultValue={patient.fathers_name}
                                        onChange={ e => setPatient({ ...patient, fathers_name: e.target.value }) }
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
                                        name="mothers_name"
                                        defaultValue={patient.mothers_name}
                                        onChange={ e => setPatient({ ...patient, mothers_name: e.target.value }) }
                                        type="text"
                                        placeholder="Input Your Mother's Name"
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
                                        Occupation
                                    </label>
                                    <input
                                        name="job"
                                        defaultValue={patient.job}
                                        onChange={ e => setPatient({ ...patient, job: e.target.value }) }
                                        type="text"
                                        required
                                        placeholder="Input Your Occupation"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Education
                                    </label>
                                    <div className="relative z-20 bg-white dark:bg-form-input">
                                        <select 
                                            name="education"
                                            required
                                            defaultValue={patient.education}
                                            onChange={ e => setPatient({ ...patient, education: e.target.value }) }
                                            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                                            >
                                            <option value=""></option>
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
                                        name="id_card_number"
                                        defaultValue={patient.id_card_number}
                                        type="text"
                                        onChange={ e => setPatient({ ...patient, id_card_number: e.target.value }) }
                                        required
                                        placeholder="Input Your NIK"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Address
                                    </label>
                                    <input
                                        name="address"
                                        defaultValue={patient.address}
                                        type="text"
                                        onChange={ e => setPatient({ ...patient, address: e.target.value }) }
                                        required
                                        placeholder="Input Your Address"
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

export default PatientForm;