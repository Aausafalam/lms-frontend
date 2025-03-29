import AuthIcons from "../../../../../utils/icons";

const DEFAULT_GRID = 1;

const changePasswordFields = () => {
    return [
        {
            type: "password",
            name: "password",
            label: "New Password",
            grid: DEFAULT_GRID,
            placeholder: "Enter your new password",
            multiple: true,
            validationRules: { required: true },
            validateOnChange: true,
            icon: AuthIcons.PASSWORD,
            showIndicator: true,
        },
        {
            type: "password",
            name: "confirmPassword",
            label: "Confirm Password",
            grid: DEFAULT_GRID,
            placeholder: "Confirm your new password",
            multiple: true,
            validationRules: { required: true },
            validateOnChange: true,
            icon: AuthIcons.PASSWORD,
        },
    ];
};

export default changePasswordFields;
