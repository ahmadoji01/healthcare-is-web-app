'use client';

import CustomOption from "@/components/CustomOption";
import Illnesses from "@/constants/illnesses";
import Treatments from "@/constants/treatments";

import WindowedSelect, { createFilter, components } from "react-windowed-select";

const MedicalRecordForm = () => {

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Diagnosis
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Anamnesis
                                </label>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                <textarea
                                    rows={4}
                                    placeholder="Anamnesis"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Illnesses
                                </label>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        isMulti
                                        name="illnesses"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        components={{ Input: (props) => (<components.Input {...props} maxLength={50} />) }}
                                        windowThreshold={5}
                                        options={Illnesses}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    Treatments
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input">
                                    <WindowedSelect
                                        isMulti
                                        name="treatments"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        components={{ Input: (props) => (<components.Input {...props} maxLength={50} />) }}
                                        windowThreshold={50}
                                        options={Treatments}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicalRecordForm;