import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8000/api", // Base API path
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("token");
        // if (token) {
        //   config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        response.data.modified = true;
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        console.log(errorMessage);
        return Promise.reject(error);
    }
);

export default apiClient;
