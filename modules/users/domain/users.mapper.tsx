import { User, defaultUser } from "./user";

export const UserMapper = (response:object) => {
	let user = defaultUser;
	user.id = response.id;
	user.firstName = response.first_name;
	user.lastName = response.last_name;
}