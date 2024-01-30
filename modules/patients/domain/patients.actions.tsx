import { readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/response-handler";

export const getAllPatients = (token:string) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'] })) );