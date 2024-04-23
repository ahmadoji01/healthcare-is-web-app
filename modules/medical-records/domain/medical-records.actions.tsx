import { createItem, updateItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { MedicalRecordNoID } from "./medical-record";

export const createAMedicalRecord = (token:string, medicalRecord:MedicalRecordNoID) => 
	directusClient.request( withToken(token, createItem('medical_records', medicalRecord)) )

export const updateAMedicalRecord = (token:string, id:number, data:object) => directusClient.request( withToken(token, updateItem('medical_records', id, data)));