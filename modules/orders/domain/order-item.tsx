import { Medicine, defaultMedicine } from "@/modules/medicines/domain/medicine";
import { Treatment, defaultTreatment } from "@/modules/treatments/domain/treatment";
import { MedicalRecordItem, MedicineDoses } from "@/modules/medical-records/domain/medical-record";
import { Item, defaultItem } from "@/modules/items/domain/item";

export interface OrderItem {
    id: number,
    item: Item,
    name: string,
    description: string,
    price: number,
    quantity: number,
    total: number,
}

export const defaultOrderItem:OrderItem = {
  id: 0,
  item: defaultItem,
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
    item: res.item,
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

export type OrderItemCreator = Omit<OrderItem, 'id'|'name'|'description'|'item'> & { item:number, organization: number };
export const orderItemCreatorMapper = (mrItem:MedicalRecordItem, orgID:number) => {
  
  let price = mrItem.items_id.price;
  let total = mrItem.items_id.price * mrItem.quantity;
  let quantity = mrItem.quantity;

  let orderItemCreator:OrderItemCreator = {
    price: price,
    quantity: quantity,
    total: total,
    item: mrItem.items_id.id,
    organization: orgID,
  }
  return orderItemCreator;
}