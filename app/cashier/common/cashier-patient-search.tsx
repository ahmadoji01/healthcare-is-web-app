import PatientSearch from "@/modules/patients/application/patient.search"
import { useState } from "react"
import CashierPatientSearchList from "./cashier-patient-search-list";
import { Patient, defaultPatient, patientMapper } from "@/modules/patients/domain/patient";
import { searchPatients } from "@/modules/patients/domain/patients.actions";
import { useUserContext } from "@/contexts/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

let activeTimeout = null;

interface CashierPatientSearchProps {
    handleSubmit: (patient:Patient) => void,
}

const CashierPatientSearch = ({ handleSubmit }:CashierPatientSearchProps) => {

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searched, setSearched] = useState(false);
    const {accessToken} = useUserContext();
    const t = useTranslations();

    const addGuest = () => {
        let patient = defaultPatient;
        patient.name = "Guest";
        handleSubmit(patient);
    }

    const handleChange = (query:string) => {
        if (activeTimeout) {
          clearTimeout(activeTimeout);
        }
        
        activeTimeout = setTimeout(() => {
          handleSearch(query);
        }, 1000);
      }


    const handleSearch = (query:string) => {
        setSearched(true);
        if (query.length > 3) {
            setLoading(true);
            searchPatients(accessToken, query, 1).then( res => {
                let pats:Patient[] = [];
                res?.map( (patient) => { pats.push(patientMapper(patient)); });
                setPatients(pats);
                setLoading(false);
            })
        }
    }

    return (
        <>
            <PatientSearch handleChange={handleChange} />
            <CashierPatientSearchList patients={patients} searched={searched} loading={loading} handleSubmit={handleSubmit} />
            <button 
                onClick={addGuest} 
                className="block w-full mb-6 rounded bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90">
                <span>
                    <FontAwesomeIcon icon={faPlus} />
                </span> {t('cashier.add_guest')}
            </button>
        </>
    )
}

export default CashierPatientSearch;