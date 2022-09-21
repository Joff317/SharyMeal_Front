import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../utils/variables";


const token = Cookies.get("token");

const API_REQUEST = axios.create({ baseURL: API });
API_REQUEST.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		// ...headers, <-- erreur de la ressource THP, à supprimer.
		"Content-Type": "application/json",
		Authorization: `Bearer ${headers.Authorization ||  token}`,
	},
}));

const POST_IMAGES = axios.create();
POST_IMAGES.interceptors.request.use(({ headers, ...config }) => ({
	...config,
	headers: {
		// ...headers, <-- erreur de la ressource THP, à supprimer.
		"Content-Type": "multipart/formdata",
		Authorization: `Bearer ${headers.Authorization ||  token}`,
	},
}));

const GEOLOCATION = axios.create();
GEOLOCATION.interceptors.request.use();

export default class APIManager {

	// Requests common to all resources
	static async get(route) {
		const response = await API_REQUEST.get(route)
		return response.data;
	}

	static async create(route, body){
		const response = await API_REQUEST.post(route, body)

		return response.data;
	}

	static async edit(route, body){
		const response = await API_REQUEST.put(route, body)

		return response.data;
	}

	static async delete(route) {
		const response = await API_REQUEST.delete(route)
		return response.data;
	}

	// Request that needs to be customized

	static async updateMe(route, body){
		const response = await API_REQUEST.put(route, body)

		return response;
	}

	// We keep the classical fetch request for update meal images, as this request is not working yet.
	// static async postImages (mealId, data) {
	// 	console.log('data from AXIOS', data)
	// 	const response = await POST_IMAGES.put(
	// 		`meals/${mealId}`, 
	// 		{
	// 			data
	// 		}
	// 	)

	// 	return response.data;
	// }

	static async getLocationData(route) {
		const response = await GEOLOCATION.get(route);

		return response.data;
	}

	static async orderConfirmation(meal, guestRegistered) {
		const response = await API_REQUEST.post(
			"charges",
			{
				amount: parseInt(`${meal.price * guestRegistered}00`),
        		currency: "eur",
			}
		)
		
		return response.data;
	}
}
