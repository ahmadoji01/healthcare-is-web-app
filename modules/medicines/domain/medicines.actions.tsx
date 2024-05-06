import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { createItem, readItems, withToken } from "@directus/sdk";
import { MedicineNoID } from "./medicine";

export const getAllMedicines = (token:string, page:number) => directusClient.request( withToken(token, readItems('medicines', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const medicineExistChecker = (token:string, name = "") => 
	directusClient.request( 
		withToken(token, readItems('medicines', { 
			filter: {
				name: { _eq: name }
			} 
		})) 
	)

export const createAMedicine = (token:string, medicine:MedicineNoID) => 
    directusClient.request( withToken(token, createItem('medicines', medicine)) )
    