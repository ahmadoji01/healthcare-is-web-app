import Medication from "@/modules/medical-records/domain/medication";
import { useState } from "react";
import WindowedSelect, { createFilter } from "react-windowed-select";

interface MedicationListProps {
    medications: Medication[],
}

const MedicationList = ({ medications }:MedicationListProps) => {

    const [times, setTimes] = useState<number>(0);
    const [period, setPeriod] = useState<string>("")

    return (
        <>
            { medications?.map( (medication, key) => 
                <div key={key} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="text-black font-extrabold dark:text-white text-xl">
                            { medication.medicine.name }
                        </h3>
                        <p>Doses:</p>
                        <div className="flex flex-row">
                            <div className="flex-auto w-full h-full">
                                <WindowedSelect
                                    name="times"
                                    filterOption={createFilter({ ignoreAccents: false })}
                                    windowThreshold={5}
                                    isSearchable={true}
                                    options={[ {value: 1, label: '1'}, {value: 2, label: '2'}, {value: 3, label: '3'}, {value: 4, label: '4'}, ]}
                                    onChange={choice => setTimes(choice)}
                                    className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    classNamePrefix="select" />
                            </div>
                            <div className="flex-auto p-4"><p className="items-center text-center">per</p></div>
                            <div className="flex-auto w-full h-full">
                                <WindowedSelect
                                    name="period"
                                    filterOption={createFilter({ ignoreAccents: false })}
                                    windowThreshold={5}
                                    isSearchable={true}
                                    options={[ {value: 'one day', label: 'one day'}, {value: 'two days', label: 'two days'}, {value: 'three days', label: 'three days'} ]}
                                    onChange={choice => setPeriod(choice)}
                                    className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    classNamePrefix="select" />
                            </div>
                        </div>
                        <p>Quantity:</p>
                        <input
                            name="quantity"
                            className="custom-input-date custom-input-date-2 w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" 
                            />
                    </div>
                </div>
            ) }
        </>
    )
}

export default MedicationList;