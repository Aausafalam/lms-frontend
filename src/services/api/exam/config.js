import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const examApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.exam.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

examApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("exam_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Exam exam request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

examApiClient.interceptors.response.use(
    (response) => {
        console.log("Exam exam response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default examApiClient;
