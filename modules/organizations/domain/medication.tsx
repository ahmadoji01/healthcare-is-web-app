import Medicine from "@/modules/medicines/domain/medicine";

interface Medication {
    medicine: Medicine,
    doses: string,
    quantity: number,
}

export default Medication;