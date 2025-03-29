import { useMemo } from "react";
import { useRoutes } from "@/services/context/routes";
import GlobalUtils from "@/lib/utils";
import routesFormConfig from "../config";
import routesFormConstants from "../utils/constants";

const useRoutesForm = (data, onSuccess) => {
    const { routesCreate, routesUpdate } = useRoutes();

    const formConfig = useMemo(
        () =>
            routesFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
            })),
        [data]
    );

    const handleRoutesFormSubmit = (formData) => {
        console.log("Routes  Form Submit:", formData);
        const options = routesFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return routesCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            routesUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };

    return {
        routesFormConfig: formConfig,
        handleRoutesFormSubmit,
        isRoutesFormLoading: routesCreate.isLoading,
        routesFormErrors: routesCreate.errorMessages,
    };
};

export default useRoutesForm;
