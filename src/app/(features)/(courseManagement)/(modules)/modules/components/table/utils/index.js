import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import modulesTableConstants from "./constants";

/**
 * Modules Table Utilities
 * @description Utility functions for table configuration and actions
 */
class ModulesTableUtils {
    /**
     * Generate table header configuration
     * @param {Object} params - Configuration parameters
     * @returns {Object} Table header configuration
     */
    static getTableHeader({ data, navigate, title, courseId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "code", "summary"]);

        return {
            title,
            limit: modulesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Module",
                    onClick: () => navigate(`/modules/form/add?courseId=${courseId}`),
                    variant: "primary",
                },
                TableUtils.getExportButton({
                    url: `/course/${courseId}/module/export`,
                    filename: "modules-export",
                }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search modules by name or summary",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...modulesTableConstants.FILTERS.filterFields,
            ],
        };
    }

    /**
     * Get available actions for each table row
     * @param {Object} params - Action configuration parameters
     * @returns {Array} Array of action configurations
     */
    static getTableActions({ data, setModalState, setSelectedModule, navigate, courseId }) {
        const handleAction = (row, actionType) => {
            try {
                const selectedModule = data?.records?.find((item) => row.id === item.id);

                if (!selectedModule) {
                    console.error("Module not found for action:", actionType);
                    return;
                }

                if (actionType === "edit") {
                    navigate(`/modules/form/${row.id}?courseId=${courseId}`);
                } else if (actionType === "view") {
                    navigate(`/modules/details/${row.id}?courseId=${courseId}`);
                } else {
                    setSelectedModule(selectedModule);
                    setModalState(actionType, selectedModule.id);
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
                label: "Edit Module",
                icon: "edit",
            },
            {
                name: "Delete",
                functions: (row) => handleAction(row, "delete"),
                label: "Delete Module",
                icon: "trash",
                variant: "destructive",
            },
        ];
    }

    /**
     * Handle row click actions
     * @param {Object} params - Row click parameters
     */
    static handleRowClick({ row, data, setModalState, setSelectedModule }) {
        try {
            const selectedModule = data?.data?.find((item) => row.id.value === item.id);

            if (selectedModule) {
                setSelectedModule(selectedModule);
                setModalState("view", selectedModule.id);
            }
        } catch (error) {
            console.error("Error handling row click:", error);
        }
    }
}

export default ModulesTableUtils;
