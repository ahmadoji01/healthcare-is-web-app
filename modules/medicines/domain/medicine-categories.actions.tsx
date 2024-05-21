import { LIMIT_PER_PAGE } from "@/constants/request";
import { directusClient } from "@/utils/request-handler"
import { aggregate, createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { MedicineCategoryCreator } from "./medicine-category";

export const getAllMedicineCategories = (token:string, page:number) => directusClient.request( withToken(token, readItems('medicine_categories', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const createAMedicineCategory = (token:string, category:MedicineCategoryCreator) => directusClient.request( withToken(token, createItem('medicine_categories', category)) );
export const updateAMedicineCategory = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('medicine_categories', id, data)) );
