import GlobalICONS from "@/lib/utils/icons";

const requirementsAndLearningOutcomesDetailsSection = [
    {
        type: "rowHeader",
        label: "Requirements & Learning Outcomes",
        icon: GlobalICONS.OUTCOMES,
        description: "Define the course prerequisites, learning outcomes, and key features.",
    },
    {
        type: "textarea",
        name: "prerequisites",
        label: "Prerequisites",
        grid: 2,
        placeholder: "List any necessary prior knowledge or skills required for this course...",
        validationRules: { required: false },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "learningOutcomes",
        label: "Learning Outcomes",
        grid: 2,
        placeholder: "Describe what students will achieve upon completing this course...",
        validationRules: { required: false },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "features",
        label: "Features",
        grid: 2,
        placeholder: "Highlight the key features of this course...",
        validationRules: { required: false },
        validateOnChange: true,
    },
];

export default requirementsAndLearningOutcomesDetailsSection;
