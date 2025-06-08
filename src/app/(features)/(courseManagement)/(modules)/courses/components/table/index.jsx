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
import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard } from "lucide-react";

const CoursesTable = ({ setSelectedCourse, setModalState, refreshTable }) => {
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];
    const { navigate } = useNavigation();
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: CoursesTableUtils.getTableActions({ data, setModalState, setSelectedCourse }),
        url: coursesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data),
        sorting: coursesTableConstants.SORTING,
        // rowClickHandler: (row) => CoursesTableUtils.handleRowClick({ row, data, setModalState, setSelectedCourse }),
        externalFilters: coursesTableConstants.FILTERS,
        tableHeader: CoursesTableUtils.getTableHeader({ data, setModalState, styles, navigate, title: <Breadcrumb items={breadcrumbItems} /> }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
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
