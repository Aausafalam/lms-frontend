import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const rolesApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.roles.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

rolesApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("roles_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Roles module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

rolesApiClient.interceptors.response.use(
    (response) => {
        console.log("Roles module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default rolesApiClient;
