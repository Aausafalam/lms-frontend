import React, { useMemo, useState } from "react";
import styles from "./index.module.css";
import DynamicForm from "@/components/form";
import ICON from "../../utils/icon";
import { useSearchParams } from "next/navigation";

const TableFilter = ({ data, initialValues, router }) => {
    const [formValues, setFormValues] = useState(initialValues);
    const [isBodyVisible, setIsBodyVisible] = useState(false);
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

    const getFormData = (data) => {
        return data.filterFields?.map((item) =>
            data.filterOnSubmit
                ? { ...item, name: `filterBy[${item.name}]`, clearOption: true, defaultValue: formValues?.[item.name] }
                : {
                      ...item,
                      name: `filterBy[${item.name}]`,
                      clearOption: true,
                      customOnChange: (event) => {
                          const { name, value } = event.target;
                          setFormValues((prev) => ({ ...prev, [name]: value }));
                          setQueryParam(name, value);
                      },
                      defaultValue: formValues?.[item.name],
                  }
        );
    };

    const getFormButtons = (data) => {
        if (!data.filterOnSubmit) {
            return [];
        }

        const initialButtons = [
            {
                label: "Apply Filters",
                type: "Submit",
            },
            {
                label: "Clear Filter",
                type: "button",
                variant: "secondary",
                onClick: () => {
                    setFormValues({});
                    router.replace(window.location.pathname);
                },
            },
        ];

        const updatedInitialButtons = initialButtons.map((button) => {
            const matchingButton = data.filterActionButtons?.find((actionButton) => actionButton.type === button.type);
            return matchingButton ? { type: button.type === "clear" ? "button" : button.type, label: matchingButton.label, ...matchingButton } : button;
        });

        const additionalButtons = data.filterActionButtons?.filter((actionButton) => actionButton.type !== "Submit" && actionButton.type !== "clear") || [];

        return [...updatedInitialButtons, ...additionalButtons];
    };

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h2>
                    <span>{data.icon ? data.icon : data.icon === false ? "" : ICON.LIST}</span>
                    {data.title || "Filters"}
                </h2>
                <div className={styles.filters_icon} onClick={() => setIsBodyVisible((prev) => !prev)}>
                    {ICON.FILTERS}
                </div>
            </div>
            <div className={`${styles.body} ${isBodyVisible ? styles.show : ""}`}>
                <DynamicForm
                    onSubmit={(formData) => {
                        const params = new URLSearchParams();
                        Object.entries(formData).forEach(([key, value]) => {
                            if (value) params.set(key, value);
                        });
                        router.replace(`?${params.toString()}`);
                        setFormValues(formData);
                    }}
                    formData={getFormData(data)}
                    formButtons={getFormButtons(data)}
                    formId={"tableFilters"}
                    formCache={false}
                />
            </div>
        </div>
    );
};

export default TableFilter;
