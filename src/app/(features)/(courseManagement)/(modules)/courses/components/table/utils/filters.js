const FILTER_OPTIONS = {
    categories: {
        type: "select",
        grid: 3,
        optionsUrl: {
            url: "/category?responseType=dropdown",
        },
        isMulti: true,
        placeholder: "Filter by category",
    },
    instructors: {
        type: "select",
        grid: 3,
        optionsUrl: {
            url: "/instructor?responseType=dropdown",
        },
        isMulti: true,
        placeholder: "Filter by instructor",
    },
};

export default FILTER_OPTIONS;
