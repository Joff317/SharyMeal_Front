import axios from "axios";
import Cookies from "js-cookie";

const API_URL = axios.create({ baseURL: "http://localhost:3000/" });
const token = Cookies.get("token");

API_URL.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		...headers,
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
}));

export default class APIManager {
	static async registerUser(email, password) {
		const response = await API_URL.post(
			"users",
			JSON.stringify({ user: { email, password } })
		);

		Cookies.set("token", response.headers.authorization.replace("Bearer ", ""));
		console.log(response);
		return response.data;
	}
}
