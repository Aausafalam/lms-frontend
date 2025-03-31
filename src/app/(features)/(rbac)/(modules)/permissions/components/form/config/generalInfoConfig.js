import GlobalICONS from "@/lib/utils/icons";
import { useRoutes } from "@/services/context/routes";

const DEFAULT_GRID = 1;

const generalInformationSection = () => {
    return [
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
            name: "privilegeGroupId",
            label: "Permission Group",
            grid: DEFAULT_GRID,
            placeholder: "Select Permission Group",
            validationRules: { required: true },
            validateOnChange: true,
            optionsUrl: {
                url: "/privilege-group?responseType=dropdown",
                labelKey: "name",
                valueKey: "id",
            },
            options: [],
        },
        {
            type: "select",
            name: "routes",
            label: "Routes",
            grid: DEFAULT_GRID,
            placeholder: "Select routes",
            multiple: true,
            validationRules: { required: true },
            validateOnChange: true,
            options: [],
            optionsUrl: {
                url: "/route/dropdown",
                labelKey: "name",
                valueKey: "id",
            },
        },
        {
            type: "textarea",
            name: "description",
            label: "Permission  Description",
            grid: DEFAULT_GRID,
            placeholder: "Write permission  description",
        },
    ];
};

export default generalInformationSection;
