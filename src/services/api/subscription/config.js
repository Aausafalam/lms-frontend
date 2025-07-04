import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const subscriptionApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.subscription.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

subscriptionApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("subscription_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Subscription subscription request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

subscriptionApiClient.interceptors.response.use(
    (response) => {
        console.log("Subscription subscription response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default subscriptionApiClient;
