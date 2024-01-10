import Medicine from "@/modules/medicines/domain/medicine"
import { Patient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment } from "@/modules/treatments/domain/treatment"
import Medication from "./medication"

export interface MedicalRecord {
    id: Number,
    number: string,
    patient: Patient,
    physicalCheckup: PhysicalCheckup,
    anamnesis: string,
    careType: string,
    signatureLink: string,
    death: boolean,
    organization: {
        id: number,
        name: string,
    },
    illnesses: [ {
        id: number,
        name: string,
        icdCode: string,
    } ],
    medications: Medication[],
    treatments: Treatment[],
}