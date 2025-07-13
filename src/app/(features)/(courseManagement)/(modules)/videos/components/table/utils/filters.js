/**
 * Filter options configuration for videos table
 * @description Defines available filters and their configurations
 */
const FILTER_OPTIONS = {
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
