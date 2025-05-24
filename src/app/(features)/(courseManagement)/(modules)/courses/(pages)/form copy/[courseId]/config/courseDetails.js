const DEFAULT_GRID = 2;

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
        helperText: "Enter each learning outcome on a new line. Start with action verbs (e.g., Create, Develop, Understand)",
    },
    {
        type: "textarea",
        name: "requirements",
        label: "Requirements/Prerequisites (One per line)",
        grid: DEFAULT_GRID,
        placeholder: "Add course requirements or prerequisites (one per line)",
        rows: 5,
        helperText: "Enter each requirement on a new line. Be specific about prior knowledge or tools needed",
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
        helperText: "Enter skills separated by commas (e.g., HTML, CSS, JavaScript). These will be used for search and filtering",
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
        helperText: "Provide a comprehensive overview of the course. Include course structure, teaching approach, and who would benefit most",
    },
];

const response = {
    learningOutcomes: ["Create a responsive website", "Develop a web application using React"],
    requirements: ["Basic understanding of HTML and CSS", "Familiarity with JavaScript"],
    skills: ["Web Development", "React", "JavaScript"],
    about: "This course covers the fundamentals of web development, including HTML, CSS, and JavaScript. Students will learn to create responsive websites and web applications using React.",
};

export default CourseDetailsConfig;
