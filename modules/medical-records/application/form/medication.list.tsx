import { Dispatch, SetStateAction, useEffect, useState } from "react";
import WindowedSelect, { createFilter } from "react-windowed-select";
import { MedicineDoses } from "../../domain/medical-record";

interface MedicationListProps {
    medicineDoses: MedicineDoses[],
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>>,
}

const MedicationList = ({ medicineDoses, setMedicineDoses }:MedicationListProps) => {

    const [times, setTimes] = useState<string>("");
    const [period, setPeriod] = useState<string>("");

    const dosesChange = (newTimes="", newPeriod="", i=0) => {
        let doses = "";
        if (newTimes !== "") {
            setTimes(newTimes);
            doses = newTimes + " per " + period;
        }
        if (newPeriod !== "") {
            setPeriod(newPeriod);
            doses = times + " per " + newPeriod;
        }
        
        let newDoses = [...medicineDoses];
        newDoses[i].doses = doses;
        setMedicineDoses(newDoses); 
    }

    const qtyChange = (quantity=0, i=0) => {
        let newDoses = [...medicineDoses];
        newDoses[i].quantity = quantity;
        setMedicineDoses(newDoses);
    }

    return (
        <>
            { medicineDoses?.map( (medication, i) => 
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                    required
                                    options={[ {value: '1', label: '1'}, {value: '2', label: '2'}, {value: '3', label: '3'}, {value: '4', label: '4'}, ]}
                                    onChange={choice => dosesChange(choice.value, "", i)}
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
                                    required
                                    options={[ {value: 'one day', label: 'one day'}, {value: 'two days', label: 'two days'}, {value: 'three days', label: 'three days'} ]}
                                    onChange={choice => dosesChange("", choice.value, i)}
                                    className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-1.5 px-2 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    classNamePrefix="select" />
                            </div>
                        </div>
                        <p>Quantity:</p>
                        <input
                            onChange={ e => qtyChange(parseInt(e.target.value), i)}
                            required
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