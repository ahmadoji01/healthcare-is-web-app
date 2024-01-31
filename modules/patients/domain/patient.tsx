export interface Patient {
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