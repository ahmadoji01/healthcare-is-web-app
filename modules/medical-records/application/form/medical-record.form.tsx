'use client';

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import WindowedSelect, { createFilter, components } from "react-windowed-select";
import { Illness, MedicalRecord, MedicalRecordItem } from "../../domain/medical-record";
import SelectOption from "@/interfaces/select-option";
import { Treatment } from "@/modules/treatments/domain/treatment";
import Illnesses from "@/constants/illnesses";
import { getI18n, useTranslation } from "react-i18next";
import dataID from "@/constants/icd10_select_id.json";
import { Item, defaultItem } from "@/modules/items/domain/item";
import { MR_ITEM_TYPES } from "../../domain/medical-records.constants";
import { defaultCategory } from "@/modules/categories/domain/category";

interface MedicalRecordFormProps {
    medicalRecord: MedicalRecord,
    treatments: Item[],
    mrTreatments: MedicalRecordItem[],
    setMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
    setMRTreatments: Dispatch<SetStateAction<MedicalRecordItem[]>>,
}

const MedicalRecordForm = ({ treatments, medicalRecord, setMedicalRecord, setMRTreatments }:MedicalRecordFormProps) => {
    
    const [treatOptions, setTreatOptions] = useState<SelectOption[]>([]);
    const {t} = useTranslation();
    const i = getI18n();
    const [illnesses, setIllnesses] = useState(Illnesses);

    useEffect(() => {
        let options:SelectOption[] = [];
        treatments?.map( (treatment) => { options.push({ value: treatment.id.toString(), label: treatment.name, value2: treatment.price.toString() }); });
        setTreatOptions(options);
    }, [treatments]);

    useEffect(() => {
        if (i.language === 'id-ID') {
            setIllnesses(dataID);
        }
    }, [t])

    const treatmentsMapper = (choices: SelectOption[]) => {
        let items:MedicalRecordItem[] = [];
        choices?.map( (choice) => {
            items.push({ items_id: { id: parseInt(choice.value), sku: '', name: choice.label, stock: 0, category: defaultCategory, price: 0, unit: "", type: ITEM_TYPE.treatment }, notes: '', type: ITEM_TYPE.treatment, quantity: 1 }); 
        });
        setMRTreatments([...items]);
    }

    const illnessesMapper = (choices: SelectOption[]) => {
        let illnesses:Illness[] = [];
        choices?.map( (choice) => { 
            illnesses.push({ id: 0, name: choice.label, code: choice.value }); 
        });
        setMedicalRecord({ ...medicalRecord, illnesses: illnesses });
    }

    return (
        <>
            <div className="grid gap-9">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                { t('diagnosis') }
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5.5 p-6.5">
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t('anamnesis') }
                                </label>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                <textarea
                                    defaultValue={medicalRecord.anamnesis}
                                    onChange={e => setMedicalRecord({ ...medicalRecord, anamnesis: e.target.value })}
                                    rows={4}
                                    placeholder="Anamnesis"
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    ></textarea>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t('illnesses') }
                                </label>
                                <div className="relative bg-white dark:bg-form-input" style={{zIndex: 999999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        isMulti
                                        isSearchable={true}
                                        defaultValue={[]}
                                        onChange={choices => illnessesMapper(choices)}
                                        name="illnesses"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        windowThreshold={5}
                                        options={illnesses}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        classNamePrefix="select" />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black dark:text-white">
                                    { t('treatments') }
                                </label>
                                <div className="relative z-20 bg-white dark:bg-form-input" style={{zIndex: 99999999, borderWidth: 0}}>
                                    <WindowedSelect
                                        isMulti
                                        isSearchable={true}
                                        defaultValue={[]}
                                        onChange={choices => treatmentsMapper(choices)}
                                        name="treatments"
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        windowThreshold={5}
                                        options={treatOptions}
                                        className="custom-input-date custom-input-date-2 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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