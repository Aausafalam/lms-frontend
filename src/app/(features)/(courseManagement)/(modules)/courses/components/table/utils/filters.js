/**
 * Filter options configuration for courses table
 * @description Defines available filters and their configurations
 */
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
    // status: {
    //   type: "select",
    //   grid: 3,
    //   options: [
    //     { label: "Published", value: "published" },
    //     { label: "Draft", value: "draft" },
    //     { label: "Archived", value: "archived" },
    //   ],
    //   placeholder: "Filter by status",
    // },
    // difficultyLevel: {
    //   type: "select",
    //   grid: 3,
    //   options: [
    //     { label: "Beginner", value: "BEGINNER" },
    //     { label: "Intermediate", value: "INTERMEDIATE" },
    //     { label: "Advanced", value: "ADVANCED" },
    //     { label: "Expert", value: "EXPERT" },
    //   ],
    //   placeholder: "Filter by difficulty",
    // },
};

export default FILTER_OPTIONS;
