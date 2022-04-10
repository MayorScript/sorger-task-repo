import axios from "axios";
// @ts-ignore
import {BASE_URL, API_TOKEN} from "react-native-dotenv"

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  async (request: any) => {
    const token = process.env.API_TOKEN;
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
