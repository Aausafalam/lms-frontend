import GlobalUtils from "@/lib/utils";
import { useMemo } from "react";
import categoryFormConstants from "../utils/constants";

const useCategoryForm = (data) => {
    const categoryFormConfig = useMemo(
        () => [
            {
                type: "text",
                name: "name",
                label: "Category Name",
                grid: 2,
                defaultValue: data?.name,
                placeholder: "Enter category name",
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "text",
                name: "code",
                label: "Category Code",
                grid: 2,
                defaultValue: data?.code,
                placeholder: "Enter unique code (e.g., MED, IT, ECON)",
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "select",
                name: "categoryType",
                label: "Category Type",
                grid: 2,
                defaultValue: data?.categoryType,
                placeholder: "Select category Type",
                options: categoryFormConstants.categoryTypeOptions,
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "select",
                name: "parentCategory",
                label: "Parent Category",
                grid: 2,
                defaultValue: data?.categoryType,
                placeholder: "Select Parent Category",
                options: categoryFormConstants.categoryTypeOptions,
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "number",
                name: "displayOrder",
                label: "Display Order",
                grid: 2,
                defaultValue: data?.displayOrder ?? 0,
                placeholder: "Enter display order",
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "select",
                name: "isActive",
                label: "Status",
                grid: 2,
                defaultValue: data?.isActive ?? true,
                placeholder: "Select status",
                options: categoryFormConstants.isActiveOptions,
                validateOnChange: true,
                validationRules: {
                    required: true,
                },
            },
            {
                type: "textarea",
                name: "description",
                label: "Description",
                grid: 2,
                defaultValue: data?.description,
                placeholder: "Enter category description",
                validationRules: {
                    required: true,
                },
                validateOnChange: true,
            },
            {
                type: "file",
                name: "iconUrl",
                label: "Icon",
                grid: 2,
                defaultValue: data?.iconUrl,
                placeholder: "Enter icon URL",
                url: "/category/icon/upload",
                accept: ["image"],
                multiple: false,
                validationRules: {
                    required: false,
                },
                validateOnChange: true,
            },
        ],
        [data]
    );

    const handleCategoryFormSubmit = (formData) => {
        console.log("Category Form Submit:", formData);
        const options = categoryFormConstants.formChangesValidateOptions;
        if (GlobalUtils.hasFormChanges(formData, data, options)) {
            // perform submission
        }
    };

    return {
        categoryFormConfig,
        handleCategoryFormSubmit,
        isCategoryFormLoading: false, //addCategory.isLoading,
        addCategoryFormErrors: [], // addCategory.errorMessages,
    };
};

export default useCategoryForm;
