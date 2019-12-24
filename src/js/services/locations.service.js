import axios from "axios";
import API_ENV from "../config/api.config";

export async function countries() {
    try {
        const response = await axios.get(
            `${API_ENV.apiUrl}/location/get-countries`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export async function citiesByCountry(country_index) {
    try {
        const response = await axios.get(
            `${API_ENV.apiUrl}/location/get-cities/${country_index}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}