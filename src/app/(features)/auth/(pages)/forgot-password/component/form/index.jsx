"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useForgotPasswordForm from "./hooks/useForgotPasswordForm";
import DynamicForm from "@/components/form";
import apiConstants from "@/services/utils/constants";

const ForgotPasswordForm = ({ setEmail, onSuccess, formId = "forgot-password-form", onError }) => {
    const { forgotPasswordFormConfig } = useForgotPasswordForm(setEmail);

    const forgotPasswordButton = {
        label: "Send Reset Link",
        type: "Submit",
        loading: false,
        action: {
            route: `${apiConstants.auth.FORGOT_PASSWORD}`,
            method: "post",
        },
        fullWidth: true,
        className: styles.button,
    };

    return (
        <div className={styles.container}>
            <DynamicForm key={formId} onError={onError} formData={forgotPasswordFormConfig} formButtons={[forgotPasswordButton]} formId={formId} onSuccess={onSuccess} />
        </div>
    );
};

export default ForgotPasswordForm;
