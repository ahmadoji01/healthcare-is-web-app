import PatientSearch from "@/modules/patients/application/patient.search"
import { useEffect, useState } from "react"
import PatientSearchListTable from "./patient-search-list-table";
import { Patient, patientMapper } from "@/modules/patients/domain/patient";
import { getAllPatients, getPatientsWithFilter, searchPatients } from "@/modules/patients/domain/patients.actions";
import { useUserContext } from "@/contexts/user-context";
import { nameFilter } from "@/modules/patients/domain/patient.specifications";
import { ALERT_MESSAGE, ALERT_STATUS } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";

let activeTimeout = null;

interface PatientSearchFormProps {
    handleNext: () => void,
}

const PatientSearchForm = ({ handleNext }:PatientSearchFormProps) => {

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searched, setSearched] = useState(false);
    const {openSnackbarNotification} = useAlertContext();
    const {accessToken} = useUserContext();

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
            <PatientSearchListTable patients={patients} searched={searched} loading={loading} handleNext={handleNext} />
        </>
    )
}

export default PatientSearchForm;