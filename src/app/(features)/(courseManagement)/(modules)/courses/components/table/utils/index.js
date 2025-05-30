import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import coursesTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

class CoursesTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate, title }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            title,
            limit: coursesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Courses",
                    onClick: () => navigate("/courses/form/add"),
                },
                TableUtils.getExportButton({ url: "/courses" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Courses ",
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
    static getTableActions({ data, setModalState, setSelectedCourse }) {
        const handleAction = (row, actionType) => {
            const selectedCourses = data?.records?.find((item) => row["id"] === item.id);
            setSelectedCourse(selectedCourses);
            setModalState(actionType, selectedCourses.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedCourse }) {
        const selectedCourses = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedCourse(selectedCourses);
        setModalState("view", selectedCourses.id);
    }
}

export default CoursesTableUtils;
