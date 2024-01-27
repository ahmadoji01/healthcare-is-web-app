import { Patient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment } from "@/modules/treatments/domain/treatment"
import Medication from "./medication"
import { Doctor } from "@/modules/doctors/domain/doctor"

export interface Organization {
    id: Number,
    number: string,
    patient: Patient,
    doctor: Doctor,
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