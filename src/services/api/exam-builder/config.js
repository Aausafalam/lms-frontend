import apiConstants from "@/services/utils/constants";
import apiClient from "../config";

const examBuilderApiClient = apiClient.create({
    baseURL: `${apiClient.defaults.baseURL}${apiConstants.examBuilder.BASE_ROUTE}`,
    headers: {
        ...apiClient.defaults.headers,
    },
});

examBuilderApiClient.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem("examBuilder_token");
        // if (token) {
        //     config.headers["Authorization"] = `Bearer ${token}`;
        // }
        console.log("ExamBuilder examBuilder request:", config);
        return config;
    },
    (error) => Promise.reject(error)
);

examBuilderApiClient.interceptors.response.use(
    (response) => {
        console.log("ExamBuilder examBuilder response:", response);
        return response;
    },
    (error) => Promise.reject(error)
);

export default examBuilderApiClient;
