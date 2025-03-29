import React, { useMemo } from "react";
import DynamicForm from "@/components/form";
import GlobalUtils from "@/lib/utils";
import apiConstants from "@/services/utils/constants";

const AddRouteForm = ({ permissionId, onCancel, onSuccess }) => {
    const formData = useMemo(
        () => [
            {
                type: "select",
                name: "routes",
                label: "Routes",
                grid: 1,
                placeholder: "Select routes",
                multiple: true,
                validationRules: { required: true },
                validateOnChange: true,
                options: [],
            },
        ],
        []
    );

    return (
        <DynamicForm
            key={formId}
            formData={formData}
            formButtons={GlobalUtils.getFormButtons(null, onCancel, {
                route: `${apiConstants.permission.BASE_ROUTE}/${permissionId}`,
                method: "post",
            })}
            responseErrors={[]}
            formId={`permission-${permissionId}`}
            onSuccess={onSuccess}
        />
    );
};

export default AddRouteForm;
