import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { readItems, withToken } from "@directus/sdk";

export const getAllMedicines = (token:string, page:number) => directusClient.request( withToken(token, readItems('medicines', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );