import GlobalICONS from "@/lib/utils/icons";

const DEFAULT_GRID = 1;

const generalInformationSection = [
    {
        type: "rowHeader",
        label: "General Information",
        icon: GlobalICONS.INFORMATION,
        description: "Provide essential details about the role, such as name.",
    },
    {
        type: "text",
        name: "name",
        label: "Role Name",
        grid: DEFAULT_GRID,
        placeholder: "Enter role name",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "shortDescription",
        label: "Role Short Description",
        grid: DEFAULT_GRID,
        placeholder: "Write role short description",
    },
    {
        type: "textarea",
        name: "description",
        label: "Role Description",
        grid: DEFAULT_GRID,
        placeholder: "Write role description",
    },
];

export default generalInformationSection;
