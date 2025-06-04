"use client";
import React, { useMemo } from "react";
import styles from "./styles/index.module.css";
import Table from "@/components/table";
import ContentsTableUtils from "./utils";
import sampleContentsTableData from "./utils/seeds";
import GlobalUtils from "@/lib/utils";
import contentsTableConstants from "./utils/constants";
import ContentCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageIcon, Package, Plus } from "lucide-react";
import { EmptyState } from "@/components/emptyState";
import { useParams } from "next/navigation";
import { useQueryParams } from "@/lib/hooks/useQuery";

const ContentsTable = ({ setSelectedContent, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const { lessonDetails } = useParams();
    const { courseId, moduleId } = useQueryParams();
    const breadcrumbItems = [
        {
            title: "Courses",
            href: "/courses",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Modules",
            href: "/modules",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Lessons",
            href: "/lesson",
            icon: <Package className="h-3.5 w-3.5" />,
        },
        {
            title: "Contents",
            href: "/contents",
            icon: <Package className="h-3.5 w-3.5" />,
        },
    ];
    /* Function to format data for the table */
    const formatTableData = (data) => ({
        rows: data?.records,
        actionData: ContentsTableUtils.getTableActions({ data, setModalState, setSelectedContent, navigate, moduleId, lessonId: lessonDetails, courseId }),
        url: `course/${courseId}/module/${moduleId}/lesson/${lessonDetails}/video`,
        pagination: GlobalUtils.tablePagination(data),
        sorting: contentsTableConstants.SORTING,
        rowClickHandler: (row) => ContentsTableUtils.handleRowClick({ row, data, setModalState, setSelectedContent }),
        externalFilters: contentsTableConstants.FILTERS,
        tableHeader: ContentsTableUtils.getTableHeader({
            data,
            courseId,
            moduleId,
            lessonId: lessonDetails,
            setModalState,
            styles,
            navigate,
            title: lessonDetails ? "Content List" : <Breadcrumb items={breadcrumbItems} />,
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: "grid",
        multiView: false,
        /* Grid view configuration */
        grid: {
            column: lessonDetails ? 4 : 5,
            card: (row) => <ContentCard data={row} />,
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={ImageIcon}
                title="No Contents Found"
                description="You haven't created any  contents yet. Start by creating your first content."
                actionLabel="Create Content"
                actionIcon={Plus}
                onAction={() => navigate("/contents/form/add")}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    /* Memoize table data for performance optimization */
    const tableData = useMemo(() => formatTableData(sampleContentsTableData), [refreshTable, moduleId, lessonDetails, courseId]);

    return <div className={styles.container}>{moduleId && lessonDetails && courseId && <Table tableData={tableData} />}</div>;
};

export default ContentsTable;
