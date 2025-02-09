import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const fileUploadApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.instructor.BASE_Route}`,
    headers: {
        ...apiClient.defaults.headers,
        "Content-Type": "multipart/form-data",
    },
});

// Request interceptor
fileUploadApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("institute_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }

        if (config.method?.toLowerCase() === "get") {
            delete config.headers["Content-Type"];
        }

        console.log("File Upload module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
fileUploadApiClient.interceptors.response.use(
    (response) => {
        console.log("File Upload module response:", response);
        return response;
    },
    (error) => {
        console.error("File Upload module error:", error);
        return Promise.reject(error);
    }
);
export default fileUploadApiClient;
