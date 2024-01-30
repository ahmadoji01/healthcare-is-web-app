import { defaultResponse, directusClient } from "@/utils/response-handler";
import { createDirectus, readMe, rest, withToken } from "@directus/sdk";
import axios from 'axios';

export const signIn = async (email = "", password = "") => {
	let resp = defaultResponse;
	const axiosInstance = axios.create({
		withCredentials: true,
		headers: { "content-type": "application/json" }
	});
	return axiosInstance.post("http://localhost:8055/auth/login", { email, password, mode: 'cookie' })
		.then(res => {
			resp.error = false;
			resp.errorMessage = "";
			resp.data = res.data;
			return resp;
		})
		.catch(function (error) {
			resp.error = true;
			resp.errorMessage = error.message;
			return resp;
		});
}

export const refreshToken = () => {
	const token = localStorage.getItem('refresh_token');
	let resp = defaultResponse;
	return axios.post('http://localhost:8080/auth/refresh', { refresh_token: token, mode: 'json'}, { headers: { withCredentials: true } })
		.then(res => {
			resp.statusCode = res.status;
			if (res.status === 401) {
				resp.error = true;
				resp.errorMessage = "Unauthorized";
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				window.location.href = '/';
			}
			if (res.status !== 200) {
				resp.error = true;
				resp.errorMessage = res.data.errors[0]?.message;
				return resp;
			}
			resp.error = false;
			localStorage.setItem("access_token", res.data.data.access_token);
			localStorage.setItem("refresh_token", res.data.data.refresh_token);
			resp.data = res.data;
			return resp;
		})
		.catch(function (error) {
			console.log(error);
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			//window.location.href = '/';
		});
}
export const getCurrentUser = (token:string) => axios.get("http://localhost:8080/users/me?fields=*.*", { headers: { 'Authorization': 'Bearer ' + token } }).then(res => res.data.data);
export const getUserMe = (token:string) => directusClient.request( withToken(token, readMe({ fields: ['*.*'] })) );