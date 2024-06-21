import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { OrderItem } from "./order-item";

export function visitFilter(id:number):object {
    return { visit: { _eq: id } };
}

export function statusFilter(status:string):object {
    return { status: { _eq: status } };
}

export function monthFilter(month:number):object {
    return { "month(date_created)": { _eq: month } }
}

export function yearFilter(year:number):object {
    return { "year(date_created)": { _eq: year } }
}

export function orderItemDisplayName(orderItem:OrderItem):string {
    if (orderItem.type !== ITEM_TYPE.treatment) {
        return orderItem.item.name + " (" + orderItem.quantity + ")";
    }
    return orderItem.item.name;
}