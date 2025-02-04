import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const userApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.institute.BASE_Route}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

userApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("institute_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("Institute module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

userApiClient.interceptors.response.use(
    (response) => {
        console.log("Institute module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default userApiClient;
