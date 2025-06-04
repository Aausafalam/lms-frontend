import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import modulesTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

class ModulesTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title, courseId }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            title: courseId ? "Module List" : title,
            limit: modulesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Modules",
                    onClick: () => navigate(`/modules/form/add?courseId=${courseId}`),
                },
                TableUtils.getExportButton({ url: "/modules" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Modules ",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedModule, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedModules = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/modules/form/${row["id"]}`);
            } else {
                setSelectedModule(selectedModules);
                setModalState(actionType, selectedModules.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Entry" },
            { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Details" },
        ];
    }

    /**
     * Handles row click actions.
     */
    static handleRowClick({ row, data, setModalState, setSelectedModule }) {
        const selectedModules = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedModule(selectedModules);
        setModalState("view", selectedModules.id);
    }
}

export default ModulesTableUtils;
