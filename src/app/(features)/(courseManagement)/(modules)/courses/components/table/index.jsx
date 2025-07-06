"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import CoursesTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import coursesTableConstants from "./utils/constants";
import CourseCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LayoutDashboard, Plus, School } from "lucide-react";
import { EmptyState } from "@/components/emptyState";

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
        actionData: CoursesTableUtils.getTableActions({ data, setModalState, setSelectedCourse, navigate }),
        url: coursesTableConstants.API_URL,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: coursesTableConstants.SORTING,
        externalFilters: coursesTableConstants.FILTERS,
        tableHeader: CoursesTableUtils.getTableHeader({ data, setModalState, styles, navigate, title: <Breadcrumb items={breadcrumbItems} /> }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: true,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row, view) => <CourseCard data={row} view={view} />,
        },

        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Courses Found"
                description="You haven't created any course yet. Start by creating your first course."
                actionLabel="Create Course"
                actionIcon={Plus}
                onAction={() => navigate("/courses/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData({}), [refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default CoursesTable;
