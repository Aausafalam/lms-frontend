"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useLoginForm from "./hooks/useLoginForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";
import { useParams } from "next/navigation";

const LoginForm = ({ onSuccess, formId }) => {
    const { loginFormConfig } = useLoginForm(onSuccess);

    const loginButton = {
        label: "Sign in",
        type: "Submit",
        loading: false,
        action: {
            route: `${apiConstants.auth.LOGIN}`,
            method: "post",
        },
        fullWidth: true,
        className: styles.button,
    };

    return (
        <div className={styles.container}>
            <DynamicForm key={formId} formData={loginFormConfig} formButtons={[loginButton]} formId={formId} onSuccess={onSuccess} />
        </div>
    );
};

export default LoginForm;
