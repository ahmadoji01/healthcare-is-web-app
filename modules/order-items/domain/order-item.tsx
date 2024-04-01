import Medication from "@/modules/medical-records/domain/medication";
import { Treatment } from "@/modules/treatments/domain/treatment";

interface OrderItem {
    id: number,
    medication: Medication | null,
    treatment: Treatment | null,
    name: string,
    description: string,
    price: number,
    quantity: number,
    total: number,
    image: string,
}

export const orderItemCategory = (item:OrderItem) => {
    if (item.medication !== null) {
      return "Medicine";
    }
  
    if (item.treatment !== null) {
      return "Treatment";
    }
  
    return "Other";
}

export default OrderItem;