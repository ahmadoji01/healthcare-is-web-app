import { MedicalRecord } from "@/modules/medical-records/domain/medical-record"
import { patientsFakeData } from "@/modules/patients/infrastructure/patients.fakes"
import { medicationsFakeData } from "./medication.fakes";
import { treatmentsFakeData } from "@/modules/treatments/infrastructure/treatments.fakes";
import { physicalCheckupsFakeData } from "@/modules/physical-checkups/infrastructure/physical-checkups.fakes";
import { doctorsFakeData } from "@/modules/doctors/infrastructure/doctors.fakes";

const patients = patientsFakeData;
const medications = medicationsFakeData;
const treatments = treatmentsFakeData;
const doctors = doctorsFakeData;

export const medicalRecordFakeData: MedicalRecord[] = [
	{
        id: 1,
        number: "MCR-001",
        patient: patients[0],
        physicalCheckup: physicalCheckupsFakeData[0],
        doctor: doctors[0],
        anamnesis: "Patient is experiencing bowel syndrome",
        careType: "",
        signatureLink: "",
        death: false,
        organization: {
            id: 1,
            name: "Klinik Ramadan",
        },
        illnesses: [ {
            id: 1,
            name: "Cholera",
            icdCode: "A00.0",
        } ],
        medications: medications,
        treatments: treatments,
    }
]