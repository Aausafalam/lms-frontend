"use client";
import React from "react";
import styles from "./styles/index.module.css";
import usePermissionForm from "./hooks/usePermissionForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";

const PermissionForm = ({ data, onSuccess, onCancel, formId }) => {
    const { permissionFormConfig, handlePermissionFormSubmit, isPermissionFormLoading, permissionFormErrors } = usePermissionForm(data, onSuccess);

    return (
        <div className={styles.container}>
            <DynamicForm
                formData={permissionFormConfig}
                formButtons={GlobalUtils.getFormButtons(isPermissionFormLoading, onCancel, {
                    route: apiConstants.permission.BASE_ROUTE,
                })}
                // onSubmit={handlePermissionFormSubmit}
                responseErrors={permissionFormErrors}
                formId={formId}
            />
        </div>
    );
};

export default PermissionForm;
