import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const authApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.auth.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

authApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("auth_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Routes module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

authApiClient.interceptors.response.use(
    (response) => {
        console.log("Routes module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default authApiClient;
