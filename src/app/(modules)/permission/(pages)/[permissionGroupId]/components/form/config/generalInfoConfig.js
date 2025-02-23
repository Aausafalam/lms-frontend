import GlobalICONS from "@/lib/utils/icons";

const DEFAULT_GRID = 1;

const generalInformationSection = [
    {
        type: "rowHeader",
        label: "General Information",
        icon: GlobalICONS.INFORMATION,
        description: "Provide essential details about the permission , such as name.",
    },
    {
        type: "text",
        name: "name",
        label: "Permission Name",
        grid: DEFAULT_GRID,
        placeholder: "Enter permission  name",
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "select",
        name: "routes",
        label: "Routes",
        grid: DEFAULT_GRID,
        placeholder: "Select routes",
        options: [],
        multiple: true,
        validationRules: { required: true },
        validateOnChange: true,
    },
    {
        type: "textarea",
        name: "description",
        label: "Permission  Description",
        grid: DEFAULT_GRID,
        placeholder: "Write permission  description",
    },
];

export default generalInformationSection;
