"use client";

import { useMemo, useState, useEffect } from "react";
import { LayoutDashboard, Package, Plus, School } from "lucide-react";
import Table from "@/components/table";
import ExamsTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import examsTableConstants from "./utils/constants";
import ExamCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/emptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";
import coursesTableConstants from "../../../courses/components/table/utils/constants";

/**
 * Exams Table Component
 * @description Main table component for displaying and managing exams
 */
const ExamsTable = ({ setSelectedExam, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const [isMobile, setIsMobile] = useState(false);
    const { courseId } = useParams();

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
            title: "Exams",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    /**
     * Format data for table configuration
     */
    const formatTableData = (data) => ({
        rows: data?.records || [],
        actionData: ExamsTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedExam,
            navigate,
            courseId,
        }),
        url: `${coursesTableConstants.API_URL}/${courseId}/${examsTableConstants.API_URL}`,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: examsTableConstants.SORTING,
        externalFilters: examsTableConstants.FILTERS,
        tableHeader: ExamsTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            courseId,
            title: courseId ? "Exam List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: isMobile ? "grid" : "grid",
        multiView: true,
        grid: {
            column: isMobile ? 1 : 4,
            card: (row, view) => (
                <ExamCard
                    data={row}
                    view={view}
                    onEdit={(id) => navigate(`/exams/form/${id}?courseId=${courseId}`)}
                    onDelete={(id) => setModalState("delete", id)}
                    onView={(id) => navigate(`/exams/details/${id}?courseId=${courseId}`)}
                />
            ),
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Exams Found"
                description="You haven't created any exam yet. Start by creating your first exam."
                actionLabel="Create Exam"
                actionIcon={Plus}
                onAction={() => navigate(`/exams/form/add?courseId=${courseId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData({}), [refreshTable, isMobile]);

    return (
        <ErrorBoundary>
            <div className="exams-table-container">
                <Table tableData={tableData} />
            </div>
        </ErrorBoundary>
    );
};

export default ExamsTable;
