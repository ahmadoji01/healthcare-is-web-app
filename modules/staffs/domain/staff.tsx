export interface Staff {
    id: number,
    name: string,
    birthday: Date,
    marrital_status: string,
    education: string,
    id_card_number: string,
    family_id_number: string,
    address: string,
}

export const defaultStaff: Staff = {
    id: 0,
    name: "",
    birthday: new Date,
    marrital_status: "",
    education: "",
    id_card_number: "",
    family_id_number: "",
    address: "",
}

export function staffMapper(res:Record<string,any>) {
    let staff = defaultStaff;
    staff = { 
        id: res.id, 
        name: res.name, 
        birthday: res.birthday, 
        marrital_status: res.marrital_status,
        education: res.education,
        id_card_number: "",
        family_id_number: "",
        address: "",
    }
    return staff;
}

type StaffOrganization = {
    staff_organizations: object,
}

export type StaffNoID = Omit<Staff, 'id'> & StaffOrganization;
export function staffNoIDMapper(staff:Staff, orgID:number) {

    let staffNoID: StaffNoID = { 
        name: staff.name, 
        birthday: staff.birthday, 
        marrital_status: staff.marrital_status,
        education: staff.education, 
        id_card_number: staff.id_card_number,
        family_id_number: staff.family_id_number,
        address: staff.address,
        staff_organizations: [{ organizations_id: orgID }],
    }
    return staffNoID;
}