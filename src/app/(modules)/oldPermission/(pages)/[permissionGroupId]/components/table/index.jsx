"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import PermissionTableUtils from "./utils";
import samplePermissionTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import permissionTableConstants from "./utils/constants";

const PermissionTable = ({ setSelectedPermission, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: PermissionTableUtils.getTableRows({ data, styles }),
        actionData: PermissionTableUtils.getTableActions({ data, setModalState, setSelectedPermission }),
        url: permissionTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: permissionTableConstants.SORTING,
        rowClickHandler: (row) => PermissionTableUtils.handleRowClick({ row, data, setModalState, setSelectedPermission }),
        externalFilters: permissionTableConstants.FILTERS,
        tableHeader: PermissionTableUtils.getTableHeader({ data, setModalState, styles }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(samplePermissionTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default PermissionTable;
