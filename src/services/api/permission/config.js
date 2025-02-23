import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const permissionApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.permission.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

permissionApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("permission_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Permission module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

permissionApiClient.interceptors.response.use(
    (response) => {
        console.log("Permission module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default permissionApiClient;
