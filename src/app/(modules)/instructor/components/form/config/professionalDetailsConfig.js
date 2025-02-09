import GlobalICONS from "@/lib/utils/icons";

const DEFAULT_GRID = 3;

const professionalDetailsSection = [
    {
        type: "rowHeader",
        label: "Professional Details",
        icon: GlobalICONS.PROFESSIONAL,
        description: "Enter the instructor's professional qualifications, experience, and other relevant background information.",
    },
    {
        type: "text",
        name: "languageCode",
        label: "Language Code",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor language code",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "text",
        name: "qualification",
        label: "Qualification",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor qualification",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "number",
        name: "experience",
        label: "Experience",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor experience",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "bio",
        label: "Bio",
        grid: 2,
        placeholder: "Write bio here...",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "file",
        name: "profileImageUrl",
        label: "Profile Image",
        grid: 2,
        placeholder: "Upload profile image",
        url: "/instructor/icon/upload",
        accept: ["image"],
        multiple: false,
        validationRules: { required: false },
        validateOnChange: true,
    },
];

export default professionalDetailsSection;
