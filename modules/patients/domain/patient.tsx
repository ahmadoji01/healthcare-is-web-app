export type Patient = {
    id: number,
    name: string,
    fathers_name: string,
    mothers_name: string,
    birthday: Date,
    religion: string,
    job: string,
    education: string,
    marrital_status: string,
    gender: string,
    id_card_number: string,
    address: string,
    slug: string|null,
    family_id_number: string|null
}

export const defaultPatient: Patient = {
    id: 0,
    name: "",
    fathers_name: "",
    mothers_name: "",
    birthday: new Date,
    religion: "",
    job: "",
    education: "",
    marrital_status: "",
    gender: "",
    id_card_number: "",
    address: "",
    slug: null,
    family_id_number: null
}

export function patientMapper(res:Record<string,any>) {
    let patient = defaultPatient;
    
    if (res == null) {
        return patient;
    }
    
    patient = { 
        id: res.id, 
        name: res.name, 
        fathers_name: res.fathers_name,
        mothers_name: res.mothers_name,
        birthday: res.birthday, 
        religion: res.religion, 
        job: res.job, 
        education: res.education, 
        marrital_status: res.marrital_status,
        gender: res.gender,
        id_card_number: res.id_card_number,
        address: res.address,
        slug: res.slug,
        family_id_number: res.family_id_number,
    }
    return patient;
}

type PatientOrganization = {
    patient_organizations: object,
}

export type PatientNoID = Omit<Patient, 'id'> & PatientOrganization;
export function patientNoIDMapper(patient:Patient, orgID:number) {

    let patientNoID: PatientNoID = { 
        name: patient.name, 
        fathers_name: patient.fathers_name,
        mothers_name: patient.mothers_name,
        birthday: patient.birthday, 
        religion: patient.religion, 
        job: patient.job, 
        education: patient.education, 
        marrital_status: patient.marrital_status,
        gender: patient.gender,
        id_card_number: patient.id_card_number,
        address: patient.address,
        slug: patient.slug,
        family_id_number: patient.family_id_number,
        patient_organizations: [{ organizations_id: orgID }]
    }
    return patientNoID;
}