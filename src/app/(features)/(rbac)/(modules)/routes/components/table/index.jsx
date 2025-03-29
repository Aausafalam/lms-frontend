"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import RoutesTableUtils from "./utils";
import sampleRoutesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import routesTableConstants from "./utils/constants";

const RoutesTable = ({ setSelectedRoutes, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: RoutesTableUtils.getTableRows({ data, styles }),
        // actionData: RoutesTableUtils.getTableActions({ data, setModalState, setSelectedRoutes }),
        url: routesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: routesTableConstants.SORTING,
        rowClickHandler: (row) => RoutesTableUtils.handleRowClick({ row, data, setModalState, setSelectedRoutes }),
        externalFilters: routesTableConstants.FILTERS,
        tableHeader: RoutesTableUtils.getTableHeader({ data, setModalState, styles }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleRoutesTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default RoutesTable;
