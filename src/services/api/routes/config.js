import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const routesApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.routes.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

routesApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("routes_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Routes module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

routesApiClient.interceptors.response.use(
    (response) => {
        console.log("Routes module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default routesApiClient;
