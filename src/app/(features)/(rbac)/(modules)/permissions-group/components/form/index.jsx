"use client";
import React from "react";
import styles from "./styles/index.module.css";
import usePermissionGroupForm from "./hooks/usePermissionGroupForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";

const PermissionGroupForm = ({ data, onSuccess, onCancel, formId }) => {
    const { permissionGroupFormConfig, handlePermissionGroupFormSubmit, isPermissionGroupFormLoading, permissionGroupFormErrors } = usePermissionGroupForm(data, onSuccess);

    return (
        <div className={styles.container}>
            <DynamicForm
                key={formId}
                formData={permissionGroupFormConfig}
                formButtons={GlobalUtils.getFormButtons(isPermissionGroupFormLoading, onCancel, {
                    route: data?.id ? `${apiConstants.permissionGroup.BASE_ROUTE}/${data.id}` : apiConstants.permissionGroup.BASE_ROUTE,
                    method: data?.id ? "patch" : "post",
                })}
                // onSubmit={handlePermissionGroupFormSubmit}
                responseErrors={permissionGroupFormErrors}
                formId={formId}
                onSuccess={onSuccess}
                // onError={onError}
            />
        </div>
    );
};

export default PermissionGroupForm;
