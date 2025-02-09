"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import InstructorTableUtils from "./utils";
import sampleInstructorTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import instructorTableConstants from "./utils/constants";

const InstructorTable = ({ setSelectedInstructor, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: InstructorTableUtils.getTableRows({ data, styles }),
        actionData: InstructorTableUtils.getTableActions({ data, setModalState, setSelectedInstructor }),
        url: instructorTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: instructorTableConstants.SORTING,
        rowClickHandler: (row) => InstructorTableUtils.handleRowClick({ row, data, setModalState, setSelectedInstructor }),
        externalFilters: instructorTableConstants.FILTERS,
        tableHeader: InstructorTableUtils.getTableHeader({ data, setModalState, styles }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleInstructorTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default InstructorTable;
