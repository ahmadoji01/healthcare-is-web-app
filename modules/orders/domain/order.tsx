import { Patient, defaultPatient } from "@/modules/patients/domain/patient";
import { defaultOrderItem, OrderItem, OrderItemCreator, OrderItemPatcher, orderItemPatcherMapper, orderItemsMapper } from "./order-item";
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
    date_created: Date,
    date_updated: Date,
}

export const defaultOrder: Order = {
    id: 0,
    patient: defaultPatient,
    order_items: [],
    total: 0,
    status: ORDER_STATUS.inactive,
    doctor_paid: DOCTOR_PAID.no_doctor,
    visit: defaultVisit,
    date_created: new Date,
    date_updated: new Date,
}

export function orderMapper(res:Record<string,any>) {
    let order = defaultOrder;
    order = { 
        id: res.id, 
        patient: res.patient? res.patient:defaultPatient,
        order_items: res.order_items? orderItemsMapper(res.order_items):[],
        total: res.total,
        status: res.status,
        doctor_paid: res.doctor_paid? res.doctor_paid : DOCTOR_PAID.no_doctor,
        visit: res.visit? visitMapper(res.visit):defaultVisit,
        date_created: res.date_created,
        date_updated: res.date_updated,
    }
    return order;
}

type Organization = {
    organization: number,
}

export type OrderCreator = Omit<Order, 'id'|'patient'|'visit'|'date_created'|'date_updated'> & Organization & { patient:number|null, visit: number|null };
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

export type OrderPatcher = Omit<Order, 'id'|'patient'|'visit'|'order_items'|'date_created'|'date_updated'> & Organization & { order_items: OrderItemCreator[], patient:number|null, visit:number|null };
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

export interface MonthlySales {
    date_updated_month: number,
    total: number, 
}

export function monthlySalesMapper(res:Record<string,any>) {
    let result:MonthlySales = {
        date_updated_month: res.date_updated_month? parseInt(res.date_updated_month) : -1,
        total: res.sum?.total? res.sum.total : 0,
    }
    return result;
}

export interface ItemQuantitySold {
    item: number,
    quantity: number,
}

export function itemQuantitySoldMapper(res:Record<string,any>) {
    let result:ItemQuantitySold = {
        item: res.item? parseInt(res.item) : -1,
        quantity: res.sum?.quantity? res.sum.quantity : 0,
    }
    return result;
}