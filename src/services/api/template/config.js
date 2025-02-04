import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const templateApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.template.BASE_Route}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

templateApiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("institute_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        console.log("template module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

templateApiClient.interceptors.response.use(
    (response) => {
        console.log("template module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default templateApiClient;
