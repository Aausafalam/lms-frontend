import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const lessonApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.lesson.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

lessonApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("lesson_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Lesson lesson request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

lessonApiClient.interceptors.response.use(
    (response) => {
        console.log("Lesson lesson response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default lessonApiClient;
