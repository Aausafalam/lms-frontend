"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { LayoutDashboard, Package, Plus, School } from "lucide-react";
import Table from "@/components/table";
import VideosTableUtils from "./utils";
import GlobalUtils from "@/lib/utils";
import videosTableConstants from "./utils/constants";
import VideoCard from "./components/gridCard";
import { useNavigation } from "@/components/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EmptyState } from "@/components/emptyState";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useParams } from "next/navigation";
import coursesTableConstants from "../../../courses/components/table/utils/constants";
import { useQueryParams } from "@/lib/hooks/useQuery";

/**
 * Videos Table Component
 * @description Main table component for displaying and managing videos
 */
const VideosTable = ({ setSelectedVideo, setModalState, refreshTable }) => {
    const { navigate } = useNavigation();
    const [isMobile, setIsMobile] = useState(false);
    const { lessonId } = useParams();
    const { courseId, moduleId, isReady } = useQueryParams();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    /**
     * Format data for table configuration
     */
    const formatTableData = (data) => ({
        rows: data?.records || [],
        actionData: VideosTableUtils.getTableActions({
            data,
            setModalState,
            setSelectedVideo,
            navigate,
            courseId,
            moduleId,
            lessonId,
        }),
        url: `${coursesTableConstants.API_URL}/${courseId}/module/${moduleId}/lesson/${lessonId}/${videosTableConstants.API_URL}`,
        pagination: GlobalUtils.tablePagination(data?.pagination),
        sorting: videosTableConstants.SORTING,
        externalFilters: videosTableConstants.FILTERS,
        tableHeader: VideosTableUtils.getTableHeader({
            data,
            setModalState,
            navigate,
            courseId,
            moduleId,
            lessonId,
            title: "Video List",
        }),
        checkbox: true,
        refreshTable: refreshTable || false,
        formatTableData,
        initialView: isMobile ? "grid" : "grid",
        multiView: true,
        grid: {
            column: isMobile ? 1 : 4,
            card: (row, view) => (
                <VideoCard
                    data={row}
                    view={view}
                    onEdit={(id) => navigate(`/videos/form/${id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`)}
                    onDelete={(id) => setModalState("delete", id)}
                    onView={(id) => navigate(`/videos/details/${id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`)}
                />
            ),
        },
        emptyStateComponent: () => (
            <EmptyState
                icon={School}
                title="No Videos Found"
                description="You haven't created any video yet. Start by creating your first video."
                actionLabel="Create Video"
                actionIcon={Plus}
                onAction={() => navigate(`/videos/form/add?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`)}
                className="bg-orange-50/50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800/30 my-3"
            />
        ),
    });

    console.log("courseId, moduleId, lessonId", courseId, moduleId, lessonId);

    // Fixed: Added courseId, moduleId, lessonId to dependency array
    // Only create tableData when all required params are available
    const tableData = useMemo(() => {
        // Guard: Don't create table data until all required params are ready
        if (!isReady || !courseId || !moduleId || !lessonId) {
            return null;
        }
        return formatTableData({});
    }, [refreshTable, isMobile, isReady, courseId, moduleId, lessonId]);

    return (
        <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="videos-table-container">{tableData ? <Table tableData={tableData} /> : <div>Loading...</div>}</div>
            </Suspense>
        </ErrorBoundary>
    );
};

export default VideosTable;
