"use client";
import { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import questionTableUtils from "./utils";
import sampleQuestionTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import questionTableConstants from "./utils/constants";
import QuestionCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HelpCircle, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

const QuestionPanelTable = ({ setSelectedQuestion, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { courseId } = useQueryParams();
    const { examId } = useParams();
    const breadcrumbItems = [
        {
            title: "Questions",
            href: "/questions",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];

    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: questionTableUtils.getTableActions({ data, setModalState, setSelectedQuestion, navigate, examId, courseId }),
        url: `/course/${courseId}/exam/${examId}/question`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: questionTableConstants.SORTING,
        externalFilters: questionTableConstants.FILTERS,
        tableHeader: questionTableUtils.getTableHeader({
            data,
            setModalState,
            styles,
            navigate,
            examId,
            courseId,
            title: courseId ? "Question List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: 4,
            card: (row) => <QuestionCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={HelpCircle}
                title="No Questions Found"
                description="You haven't created any questions yet. Start by creating your first question."
                actionLabel="Create Question"
                actionIcon={Plus}
                onAction={() => navigate("/questions/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData({}), [courseId, examId, refreshTable]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default QuestionPanelTable;
