import axios from "axios";
// console.log(import.meta.env.API_KEY);
export const api = axios.create({
	baseURL: import.meta.env.VITE_API_KEY
});