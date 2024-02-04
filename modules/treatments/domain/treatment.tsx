export interface Treatment {
    id: number,
    name: string,
    code: string,
    price: number,
}

export const defaultTreatment: Treatment = {
    id: 0,
    name: "",
    code: "",
    price: 0,
}

export function treatmentMapper(res:Record<string,any>) {
    let treatment = defaultTreatment;
    treatment = { 
        id: res.id, 
        name: res.name, 
        code: res.code,
        price: res.price,
    }
    return treatment;
}

type Organization = {
    organization: number,
}

export type TreatmentNoID = Omit<Treatment, 'id'> & Organization;
export function treatmentNoIDMapper(treatment:Treatment, orgID:number) {

    let treatmentNoID: TreatmentNoID = { 
        name: treatment.name, 
        code: treatment.code,
        price: treatment.price,
        organization: orgID,
    }
    return treatmentNoID;
}