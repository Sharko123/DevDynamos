import axios from "axios";

const BASE_URL = process.env.API_URL;

const api = axios.create({
    baseURL: BASE_URL, // Provide the configuration object with baseURL
    // You can add other default settings here if needed
  });
export default api;