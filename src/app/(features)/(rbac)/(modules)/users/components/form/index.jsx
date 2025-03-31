"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useUsersForm from "./hooks/useUsersForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";
import { useParams, useRouter } from "next/navigation";

const UsersForm = ({ data, onSuccess, onCancel, formId }) => {
    const { usersFormConfig, handleUsersFormSubmit, isUsersFormLoading, usersFormErrors } = useUsersForm(data, onSuccess);
    const { usersGroupId } = useParams();
    console.log(usersGroupId);
    return (
        <div className={styles.container}>
            <DynamicForm
                key={formId}
                formData={usersFormConfig}
                formButtons={GlobalUtils.getFormButtons(isUsersFormLoading, onCancel, {
                    route: data?.id ? `${apiConstants.users.BASE_ROUTE}/${data.id}` : apiConstants.users.BASE_ROUTE,
                    method: data?.id ? "patch" : "post",
                    body: { privilegeGroupId: usersGroupId },
                })}
                // onSubmit={handleUsersFormSubmit}
                responseErrors={usersFormErrors}
                formId={formId}
                onSuccess={onSuccess}
            />
        </div>
    );
};

export default UsersForm;
