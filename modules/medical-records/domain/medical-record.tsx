import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine"
import { Patient, defaultPatient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup, defaultPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment, TreatmentOrg, defaultTreatment } from "@/modules/treatments/domain/treatment"
import { Doctor, defaultDoctor } from "@/modules/doctors/domain/doctor"

interface Signature {
	id: string,
	filename_download: string,
}

export interface Illness {
    id: number,
    name: string,
    code: string,
}

export interface MedicineDoses {
    medicine: Medicine,
    doses: string,
    quantity: number,
}

export interface MedicalRecord {
    id: number,
    code: string,
    patient: Patient,
    doctor: Doctor,
    anamnesis: string,
    care_type: string,
    signature: Signature|null,
    death: boolean,
    illnesses: Illness[],
    medicines: MedicineDoses[],
    treatments: Treatment[],
    physical_checkup: PhysicalCheckup,
    date_created: Date,
    date_updated: Date,
}

export const defaultMedicineDoses: MedicineDoses = {
    medicine: defaultMedicine,
    doses: "",
    quantity: 0,
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
    illnesses: [],
    medicines: [],
    treatments: [],
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
        medicines: res.medication,
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
        medicines: medicalRecord.medicines,
        treatments: medicalRecord.treatments,
        physical_checkup: medicalRecord.physical_checkup,
        date_created: medicalRecord.date_created,
        date_updated: medicalRecord.date_updated,
        organization: orgID,
    }
    return medicalRecordNoID;
}

export type MedicalRecordCreator = Omit<MedicalRecord, 'id'|'patient'|'doctor'|'physical_checkup'> & { patient:number, doctor:number, physical_checkup:number } & Organization;
export function medicalRecordCreatorMapper(medicalRecord:MedicalRecord, orgID:number) {

    let medicalRecordNoID: MedicalRecordCreator = { 
        code: medicalRecord.code,
        patient: medicalRecord.patient.id,
        doctor: medicalRecord.doctor.id,
        anamnesis: medicalRecord.anamnesis,
        care_type: medicalRecord.care_type,
        signature: medicalRecord.signature,
        death: medicalRecord.death,
        illnesses: medicalRecord.illnesses,
        medicines: medicalRecord.medicines,
        treatments: medicalRecord.treatments,
        physical_checkup: medicalRecord.physical_checkup.id,
        date_created: medicalRecord.date_created,
        date_updated: medicalRecord.date_updated,
        organization: orgID,
    }
    return medicalRecordNoID;
}

type TreatmentPatchers = {
    treatments: TreatmentOrg[],
}

export type IllnessPatcher = Omit<Illness, 'id'>;
export function illnessPatcherMapper(illness:Illness) {
    let illnessPatcher: IllnessPatcher = {
        name: illness.name,
        code: illness.code,
    }
    return illnessPatcher;
}
export type IllnessPatchers = {
    illnesses: IllnessPatcher[],
}

export type MedicineDosesPatcher = Omit<MedicineDoses, 'medicine'> & Organization & { id: number };
export function medicineDosesPatcherMapper(medicineDoses:MedicineDoses, orgID:number) {
    let medicineDosesPatcher: MedicineDosesPatcher = {
        id: medicineDoses.medicine.id,
        doses: medicineDoses.doses,
        quantity: medicineDoses.quantity,
        organization: orgID,
    }
    return medicineDosesPatcher;
}

type MedicineDosesPatchers = {
    medicines: MedicineDosesPatcher[],
}

export type MedicalRecordPatcher = Omit<MedicalRecord, 'medicines'|'patient'|'doctor'|'organization'|'date_created'|'treatments'|'illnesses'> & IllnessPatchers & TreatmentPatchers & MedicineDosesPatchers;
export function medicalRecordPatcherMapper(medicalRecord:MedicalRecord, illnesses: IllnessPatcher[], meds: MedicineDosesPatcher[], treatments:TreatmentOrg[]) {

    let medicalRecordPatcher: MedicalRecordPatcher = { 
        id: medicalRecord.id,
        code: medicalRecord.code,
        anamnesis: medicalRecord.anamnesis,
        care_type: medicalRecord.care_type,
        signature: medicalRecord.signature,
        death: medicalRecord.death,
        illnesses: illnesses,
        medicines: meds,
        treatments: treatments,
        physical_checkup: medicalRecord.physical_checkup,
        date_updated: medicalRecord.date_updated,
    }
    return medicalRecordPatcher;
}