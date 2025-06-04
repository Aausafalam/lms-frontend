import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const contentApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.content.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

contentApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("content_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Content content request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

contentApiClient.interceptors.response.use(
    (response) => {
        console.log("Content content response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default contentApiClient;
