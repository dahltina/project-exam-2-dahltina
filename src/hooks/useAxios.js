import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_API } from "../constants/api";

export default function useAxios() {
	const [auth] = useContext(AuthContext);

	const apiClient = axios.create({
		baseURL: BASE_API,
	});

	apiClient.interceptors.request.use(function (config) {
		const token = auth.token;
		config.headers.Authorization = token ? `Bearer ${token}` : "";
		return config;
	});

	return apiClient;
}
