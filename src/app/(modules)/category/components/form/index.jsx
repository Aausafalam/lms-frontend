"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useCategoryForm from "./hooks/useCategoryForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";

const CategoryForm = () => {
    const { categoryFormConfig, handleCategoryFormSubmit, isCategoryFormLoading, addCategoryFormErrors } = useCategoryForm();

    const onCancel = () => {};

    return (
        <div className={styles.container}>
            <DynamicForm
                formData={categoryFormConfig}
                formButtons={GlobalUtils.getFormButtons(isCategoryFormLoading, onCancel)}
                onSubmit={handleCategoryFormSubmit}
                responseErrors={addCategoryFormErrors}
            />
        </div>
    );
};

export default CategoryForm;
