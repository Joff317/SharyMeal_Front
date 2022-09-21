import axios from "axios";
import Cookies from "js-cookie";
import StartDate from '../icons/StartDate';

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

// We use usePostForm instead --> will probably be removed from code.
	// static async registerUser(email, password) {
	// 	const response = await API_URL.post(
	// 		"users",
	// 		JSON.stringify({ user: { email, password } })
	// 	);

	// 	Cookies.set("token", response.headers.authorization.replace("Bearer ", ""));
	// 	console.log(response);
	// 	return response.data;
	// }


	static async get(route) {
		const response = await API_URL.get(route)
		return response.data;
	}

	static async createMeal(data, cityInfo, startDate) {
		const response = await API_URL.post(
			"meals",
			{
				meal: {
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    location: {
                      city: cityInfo.city,
                      lat: cityInfo.lat,
                      lon: cityInfo.lon,
                      address: cityInfo.formatted,
                    },
                    guest_capacity: data.guest_capacity,
                    starting_date: startDate,
                    animals: data.animals,
                    alcool: data.alcool,
                    doggybag: data.doggybag,
                    diet_type: data.dietType,
                    allergens: data.allergens,
                  }
			}
		)
		return response.data;
	}
}
