"use client";
import { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import examBuilderTableUtils from "./utils";
import sampleExamBuilderTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import examBuilderTableConstants from "./utils/constants";
import ExamBuilderCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageIcon, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useParams } from "next/navigation";

const ExamBuilderTable = ({ setSelectedExamBuilder, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const breadcrumbItems = [
        {
            title: "Exam Builder",
            href: "/exam-builder",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];

    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: examBuilderTableUtils.getTableActions({ data, setModalState, setSelectedExamBuilder, navigate }),
        url: `/course/${courseId}/exam`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: examBuilderTableConstants.SORTING,
        externalFilters: examBuilderTableConstants.FILTERS,
        tableHeader: examBuilderTableUtils.getTableHeader({
            data,
            setModalState,
            styles,
            navigate,
            courseId,
            title: courseId ? "Exam Builder List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row) => <ExamBuilderCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={ImageIcon}
                title="No Exams Found"
                description="You haven't created any exams yet. Start by creating your first exam."
                actionLabel="Create Exam"
                actionIcon={Plus}
                onAction={() => navigate("/exam-builder/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleExamBuilderTableData), [courseId, refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default ExamBuilderTable;
