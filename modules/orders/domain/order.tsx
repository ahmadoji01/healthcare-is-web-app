import { Patient, defaultPatient } from "@/modules/patients/domain/patient";
import OrderItem, { OrderItemPatcher, orderItemPatcherMapper, orderItemsMapper } from "./order-item";
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

export type OrderCreator = Omit<Order, 'id'|'patient'|'visit'> & Organization & { patient:number|null, visit: number };
export function orderCreatorMapper(order:Order, visitID:number, orgID:number) {

    let orderCreator: OrderCreator = { 
        patient: order.patient ? order.patient.id : null,
        order_items: order.order_items,
        total: order.total,
        status: order.status,
        visit: visitID,
        organization: orgID,
    }
    return orderCreator;
}

export type OrderPatcher = Omit<Order, 'id'|'patient'|'visit'|'order_items'> & Organization & { order_items: OrderItemPatcher[], patient:number|null, visit:number|null };
export function orderPatcherMapper(order:Order, orgID:number) {

    let items:OrderItemPatcher[] = [];
    order.order_items?.map( (item) => items.push(orderItemPatcherMapper(item, orgID)));

    let orderPatcher: OrderPatcher = { 
        patient: order.patient ? order.patient.id : null,
        order_items: items,
        total: order.total,
        status: order.status,
        visit: order.visit ? order.visit.id : null,
        organization: orgID,
    }
    return orderPatcher;
}