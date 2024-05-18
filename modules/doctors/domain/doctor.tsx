import { DOCTOR_STATUS } from "./doctor.constants";

export interface Doctor {
    id: number,
    name: string,
    birthday: Date,
    gender: string,
    marrital_status: string,
    address: string,
    license_number: string,
    education: string,
    specialization: string,
}

export const defaultDoctor: Doctor = {
    id: 0,
    name: "",
    birthday: new Date,
    gender: "",
    marrital_status: "",
    address: "",
    license_number: "",
    education: "",
    specialization: "",
}

export function doctorMapper(res:Record<string,any>) {    
    let doctor = defaultDoctor;

    if (res == null) {
        return doctor;
    }

    doctor = { 
        id: res.id, 
        name: res.name, 
        birthday: res.birthday,
        gender: res.doctor,
        marrital_status: res.marrital_status,
        address: res.address,
        license_number: res.license_number,
        education: res.education,
        specialization: res.specialization,
    }
    return doctor;
}

export type DoctorNoID = Omit<Doctor, 'id'> & { doctor_organizations: object };
export function doctorNoIDMapper(doctor:Doctor, orgID:number) {

    let doctorNoID: DoctorNoID = { 
        name: doctor.name, 
        birthday: doctor.birthday,
        gender: doctor.gender,
        marrital_status: doctor.marrital_status,
        address: doctor.address,
        specialization: doctor.specialization,
        education: doctor.education, 
        license_number: doctor.license_number,
        doctor_organizations: [{ organizations_id: orgID }]
    }
    return doctorNoID;
}

export interface DoctorOrganization {
    doctor: Doctor,
    status: string,
}

export const defaultDoctorOrganization:DoctorOrganization = {
    doctor: defaultDoctor,
    status: "",
}

export function doctorOrgMapper(res:Record<string,any>) {  
    let doctorOrg = defaultDoctorOrganization;
    if (res == null) {
        return doctorOrg;
    }

    doctorOrg = { 
        doctor: doctorMapper(res.doctor),
        status: res.status? res.status : DOCTOR_STATUS.absent, 
    }
    return doctorOrg;
}

export type DoctorPatcher = Omit<Doctor, 'id'>;
export function doctorPatcherMapper(doctor:Doctor) {

    let doctorPatcher: DoctorPatcher = { 
        name: doctor.name, 
        birthday: doctor.birthday,
        gender: doctor.gender,
        marrital_status: doctor.marrital_status,
        address: doctor.address,
        specialization: doctor.specialization,
        education: doctor.education, 
        license_number: doctor.license_number,
    }
    return doctorPatcher;
}