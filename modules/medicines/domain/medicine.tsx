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