export interface Staff {
    id: number,
    name: string,
    birthday: Date,
    marrital_status: string,
    education: string,
}

export const defaultStaff: Staff = {
    id: 0,
    name: "",
    birthday: new Date,
    marrital_status: "",
    education: "",
}

export function staffMapper(res:Record<string,any>) {
    let staff = defaultStaff;
    staff = { 
        id: res.id, 
        name: res.name, 
        birthday: res.birthday, 
        marrital_status: res.marrital_status,
        education: res.education,
    }
    return staff;
}