import { Doctor, defaultDoctor, doctorMapper } from "@/modules/doctors/domain/doctor";
import { MedicalRecord, defaultMedicalRecord } from "@/modules/medical-records/domain/medical-record";
import { Patient, defaultPatient, patientMapper } from "@/modules/patients/domain/patient";

export type Visit = {
    id: number,
    date_created: Date,
    date_updated: Date,
    queue_number: string,
    status: string,
    patient: Patient,
    doctor: Doctor,
    medical_record: MedicalRecord,
    
}

export const defaultVisit: Visit = {
    id: 0,
    date_created: new Date,
    date_updated: new Date,
    queue_number: "",
    status: "",
    patient: defaultPatient,
    doctor: defaultDoctor,
    medical_record: defaultMedicalRecord,
}

export function visitMapper(res:Record<string,any>) {
    let visit = defaultVisit;

    if (res === null) {
        return visit;
    }

    visit = { 
        id: parseInt(res.id), 
        date_created: res.date_created, 
        date_updated: res.date_updated,
        queue_number: res.queue_number,
        status: res.status,
        patient: patientMapper(res.patient), 
        doctor: doctorMapper(res.doctor),
        medical_record: res.medical_record,
    }
    return visit;
}

type Organization = {
    organization: number,
}

export type VisitCreator = Omit<Visit, 'id'|'patient'|'doctor'|'medical_record'> & Organization & { patient:number, doctor:number, medical_record: number };
export function visitCreatorMapper(visit:Visit, medicalRecordID:number, orgID:number) {

    let visitCreator: VisitCreator = {
        date_created: visit.date_created, 
        date_updated: visit.date_updated, 
        queue_number: visit.queue_number,
        patient: visit.patient.id,
        doctor: visit.doctor.id,
        status: visit.status,
        medical_record: medicalRecordID,
        organization: orgID,
    }
    return visitCreator;
}

export interface VisitCount {
    doctor: number,
    count: number,
}

export function visitCountMapper(res:Record<string,any>) {
    let visitCount:VisitCount = {
        doctor: res.doctor? parseInt(res.doctor) : 0,
        count: res.count? parseInt(res.count) : 0,
    }
    return visitCount;
}

export type VisitCountDoctor = Doctor & { count:number };