"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import ModulesTableUtils from "./utils";
import sampleModulesTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import modulesTableConstants from "./utils/constants";
import ModuleCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageIcon, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useQueryParams } from "@/lib/hooks/useQuery";
import { useParams } from "next/navigation";

const ModulesTable = ({ setSelectedModule, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { courseId } = useParams();
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: `/courses/details/${courseId}`,
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: ModulesTableUtils.getTableActions({ data, setModalState, setSelectedModule, navigate }),
        url: `/course/${courseId}/module`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: modulesTableConstants.SORTING,
        rowClickHandler: (row) => ModulesTableUtils.handleRowClick({ row, data, setModalState, setSelectedModule }),
        externalFilters: modulesTableConstants.FILTERS,
        tableHeader: ModulesTableUtils.getTableHeader({ data, setModalState, styles, navigate, title: courseId ? "Module List" : <Breadcrumb items={breadcrumbItems} />, courseId }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: courseId ? 4 : 5,
            card: (row) => <ModuleCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={ImageIcon}
                title="No Modules Found"
                description="You haven't created any  modules yet. Start by creating your first module."
                actionLabel="Create Module"
                actionIcon={Plus}
                onAction={() => navigate(`/modules/form/add?courseId=${courseId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleModulesTableData), [refreshTable, courseId]);

    return (
        <div className={styles.container}>
            <Table tableData={tableData} />
        </div>
    );
};

export default ModulesTable;
