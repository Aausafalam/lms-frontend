import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const videoApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.video.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

videoApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("video_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Content video request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

videoApiClient.interceptors.response.use(
    (response) => {
        console.log("Content video response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default videoApiClient;
