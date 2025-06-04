import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const moduleApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.module.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

moduleApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("module_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Module module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

moduleApiClient.interceptors.response.use(
    (response) => {
        console.log("Module module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default moduleApiClient;
