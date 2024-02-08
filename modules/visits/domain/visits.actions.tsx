import { aggregate, createItem, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const getAllVisits = (token:string, page:number) => directusClient.request( withToken(token, readItems('visits', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalPatients = (token:string) => directusClient.request( withToken(token, aggregate('patients', { aggregate: { count: '*' } })) );

export const getVisitByDoctorID = (token:string, doctorID = 0) => 
	directusClient.request( 
		withToken(token, readItems('visits', { fields: ['*.*'],
			filter: {
				doctor: { _eq: doctorID }
			} 
		})) 
	)