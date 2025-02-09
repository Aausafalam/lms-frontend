import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import UserAvatar from "@/components/UserAvatar";
import GlobalUtils from "@/lib/utils";
import instructorTableConstants from "./constants";

class InstructorTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name", "designation"]);

        return {
            limit: instructorTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add New Instructor",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/instructor" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Instructor",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on instructor data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.data?.map((instructor) => {
            const status = instructor.isActive ? "Active" : "Inactive";

            instructor.profile = {
                name: instructor.name,
                image: instructor.profileImageUrl,
                email: instructor.contactEmail,
                id: instructor.id,
            };

            return {
                id: { key: "id", value: instructor.id, type: "hidden" },
                instructor: {
                    key: "name",
                    value: <UserAvatar userDetails={instructor.profile} />,
                    originalValue: GlobalUtils.capitalizeEachWord(instructor.profile?.name) || "",
                    suggestionValue: GlobalUtils.capitalizeEachWord(instructor.profile?.name) || "",
                },
                designation: { key: "designation", value: instructor.designation || "N/A" },
                rating: { key: "rating", value: instructor.rating || "N/A" },
                status: { key: "isActive", value: <span className={styles[status]}>{status}</span> },
                mobile: { key: "mobile", value: instructor.mobile },
                createdAt: { key: "createdAt", value: GlobalUtils.formatDate(instructor.createdAt) },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedInstructor }) {
        const handleAction = (row, actionType) => {
            const selectedInstructor = data?.data?.find((item) => row["id"].value === item.id);
            setSelectedInstructor(selectedInstructor);
            setModalState(actionType, selectedInstructor.id);
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
        const selectedInstructor = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedInstructor(selectedInstructor);
        setModalState("view", selectedInstructor.id);
    }
}

export default InstructorTableUtils;
