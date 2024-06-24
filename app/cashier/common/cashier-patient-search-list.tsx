import PatientSearch from "@/modules/patients/application/patient.search"
import { Patient } from "@/modules/patients/domain/patient"
import moment from "moment";
import { useState } from "react"
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PageNav from "@/components/Dashboard/PageNav/PageNav";
import Spinner from "@/components/Spinner";
import { usePatientContext } from "@/contexts/patient-context";
import { useTranslation } from "react-i18next";

interface CashierPatientSearchListProps {
    patients: Patient[],
    searched: boolean,   
    loading: boolean,
    handleSubmit: (patient:Patient) => void,
}
const CashierPatientSearchList = ({ patients, searched, loading, handleSubmit }:CashierPatientSearchListProps) => {
    
    const {setActivePatient} = usePatientContext();
    const {t} = useTranslation();

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            { loading && <Spinner /> }
            { (patients.length === 0 && !searched && !loading) && <h3 className="mb-6">{ t('front_desk.type_your_name') }</h3> }
            { (patients.length === 0 && searched && !loading) && 
                <div className="mb-6">
                    <h3 className="text-center">{ t('front_desk.no_patient') }</h3>
                    <h3 className="text-center py-3">{ t('cashier.or_register_as_guest') }</h3>
                </div>
            }
            { (patients.length > 0 && !loading) &&
                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t('full_name') }
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t('birthday') }
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t('fathers_name') }
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t('mothers_name') }
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                { t('actions') }
                            </h5>
                        </div>
                    </div>

                    {typeof(patients) !== "undefined" && patients.map((patient, key) => (
                        <div
                            className={`grid grid-cols-3 sm:grid-cols-5 ${
                            key === patients.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                            key={key}
                            onClick={() => {handleSubmit(patient); setActivePatient(patient);}}
                            >
                            <div className="flex items-center justify p-2.5 xl:p-5">
                                <p className="text-black dark:text-white">{patient.name}</p>
                            </div>

                            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
                                <p className="text-meta-3">{moment(patient.birthday).format("Do MMMM YYYY")}</p>
                            </div>

                            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
                                <p className="text-meta-3">{patient.fathers_name}</p>
                            </div>

                            <div className="hidden items-center justify-center sm:flex p-2.5 xl:p-5">
                                <p className="text-meta-3">{patient.mothers_name}</p>
                            </div>

                            <div className="items-center justify-center p-2.5 sm:flex xl:p-5">
                                <ul className="flex items-center gap-2 2xsm:gap-4">
                                    <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
                                        <Link
                                            href="#"
                                            onClick={ () => {handleSubmit(patient); setActivePatient(patient);} }
                                            className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                                            >
                                            <FontAwesomeIcon width={18} height={18} icon={faArrowRight} />
                                        </Link>
                                    </motion.li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default CashierPatientSearchList;