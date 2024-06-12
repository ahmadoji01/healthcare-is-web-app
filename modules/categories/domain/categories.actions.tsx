import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { CategoryCreator } from "./category";

export const getAllCategories = (token:string, page:number) => directusClient.request( withToken(token, readItems('categories', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalCategories = (token:string) => directusClient.request( withToken(token, aggregate('_categories', { aggregate: { count: '*' } })) );
export const getAllCategoriesWithFilter = (token:string, filter:object) => 
	directusClient.request( withToken(token, readItems('categories', { fields: ['*.*'], filter: filter })) );

export const createACategory = (token:string, category:CategoryCreator) => directusClient.request( withToken(token, createItem('categories', category)) );
export const updateACategory = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('categories', id, data)) );
export const deleteACategory = (token:string, id:number) => directusClient.request( withToken(token, deleteItem('categories', id)) );

export const searchCategories = (token:string, query:string, page:number) =>
	directusClient.request(
		withToken(token, readItems('categories', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page }))
	)
export const getTotalSearchCategories = (token:string, query:string) => directusClient.request( withToken(token, readItems('categories', { search: query, aggregate: { count: '*' } })));