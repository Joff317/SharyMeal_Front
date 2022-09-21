import axios from "axios";
import Cookies from "js-cookie";
import { API } from "../utils/variables";
import OrderConfirmation from '../components/meals/order/OrderConfirmation';


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
POST_IMAGES.interceptors.request.use(({ header, ...config }) => ({
	config,
	headers: {'content-type': 'multipart/form-data'}
}));

const GEOLOCATION = axios.create();
GEOLOCATION.interceptors.request.use();

export default class APIManager {

	// Requests common to all resources
	static async get(route) {
		const response = await API_REQUEST.get(route)
		return response.data;
	}

	static async delete(route) {
		const response = await API_REQUEST.delete(route)
		return response.data;
	}

	// Request that needs to be customized

	static async createAttendance(mealId) {
		const response = await API_REQUEST.post(
			"attendances",
			{
				attendance: {
				  meal_id: mealId,
				},
			}
		)

		return response.data;
	}

	static async createMeal(data, cityInfo, startDate) {
		const response = await API_REQUEST.post(
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

	static async editMeal(mealData, data, cityInfo, startDate) {
		const response = await API_REQUEST.put(
			`meals/${mealData.id}`,
			{
				meal: {
					title: data.title,
					description: data.description,
					price: data.price,
					location: {
					  city: cityInfo ? cityInfo.city : mealData.location.city,
					  lat: cityInfo ? cityInfo.lat : mealData.location.lat,
					  lon: cityInfo ? cityInfo.lon : mealData.location.lon,
					  address: cityInfo
						? cityInfo.formatted
						: mealData.location.address,
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

	static async postCategoriesInfo(mealId, category) {
		const response = await API_REQUEST.post(
			"join_categories",
			{
				join_category_meal: {
					meal_id: mealId,
					category_id: parseInt(category),
				  }
			}
		)

		return response.data;
	}

// We keep the classical fetch request for update meal images, as this request is not working yet.
	// static async postImages (mealId, data) {
	// 	console.log('data from AXIOS', data)
	// 	const response = await POST_IMAGES.post(
	// 		`meals/${mealId}`, 
	// 		{data}
	// 	)

	// 	return response.data;
	// }

	static async getLocationData(route) {
		const response = await GEOLOCATION.get(route);

		return response.data;
	}

	static async orderConfirmation(meal, guestRegistered) {
		const response = API_REQUEST.post(
			"charges",
			{
				amount: parseInt(`${meal.price * guestRegistered}00`),
        		currency: "eur",
			}
		)

		return response;
	}
}
