"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useCourseForm from "./hooks/useCourseForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";

const CourseForm = ({ data, onSuccess, onCancel, formId }) => {
    const { courseFormConfig, handleCourseFormSubmit, isCourseFormLoading, courseFormErrors } = useCourseForm(data, onSuccess);

    return (
        <div className={styles.container}>
            <DynamicForm
                formData={courseFormConfig}
                formButtons={GlobalUtils.getFormButtons(isCourseFormLoading, onCancel)}
                onSubmit={handleCourseFormSubmit}
                responseErrors={courseFormErrors}
                formId={formId}
            />
        </div>
    );
};

export default CourseForm;
