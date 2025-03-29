import GlobalICONS from "@/lib/utils/icons";

const DEFAULT_GRID = 1;

const generalInformationSection = [
    {
        type: "rowHeader",
        label: "General Information",
        icon: GlobalICONS.INFORMATION,
        description: "Provide essential details about the permission group, such as name.",
    },
    {
        type: "text",
        name: "name",
        label: "Permission Group Name",
        grid: DEFAULT_GRID,
        placeholder: "Enter permission group name",
        validationRules: { required: true },
        validateOnChange: true,
    },

    {
        type: "textarea",
        name: "description",
        label: "Permission Group Description",
        grid: DEFAULT_GRID,
        placeholder: "Write permission group description",
    },
];

export default generalInformationSection;
