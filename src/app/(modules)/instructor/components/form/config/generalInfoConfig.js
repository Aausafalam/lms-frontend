import GlobalICONS from "@/lib/utils/icons";
import instructorFormConstants from "../utils/constants";

const DEFAULT_GRID = 3;

const generalInformationSection = [
    {
        type: "rowHeader",
        label: "General Information",
        icon: GlobalICONS.INFORMATION,
        description: "Provide essential details about the instructor, including personal and professional information.",
    },
    {
        type: "text",
        name: "name",
        label: "Name",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor name",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "email",
        name: "email",
        label: "Email",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor email",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "tel",
        name: "mobile",
        label: "Contact Number",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor mobile number",
        validateOnChange: true,
    },
    {
        type: "text",
        name: "designation",
        label: "Designation",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor designation",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "select",
        name: "gender",
        label: "Gender",
        grid: DEFAULT_GRID,
        placeholder: "Select instructor gender",
        options: instructorFormConstants.gender,
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "number",
        name: "rating",
        label: "Rating",
        grid: DEFAULT_GRID,
        placeholder: "Enter instructor rating",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "select",
        name: "isActive",
        label: "Status",
        grid: DEFAULT_GRID,
        placeholder: "Select status",
        options: instructorFormConstants.isActiveOptions,
        validationRules: { required: true },
        validateOnChange: true,
    },
];

export default generalInformationSection;
