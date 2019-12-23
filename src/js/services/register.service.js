import axios from "axios";
import API_ENV from "../config/api.config";

export async function signup(fields) {
	console.log(fields);
	try {
		const response = await axios.post(
			`${API_ENV.apiUrl}/auth/signup`,
			JSON.stringify(fields),
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		console.log(response);
		return response.data;
	} catch (err) {
		console.log(err);
		return Promise.reject(err);
	}
}