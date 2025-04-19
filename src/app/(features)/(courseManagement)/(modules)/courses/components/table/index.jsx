"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import CoursesTableUtils from "./utils";
import sampleCoursesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import coursesTableConstants from "./utils/constants";
import CourseCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";

const CoursesTable = ({ setSelectedCourses, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: CoursesTableUtils.getTableRows({ data, styles }),
        actionData: CoursesTableUtils.getTableActions({ data, setModalState, setSelectedCourses }),
        url: coursesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: coursesTableConstants.SORTING,
        rowClickHandler: (row) => CoursesTableUtils.handleRowClick({ row, data, setModalState, setSelectedCourses }),
        externalFilters: coursesTableConstants.FILTERS,
        tableHeader: CoursesTableUtils.getTableHeader({ data, setModalState, styles, navigate }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        /* Grid view configuration */
        grid: {
            column: 3,
            card: (row) => <CourseCard data={row} />,
        },
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleCoursesTableData), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default CoursesTable;
