import { Patient, defaultPatient } from "@/modules/patients/domain/patient";
import OrderItem, { OrderItemPatcher, orderItemPatcherMapper, orderItemsMapper } from "./order-item";
import { Visit, defaultVisit, visitMapper } from "@/modules/visits/domain/visit";
import { DOCTOR_PAID, ORDER_STATUS } from "./order.constants";

export interface Order {
    id: number,
    patient: Patient|null,
    order_items: OrderItem[],
    total: number,
    status: string,
    doctor_paid: string,
    visit: Visit,
}

export const defaultOrder: Order = {
    id: 0,
    patient: defaultPatient,
    order_items: [],
    total: 0,
    status: ORDER_STATUS.inactive,
    doctor_paid: DOCTOR_PAID.no_doctor,
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
        doctor_paid: res.doctor_paid? res.doctor_paid : DOCTOR_PAID.no_doctor,
        visit: visitMapper(res.visit),
    }
    return order;
}

type Organization = {
    organization: number,
}

export type OrderCreator = Omit<Order, 'id'|'patient'|'visit'> & Organization & { patient:number|null, visit: number|null };
export function orderCreatorMapper(order:Order, visitID:number|null, orgID:number) {

    let orderCreator: OrderCreator = { 
        patient: order.patient ? order.patient.id : null,
        order_items: order.order_items,
        total: order.total,
        status: order.status,
        visit: visitID,
        doctor_paid: order.doctor_paid,
        organization: orgID,
    }
    return orderCreator;
}

export type OrderPatcher = Omit<Order, 'id'|'patient'|'visit'|'order_items'> & Organization & { order_items: OrderItemPatcher[], patient:number|null, visit:number|null };
export function orderPatcherMapper(order:Order, orgID:number) {

    let items:OrderItemPatcher[] = [];
    order.order_items?.map( (item) => items.push(orderItemPatcherMapper(item, orgID)));

    let visitID:number|null = null;
    if (order.visit.id !== 0) {
        visitID = order.visit.id;
    }

    let orderPatcher: OrderPatcher = { 
        patient: order.patient ? order.patient.id : null,
        order_items: items,
        total: order.total,
        status: order.status,
        visit: visitID,
        doctor_paid: order.doctor_paid,
        organization: orgID,
    }
    return orderPatcher;
}