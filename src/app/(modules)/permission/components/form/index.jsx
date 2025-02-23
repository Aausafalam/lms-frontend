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
                formData={permissionGroupFormConfig}
                formButtons={GlobalUtils.getFormButtons(isPermissionGroupFormLoading, onCancel, {
                    route: apiConstants.permissionGroup.BASE_ROUTE,
                })}
                // onSubmit={handlePermissionGroupFormSubmit}
                responseErrors={permissionGroupFormErrors}
                formId={formId}
            />
        </div>
    );
};

export default PermissionGroupForm;
