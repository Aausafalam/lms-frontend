import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import videosTableConstants from "./constants";

/**
 * Videos Table Utilities
 * @description Utility functions for table configuration and actions
 */
class VideosTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId, moduleId, lessonId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"]);

        return {
            title,
            limit: videosTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Video",
                    onClick: () => navigate(`/videos/form/add?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/module/${moduleId}/lesson/${lessonId}/video/export`,
                    filename: "videos-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search videos by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...videosTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedVideo, navigate, courseId, moduleId, lessonId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedVideo = data?.records?.find((item) => row.id === item.id);

                if (!selectedVideo) {
                    console.error("Video not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/videos/form/${row.id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
                } else if (actionType === "view") {
                    navigate(`/videos/details/${row.id}?courseId=${courseId}&moduleId=${moduleId}&lessonId=${lessonId}`);
                } else {
                    setSelectedVideo(selectedVideo);
                    setModalState(actionType, selectedVideo.id);
                }
            } catch (error) {
                console.error("Error handling table action:", error);
            }
        };

        return [
            {
                name: "View",
                functions: (row) => handleAction(row, "view"),
                label: "View Details",
                icon: "eye",
            },
            {
                name: "Edit",
                functions: (row) => handleAction(row, "edit"),
                label: "Edit Video",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Video",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedVideo }) {
        try {
            const selectedVideo = data?.data?.find((item) => row.id.value === item.id);

            if (selectedVideo) {
                setSelectedVideo(selectedVideo);
                setModalState("view", selectedVideo.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default VideosTableUtils;
