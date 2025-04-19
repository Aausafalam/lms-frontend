import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const userRolesApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.userRoles.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

userRolesApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("userUserUserRoles_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("User Roles module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

userRolesApiClient.interceptors.response.use(
    (response) => {
        console.log("User Roles module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default userRolesApiClient;
