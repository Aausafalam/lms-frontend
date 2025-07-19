import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const questionApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.question.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

questionApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("question_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("Question question request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

questionApiClient.interceptors.response.use(
    (response) => {
        console.log("Question question response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default questionApiClient;
