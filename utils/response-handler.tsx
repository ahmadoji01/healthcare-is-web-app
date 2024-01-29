import { TOKEN_EXPIRED } from "@/constants/error"
import { redirect } from "next/navigation";

export interface FetchResponse {
    error: boolean,
    loading: boolean,
    statusCode: number,
    errorMessage: string,
    data: object,
}

export const defaultResponse: FetchResponse = {
    error: false,
    loading: false,
    statusCode: 0,
    errorMessage: "",
    data: {},
}

export const isTokenExpired = (message:string) => {
    if (message == TOKEN_EXPIRED) {
        return true;
    }
    return false;
}

export const isLoggedIn = () => {
    let token = localStorage.getItem('access_token');
    if (token == null) {
        redirect('/');
    }
    return true;
}