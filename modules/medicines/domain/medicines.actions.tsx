import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, readItems, withToken } from "@directus/sdk";
import { MedicineNoID } from "./medicine";

export const getAllMedicines = (token:string, page:number) => directusClient.request( withToken(token, readItems('medicines', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalMedicines = (token:string) => directusClient.request( withToken(token, aggregate('medicines', { aggregate: { count: '*' } })) );
export const medicineExistChecker = (token:string, name = "") => 
	directusClient.request( 
		withToken(token, readItems('medicines', { 
			filter: {
				name: { _eq: name }
			} 
		})) 
	);

export const createAMedicine = (token:string, medicine:MedicineNoID) => 
    directusClient.request( withToken(token, createItem('medicines', medicine)) );

export const searchMedicines = (token:string, query:string, page:number) =>
	directusClient.request(
		withToken(token, readItems('medicines', { fields: ['*.*'], search: query, limit: LIMIT_PER_PAGE, page }))
	)