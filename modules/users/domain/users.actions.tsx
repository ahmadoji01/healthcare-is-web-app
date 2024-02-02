import { directusClient } from "@/utils/request-handler";
import { readMe, updateMe, uploadFiles, withToken } from "@directus/sdk";
import { User } from "./user";

export const signIn = (email:string, password:string) => directusClient.login(email, password);
export const getUserMe = (token:string) => directusClient.request( withToken(token, readMe({ fields: ['*.*'] })) );
export const uploadAvatar = (token:string, data:FormData) => directusClient.request(withToken(token, uploadFiles(data)));
export const updateUserMe = (token:string, data:object) => directusClient.request( withToken(token, updateMe(data)));