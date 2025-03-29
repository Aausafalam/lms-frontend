import UserUtils from "@/app/(modules)/user/utils";
import DynamicForm from "@/components/form";
import React, { useCallback, useMemo } from "react";

const UserForm = ({ data, onCancel }) => {
    const formData = useMemo(
        () => [
            {
                name: "name",
                type: "text",
                label: "Name",
                grid: 2,
                placeholder: "Aausaf alam",
                validationRules: {
                    required: { message: "Please enter a name", value: true },
                    // minLength: 10 || { message: `Please enter atlest 10 number`, value: 10 },
                    // maxLength: 200 || { message: `Please enter atlest 200 number`, value: 200 },
                    // numeric: { message: "Please enter a number", value: true },
                    //pattern: { message: "Please enter a pattern", value: /^[a-zA-Z\s]*$/ },
                    //max: { message: "Please enter a number less than 20", value: 20 },
                    //min: { message: "Please enter a number greater than 10", value: 10 },
                },
                validateOnChange: true,
                defaultValue: data?.name,
            },
            {
                name: "email",
                type: "email",
                label: "Email Address",
                grid: 2,
                placeholder: "aausaf@c3ihub.iitk.ac.in",
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.email,
            },
            {
                name: "role",
                type: "select",
                label: "Role",
                grid: 2,
                placeholder: "Select Role",
                options: UserUtils.getRoles(),
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.role,
            },
            {
                name: "plan",
                type: "select",
                label: "Plan",
                grid: 2,
                placeholder: "Select Plan",
                options: UserUtils.getPlans(),
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.plan,
            },
            {
                name: "billing",
                type: "select",
                label: "Billing",
                grid: 2,
                placeholder: "Select Billing",
                options: UserUtils.getBillings(),
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.billing,
            },
            {
                name: "userStatus",
                type: "select",
                label: "Status",
                grid: 2,
                placeholder: "Select Status",
                options: UserUtils.getUserStatus(),
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.userStatus,
            },
            {
                name: "userDescription",
                type: "textarea",
                label: "Description",
                grid: 1,
                placeholder: "write description here",
                options: UserUtils.getUserStatus(),
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
                defaultValue: data?.userStatus,
            },
        ],
        [data]
    );

    const formButtons = useMemo(
        () => [
            {
                label: "Cancel",
                onClick: () => {
                    console.log("cancel");
                    onCancel && onCancel();
                },
                variant: "danger",
                outlined: true,
            },
            {
                label: "Save",
                type: "Submit",
                variant: "success",
            },
        ],
        []
    );

    const handleSubmit = (formData) => {
        console.log(formData);
    };

    return (
        <div>
            <DynamicForm key={"useForm"} formCache={false} formId={"userForm"} formData={formData} formButtons={formButtons} onSubmit={handleSubmit} />
        </div>
    );
};

export default UserForm;
