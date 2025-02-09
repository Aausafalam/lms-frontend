import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const courseApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.course.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

courseApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("course_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Course module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

courseApiClient.interceptors.response.use(
    (response) => {
        console.log("Course module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default courseApiClient;
