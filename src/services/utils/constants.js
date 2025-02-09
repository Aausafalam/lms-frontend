const apiConstants = {
    BACKEND_API_BASE_URL: "http://192.168.245.220:3000/api/v1",
    instructor: {
        BASE_Route: "/instructor",
        CREATE_INSTRUCTOR: "/create-instructor",
        UPDATE_INSTRUCTOR: "/update-instructor",
        GET_INSTRUCTOR_DETAILS: "/get-instructor-details",
        DELETE_INSTRUCTOR: "/delete-instructor",
        GET_INSTRUCTOR_STATS: "/get-instructor-stats",
    },
    template: {
        BASE_Route: "/template",
        GET_LIST: "/",
        ADD_TEMPLATE: "/",
    },
    course: {
        BASE_ROUTE: "/course",
        CREATE_COURSE: "/create-course",
        UPDATE_COURSE: "/update-course",
        GET_COURSE_DETAILS: "/get-course-details",
        DELETE_COURSE: "/delete-course",
        GET_COURSE_STATS: "/get-course-stats",
    },
    loadingStateKeys: {
        CREATE_INSTRUCTOR: "createInstructor",
        UPDATE_INSTRUCTOR: "updateInstructor",
        GET_INSTRUCTOR_DETAILS: "getInstructorDetails",
        GET_INSTRUCTOR_STATS: "getInstructorStats",
        DELETE_INSTRUCTOR: "deleteInstructor",

        CREATE_COURSE: "createCourse",
        UPDATE_COURSE: "updateCourse",
        GET_COURSE_DETAILS: "getCourseDetails",
        GET_COURSE_STATS: "getCourseStats",
        DELETE_COURSE: "deleteCourse",

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
