export interface Doctor {
    id: number,
    name: string,
    birthday: Date,
    specialization: string,
    education: string,
    license_number: string,
    marrital_status: "",
    address: string,
}

export const defaultDoctor: Doctor = {
    id: 0,
    name: "",
    birthday: new Date,
    specialization: "",
    education: "",
    license_number: "",
    marrital_status: "",
    address: "",
}

export function doctorMapper(res:Record<string,any>) {
    let doctor = defaultDoctor;
    doctor = { 
        id: res.id, 
        name: res.name, 
        birthday: res.birthday,
        specialization: res.specialization,
        education: res.education, 
        license_number: res.license_number,
        marrital_status: res.marrital_status,
        address: res.address,
    }
    return doctor;
}