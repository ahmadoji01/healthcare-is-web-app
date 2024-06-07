import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface MedicalHistoryCardProps {
    medicalRecord: MedicalRecord,
}

const MedicalHistoryCard = ({ medicalRecord }:MedicalHistoryCardProps) => {

    const {t} = useTranslation();

    return (
        <div className="mb-1 task rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="relative flex cursor-move justify-between">
                <div>
                    <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('visit_date') }</h5>
                    <p>{ moment(medicalRecord.date_updated).format("MMMM Do YYYY") }</p>
                    { medicalRecord.medicines?.length > 0 && <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('medicines') }:</h5> }
                    <p>
                        <ul>
                            { medicalRecord.medicines?.map( medicine => (
                                <li>{medicine.medicine.name}</li>
                            )) }
                        </ul>
                    </p>
                    { medicalRecord.treatments?.length > 0 && <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{ t('treatments') }:</h5> }
                    <p>
                        <ul>
                            { medicalRecord.treatments?.map( treatment => (
                                <li>{treatment.name}</li>
                            )) }
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default MedicalHistoryCard