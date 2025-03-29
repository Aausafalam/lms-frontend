import DynamicForm from "@/components/form";
import React, { useMemo } from "react";
const GeneralRoleInformation = ({ formValues, onChange, handleNextTab }) => {
    const formData = useMemo(() => [
        {
            type: "text",
            name: "name",
            label: "Role Name",
            grid: 1,
            placeholder: "Enter role name",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: onChange,
            defaultValue: formValues?.name,
            style: { maxWidth: "40rem" },
        },
        {
            type: "text",
            name: "shortDescription",
            label: "Short Description",
            grid: 1,
            placeholder: "Enter short description",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: onChange,
            defaultValue: formValues?.shortDescription,
            style: { maxWidth: "40rem" },
        },
        {
            type: "textarea",
            name: "fullDescription",
            label: "Full Description",
            grid: 1,
            placeholder: "Enter full description",
            validationRules: { required: true },
            validateOnChange: true,
            customOnChange: onChange,
            defaultValue: formValues?.fullDescription,
            style: { maxWidth: "40rem" },
        },
    ]);

    const formButtons = useMemo(
        () => [
            {
                label: "Save and Next",
                type: "Submit",
                loading: false,
            },
        ],
        []
    );

    return (
        <div className="p-6 md:p-8">
            <DynamicForm onSubmit={handleNextTab} key={"role-add-form"} formData={formData} formButtons={formButtons} formId={"role-add-form"} />
        </div>
    );
};

export default GeneralRoleInformation;
