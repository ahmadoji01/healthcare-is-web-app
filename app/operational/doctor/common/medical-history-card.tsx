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
                    <p>{ moment(medicalRecord.date_updated).format("Do MMMM YYYY") }</p>
                    { medicalRecord.medicines?.length > 0 && <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('medicines') }:</h5> }
                    <ul>
                        { medicalRecord.medicines?.map( (medicine, key) => (
                            <li key={key}>{medicine.medicine.name}</li>
                        )) }
                    </ul>
                    { medicalRecord.treatments?.length > 0 && <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('treatments') }:</h5> }
                    <p className="mt-4 text-black dark:text-white">Diagnosis:</p>
                    <ul>
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