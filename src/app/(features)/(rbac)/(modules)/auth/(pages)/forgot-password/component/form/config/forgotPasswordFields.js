import AuthIcons from "../../../../../utils/icons";

const DEFAULT_GRID = 1;

const forgotPasswordFields = () => {
    return [
        {
            type: "email",
            name: "email",
            label: "Email",
            grid: DEFAULT_GRID,
            placeholder: "Enter email Id",
            validationRules: { required: true },
            validateOnChange: true,
            icon: AuthIcons.EMAIL,
        },
    ];
};

export default forgotPasswordFields;
