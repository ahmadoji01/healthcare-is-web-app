import useSWR from "swr";
import { getCurrentUser } from "./users.actions";

export interface User {
	id: string,
	first_name: string,
	last_name: string,
	avatar: string|null,
	username: string|null,
	role: string,
}

export const defaultUser:User = {
    id: "",
	first_name: "",
	last_name: "",
	avatar: null,
	username: null,
	role: "",
}

export function useUser() {
    const token = localStorage.getItem('access_token')? localStorage.getItem('access_token') : "";
    const { data, error, isLoading } = useSWR(token, getCurrentUser);

    let user = defaultUser;
    
    if (typeof(data) !== 'undefined') {
        user = { id: data.id, first_name: data.first_name, last_name: data.last_name, avatar: data.avatar, username: data.username, role: data.role.name };
    }

    return {
      user: user,
      isLoading,
      isError: error
    }
}