import { Patient, defaultPatient, patientMapper } from "@/modules/patients/domain/patient";

export type Visit = {
    id: number,
    date_created: Date,
    date_updated: Date,
    queue_number: string,
    status: string,
    patient: Patient,
    order: number,
}

export const defaultVisit: Visit = {
    id: 0,
    date_created: new Date,
    date_updated: new Date,
    queue_number: "",
    status: "",
    patient: defaultPatient,
    order: 0,
}

export function visitMapper(res:Record<string,any>) {
    let visit = defaultVisit;
    visit = { 
        id: res.id, 
        date_created: res.date_created, 
        date_updated: res.date_updated,
        queue_number: res.queue_number,
        status: res.status,
        patient: patientMapper(res.patient), 
        order: res.order,
    }
    return visit;
}

type Organization = {
    organization: number,
}

export type VisitNoID = Omit<Visit, 'id'> & Organization;
export function visitNoIDMapper(visit:Visit, orgID:number) {

    let visitNoID: VisitNoID = {
        date_created: visit.date_created, 
        date_updated: visit.date_updated, 
        queue_number: visit.queue_number,
        patient: visit.patient,
        status: visit.status,
        order: visit.order,
        organization: orgID,
    }
    return visitNoID;
}