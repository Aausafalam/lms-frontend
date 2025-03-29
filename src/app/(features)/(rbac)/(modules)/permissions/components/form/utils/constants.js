const permissionFormConstants = {
    isActiveOptions: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
    ],
    formChangesValidateOptions: {
        targetKeys: ["name"],
        trimStrings: true,
        precisionForNumbers: 2,
        ignoreEmptyValues: true,
    },
    languages: [
        { label: "English", value: "en" },
        { label: "Spanish", value: "es" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Chinese", value: "zh" },
    ],
    difficultyLevels: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Advanced", value: "advanced" },
        { label: "Expert", value: "expert" },
    ],
    permissionStatusOptions: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
    ],
    isPublicOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ],
    hasCertificateOptions: [
        { label: "Yes", value: true },
        { label: "No", value: false },
    ],
    DEFAULT_GRID: 3,
};
export default permissionFormConstants;
