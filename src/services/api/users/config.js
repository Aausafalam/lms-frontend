import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const usersApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.users.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

usersApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("users_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Permission module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

usersApiClient.interceptors.response.use(
    (response) => {
        console.log("Permission module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default usersApiClient;
