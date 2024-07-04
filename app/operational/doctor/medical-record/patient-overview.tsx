import PatientAvatar from "../common/patient-avatar";
import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import moment from "moment";
import MedicalHistoryCard from "../common/medical-history-card";
import { useTranslations } from "next-intl";

interface PatientOverviewProps {
    medicalRecord: MedicalRecord,
    medicalHistories: MedicalRecord[],
}

const PatientOverview = ({ medicalRecord, medicalHistories }:PatientOverviewProps) => {
    const t = useTranslations();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full p-2 h-[calc(100vh-12rem)] overflow-y-scroll overscroll-contain">
                <div className="w-full flex align-center justify-center mb-4">
                    <PatientAvatar name={medicalRecord.patient.name !== "" ? medicalRecord.patient.name : "Jedi Force"} />
                </div>
                <h2 className="text-3xl text-center font-extrabold text-black dark:text-white mb-2">{medicalRecord.patient.name}</h2>
                <div className="grid px-2 md:px-12 lg:px-20 grid-cols-2">
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>{t('height')}</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.height}</div>
                        <div>cms</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>{t('weight')}</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.weight}</div>
                        <div>kg</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>{t('age')}</div>
                        <div className="text-right font-extrabold">{moment().diff(medicalRecord.patient.birthday, 'years')}</div>
                        <div>{t('years_old')}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>{t('tension')}</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.tension}</div>
                        <div>mmHg</div>
                    </div>
                </div>
            </div>
            <div className="w-full p-2">
                <h2 className="text-2xl mb-4 text-center font-extrabold text-black dark:text-white">{ t('medical_history') }</h2>
                { medicalHistories.length === 0 && 
                    <h2 className="text-xl text-center font-extrabold text-black dark:text-white">
                        {t('no_medical_history_found')}
                    </h2>
                }
                { medicalHistories?.map( history => <MedicalHistoryCard medicalRecord={history} />) }
            </div> 
        </div>
    )
}

export default PatientOverview;