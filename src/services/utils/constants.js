const apiConstants = {
    BACKEND_API_BASE_URL: "http://192.168.245.220:3000/api/v1",
    institute: {
        BASE_Route: "/institutes",
        SIGN_UP: "/owners/register",
        VERIFY_EMAIL: "/owners/verify",
        CURRENT_ONBOARDED_USER: "/current-onboarded-user",
        SETUP_BASE_INFO: "/setup/basic-info",
        SETUP_PAYMENT: "/setup/payment",
        SETUP_DETAILS: "/setup/details",
        SETUP_TEMPLATE: "/setup/template",
        SETUP_PASSWORD: "/setup/credentials",
    },
    template: {
        BASE_Route: "/template",
        GET_LIST: "/",
        ADD_TEMPLATE: "/",
    },
    course: {
        BASE_Route: "/course",
        USERS_LIST: `/get-courses-list`,
        ADD_USER: `/add-courses`,
        UPDATE_USER: `/update-courses`,
        DELETE_USER: `/delete-courses`,
    },
    loadingStateKeys: {
        SIGN_UP: "signup",
        VERIFY_EMAIL: "verifyEmail",
        SETUP_BASE_INFO: "setupBaseInfo",
        SETUP_PAYMENT: "setupPayment",
        SETUP_DETAILS: "setupDetails",
        SETUP_TEMPLATE: "setupTemplate",
        SETUP_PASSWORD: "setupPassword",
        FILE_UPLOAD_KEY: "fileUpload",
        CURRENT_ONBOARDED_USER: "currentOnboardedUser",
        GET_TEMPLATE_LIST: "getTemplateList",
    },
};
export default apiConstants;
