import SubmitButton from "@/components/Dashboard/Submit";
import { PhysicalCheckup } from "../../domain/physical-checkup";
import { useEffect, useState } from "react";
import { Patient } from "@/modules/patients/domain/patient";

interface PhysicalCheckupFormProps {
    patient: Patient,
    initCheckup: PhysicalCheckup,
    handleSubmit: (checkup:PhysicalCheckup) => void,
}

const PhysicalCheckupForm = ({ patient, initCheckup, handleSubmit }:PhysicalCheckupFormProps) => {
    const [checkup, setCheckup] = useState(initCheckup);

    useEffect( () => {
        setCheckup({ ...checkup, patient })
    }, [patient])

    return (
        <div className="flex flex-col gap-9">
            <form onSubmit={e => { e.preventDefault(); handleSubmit(checkup) } }>
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
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.height}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, height: e.target.valueAsNumber })}
                                    placeholder="Input the Height"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="w-11/12 py-3 px-3">Cms</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Weight
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.weight}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, weight: e.target.valueAsNumber })}
                                    placeholder="Input the Weight"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="w-11/12 py-3 px-3">Kgs</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Tension
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    defaultValue={checkup.tension}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, tension: e.target.value })}
                                    pattern="[0-9/]*"
                                    placeholder="Input Tension"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="w-11/12 py-3 px-3">mmHg</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Respiratory Rate
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.breath_rate}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, breath_rate: e.target.valueAsNumber })}
                                    placeholder="Input Your Full Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="w-11/12 py-3 px-3">bpm</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Heart Rate
                            </label>
                            <div className="flex flex-row">
                                <input
                                    type="number"
                                    defaultValue={checkup.heart_rate}
                                    required
                                    onChange={ e => setCheckup({ ...checkup, heart_rate: e.target.valueAsNumber })}
                                    placeholder="Input Your Full Name"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    />
                                <p className="w-11/12 py-3 px-3">bpm</p>
                            </div>
                        </div>
                        <div>
                            <label className="mb-3 block text-black dark:text-white">
                                Initial Complaints
                            </label>
                            <textarea
                                rows={6}
                                defaultValue={checkup.complaint}
                                required
                                onChange={ e => setCheckup({ ...checkup, complaint: e.target.value })}
                                placeholder="What are the patient's complaints?"
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                        </div>
                    </div>
                </div>
                <SubmitButton />
            </form>
        </div>
    );
}

export default PhysicalCheckupForm;