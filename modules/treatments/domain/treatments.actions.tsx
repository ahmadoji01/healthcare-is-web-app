import { aggregate, createItem, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { TreatmentNoID } from "./treatment";

export const getAllTreatments = (token:string, page:number) => directusClient.request( withToken(token, readItems('treatments', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalTreatments = (token:string) => directusClient.request( withToken(token, aggregate('treatments', { aggregate: { count: '*' } })) );
export const createATreatment = (token:string, treatment:TreatmentNoID) => 
	directusClient.request( withToken(token, createItem('treatments', treatment)) )