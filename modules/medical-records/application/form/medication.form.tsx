'use client';

import SelectOption from "@/interfaces/select-option";
import { medicinesFakeData } from "@/modules/medicines/infrastructure/medicines.fakes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import WindowedSelect, { createFilter } from "react-windowed-select";
import { MedicineDoses, defaultMedicineDoses } from "@/modules/medical-records/domain/medical-record";
import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine";
import { SelectChangeEvent } from "@mui/material";
import MedicationList from "./medication.list";
import { useMedicalRecordContext } from "@/contexts/medical-record-context";
import { defaultMedicineCategory } from "@/modules/medicines/domain/medicine-category";
import { Treatment } from "@/modules/treatments/domain/treatment";

interface MedicationFormProps {
    medicines: Medicine[],
    medicineDoses: MedicineDoses[],
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>> 
}

const MedicationForm = ({ medicines, medicineDoses, setMedicineDoses }:MedicationFormProps) => {

    const [medOptions, setMedOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        let options:SelectOption[] = [];
        medicines?.map( (medicine) => { options.push({ value: medicine.id.toString(), label: medicine.name }); });
        setMedOptions(options);
    }, [medicines]);

    const handleChange = (choices: SelectOption[]) => {
        let medDoses:MedicineDoses[] = [];
        choices?.map( (choice) => { 
            medDoses.push({ medicine: { id: parseInt(choice.value), name: choice.label, code: "", stock: 0, category: defaultMedicineCategory, price: 0 }, doses: "", quantity: 0 }); 
        });
        setMedicineDoses(medDoses);
    }

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Medication
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        defaultValue={medicineDoses}
                                        isMulti
                                        name="medications"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        windowThreshold={5}
                                        isSearchable={true}
                                        options={medOptions}
                                        onChange={choices => handleChange(choices)}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                            <MedicationList medicineDoses={medicineDoses} setMedicineDoses={setMedicineDoses} />  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicationForm;