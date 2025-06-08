import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const examPatternApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.examPattern.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

examPatternApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("examPattern_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("ExamPattern examPattern request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

examPatternApiClient.interceptors.response.use(
    (response) => {
        console.log("ExamPattern examPattern response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default examPatternApiClient;
