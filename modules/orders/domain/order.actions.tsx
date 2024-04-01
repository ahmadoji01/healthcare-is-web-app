import { createItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { OrderNoID } from "./order";

export const createAnOrder = (token:string, order:OrderNoID) => 
	directusClient.request( withToken(token, createItem('orders', order)) )