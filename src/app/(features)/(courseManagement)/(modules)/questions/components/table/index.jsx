"use client";

import { useMemo, useState, useEffect } from "react";
import { LayoutDashboard, Package, Plus, School } from "lucide-react";
import Table from "@/components/table";
import QuestionsTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import questionsTableConstants from "./utils/constants";
import QuestionCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { EmptyState } from "@/components/emptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";
import coursesTableConstants from "../../../courses/components/table/utils/constants";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Questions Table Component
 * @description Main table component for displaying and managing questions
 */
const QuestionsTable = ({ setSelectedQuestion, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const [isMobile, setIsMobile] = useState(false);
    const { examId } = useParams();
    const { courseId } = useQueryParams();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Questions",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    /**
     * Format data for table configuration
     */
    const formatTableData = (data) => ({
        rows: data?.records || [],
        actionData: QuestionsTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedQuestion,
            navigate,
            courseId,
            examId,
        }),
        url: `${coursesTableConstants.API_URL}/${courseId}/exam/${examId}/${questionsTableConstants.API_URL}`,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: questionsTableConstants.SORTING,
        externalFilters: questionsTableConstants.FILTERS,
        tableHeader: QuestionsTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            courseId,
            examId,
            title: "Question List",
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: isMobile ? "grid" : "grid",
        multiView: true,
        grid: {
            column: isMobile ? 1 : 4,
            card: (row, view) => (
                <QuestionCard
                    data={row}
                    view={view}
                    onEdit={(id) => navigate(`/questions/form/${id}?courseId=${courseId}&examId=${examId}`)}
                    onDelete={(id) => setModalState("delete", id)}
                    onView={(id) => navigate(`/questions/details/${id}?courseId=${courseId}&examId=${examId}`)}
                />
            ),
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Questions Found"
                description="You haven't created any question yet. Start by creating your first question."
                actionLabel="Create Question"
                actionIcon={Plus}
                onAction={() => navigate(`/questions/form/add?courseId=${courseId}&examId=${examId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData({}), [refreshTable, isMobile, courseId, examId]);

    return (
        <ErrorBoundary>
            <div className="questions-table-container">
                <Table tableData={tableData} />
            </div>
        </ErrorBoundary>
    );
};

export default QuestionsTable;
