import { aggregate, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/response-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllPatients = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalPatients = (token:string) => directusClient.request( withToken(token, aggregate('patients', { aggregate: { count: '*' } })) );