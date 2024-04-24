import { Patient, defaultPatient } from "@/modules/patients/domain/patient";
import OrderItem, { orderItemsMapper } from "./order-item";
import { Visit, defaultVisit, visitMapper } from "@/modules/visits/domain/visit";
import { ORDER_STATUS } from "./order.constants";

export interface Order {
    id: number,
    patient: Patient|null,
    order_items: OrderItem[],
    total: number,
    status: string,
    visit: Visit,
}

export const defaultOrder: Order = {
    id: 0,
    patient: defaultPatient,
    order_items: [],
    total: 0,
    status: ORDER_STATUS.inactive,
    visit: defaultVisit,
}

export function orderMapper(res:Record<string,any>) {
    let order = defaultOrder;
    order = { 
        id: res.id, 
        patient: res.patient,
        order_items: orderItemsMapper(res.order_items),
        total: res.total,
        status: res.status,
        visit: visitMapper(res.visit),
    }
    return order;
}

type Organization = {
    organization: number,
}

export type OrderCreator = Omit<Order, 'id'|'visit'> & Organization & { visit: number };
export function orderCreatorMapper(order:Order, visitID:number, orgID:number) {

    let orderCreator: OrderCreator = { 
        patient: order.patient,
        order_items: order.order_items,
        total: order.total,
        status: order.status,
        visit: visitID,
        organization: orgID,
    }
    return orderCreator;
}