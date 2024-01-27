import { Organization } from "@/modules/organizations/domain/organization";
import { Role } from "./role";

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    accessToken: string,
    refreshToken: string,
    avatar: string,
    expiry: Date,
}

export const defaultUser: User = {
    id: 0,
    firstName: "",
    lastName: "",
    accessToken: "",
    refreshToken: "",
    avatar: "",
    expiry: new Date,
}