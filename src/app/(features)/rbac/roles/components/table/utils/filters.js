const FILTER_OPTIONS = {
    status: {
        type: "select",
        grid: 2,
        options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
        ],
        placeholder: "Filter by Status",
    },
};

export default FILTER_OPTIONS;
