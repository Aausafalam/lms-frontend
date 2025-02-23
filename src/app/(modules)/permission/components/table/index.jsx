"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import PermissionGroupTableUtils from "./utils";
import samplePermissionGroupTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import permissionGroupTableConstants from "./utils/constants";

const PermissionGroupTable = ({ setSelectedPermissionGroup, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: PermissionGroupTableUtils.getTableRows({ data, styles }),
        actionData: PermissionGroupTableUtils.getTableActions({ data, setModalState, setSelectedPermissionGroup }),
        url: permissionGroupTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: permissionGroupTableConstants.SORTING,
        rowClickHandler: (row) => PermissionGroupTableUtils.handleRowClick({ row, data, setModalState, setSelectedPermissionGroup }),
        externalFilters: permissionGroupTableConstants.FILTERS,
        tableHeader: PermissionGroupTableUtils.getTableHeader({ data, setModalState, styles }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(samplePermissionGroupTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default PermissionGroupTable;
