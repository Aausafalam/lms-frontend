import React, { useState } from "react";
import styles from "./index.module.css";
import SelectField from "@/components/form/components/FieldTemplates/SelectField";
import InputField from "@/components/form/components/FieldTemplates/InputField";
import Button from "@/components/form/components/FieldTemplates/ButtonField";
import ICON from "../../utils/icon";
import { useSearchParams } from "next/navigation";
import DynamicForm from "@/components/form";
import "./index.css";

const TableSearch = ({ data, initialValues, router }) => {
    const [formValues, setFormValues] = useState(initialValues);
    const searchParams = useSearchParams();

    const setQueryParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`?${params.toString()}`);
    };
    const generateOptions = (limitConfig) => {
        const options = [];
        const start = parseInt(limitConfig?.limitStart || 10, 10);
        const end = parseInt(limitConfig?.limitEnd || 50, 10);
        const step = parseInt(limitConfig?.multipleOf || 10, 10);

        for (let i = start; i <= end; i += step) {
            options.push({ label: i.toString(), value: i.toString() });
        }

        return options;
    };

    const getFormData = (data) => {
        return data.filters?.map((item) => ({
            ...item,
            clearOption: true,
            customOnChange: (event) => {
                const { name, value } = event.target;
                setFormValues((prev) => ({ ...prev, [name]: value }));
                setQueryParam(name, value);
            },
            defaultValue: formValues?.[item.name],
        }));
    };

    return (
        <div className={styles.container}>
            <div>
                {data.limit && (
                    <SelectField
                        formField={{
                            id: "limit",
                            name: "limit",
                            options: generateOptions(data.limit),
                            defaultValue: formValues?.["limit"] || data.limit?.defaultValue || "10",
                            onChange: (event) => {
                                const { name, value } = event.target;
                                setFormValues((prev) => ({ ...prev, [name]: value }));
                                setQueryParam(name, value);
                            },
                        }}
                    />
                )}
            </div>

            <div>
                <DynamicForm formId={"tableSearch"} formCache={false} formData={getFormData(data)} formButtons={[]} />
                {data?.actionButtons?.map((button) => (
                    <Button
                        key={button.label}
                        onClick={button.onClick}
                        variant={button.variant}
                        flat={button.flat}
                        className={`${styles?.[button.label?.toLowerCase()]} ${button.className}`}
                        icon={button.icon}
                        outlined={button.outlined}
                        rounded={button.rounded}
                        text={button.text}
                        plain={button.plain}
                        tonal={button.tonal}
                        iconOnly={button.iconOnly}
                        fullWidth={button.fullWidth}
                        type={button.type || "button"}
                        iconPosition={button.iconPosition}
                        disabled={button.disabled}
                        buttonContainerClassName={button.buttonContainerClassName}
                        loading={button.loading}
                        href={button.href}
                        target={button.target}
                    >
                        {button.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TableSearch;
