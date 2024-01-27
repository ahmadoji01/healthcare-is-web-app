import { defaultResponse } from "@/utils/fetch-response";

export const signIn = async (email = "", password = "") => {
	const fetchObject = { method: "POST", headers: { 'Content-type': 'application/json' }, body: JSON.stringify({ email, password }) }
	let resp = defaultResponse;
	return fetch("http://localhost:8080/auth/login", fetchObject)
		.then(res => res.json())
		.then(res => {
			resp.loading = false;
			resp.statusCode = res.status;
			if (res.error) {
				resp.error = true;
				resp.errorMessage = res.errors[0]?.message;
				return resp;
			} else {
				resp.error = false;
				localStorage.setItem("access_token", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				resp.data = res.data;
				return resp;
			}
		})
		.catch((err) => {
			resp.loading = false;
			resp.error = true;
			resp.statusCode = 500;
			resp.errorMessage = err.message;
			return resp;
		});
}

export const refreshToken = () => {
	const token = localStorage.getItem("refresh_token")? localStorage.getItem("refresh_token") : "";
	const fetchObject = { method: "POST", headers: {}, body: JSON.stringify({ refresh_token: token, mode: "json" }) };
	let resp = defaultResponse;
	return fetch("http://localhost:8080/auth/refresh", fetchObject)
		.then(res => res.json())
		.then(res => {
			resp.statusCode = res.status;
			if (res.error) {
				resp.error = true;
				resp.errorMessage = res.errors[0]?.message;
				return resp;
			} else {
				resp.error = false;
				localStorage.setItem("access_token", res.data.access_token);
				localStorage.setItem("refresh_token", res.data.refresh_token);
				resp.data = res.data;
				return resp;
			}
		})
		.catch((err) => {
			resp.loading = false;
			resp.error = true;
			resp.errorMessage = err.message;
			resp.statusCode = 500;
			return resp;
		});
}

export const getCurrentUser = () => {
	const token = localStorage.getItem("access_token")? localStorage.getItem("access_token") : "";
	const fetchObject = { method: "GET", headers: { 'Authorization': 'Bearer ' + token } };
	let resp = defaultResponse;
	return fetch("http://localhost:8080/users/me", fetchObject)
		.then(res => res.json())
		.then(res => {
			if (res.error) {
				resp.error = true;
				resp.errorMessage = res.errors[0]?.message;
				return resp;
			} else {
				resp.error = false;
				resp.data = res.data;
				return resp;
			}
		})
		.catch((err) => {
			resp.loading = false;
			resp.error = true;
			resp.errorMessage = err.message;
			return resp;
		});
}