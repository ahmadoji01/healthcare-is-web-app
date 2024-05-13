import { createItem, deleteItem, readItems, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { MedicalRecordCreator } from "./medical-record";
import { LIMIT_PER_PAGE } from "@/constants/request";

export const createAMedicalRecord = (token:string, medicalRecord:MedicalRecordCreator) => 
	directusClient.request( withToken(token, createItem('medical_records', medicalRecord)) )
export const updateAMedicalRecord = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('medical_records', id, data)));
export const getAllMedicalRecords = (token:string, page:number) => directusClient.request( withToken(token, readItems('medical_records', { fields: ['*.*'], limit: LIMIT_PER_PAGE, page })) );
export const deleteAMedicalRecord = (token:string, id:number) => directusClient.request( withToken(token, deleteItem('medical_records', id)));