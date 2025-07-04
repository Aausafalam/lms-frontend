const FILTER_OPTIONS = {
    status: {
        type: "select",
        grid: 3,
        options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
            { label: "Suspended", value: "SUSPENDED" },
            { label: "Pending", value: "PENDING" },
        ],
        placeholder: "Filter by Status",
    },
    roles: {
        type: "select",
        grid: 3,
        options: [
            { label: "Administrator", value: "admin" },
            { label: "Manager", value: "manager" },
            { label: "Instructor", value: "instructor" },
            { label: "Student", value: "student" },
            { label: "Content Creator", value: "content_creator" },
        ],
        placeholder: "Filter by Role",
    },
    // gender: {
    //     type: "select",
    //     grid: 3,
    //     options: [
    //         { label: "Male", value: "MALE" },
    //         { label: "Female", value: "FEMALE" },
    //         { label: "Other", value: "OTHER" },
    //         { label: "Prefer not to say", value: "PREFER_NOT_TO_SAY" },
    //     ],
    //     placeholder: "Filter by Gender",
    // },
};

export default FILTER_OPTIONS;
