import { useMemo } from "react";
import forgotPasswordFormConfig from "../config";

const useForgotPasswordForm = (setEmail) => {
    const formConfig = useMemo(
        () =>
            forgotPasswordFormConfig.map((field) => ({
                ...field,
                customOnChange: (event) => {
                    console.log(setEmail(event.target.value));
                },
            })),
        []
    );

    return {
        forgotPasswordFormConfig: formConfig,
    };
};

export default useForgotPasswordForm;
