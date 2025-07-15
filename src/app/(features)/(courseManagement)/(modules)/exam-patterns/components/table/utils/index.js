import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import examPatternsTableConstants from "./constants";

/**
 * ExamPatterns Table Utilities
 * @description Utility functions for table configuration and actions
 */
class ExamPatternsTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"]);

        return {
            title,
            limit: examPatternsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New ExamPattern",
                    onClick: () => navigate(`/exam-patterns/form/add?courseId=${courseId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/exam-pattern/export`,
                    filename: "examPatterns-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search exam patterns by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...examPatternsTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedExamPattern, navigate, courseId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedExamPattern = data?.records?.find((item) => row.id === item.id);

                if (!selectedExamPattern) {
                    console.error("Exam Pattern not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/exam-patterns/form/${row.id}?courseId=${courseId}`);
                } else if (actionType === "view") {
                    navigate(`/exam-patterns/details/${row.id}?courseId=${courseId}`);
                } else {
                    setSelectedExamPattern(selectedExamPattern);
                    setModalState(actionType, selectedExamPattern.id);
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
                label: "Edit Exam Pattern",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Exam Pattern",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedExamPattern }) {
        try {
            const selectedExamPattern = data?.data?.find((item) => row.id.value === item.id);

            if (selectedExamPattern) {
                setSelectedExamPattern(selectedExamPattern);
                setModalState("view", selectedExamPattern.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default ExamPatternsTableUtils;
