import { aggregate, createItem, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { Patient, PatientNoID } from "./patient";

export const getAllPatients = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalPatients = (token:string) => directusClient.request( withToken(token, aggregate('patients', { aggregate: { count: '*' } })) );
export const getPatientsToBeExamined = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );

export const patientExistChecker = (token:string, idCardNumber = '', familyIDNumber = '') => 
	directusClient.request( 
		withToken(token, readItems('patients', { 
			filter: {
				_or: [
					{
						id_card_number: { _eq: idCardNumber }
					},
					{
						family_id_number: { _eq: familyIDNumber }
					}
				]
			} 
		})) 
	)
    
export const createAPatient = (token:string, patient:PatientNoID) => 
	directusClient.request( withToken(token, createItem('patients', patient)) )