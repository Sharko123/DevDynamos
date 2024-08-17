import axios from "axios";

const BASE_URL = process.env.API_URL;

const api = axios.create(BASE_URL)
export default api;