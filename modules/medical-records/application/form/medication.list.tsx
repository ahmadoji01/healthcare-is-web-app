import { Dispatch, SetStateAction, useEffect, useState } from "react";
import WindowedSelect, { createFilter } from "react-windowed-select";
import { MedicineDoses } from "../../domain/medical-record";
import { useTranslation } from "react-i18next";

interface MedicationListProps {
    medicineDoses: MedicineDoses[],
    setMedicineDoses: Dispatch<SetStateAction<MedicineDoses[]>>,
}

const MedicationList = ({ medicineDoses, setMedicineDoses }:MedicationListProps) => {

    const {t} = useTranslation();

    const dosesChange = (doses:string, i:number) => {
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
                        <p>{ t('doses') }:</p>
                        <div className="flex flex-row">
                            <div className="flex-auto w-full h-full">
                            <input
                                onChange={ e => dosesChange(e.target.value, i)}
                                required
                                name="doses"
                                placeholder={ t("input_doses_example") }
                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <p>{ t('quantity') }:</p>
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