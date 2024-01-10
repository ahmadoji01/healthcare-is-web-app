import MedicineCategory from "./medicine-category";

interface Medicine {
    id: number,
    code: string,
    name: string,
    stock: number,
    category: MedicineCategory,
    price: number,
}

export default Medicine;