import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.todoist.com/rest/v1/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Set the AUTH token for any request
axiosInstance.interceptors.request.use(
  async (request: any) => {
    const token = "ab9855583345f7886c83ac8d4afffe0832c7e975";
    request.headers["Authorization"] = `Bearer ${token}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
