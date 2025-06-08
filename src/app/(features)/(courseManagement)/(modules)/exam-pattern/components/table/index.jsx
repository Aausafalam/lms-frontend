"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import examPatternTableUtils from "./utils";
import sampleExamPatternTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import examPatternTableConstants from "./utils/constants";
import ExamPatternCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageIcon, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useParams } from "next/navigation";

const examPatternTable = ({ setSelectedExamPattern, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const breadcrumbItems = [
        {
            title: "Exam Pattern",
            href: "/examPattern",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: examPatternTableUtils.getTableActions({ data, setModalState, setSelectedExamPattern, navigate }),
        url: `/course/${courseId}/exam-pattern`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: examPatternTableConstants.SORTING,
        externalFilters: examPatternTableConstants.FILTERS,
        tableHeader: examPatternTableUtils.getTableHeader({
            data,
            setModalState,
            styles,
            navigate,
            courseId,
            title: courseId ? "Exam Pattern List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row) => <ExamPatternCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={ImageIcon}
                title="No examPattern Found"
                description="You haven't created any  examPattern yet. Start by creating your first examPattern."
                actionLabel="Create Exam Pattern"
                actionIcon={Plus}
                onAction={() => navigate("/exam-pattern/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleExamPatternTableData), [courseId, refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default examPatternTable;
