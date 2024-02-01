import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, readItems, withToken } from "@directus/sdk";

export const getAllDoctors = (token:string, page:number) => directusClient.request( withToken(token, readItems('doctors', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalDoctors = (token:string) => directusClient.request( withToken(token, aggregate('doctors', { aggregate: { count: '*' } })) );