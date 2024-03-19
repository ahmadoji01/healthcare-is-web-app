import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine";
import { Treatment, defaultTreatment } from "@/modules/treatments/domain/treatment";
import { Order, defaultOrder } from "./order";

interface OrderItem {
    id: number,
    medicine: Medicine | null,
    treatment: Treatment | null,
    name: string,
    description: string,
    price: number,
    quantity: number,
    total: number,
}

export const orderItemCategory = (item:OrderItem) => {
  if (item.medicine !== null) {
    return "Medicine";
  }

  if (item.treatment !== null) {
    return "Treatment";
  }

  return "Other";
}

export const defaultOrderItem:OrderItem = {
  id: 0,
  medicine: defaultMedicine,
  treatment: defaultTreatment,
  name: "",
  description: "",
  price: 0,
  quantity: 0,
  total: 0,
}

export const orderItemMapper = (res:Record<string,any>) => {
  let orderItem = defaultOrderItem;
  orderItem = { 
    id: res.id, 
    medicine: res.medicine,
    treatment: res.treatment,
    name: res.name,
    description: res.description,
    price: res.price,
    quantity: res.quantity,
    total: res.total,
  }
  return orderItem;
}

export const orderItemsMapper = (order_items:Record<string, any>) => {
  let results:OrderItem[] = [];
  order_items.map( (item:Record<string,any>) => {
    results.push(orderItemMapper(item));
  });
  return results;
}

export default OrderItem;