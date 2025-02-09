"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import CourseTableUtils from "./utils";
import sampleCourseTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import courseTableConstants from "./utils/constants";

const CourseTable = ({ setSelectedCourse, setModalState, refreshTable }) => {
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: CourseTableUtils.getTableRows({ data, styles }),
        actionData: CourseTableUtils.getTableActions({ data, setModalState, setSelectedCourse }),
        url: courseTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: courseTableConstants.SORTING,
        rowClickHandler: (row) => CourseTableUtils.handleRowClick({ row, data, setModalState, setSelectedCourse }),
        externalFilters: courseTableConstants.FILTERS,
        tableHeader: CourseTableUtils.getTableHeader({ data, setModalState, styles }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleCourseTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default CourseTable;
