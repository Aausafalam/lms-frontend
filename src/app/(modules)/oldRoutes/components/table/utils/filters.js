const FILTER_OPTIONS = {
    method: {
        options: [
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PATCH", value: "PATCH" },
            { label: "PUT", value: "PUT" },
            { label: "DELETE", value: "DELETE" },
        ],
        placeholder: "Select method",
    },
    isPublic: {
        options: [
            { label: "Public", value: true },
            { label: "Private", value: false },
        ],
        placeholder: "Select route accessibility",
    },
};

export default FILTER_OPTIONS;
