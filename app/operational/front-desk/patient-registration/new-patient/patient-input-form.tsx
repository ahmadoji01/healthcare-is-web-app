import { usePatientContext } from "@/contexts/patient-context";
import PatientForm from "@/modules/patients/application/form/patient.form";
import { Patient } from "@/modules/patients/domain/patient";

interface PatientInputFormProps {
    handleNext: () => void,
}

const PatientInputForm = ({ handleNext }:PatientInputFormProps) => {

    const {activePatient, setActivePatient} = usePatientContext();

    const handleSubmit = (patient:Patient) => {
        setActivePatient(patient);
        handleNext();
    } 

    return (
        <PatientForm initPatient={activePatient} handleSubmit={handleSubmit} />
    )
} 

export default PatientInputForm;