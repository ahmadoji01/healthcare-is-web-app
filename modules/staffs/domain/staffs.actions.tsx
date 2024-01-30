import { aggregate, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/response-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllStaffs = (token:string, page:number) => directusClient.request( withToken(token, readItems('staffs', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalStaffs = (token:string) => directusClient.request( withToken(token, aggregate('staffs', { aggregate: { count: '*' } })) );