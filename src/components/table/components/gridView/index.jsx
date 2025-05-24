import React, { useCallback } from "react";
import TableLoading from "../tableLoading";
import DataNotFound from "@/components/DataNotFound";
import styles from "./index.module.css";
import Dropdown from "@/components/DropDown";
import ICON from "../../utils/icon";
import Utils from "../../utils";
import Link from "next/link";
import CheckBoxField from "@/components/form/components/FieldTemplates/CheckBoxField";

const GridView = ({ isLoading, checkboxState, setCheckboxState, data, router, onRowClick, initialValues, onActionClick }) => {
    if (isLoading) {
        return <TableLoading />;
    }

    // Memoize action filtering
    const getVisibleActions = useCallback(
        (actions, row) => {
            return actions?.filter((action) => !Utils.shouldHideAction?.(action, row)) || [];
        },
        [Utils.shouldHideAction]
    );

    // Handle row click with error boundary
    const handleRowClick = useCallback(
        (row) => {
            try {
                if (data.rowClickHandler) {
                    data.rowClickHandler(row);
                }
                onRowClick?.(row);
            } catch (error) {
                console.error("Error handling row click:", error);
            }
        },
        [data.rowClickHandler, onRowClick]
    );

    // Handle action click with error boundary
    const handleActionClick = useCallback(
        (action, row, event) => {
            try {
                event.stopPropagation();
                action.functions?.(row);
                onActionClick?.(action, row);
            } catch (error) {
                console.error("Error handling action click:", error);
            }
        },
        [onActionClick]
    );

    const ActionButtons = useCallback(
        ({ actions, row }) => {
            const visibleActions = getVisibleActions(actions, row);

            if (!visibleActions.length) return null;

            // Split the array into two parts
            const primaryActions = visibleActions.slice(0, 2); // First two items
            const dropdownActions = visibleActions.slice(2); // Remaining items

            return (
                <div>
                    {/* Render the first two actions directly */}
                    {primaryActions.map((action, index) => (
                        <p key={`${action.name}-${index}`} className={styles.action_icon} onClick={(e) => handleActionClick(action, row, e)} title={action.label}>
                            {ICON[action.name.toUpperCase()]}
                        </p>
                    ))}

                    {/* Render the rest in the Dropdown */}
                    {dropdownActions.length > 0 && (
                        <Dropdown
                            trigger={
                                <p className={styles.action_icon}>
                                    <span>{ICON.FILL_VERTICAL_MENU}</span>
                                </p>
                            }
                            content={dropdownActions.map((action, index) => (
                                <p key={`dropdown-${action.name}-${index}`} onClick={(e) => handleActionClick(action, row, e)} className={styles.action_icon} title={action.label}>
                                    {ICON[action.name.toUpperCase()]} {action.label}
                                </p>
                            ))}
                        />
                    )}
                </div>
            );
        },
        [getVisibleActions, handleActionClick]
    );
    const gridClass = `grid-${data.grid?.column || 3}`;
    return (
        <>
            {data?.rows?.length > 0 ? (
                <div className={styles.grid + "   py-4"}>
                    {data.rows.map((row, rowIndex) => (
                        <div
                            className={`${styles[gridClass]} ${styles.grid_card}`}
                            key={row.Id?.value || rowIndex}
                            onClick={() => handleRowClick(row)}
                            style={{ cursor: data.rowClickHandler ? "pointer" : "" }}
                        >
                            <div className={styles.grid_card_overlay}>
                                {data.checkbox && (
                                    <div
                                        className={`${styles.checkbox_cell} ${checkboxState?.[`${data.url}_row${initialValues.page || "1"}${rowIndex + 1}`] ? styles.active_checkbox : ""}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <CheckBoxField
                                            formField={{
                                                id: `${data.url}_row${initialValues.page || "1"}${rowIndex + 1}`,
                                                name: `${data.url}_row${initialValues.page || "1"}${rowIndex + 1}`,
                                                onChange: (event) => {
                                                    const { name, value } = event.target;
                                                    setCheckboxState((prev) => ({
                                                        ...prev,
                                                        [name]: value ? row.Id?.value || value : value,
                                                    }));
                                                },
                                                className: styles.checkbox,
                                            }}
                                            formValues={checkboxState}
                                        />
                                    </div>
                                )}
                                {data.actionData && (
                                    <div onClick={(e) => e.stopPropagation()} className={styles.action_cell} data-cell="Action">
                                        <ActionButtons actions={data.actionData} row={row} />
                                    </div>
                                )}
                            </div>
                            {data?.grid?.card ? (
                                data?.grid?.card(row)
                            ) : (
                                <div className="bg:white rounded-lg shadow-md hover:shadow-lg p-4">
                                    {Object.entries(row).map(([key, value], index) => {
                                        if (value.type === "hidden") return null;
                                        return (
                                            <div key={`grid-${index}-${key}`} className={styles.grid_card_item}>
                                                {key === "Id" ? (
                                                    <Link href={`${data.url}/${value.value}`} className={styles.grid_card_link}>
                                                        {value.value}
                                                    </Link>
                                                ) : (
                                                    value.value
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.grid_view_container}>
                    <DataNotFound message="Empty List" />
                </div>
            )}
        </>
    );
};

export default GridView;
