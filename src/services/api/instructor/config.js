import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const instructorApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.instructors.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

instructorApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("instructor_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Instructor module request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

instructorApiClient.interceptors.response.use(
    (response) => {
        console.log("Instructor module response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default instructorApiClient;
