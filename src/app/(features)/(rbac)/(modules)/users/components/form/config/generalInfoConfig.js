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
            name: "name",
            type: "text",
            label: "Name",
            grid: 2,
            placeholder: "Aausaf alam",
            validationRules: {
                required: { message: "Please enter a name", value: true },
                // minLength: 10 || { message: `Please enter atlest 10 number`, value: 10 },
                // maxLength: 200 || { message: `Please enter atlest 200 number`, value: 200 },
                // numeric: { message: "Please enter a number", value: true },
                //pattern: { message: "Please enter a pattern", value: /^[a-zA-Z\s]*$/ },
                //max: { message: "Please enter a number less than 20", value: 20 },
                //min: { message: "Please enter a number greater than 10", value: 10 },
            },
            validateOnChange: true,
        },
        {
            name: "email",
            type: "email",
            label: "Email Address",
            grid: 2,
            placeholder: "aausaf@c3ihub.iitk.ac.in",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
        {
            name: "role",
            type: "select",
            label: "Role",
            grid: 2,
            placeholder: "Select Role",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
        {
            name: "plan",
            type: "select",
            label: "Plan",
            grid: 2,
            placeholder: "Select Plan",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
        {
            name: "billing",
            type: "select",
            label: "Billing",
            grid: 2,
            placeholder: "Select Billing",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
        {
            name: "userStatus",
            type: "select",
            label: "Status",
            grid: 2,
            placeholder: "Select Status",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
        {
            name: "userDescription",
            type: "textarea",
            label: "Description",
            grid: 1,
            placeholder: "write description here",
            validationRules: {
                required: true,
            },
            validateOnChange: true,
        },
    ];
};

export default generalInformationSection;
