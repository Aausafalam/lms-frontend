import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import UserAvatar from "@/components/UserAvatar";
import GlobalUtils from "@/lib/utils";
import courseTableConstants from "./constants";

class CourseTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "designation"]);

        return {
            limit: courseTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add New Course",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/course" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Course",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on course data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.data?.map((course) => {
            course.profile = {
                name: course.name,
                image: course.thumbnailUrl || "",
                id: course.id,
            };

            return {
                id: { key: "id", value: course.id, type: "hidden" },
                course: {
                    key: "name",
                    value: <UserAvatar userDetails={course.profile} />,
                    originalValue: GlobalUtils.capitalizeEachWord(course.profile?.name) || "",
                    suggestionValue: GlobalUtils.capitalizeEachWord(course.profile?.name) || "",
                },
                status: { key: "status", value: <span className={`${styles.status} ${styles[course.status]}`}>{GlobalUtils.capitalizeEachWord(course.status)}</span> },
                Published: { key: "isPublic", value: course.isPublic ? "Yes" : "No" },
                duration: { key: "duration", value: `${course.duration || "N/A"} weeks` },
                createdAt: { key: "createdAt", value: GlobalUtils.formatDate(course.createdAt) },
                category: { key: "categoryId", value: course.categoryId || "N/A" },
                difficultyLevel: { key: "difficultyLevel", value: course.difficultyLevel || "N/A" },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedCourse }) {
        const handleAction = (row, actionType) => {
            const selectedCourse = data?.data?.find((item) => row["id"].value === item.id);
            setSelectedCourse(selectedCourse);
            setModalState(actionType, selectedCourse.id);
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
        const selectedCourse = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedCourse(selectedCourse);
        setModalState("view", selectedCourse.id);
    }
}

export default CourseTableUtils;
