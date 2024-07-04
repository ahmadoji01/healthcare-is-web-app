import { Patient } from "@/modules/patients/domain/patient";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface PatientInfoProps {
    patient: Patient,
}

const PatientInfo = ({ patient }:PatientInfoProps) => {

    const t = useTranslations();

    return (
        <div className="flex flex-col gap-9 mb-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        {t("patient_information")}
                    </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            {t("name")}
                        </label>
                        <p className="text-black dark:text-white font-bold">{ patient.name }</p>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            {t("resident_number_or_family_id_number")}
                        </label>
                        <p className="text-black dark:text-white font-bold">{ patient.id_card_number ? patient.id_card_number : patient.family_id_number }</p>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            {t("front_desk.not_this_patient")}
                        </label>
                        <div className="flex flex-row gap-2">
                            <Link
                                className="w-1/2"
                                href="/operational/front-desk/patient-registration/existing-patient?from=queue-manager"
                                >
                                <button className="top-0 w-full z-50 mt-2 mb-2 justify-center rounded bg-[#30b70e] py-4 px-3 font-medium text-xl text-gray">
                                    {t("front_desk.search_for_a_patient")}
                                </button>
                            </Link>
                            <Link
                                className="w-1/2"
                                href="/operational/front-desk/patient-registration/new-patient?from=queue-manager"
                                >
                                <button className="top-0 w-full z-50 mt-2 mb-2 justify-center rounded bg-[#50d71e] py-4 px-3 font-medium text-xl text-gray">
                                    {t("front_desk.new_patient")}
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