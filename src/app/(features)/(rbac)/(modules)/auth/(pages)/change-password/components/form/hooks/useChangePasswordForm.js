import { useMemo } from "react";
import changePasswordFormConfig from "../config";

const useForgotPasswordForm = () => {
    const formConfig = useMemo(
        () =>
            changePasswordFormConfig.map((field) => ({
                ...field,
                onCustomChange: (event) => {},
            })),
        []
    );

    return {
        changePasswordFormConfig: formConfig,
    };
};

export default useForgotPasswordForm;
