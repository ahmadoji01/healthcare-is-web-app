import { aggregate, createItem, readItems, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { StaffNoID } from "./staff";

export const getAllStaffs = (token:string, page:number) => directusClient.request( withToken(token, readItems('staffs', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const getTotalStaffs = (token:string) => directusClient.request( withToken(token, aggregate('staffs', { aggregate: { count: '*' } })) );

export const createAStaff = (token:string, staff:StaffNoID) => 
	directusClient.request( withToken(token, createItem('staffs', staff)) )

export const staffExistChecker = (token:string, idCardNumber = '', familyIDNumber = '') => 
	directusClient.request( 
		withToken(token, readItems('staffs', { 
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