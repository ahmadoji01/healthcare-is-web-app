import { directusClient } from "@/utils/response-handler";
import { readItems, readMe, withToken } from "@directus/sdk";

export const signIn = (email:string, password:string) => directusClient.login(email, password);
export const getUserMe = (token:string) => directusClient.request( withToken(token, readMe({ fields: ['*.*'] })) );