"use client";

import { useMemo, useState, useEffect } from "react";
import { LayoutDashboard, Package, Plus, School } from "lucide-react";
import Table from "@/components/table";
import ModulesTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import modulesTableConstants from "./utils/constants";
import ModuleCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/emptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";
import coursesTableConstants from "../../../courses/components/table/utils/constants";

/**
 * Modules Table Component
 * @description Main table component for displaying and managing modules
 */
const ModulesTable = ({ setSelectedModule, setModalState, refreshTable }) => {
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
            title: "Modules",
            href: `/courses/details/${courseId}`,
            icon: <LayoutDashboard className="h-3.5 w-3.5" />,
        },
    ];

    /**
     * Format data for table configuration
     */
    const formatTableData = (data) => ({
        rows: data?.records || [],
        actionData: ModulesTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedModule,
            navigate,
            courseId,
        }),
        url: `${coursesTableConstants.API_URL}/${courseId}/${modulesTableConstants.API_URL}`,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: modulesTableConstants.SORTING,
        externalFilters: modulesTableConstants.FILTERS,
        tableHeader: ModulesTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            courseId,
            title: courseId ? "Module List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: isMobile ? "grid" : "grid",
        multiView: true,
        grid: {
            column: isMobile ? 1 : 4,
            card: (row, view) => (
                <ModuleCard
                    data={row}
                    view={view}
                    onEdit={(id) => navigate(`/modules/form/${id}?courseId=${courseId}`)}
                    onDelete={(id) => setModalState("delete", id)}
                    onView={(id) => navigate(`/modules/details/${id}?courseId=${courseId}`)}
                />
            ),
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Modules Found"
                description="You haven't created any module yet. Start by creating your first module."
                actionLabel="Create Module"
                actionIcon={Plus}
                onAction={() => navigate(`/modules/form/add?courseId=${courseId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    const tableData = useMemo(() => formatTableData({}), [refreshTable, isMobile]);

    return (
        <ErrorBoundary>
            <div className="modules-table-container">
                <Table tableData={tableData} />
            </div>
        </ErrorBoundary>
    );
};

export default ModulesTable;
