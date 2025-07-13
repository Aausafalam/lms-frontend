"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useChangePasswordForm from "./hooks/useChangePasswordForm";
import DynamicForm from "@/components/form";
import apiConstants from "@/services/utils/constants";

const ChangePasswordForm = ({ token, onSuccess, formId = "change-password-form", onError }) => {
    const { changePasswordFormConfig } = useChangePasswordForm(onSuccess);

    const changePasswordButton = {
        label: "Set New Password",
        type: "Submit",
        loading: false,
        action: {
            route: `${apiConstants.auth.RESET_PASSWORD}`,
            method: "post",
            body: { token },
        },
        fullWidth: true,
        className: styles.button,
    };

    return (
        <div className={styles.container}>
            <DynamicForm key={formId} onError={onError} formData={changePasswordFormConfig} formButtons={[changePasswordButton]} formId={formId} onSuccess={onSuccess} />
        </div>
    );
};

export default ChangePasswordForm;
