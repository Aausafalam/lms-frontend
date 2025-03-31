"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import UsersTableUtils from "./utils";
import sampleUsersTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import usersTableConstants from "./utils/constants";

const UsersTable = ({ setSelectedUsers, setModalState, refreshTable, setSelectedRow, view }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: UsersTableUtils.getTableRows({ data, styles }),
        actionData: view != "roles" && UsersTableUtils.getTableActions({ data, setModalState, setSelectedUsers }),
        url: usersTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: usersTableConstants.SORTING,
        rowClickHandler: (row) => UsersTableUtils.handleRowClick({ row, data, setModalState, setSelectedUsers }),
        externalFilters: usersTableConstants.FILTERS,
        tableHeader: UsersTableUtils.getTableHeader({ data, setModalState, styles, view }),
        checkbox: true,
        refreshTable: refreshTable || false,
        setSelectedRow,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleUsersTableData), [refreshTable, setSelectedRow, view]);

    return (
        <div className={styles.container}>
            <Table key={`${view}users-table`} tableData={tableData} />
        </div>
    );
};

export default UsersTable;
