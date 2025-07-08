"use client";

import { useMemo, useState, useEffect } from "react";
import { LayoutDashboard, Package, Plus, School } from "lucide-react";
import Table from "@/components/table";
import LessonsTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import lessonsTableConstants from "./utils/constants";
import LessonCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/emptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";
import coursesTableConstants from "../../../courses/components/table/utils/constants";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Lessons Table Component
 * @description Main table component for displaying and managing lessons
 */
const LessonsTable = ({ setSelectedLesson, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const [isMobile, setIsMobile] = useState(false);
    const { moduleId } = useParams();
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
            title: "Lessons",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    /**
     * Format data for table configuration
     */
    const formatTableData = (data) => ({
        rows: data?.records || [],
        actionData: LessonsTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedLesson,
            navigate,
            courseId,
            moduleId,
        }),
        url: `${coursesTableConstants.API_URL}/${courseId}/module/${moduleId}/${lessonsTableConstants.API_URL}`,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: lessonsTableConstants.SORTING,
        externalFilters: lessonsTableConstants.FILTERS,
        tableHeader: LessonsTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            courseId,
            moduleId,
            title: "Lesson List",
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: isMobile ? "grid" : "grid",
        multiView: true,
        grid: {
            column: isMobile ? 1 : 4,
            card: (row, view) => (
                <LessonCard
                    data={row}
                    view={view}
                    onEdit={(id) => navigate(`/lessons/form/${id}?courseId=${courseId}&moduleId=${moduleId}`)}
                    onDelete={(id) => setModalState("delete", id)}
                    onView={(id) => navigate(`/lessons/details/${id}?courseId=${courseId}&moduleId=${moduleId}`)}
                />
            ),
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Lessons Found"
                description="You haven't created any lesson yet. Start by creating your first lesson."
                actionLabel="Create Lesson"
                actionIcon={Plus}
                onAction={() => navigate(`/lessons/form/add?courseId=${courseId}&moduleId=${moduleId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData({}), [refreshTable, isMobile, courseId, moduleId]);

    return (
        <ErrorBoundary>
            <div className="lessons-table-container">
                <Table tableData={tableData} />
            </div>
        </ErrorBoundary>
    );
};

export default LessonsTable;
