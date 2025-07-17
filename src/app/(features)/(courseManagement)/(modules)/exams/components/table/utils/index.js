import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import examsTableConstants from "./constants";

/**
 * Exams Table Utilities
 * @description Utility functions for table configuration and actions
 */
class ExamsTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "examCode", "description"]);

        return {
            title,
            limit: examsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Exam",
                    onClick: () => navigate(`/exams/form/add?courseId=${courseId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/exam/export`,
                    filename: "exams-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search exams by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...examsTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedExam, navigate, courseId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedExam = data?.records?.find((item) => row.id === item.id);

                if (!selectedExam) {
                    console.error("Exam not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/exams/form/${row.id}?courseId=${courseId}`);
                } else if (actionType === "view") {
                    navigate(`/exams/details/${row.id}?courseId=${courseId}`);
                } else {
                    setSelectedExam(selectedExam);
                    setModalState(actionType, selectedExam.id);
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
                label: "Edit Exam",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Exam",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedExam }) {
        try {
            const selectedExam = data?.data?.find((item) => row.id.value === item.id);

            if (selectedExam) {
                setSelectedExam(selectedExam);
                setModalState("view", selectedExam.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default ExamsTableUtils;
