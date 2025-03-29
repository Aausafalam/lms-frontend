"use client";
import React from "react";
import styles from "./styles/index.module.css";
import useRoutesForm from "./hooks/useRoutesForm";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";

const RoutesForm = ({ data, onSuccess, onCancel, formId }) => {
    const { routesFormConfig, handleRoutesFormSubmit, isRoutesFormLoading, routesFormErrors } = useRoutesForm(data, onSuccess);

    return (
        <div className={styles.container}>
            <DynamicForm
                key={formId}
                formData={routesFormConfig}
                formButtons={GlobalUtils.getFormButtons(isRoutesFormLoading, onCancel, {
                    route: apiConstants.routes.BASE_ROUTE,
                })}
                // onSubmit={handleRoutesFormSubmit}
                responseErrors={routesFormErrors}
                formId={formId}
            />
        </div>
    );
};

export default RoutesForm;
