'use client';

import SelectOption from "@/interfaces/select-option";
import { medicinesFakeData } from "@/modules/medicines/infrastructure/medicines.fakes";
import { useEffect, useState } from "react";

import WindowedSelect, { createFilter } from "react-windowed-select";
import MedicineDoses from "@/modules/medical-records/domain/medical-record";
import Medicine from "@/modules/medicines/domain/medicine";
import { SelectChangeEvent } from "@mui/material";
import MedicationList from "./medication.list";

interface MedicationFormProps {
    medications: MedicineDoses[],
    setMedications: React.Dispatch<React.SetStateAction<MedicineDoses[]>>,
}

const MedicationForm = ({ medications, setMedications }:MedicationFormProps) => {

    const [medOptions, setMedOptions] = useState<SelectOption[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [medsList, setMedsList] = useState<MedicineDoses[]>([]);

    useEffect(() => {
        setMedicines(medicinesFakeData);
        let options:SelectOption[] = [];
        medicines?.map( (medicine) => { options.push({ value: medicine.id.toString(), label: medicine.name }); });
        setMedOptions(options);
    }, []);

    const handleChange = (choice: SelectOption) => {
        if(typeof(medications.find(o => o.medicine.id.toString() === choice.value)) !== 'undefined') {
            return;
        }
        
        let medicine:Medicine[] = medicines.filter( (medicine) => { return medicine.id.toString().match(choice.value) });
        let medication:MedicineDoses = { medicine: medicine[0], quantity: 1, doses: "" };
        let results:MedicineDoses[] = medications;
        results.push(medication);
        setMedications(results);
        setMedsList(results);
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
                                        defaultValue={medications}
                                        name="medications"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        windowThreshold={5}
                                        isSearchable={true}
                                        options={medOptions}
                                        onChange={choice => handleChange(choice)}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                            <MedicationList medications={medsList} />  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicationForm;