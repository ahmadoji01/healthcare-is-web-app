import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import moment from "moment";
import { useTranslations } from "next-intl";

interface MedicalHistoryCardProps {
    medicalRecord: MedicalRecord,
}

const MedicalHistoryCard = ({ medicalRecord }:MedicalHistoryCardProps) => {

    const t = useTranslations();

    return (
        <div className="mb-1 task rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative flex cursor-move justify-between">
                <div>
                    <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('visit_date') }</h5>
                    <p className="font-bold text-black dark:text-white">{ moment(medicalRecord.date_updated).format("Do MMMM YYYY") }</p>
                    <p className="mt-4 text-black dark:text-white">Diagnosis:</p>
                    <ul className="font-bold text-black dark:text-white">
                        { medicalRecord.illnesses?.map( (illness, key) => (
                            <li key={key}>{illness.name}</li>
                        )) }
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default MedicalHistoryCard