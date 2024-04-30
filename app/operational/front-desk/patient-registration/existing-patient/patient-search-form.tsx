import PatientSearch from "@/modules/patients/application/patient.search"
import { useEffect, useState } from "react"
import PatientSearchListTable from "./patient-search-list-table";
import { Patient, patientMapper } from "@/modules/patients/domain/patient";
import { getAllPatients, getPatientsWithFilter } from "@/modules/patients/domain/patients.actions";
import { useUserContext } from "@/contexts/user-context";
import { nameFilter } from "@/modules/patients/domain/patient.specifications";
import { ALERT_MESSAGE, ALERT_STATUS } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";

const PatientSearchForm = () => {

    const [loading, setLoading] = useState(false);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searched, setSearched] = useState(false);
    const {openSnackbarNotification} = useAlertContext();
    const {accessToken} = useUserContext();

    const getPatients = async (patientName:string) => {
        let pats:Patient[] = [];
        await getPatientsWithFilter(accessToken, nameFilter(patientName)).then( res => {
            res?.map( (patient) => { pats.push(patientMapper(patient)) });
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, 'error');
        });
        setLoading(false);
        return pats;
    }

    const handleChange = async (patientName:string) => {
        setLoading(true);
        setSearched(true);
        let pats = await getPatients(patientName);
        setPatients(pats);
    }

    return (
        <>
            <PatientSearch handleChange={handleChange} />
            <PatientSearchListTable patients={patients} searched={searched} loading={loading} />
        </>
    )
}

export default PatientSearchForm;