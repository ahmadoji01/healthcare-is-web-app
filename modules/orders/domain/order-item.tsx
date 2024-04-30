import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine";
import { Treatment, defaultTreatment } from "@/modules/treatments/domain/treatment";
import { Order, defaultOrder } from "./order";
import { MedicineDoses } from "@/modules/medical-records/domain/medical-record";

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

export const orderItemName = (item:OrderItem) => {
  if (item.medicine !== null) {
    return item.medicine.name;
  }
  if (item.treatment !== null) {
    return item.treatment.name;
  }
  return item.name;
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

export type OrderItemCreator = Omit<OrderItem, 'id'|'medicine'|'treatment'> & { medicine:number|null, treatment:number|null, organization: number };
export const orderItemCreatorMapper = (medicineDoses:MedicineDoses|null, treatment:Treatment|null, orgID:number) => {
  
  let price = 0;
  let total = 0;
  let quantity = 1;
  let medicineID:number|null = null;
  let treatmentID:number|null = null;
  if (medicineDoses !== null) {
    medicineID = medicineDoses.medicine.id;
    price = medicineDoses.medicine.price;
    quantity = medicineDoses.quantity;
    total = price * quantity;
  }

  if (treatment !== null) {
    treatmentID = treatment.id;
    price = treatment.price;
    total = treatment.price;
  }

  let orderItemCreator:OrderItemCreator = {
    medicine: medicineID,
    treatment: treatmentID,
    name: "",
    description: "",
    price: price,
    quantity: quantity,
    total: total,
    organization: orgID,
  }
  return orderItemCreator;

}

export default OrderItem;