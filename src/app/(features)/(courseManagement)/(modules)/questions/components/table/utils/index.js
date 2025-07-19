import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import questionsTableConstants from "./constants";

/**
 * Questions Table Utilities
 * @description Utility functions for table configuration and actions
 */
class QuestionsTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId, examId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"]);

        return {
            title,
            limit: questionsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Question",
                    onClick: () => navigate(`/questions/form/add?courseId=${courseId}&examId=${examId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/exam/${examId}/question/export`,
                    filename: "questions-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search questions by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...questionsTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedQuestion, navigate, courseId, examId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedQuestion = data?.records?.find((item) => row.id === item.id);

                if (!selectedQuestion) {
                    console.error("Question not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/questions/form/${row.id}?courseId=${courseId}&examId=${examId}`);
                } else if (actionType === "view") {
                    navigate(`/questions/details/${row.id}?courseId=${courseId}&examId=${examId}`);
                } else {
                    setSelectedQuestion(selectedQuestion);
                    setModalState(actionType, selectedQuestion.id);
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
                label: "Edit Question",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Question",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedQuestion }) {
        try {
            const selectedQuestion = data?.data?.find((item) => row.id.value === item.id);

            if (selectedQuestion) {
                setSelectedQuestion(selectedQuestion);
                setModalState("view", selectedQuestion.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default QuestionsTableUtils;
