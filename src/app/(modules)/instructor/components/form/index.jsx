"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useInstructorForm from "./hooks/useInstructorForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";

const InstructorForm = ({ data, onSuccess, onCancel, formId }) => {
    const { instructorFormConfig, handleInstructorFormSubmit, isInstructorFormLoading, instructorFormErrors } = useInstructorForm(data, onSuccess);

    return (
        <div className={styles.container}>
            <DynamicForm
                key={formId}
                formData={instructorFormConfig}
                formButtons={GlobalUtils.getFormButtons(isInstructorFormLoading, onCancel)}
                onSubmit={handleInstructorFormSubmit}
                responseErrors={instructorFormErrors}
                formId={formId}
            />
        </div>
    );
};

export default InstructorForm;
