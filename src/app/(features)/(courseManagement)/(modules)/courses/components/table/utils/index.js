import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import coursesTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

class CoursesTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
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
     * Generates table rows based on courses data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.records?.map((courses) => {
            return {
                id: { key: "id", value: courses.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: (
                        <div class="whitespace-nowrap py-1">
                            <div class="text-sm font-normal text-gray-800">{GlobalUtils.capitalizeEachWord(courses.name)}</div>
                            <div class="text-xs text-gray-500 font-light">{courses.description}</div>
                        </div>
                    ),
                },
                Group: {
                    key: "coursesGroup",
                    value: (
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-normal bg-blue-100 text-blue-800">
                            {GlobalUtils.capitalizeEachWord(courses.privilegeGroup?.name)}
                        </span>
                    ),
                },
                "Routes Count": {
                    key: "Routes",
                    value: courses?.routes?.length,
                },
                Status: {
                    key: "Status",
                    value: <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-medium bg-green-100 text-green-800">Active</span>,
                },
                "Created At": {
                    key: "createdAt",
                    value: GlobalUtils.formatDate(courses.createdAt),
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedCourses }) {
        const handleAction = (row, actionType) => {
            const selectedCourses = data?.records?.find((item) => row["id"].value === item.id);
            setSelectedCourses(selectedCourses);
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
    static handleRowClick({ row, data, setModalState, setSelectedCourses }) {
        const selectedCourses = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedCourses(selectedCourses);
        setModalState("view", selectedCourses.id);
    }
}

export default CoursesTableUtils;
