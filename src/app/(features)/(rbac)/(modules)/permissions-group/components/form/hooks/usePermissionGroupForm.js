import { useMemo } from "react";
import { usePermissionGroup } from "@/services/context/permissionGroup";
import GlobalUtils from "@/lib/utils";
import permissionGroupFormConfig from "../config";
import permissionGroupFormConstants from "../utils/constants";

const usePermissionGroupForm = (data, onSuccess) => {
    const { permissionGroupCreate, permissionGroupUpdate } = usePermissionGroup();

    const formConfig = useMemo(
        () =>
            permissionGroupFormConfig.map((field) => ({
                ...field,
                defaultValue: data?.[field.name] ?? field.defaultValue,
            })),
        [data]
    );

    const handlePermissionGroupFormSubmit = (formData) => {
        console.log("Permission Group Form Submit:", formData);
        const options = permissionGroupFormConstants.formChangesValidateOptions;

        if (!data?.id) {
            return permissionGroupCreate.execute({ payload: formData, onSuccess });
        }

        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            permissionGroupUpdate.execute({ payload: formData, onSuccess, dynamicRoute: data.id });
        }
    };

    return {
        permissionGroupFormConfig: formConfig,
        handlePermissionGroupFormSubmit,
        isPermissionGroupFormLoading: permissionGroupCreate.isLoading,
        permissionGroupFormErrors: permissionGroupCreate.errorMessages,
    };
};

export default usePermissionGroupForm;
