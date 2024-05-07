import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { createItem, readItems, updateItem, withToken } from "@directus/sdk";

export const getOrganization = (token:string, page:number) => directusClient.request( withToken(token, readItems('organizations', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const updateOrganization = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('organizations', id, data)));