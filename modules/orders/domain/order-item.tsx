import Medication from "@/modules/medical-records/domain/medication";
import { Treatment } from "@/modules/treatments/domain/treatment";

interface OrderItem {
    id: number,
    medication: Medication | null,
    treatment: Treatment | null,
    name: string,
    description: string,
    price: number,
    image: string,
}

export default OrderItem;