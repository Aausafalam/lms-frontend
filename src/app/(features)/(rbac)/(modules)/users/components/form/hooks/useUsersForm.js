import { useEffect, useMemo } from "react";
import { useUsers } from "@/services/context/users";
import GlobalUtils from "@/lib/utils";
import usersFormConfig from "../config";
import usersFormConstants from "../utils/constants";
import { useRoutes } from "@/services/context/routes";

const useUsersForm = (data, onSuccess) => {
    const { usersCreate, usersUpdate } = useUsers();

    const formConfig = useMemo(
        () =>
            usersFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
            })),
        [data]
    );

    const handleUsersFormSubmit = (formData) => {
        console.log("Users  Form Submit:", formData);
        const options = usersFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return usersCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            usersUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };

    return {
        usersFormConfig: formConfig,
        handleUsersFormSubmit,
        isUsersFormLoading: usersCreate.isLoading,
        usersFormErrors: usersCreate.errorMessages,
    };
};

export default useUsersForm;
