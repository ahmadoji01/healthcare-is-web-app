interface Avatar {
	id: string,
	filename_download: string,
}

export interface User {
	id: string,
	first_name: string,
	last_name: string,
	avatar: Avatar|null,
	username: string|null,
	role: string,
	organizationID: number,
}

export const defaultUser:User = {
    id: "",
	first_name: "",
	last_name: "",
	avatar: null,
	username: null,
	role: "",
	organizationID: 0,
}