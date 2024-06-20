import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { ItemCreator } from "./item";

export const getAllItems = (token:string, page:number) => directusClient.request( withToken(token, readItems('items', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalItems = (token:string) => directusClient.request( withToken(token, aggregate('items', { aggregate: { count: '*' } })) );
export const getItemsWithFilter = (token:string, filter:object, page:number) =>
	directusClient.request( 
		withToken(token, readItems('items', { 
			filter: filter,
			fields: ['*.*'], limit: LIMIT_PER_PAGE, page
		})) 
	);
export const getTotalItemsWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, aggregate('items', { filter: filter, aggregate: { count: '*' } })) );

export const itemExistsChecker = (token:string, name = "") => 
	directusClient.request( 
		withToken(token, readItems('items', { 
			filter: {
				name: { _eq: name }
			} 
		})) 
	);

export const createAnItem = (token:string, item:ItemCreator) => 
    directusClient.request( withToken(token, createItem('items', item)) );
export const updateAnItem = (token:string, id:number, data:object) =>
	directusClient.request( withToken(token, updateItem('items', id, data)) );
export const deleteAnItem = (token:string, id:number) =>
	directusClient.request( withToken(token, deleteItem('items', id)) );

export const searchItems = (token:string, query:string, page:number) =>
	directusClient.request(
		withToken(token, readItems('items', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page }))
	)
export const getTotalSearchItems = (token:string, query:string) => directusClient.request( withToken(token, readItems('items', { search: query, aggregate: { count: '*' } })));
export const searchItemsWithFilter = (token:string, query:string, filter:object, page:number) =>
	directusClient.request(
		withToken(token, readItems('items', { fields: ['*.*'], search: query, filter: filter, limit: LIMIT_PER_PAGE, page }))
	)
