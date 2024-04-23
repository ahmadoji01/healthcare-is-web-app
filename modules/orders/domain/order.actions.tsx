import { createItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { OrderCreator } from "./order";

export const createAnOrder = (token:string, order:OrderCreator) => 
	directusClient.request( withToken(token, createItem('orders', order)) )