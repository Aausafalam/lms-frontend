const courseFormConstants = {
    isActiveOptions: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
    ],
    formChangesValidateOptions: {
        targetKeys: [
            "name",
            "email",
            "mobile",
            "designation",
            "gender",
            "rating",
            "isActive",
            "languageCode",
            "qualification",
            "experience",
            "bio",
            "profileImageUrl",
            "linkedin",
            "facebook",
            "twitter",
        ],
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
    courseStatusOptions: [
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
export default courseFormConstants;
