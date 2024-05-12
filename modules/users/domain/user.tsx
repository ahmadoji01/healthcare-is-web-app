interface Avatar {
	id: string,
	filename_download: string,
}

export interface User {
	id: string,
	first_name: string,
	last_name: string,
	avatar: Avatar|null,
	email: string,
	username: string,
	password: string,
	role_name: string ,
}

export const defaultUser:User = {
    id: "",
	first_name: "",
	last_name: "",
	avatar: null,
	email: "",
	username: "",
	password: "",
	role_name: "",
}

export function userMapper(res:Record<string,any>) {
    let user = defaultUser;
    user = { 
        id: res.id, 
        first_name: res.first_name, 
        last_name: res.last_name, 
        avatar: res.avatar? res.avatar : null,
        username: res.username,
		email: res.email,
		password: "",
        role_name: res.role? res.role.name : "",
    }
    return user;
}