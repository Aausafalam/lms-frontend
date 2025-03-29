import { useEffect, useMemo } from "react";
import { usePermission } from "@/services/context/permission";
import GlobalUtils from "@/lib/utils";
import permissionFormConfig from "../config";
import permissionFormConstants from "../utils/constants";
import { useRoutes } from "@/services/context/routes";

const usePermissionForm = (data, onSuccess) => {
    const { permissionCreate, permissionUpdate } = usePermission();
    const { routesDropdown } = useRoutes();

    const formConfig = useMemo(
        () =>
            permissionFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
                options: routesDropdown.data?.map((route) => ({ label: route.name, value: route.id })),
            })),
        [data, routesDropdown.data]
    );

    const handlePermissionFormSubmit = (formData) => {
        console.log("Permission  Form Submit:", formData);
        const options = permissionFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return permissionCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            permissionUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };
    useEffect(() => {
        routesDropdown.fetch({});
    }, []);

    return {
        permissionFormConfig: formConfig,
        handlePermissionFormSubmit,
        isPermissionFormLoading: permissionCreate.isLoading,
        permissionFormErrors: permissionCreate.errorMessages,
    };
};

export default usePermissionForm;
