import { aggregate, createItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { Patient, PatientNoID } from "./patient";

export const getAllPatients = (token:string, page:number) => directusClient.request( withToken(token, readItems('patients', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalPatients = (token:string) => directusClient.request( withToken(token, aggregate('patients', { aggregate: { count: '*' } })) );
export const getAPatientByIDCard = (token:string, number:string) => directusClient.request( withToken(token, readItems('patients', { filter: { id_card_number: { _contains: number } }, fields: ['*.*'], limit: LIMIT_PER_PAGE })) );

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
    
//TODO: Create also the M2M relationship simultaneously
export const createAPatient = (token:string, patient:PatientNoID) => 
	directusClient.request( withToken(token, createItem('patients', patient)) )

export const createPatientOrganizationRelationship = (token:string, patientID:number, organizationID:number) => 
	directusClient.request( withToken(token, updateItem('patients', patientID, 
		{    
			patient_organizations: [
				{
					patient_id: patientID,
					organizations_id: organizationID
				}
			]
		}
	)) )