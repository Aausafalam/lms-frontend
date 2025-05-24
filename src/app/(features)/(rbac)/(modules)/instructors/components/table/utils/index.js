import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import instructorsTableConstants from "./constants";

class InstructorsTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: instructorsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Instructors",
                    onClick: () => navigate("/instructors/form/add"),
                },
                TableUtils.getExportButton({ url: "/instructors" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Instructors ",
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
    static getTableActions({ data, setModalState, setSelectedInstructor }) {
        const handleAction = (row, actionType) => {
            const selectedInstructors = data?.records?.find((item) => row["id"] === item.id);
            setSelectedInstructor(selectedInstructors);
            setModalState(actionType, selectedInstructors.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedInstructor }) {
        const selectedInstructors = data?.records?.find((item) => row["id"] === item.id);
        setSelectedInstructor(selectedInstructors);
        setModalState("view", selectedInstructors.id);
    }
}

export default InstructorsTableUtils;
