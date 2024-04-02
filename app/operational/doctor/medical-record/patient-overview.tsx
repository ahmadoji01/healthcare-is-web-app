import { Patient } from "@/modules/patients/domain/patient";
import PatientAvatar from "../common/patient-avatar";
import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import moment from "moment";

interface PatientOverviewProps {
    medicalRecord: MedicalRecord;
}

const PatientOverview = ({ medicalRecord }:PatientOverviewProps) => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full p-2 h-[calc(100vh-12rem)] overflow-y-scroll overscroll-contain">
                <div className="w-full flex align-center justify-center mb-4">
                    <PatientAvatar name={medicalRecord.patient.name} />
                </div>
                <h2 className="text-3xl text-center font-extrabold text-black dark:text-white mb-2">{medicalRecord.patient.name}</h2>
                <div className="grid px-2 md:px-12 lg:px-20 grid-cols-2">
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>Height</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.height}</div>
                        <div>cms</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>Weight</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.weight}</div>
                        <div>kg</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>Age</div>
                        <div className="text-right font-extrabold">{moment().diff(medicalRecord.patient.birthday, 'years')}</div>
                        <div>y/o</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-black dark:text-white">
                        <div>Tension</div>
                        <div className="text-right font-extrabold">{medicalRecord.physical_checkup.tension}</div>
                        <div>mmHg</div>
                    </div>
                </div>
            </div>
            <div className="w-full p-2">
                <h2 className="text-xl text-center font-extrabold text-black dark:text-white">Medical History</h2>
            </div> 
        </div>
    )
}

export default PatientOverview;