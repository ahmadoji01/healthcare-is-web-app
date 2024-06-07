import { Patient } from "@/modules/patients/domain/patient";
import moment from "moment";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Pagination } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { MedicalRecord } from "@/modules/medical-records/domain/medical-record";
import { Visit } from "@/modules/visits/domain/visit";
import { useTranslation } from "react-i18next";

interface PatientToExamineListTableProps {
    visits: Visit[],
    totalPages: number,
    handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void,
    setActiveMedicalRecord: Dispatch<SetStateAction<MedicalRecord>>,
    setActiveVisit: Dispatch<SetStateAction<Visit>>
  }

const PatientToExamineListTable = ({ visits, totalPages, handlePageChange, setActiveMedicalRecord, setActiveVisit }: PatientToExamineListTableProps) => {
    
    const {t} = useTranslation();

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          { visits.length <= 0 &&
            <h4 className="text-2xl font-extrabold text-black dark:text-white mb-2">{ t('no_patient_needs_to_be_examined_yet') }</h4>
          }
          <div className="flex flex-col">
            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  { t('full_name') }
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  { t('resident_number_or_family_id_number') }
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  { t('birthday') }
                </h5>
              </div>
              <div className="hidden p-2.5 text-center sm:block xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  { t('address') }
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  { t('actions') }
                </h5>
              </div>
            </div>
    
            {typeof(visits) !== "undefined" && visits.map((visit, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-5 ${
                  key === visits.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center justify p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{visit.patient.name}</p>
                </div>
    
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{visit.patient.id_card_number}</p>
                </div>
    
                <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
                  <p className="text-meta-3">{moment(visit.patient.birthday).format("MMMM Do YYYY")}</p>
                </div>
    
                <div className="hidden items-center justify p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white">{visit.patient.address}</p>
                </div>
    
                <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                  <ul className="flex items-center gap-2 2xsm:gap-4">
                    <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                        <Link
                            href="/operational/doctor/medical-record"
                            onClick={() => { setActiveVisit(visit); setActiveMedicalRecord(visit.medical_record) } }
                            className="inline-flex gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                            <span>
                                <FontAwesomeIcon icon={faStethoscope} />
                            </span>
                            { t('examine') }
                        </Link>
                    </motion.li>
                  </ul>
                </div>
              </div>
            ))}
            <div className="py-3">
              <Pagination count={totalPages} onChange={handlePageChange} />
            </div>
          </div>
        </div>
      );
}

export default PatientToExamineListTable;