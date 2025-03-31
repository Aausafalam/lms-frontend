"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import RolesTableUtils from "./utils";
import sampleRolesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import rolesTableConstants from "./utils/constants";
import RolesGridView from "../gridView";

const RolesTable = ({ setSelectedRoles, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => {
        const actionData = RolesTableUtils.getTableActions({ data, setModalState, setSelectedRoles });
        const rows = RolesTableUtils.getTableRows({ data, styles });
        return {
            rows,
            actionData,
            url: rolesTableConstants.API_URL,
            pagination: GlobalUtils.tablePagination(data),
            sorting: rolesTableConstants.SORTING,
            rowClickHandler: (row) => RolesTableUtils.handleRowClick({ row, data, setModalState, setSelectedRoles }),
            externalFilters: rolesTableConstants.FILTERS,
            tableHeader: RolesTableUtils.getTableHeader({ data, setModalState, styles }),
            checkbox: true,
            refreshTable: refreshTable || false,
            customView: () => <RolesGridView actionData={actionData} data={data.records} rows={rows} />,
            formatTableData,
        };
    };

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleRolesTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table key={"role-table"} tableData={tableData} />
        </div>
    );
};

export default RolesTable;
