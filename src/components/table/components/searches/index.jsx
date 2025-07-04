import React, { useState } from "react";
import styles from "./index.module.css";
import Button from "@/components/form/components/FieldTemplates/ButtonField";
import ICON, { TableICON } from "../../utils/icon";
import { useSearchParams } from "next/navigation";
import DynamicForm from "@/components/form";
import "./index.css";

const TableSearch = ({ showDataViewButton, dataView, setDataView, data, initialValues, router }) => {
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

    const getFormData = (data) => {
        return data.filters?.map((item) => ({
            ...item,
            clearOption: true,
            customOnChange: (event) => {
                const { name, value } = event.target;
                setFormValues((prev) => ({ ...prev, [name]: value }));
                setQueryParam(name !== "searchText" ? `filterBy[${name}]` : name, value);
            },
            defaultValue: formValues?.[item.name],
        }));
    };

    return (
        <div className={styles.container}>
            {data?.title && <p className="min-w-fit">{data?.title}</p>}
            <div>
                <div>
                    <DynamicForm formId={"tableSearch"} formCache={false} formData={getFormData(data)} formButtons={[]} />
                </div>
                <div className={styles.action_button_container}>
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
                    {showDataViewButton && (
                        <Button
                            key={"data-view"}
                            onClick={() => {
                                setDataView((prev) => {
                                    if (prev.table) {
                                        return { grid: true };
                                    } else {
                                        return { table: true, grid: false };
                                    }
                                });
                            }}
                            // tonal={true}
                            icon={dataView.table ? TableICON.CUSTOM : TableICON.TABLE}
                            iconOnly={true}
                            tooltip={dataView.table ? "Grid View" : "Table View"}
                        >
                            {dataView.table ? "Grid View" : "Table View"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableSearch;
