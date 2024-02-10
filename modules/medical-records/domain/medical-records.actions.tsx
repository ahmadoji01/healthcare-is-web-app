import { createItem, withToken } from "@directus/sdk";
import { directusClient } from "@/utils/request-handler";
import { MedicalRecordNoID } from "./medical-record";

export const createAMedicalRecord = (token:string, medicalRecord:MedicalRecordNoID) => 
	directusClient.request( withToken(token, createItem('physical_checkups', medicalRecord)) )