"use client";
import React from "react";
import styles from "./styles/index.module.css";
import usePermissionForm from "./hooks/usePermissionForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";
import { useParams, useRouter } from "next/navigation";

const PermissionForm = ({ data, onSuccess, onCancel, formId }) => {
    const { permissionFormConfig, handlePermissionFormSubmit, isPermissionFormLoading, permissionFormErrors } = usePermissionForm(data, onSuccess);
    const { permissionGroupId } = useParams();
    console.log(permissionGroupId);
    return (
        <div className={styles.container}>
            <DynamicForm
                key={formId}
                formData={permissionFormConfig}
                formButtons={GlobalUtils.getFormButtons(isPermissionFormLoading, onCancel, {
                    route: data?.id ? `${apiConstants.permission.BASE_ROUTE}/${data.id}` : apiConstants.permission.BASE_ROUTE,
                    method: data?.id ? "patch" : "post",
                    body: { privilegeGroupId: permissionGroupId },
                })}
                // onSubmit={handlePermissionFormSubmit}
                responseErrors={permissionFormErrors}
                formId={formId}
                onSuccess={onSuccess}
            />
        </div>
    );
};

export default PermissionForm;
