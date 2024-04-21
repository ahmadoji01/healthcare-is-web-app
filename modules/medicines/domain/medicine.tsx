import MedicineCategory, { defaultMedicineCategory } from "./medicine-category";

export interface Medicine {
    id: number,
    code: string,
    name: string,
    stock: number,
    category: MedicineCategory,
    price: number,
}

export const defaultMedicine: Medicine = {
    id: 0,
    code: "",
    name: "",
    stock: 0,
    category: defaultMedicineCategory,
    price: 0,
}

export function medicineMapper(res:Record<string,any>) {
    let medicine = defaultMedicine;
    medicine = { 
        id: res.id, 
        name: res.name, 
        code: res.code,
        price: res.price,
        stock: res.stock,
        category: res.category,
    }
    return medicine;
}

type Organization = {
    organization: number,
}

export type MedicineNoID = Omit<Medicine, 'id'> & Organization;
export function medicineNoIDMapper(medicine:Medicine, orgID:number) {

    let medicineNoID: MedicineNoID = { 
        name: medicine.name, 
        code: medicine.code,
        price: medicine.price,
        stock: medicine.stock,
        category: medicine.category,
        organization: orgID,
    }
    return medicineNoID;
}