'use client';

import SelectOption from "@/interfaces/select-option";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import WindowedSelect, { createFilter } from "react-windowed-select";
import { MedicalRecordItem, MedicineDoses, defaultMedicineDoses } from "@/modules/medical-records/domain/medical-record";
import MedicationList from "./medication.list";
import { useTranslation } from "react-i18next";
import { MR_ITEM_TYPES } from "../../domain/medical-records.constants";
import { Item, defaultItem } from "@/modules/items/domain/item";
import { defaultCategory } from "@/modules/categories/domain/category";

interface MedicationFormProps {
    medicines: Item[],
    mrMedicines: MedicalRecordItem[],
    setMRMedicines: Dispatch<SetStateAction<MedicalRecordItem[]>> 
}

const MedicationForm = ({ medicines, mrMedicines, setMRMedicines }:MedicationFormProps) => {

    const [medOptions, setMedOptions] = useState<SelectOption[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        let options:SelectOption[] = [];
        medicines?.map( (medicine) => { options.push({ value: medicine.id.toString(), label: medicine.name, value2: medicine.price.toString() }); });
        setMedOptions(options);
    }, [medicines]);

    const handleChange = (choices: SelectOption[]) => {
        let items:MedicalRecordItem[] = [];
        choices?.map( (choice) => {
            items.push({ items_id: { id: parseInt(choice.value), sku: '', name: choice.label, stock: 0, category: defaultCategory, price: 0 }, type: MR_ITEM_TYPES.medicine, notes: "", quantity: 1 }); 
        });
        setMRMedicines([...items]);
    }

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('medication') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        defaultValue={mrMedicines}
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
                            <MedicationList mrMedicines={mrMedicines} setMRMedicines={setMRMedicines} />  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicationForm;