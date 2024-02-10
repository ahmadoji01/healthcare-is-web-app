import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine"
import { Patient, defaultPatient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup, defaultPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment, defaultTreatment } from "@/modules/treatments/domain/treatment"
import { Doctor, defaultDoctor } from "@/modules/doctors/domain/doctor"

interface Signature {
	id: string,
	filename_download: string,
}

export interface MedicalRecord {
    id: Number,
    code: string,
    patient: Patient,
    doctor: Doctor,
    anamnesis: string,
    care_type: string,
    signature: Signature|null,
    death: boolean,
    illnesses: [ {
        id: number,
        name: string,
        code: string,
    } ],
    medication: [ {
        medicines_id: Medicine,
        doses: string,
        quantity: number,
    } ],
    treatments: Treatment[],
    physical_checkup: PhysicalCheckup,
    date_created: Date,
    date_updated: Date,
}

export const defaultMedicalRecord: MedicalRecord = {
    id: 0,
    code: "",
    patient: defaultPatient,
    doctor: defaultDoctor,
    anamnesis: "",
    care_type: "",
    signature: null,
    death: false,
    illnesses: [{ id: 0, name: "", code: "" }],
    medication: [{ medicines_id: defaultMedicine, doses: "", quantity: 0 }],
    treatments: [defaultTreatment],
    physical_checkup: defaultPhysicalCheckup,
    date_created: new Date,
    date_updated: new Date,
}

export function medicalRecordMapper(res:Record<string,any>) {
    let medicalRecord = defaultMedicalRecord;
    medicalRecord = { 
        id: res.id, 
        code: res.code,
        patient: res.patient,
        doctor: res.doctor,
        anamnesis: res.anamnesis,
        care_type: res.care_type,
        signature: res.signature,
        death: res.death,
        illnesses: res.illnesses,
        medication: res.medication,
        treatments: res.treatments,
        physical_checkup: res.physical_checkup,
        date_created: res.date_created,
        date_updated: res.date_updated,
    }
    return medicalRecord;
}

type Organization = {
    organization: number,
}

export type MedicalRecordNoID = Omit<MedicalRecord, 'id'> & Organization;
export function medicalRecordNoIDMapper(medicalRecord:MedicalRecord, orgID:number) {

    let medicalRecordNoID: MedicalRecordNoID = { 
        code: medicalRecord.code,
        patient: medicalRecord.patient,
        doctor: medicalRecord.doctor,
        anamnesis: medicalRecord.anamnesis,
        care_type: medicalRecord.care_type,
        signature: medicalRecord.signature,
        death: medicalRecord.death,
        illnesses: medicalRecord.illnesses,
        medication: medicalRecord.medication,
        treatments: medicalRecord.treatments,
        physical_checkup: medicalRecord.physical_checkup,
        date_created: medicalRecord.date_created,
        date_updated: medicalRecord.date_updated,
        organization: orgID,
    }
    return medicalRecordNoID;
}