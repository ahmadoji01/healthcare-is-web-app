import { Medicine, defaultMedicine, medicineMapper } from "@/modules/medicines/domain/medicine"
import { Patient, defaultPatient } from "@/modules/patients/domain/patient"
import { PhysicalCheckup, defaultPhysicalCheckup } from "@/modules/physical-checkups/domain/physical-checkup"
import { Treatment, TreatmentOrg, treatmentMapper } from "@/modules/treatments/domain/treatment"
import { Doctor, defaultDoctor } from "@/modules/doctors/domain/doctor"
import { Item, defaultItem, itemMapper } from "@/modules/items/domain/item"

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

export interface MedicalRecordItem {
    items_id: Item,
    notes: string,
    type: string,
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
    items: MedicalRecordItem[],
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
    items: [],
    physical_checkup: defaultPhysicalCheckup,
    date_created: new Date,
    date_updated: new Date,
}

export const defaultMedicalRecordItem: MedicalRecordItem = {
    items_id: defaultItem,
    notes: "",
    type: "",
    quantity: 0,
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
        medicines: mrMedicinesMapper(res.medicines),
        treatments: mrTreatmentsMapper(res.treatments),
        items: mrItemsMapper(res.items),
        physical_checkup: res.physical_checkup,
        date_created: res.date_created,
        date_updated: res.date_updated,
    }
    return medicalRecord;
}

export function medicineDosesMapper(res:Record<string,any>) {
    let medicineDoses:MedicineDoses = {
        medicine: medicineMapper(res.medicines_id),
        doses: res.doses,
        quantity: res.quantity,
    }
    return medicineDoses;
}

export function mrMedicinesMapper(res:Record<string,any>) {
    let medicines:MedicineDoses[] = [];
    res?.map( (med) => {
        let medDoses:MedicineDoses = medicineDosesMapper(med);
        medicines.push(medDoses);
    })
    return medicines;
}

export function mrTreatmentsMapper(res:Record<string,any>) {
    let treatments:Treatment[] = [];
    res?.map( (treat) => {
        treatments.push(treatmentMapper(treat.treatments_id));
    })
    return treatments;
}

export function mrItemsMapper(res:Record<string,any>) {
    let items:MedicalRecordItem[] = [];
    res?.map( (item) => {
        let mrItem = defaultMedicalRecordItem;
        mrItem.items_id = itemMapper(item.items_id);
        mrItem.notes = item.notes;
        mrItem.type = item.type;
        items.push(mrItem);
    })
    return items;
}

type Organization = {
    organization: number,
}

export type MRItemCreator = Omit<MedicalRecordItem, 'items_id'> & { items_id: number, organization: number } 
export function mrItemCreatorMapper(mrItem:MedicalRecordItem, orgID:number) {
    let item:MRItemCreator = {
        items_id: mrItem.items_id.id,
        notes: mrItem.notes,
        type: mrItem.type,
        quantity: mrItem.quantity,
        organization: orgID,
    };
    return item;
}

export type MedicalRecordNoID = Omit<MedicalRecord, 'id'|'items'> & Organization & { items: MRItemCreator[] };
export function medicalRecordNoIDMapper(medicalRecord:MedicalRecord, items:MRItemCreator[], orgID:number) {

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
        items: items,
        physical_checkup: medicalRecord.physical_checkup,
        date_created: medicalRecord.date_created,
        date_updated: medicalRecord.date_updated,
        organization: orgID,
    }
    return medicalRecordNoID;
}

export type MedicalRecordCreator = Omit<MedicalRecord, 'id'|'items'|'patient'|'doctor'|'physical_checkup'> & { patient:number, items: MRItemCreator[], doctor:number, physical_checkup:number } & Organization;
export function medicalRecordCreatorMapper(medicalRecord:MedicalRecord, items:MRItemCreator[], orgID:number) {

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
        items: items,
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

export type MedicineDosesPatcher = Omit<MedicineDoses, 'medicine'> & Organization & { medicines_id: number };
export function medicineDosesPatcherMapper(medicineDoses:MedicineDoses, orgID:number) {
    let medicineDosesPatcher: MedicineDosesPatcher = {
        medicines_id: medicineDoses.medicine.id,
        doses: medicineDoses.doses,
        quantity: medicineDoses.quantity,
        organization: orgID,
    }
    return medicineDosesPatcher;
}

type MedicineDosesPatchers = {
    medicines: MedicineDosesPatcher[],
}

export type MedicalRecordPatcher = Omit<MedicalRecord, 'items'|'medicines'|'patient'|'doctor'|'organization'|'date_created'|'treatments'|'illnesses'> & IllnessPatchers & TreatmentPatchers & MedicineDosesPatchers & { items:MRItemCreator[], organization:number, status:string };
export function medicalRecordPatcherMapper(medicalRecord:MedicalRecord, items: MRItemCreator[], illnesses: IllnessPatcher[], meds: MedicineDosesPatcher[], treatments:TreatmentOrg[], orgID:number, status:string) {

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
        items: items,
        physical_checkup: medicalRecord.physical_checkup,
        date_updated: medicalRecord.date_updated,
        status: status,
        organization: orgID,
    }
    return medicalRecordPatcher;
}