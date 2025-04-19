const DEFAULT_GRID = 1;

const CourseDetailsConfig = [
    {
        type: "textarea",
        name: "learningOutcomes",
        label: "Learning Outcomes (One per line)",
        grid: DEFAULT_GRID,
        placeholder: "Add learning outcomes (one per line)",
        validationRules: { required: true },
        validateOnChange: true,
        rows: 5,
        helperText: "Enter each learning outcome on a new line",
    },
    {
        type: "textarea",
        name: "requirements",
        label: "Requirements/Prerequisites (One per line)",
        grid: DEFAULT_GRID,
        placeholder: "Add course requirements or prerequisites (one per line)",
        rows: 5,
        helperText: "Enter each requirement on a new line",
    },
    {
        type: "textarea",
        name: "skills",
        label: "Skills Covered (Comma separated)",
        grid: DEFAULT_GRID,
        placeholder: "Add skills covered, separated by commas",
        validationRules: { required: true },
        validateOnChange: true,
        rows: 3,
        helperText: "Enter skills separated by commas (e.g., HTML, CSS, JavaScript)",
    },
    {
        type: "textarea",
        name: "about",
        label: "About Course",
        grid: DEFAULT_GRID,
        placeholder: "Write detailed description about the course",
        validationRules: { required: true },
        validateOnChange: true,
        rows: 8,
    },
];

export default CourseDetailsConfig;
