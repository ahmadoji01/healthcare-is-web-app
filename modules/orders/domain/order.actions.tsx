import { createItem, deleteItem, readItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { OrderCreator } from "./order";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllOrders = (token:string, page:number) => directusClient.request( withToken(token, readItems('orders', { fields: ['*.*.*'], limit: LIMIT_PER_PAGE, page })) );
export const createAnOrder = (token:string, order:OrderCreator) => 
	directusClient.request( withToken(token, createItem('orders', order)) );

export const getOrdersWithFilter = (token:string, filter:object, page:number) => 
	directusClient.request( 
		withToken(token, readItems('orders', { fields: ['*.*.*'], sort: ['sort', '-date_updated'], limit: LIMIT_PER_PAGE, page,
			filter: filter
		})) 
	)

export const getAnOrder = (token:string, id:number) => 
	directusClient.request( 
		withToken(token, readItem('orders', id, { fields: ['*.*.*'] }))
	)

export const updateOrder = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('orders', id, data)));
export const deleteAnOrder = (token:string, id:number) => directusClient.request( withToken(token, deleteItem('orders', id)) );
export const deleteAnOrderItem = (token:string, id:number) => directusClient.request( withToken(token, deleteItem('order_items', id)) );
