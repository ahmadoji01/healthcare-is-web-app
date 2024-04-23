import { createItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { OrderCreator } from "./order";

export const createAnOrder = (token:string, order:OrderCreator) => 
	directusClient.request( withToken(token, createItem('orders', order)) );

export const getOrdersWithFilter = (token:string, filter:object) => 
	directusClient.request( 
		withToken(token, readItems('orders', { fields: ['*.*'],
			filter: filter
		})) 
	)

export const updateOrder = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('orders', id, data)));