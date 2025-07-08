import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import lessonsTableConstants from "./constants";

/**
 * Lessons Table Utilities
 * @description Utility functions for table configuration and actions
 */
class LessonsTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId, moduleId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"]);

        return {
            title,
            limit: lessonsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Lesson",
                    onClick: () => navigate(`/lessons/form/add?courseId=${courseId}&moduleId=${moduleId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/module/${moduleId}/lesson/export`,
                    filename: "lessons-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search lessons by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...lessonsTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedLesson, navigate, courseId,moduleId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedLesson = data?.records?.find((item) => row.id === item.id);

                if (!selectedLesson) {
                    console.error("Lesson not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/lessons/form/${row.id}?courseId=${courseId}&moduleId=${moduleId}`);
                } else if (actionType === "view") {
                    navigate(`/lessons/details/${row.id}?courseId=${courseId}&moduleId=${moduleId}`);
                } else {
                    setSelectedLesson(selectedLesson);
                    setModalState(actionType, selectedLesson.id);
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
                label: "Edit Lesson",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Lesson",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedLesson }) {
        try {
            const selectedLesson = data?.data?.find((item) => row.id.value === item.id);

            if (selectedLesson) {
                setSelectedLesson(selectedLesson);
                setModalState("view", selectedLesson.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default LessonsTableUtils;
