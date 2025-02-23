import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const permissionGroupApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.permissionGroup.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

permissionGroupApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("permissionGroup_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("PermissionGroup module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

permissionGroupApiClient.interceptors.response.use(
    (response) => {
        console.log("PermissionGroup module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default permissionGroupApiClient;
