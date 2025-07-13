import Link from "next/link";
import AuthIcons from "../../../../../utils/icons";
import styles from "../styles/index.module.css";
const DEFAULT_GRID = 1;

const LoginFields = () => {
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
        {
            type: "password",
            name: "password",
            label: "Password",
            grid: DEFAULT_GRID,
            placeholder: "Enter password",
            validationRules: { required: true },
            validateOnChange: true,
            icon: AuthIcons.PASSWORD,
        },
        {
            type: "checkbox",
            name: "rememberMe",
            label: (
                <div className="flex align-middle justify-between w-full">
                    <p className="whitespace-nowrap">Remember Me</p>
                    <div className="w-full text-right">
                        <Link className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200" href="/auth/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            ),
            grid: DEFAULT_GRID,
            className: styles.remember_me,
        },
    ];
};

export default LoginFields;
