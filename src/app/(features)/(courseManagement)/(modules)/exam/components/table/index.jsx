"use client";
import { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import examTableUtils from "./utils";
import sampleExamTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import examTableConstants from "./utils/constants";
import ExamCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageIcon, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useParams } from "next/navigation";

const ExamTable = ({ setSelectedExam, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const breadcrumbItems = [
        {
            title: "Exam",
            href: "/exam",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];

    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: examTableUtils.getTableActions({ data, setModalState, setSelectedExam, navigate }),
        url: `/course/${courseId}/exam`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: examTableConstants.SORTING,
        externalFilters: examTableConstants.FILTERS,
        tableHeader: examTableUtils.getTableHeader({
            data,
            setModalState,
            styles,
            navigate,
            courseId,
            title: courseId ? "Exam List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row) => <ExamCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={ImageIcon}
                title="No Exams Found"
                description="You haven't created any exams yet. Start by creating your first exam."
                actionLabel="Create Exam"
                actionIcon={Plus}
                onAction={() => navigate("/exam/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleExamTableData), [courseId, refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default ExamTable;
