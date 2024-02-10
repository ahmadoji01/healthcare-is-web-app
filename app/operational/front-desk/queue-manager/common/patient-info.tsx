import SubmitButton from "@/components/Dashboard/Submit";
import { Patient } from "@/modules/patients/domain/patient";
import Link from "next/link";

interface PatientInfoProps {
    patient: Patient,
}

const PatientInfo = ({ patient }:PatientInfoProps) => {
    return (
        <div className="flex flex-col gap-9 mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Patient Information
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Name
                        </label>
                        <p>{ patient.name }</p>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            NIK/KK
                        </label>
                        <p>{ patient.id_card_number ? patient.id_card_number : patient.family_id_number }</p>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Not this patient?
                        </label>
                        <div className="flex flex-row gap-2">
                            <button className="top-0 z-50 mt-2 mb-2 w-1/2 justify-center rounded bg-[#30b70e] py-4 px-3 font-medium text-xl text-gray">
                                Search for a Patient
                            </button>
                            <Link
                                className="w-1/2"
                                href="/operational/front-desk/patient-registration"
                                target="_blank">
                                <button className="top-0 w-full z-50 mt-2 mb-2 justify-center rounded bg-[#50d71e] py-4 px-3 font-medium text-xl text-gray">
                                    New Patient
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientInfo;