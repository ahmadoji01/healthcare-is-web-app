import { aggregate, createItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { VisitNoID } from "./visit";

export const createAVisit = (token:string, visit:VisitNoID) => 
	directusClient.request( withToken(token, createItem('visits', visit)) )

export const getAllVisits = (token:string, page:number) => directusClient.request( withToken(token, readItems('visits', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalVisits = (token:string) => directusClient.request( withToken(token, aggregate('visits', { aggregate: { count: '*' } })) );

export const getVisitByDoctorID = (token:string, doctorID = 0) => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: ['*.*'],
			filter: {
				doctor: { _eq: doctorID }
			} 
		})) 
	)

export const getVisitByStatus = (token:string, status = "") => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: ['*.*'],
			filter: {
				status: { _eq: status }
			} 
		})) 
	)

export const updateVisit = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('visits', id, data)));