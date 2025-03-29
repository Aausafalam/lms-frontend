import { useMemo } from "react";
import loginFormConfig from "../config";

const useLoginForm = () => {
    const formConfig = useMemo(
        () =>
            loginFormConfig.map((field) => ({
                ...field,
            })),
        []
    );

    return {
        loginFormConfig: formConfig,
    };
};

export default useLoginForm;
