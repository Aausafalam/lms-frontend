import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import permissionGroupTableConstants from "./constants";

class PermissionGroupTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: permissionGroupTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add  Permission Group",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/permissionGroup" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Permission Group",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on permissionGroup data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.records?.map((permissionGroup) => {
            return {
                id: { key: "id", value: permissionGroup.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: permissionGroup.name,
                    url: `/permission/${permissionGroup.id}`,
                },
                "Assign To": {
                    key: "assignTo",
                    value: (
                        <div className={styles.assign_to_container}>
                            {permissionGroup?.assignTo?.map((assignTo) => (
                                <span className={`${styles.assign_to} ${styles[assignTo.replace(" ", "_").toLowerCase()]}`} key={assignTo}>
                                    {assignTo}
                                </span>
                            ))}
                        </div>
                    ),
                },
                "Created At": {
                    key: "createdAt",
                    value: permissionGroup.createdAt,
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedPermissionGroup }) {
        const handleAction = (row, actionType) => {
            const selectedPermissionGroup = data?.records?.find((item) => row["id"].value === item.id);
            setSelectedPermissionGroup(selectedPermissionGroup);
            setModalState(actionType, selectedPermissionGroup.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedPermissionGroup }) {
        const selectedPermissionGroup = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedPermissionGroup(selectedPermissionGroup);
        setModalState("view", selectedPermissionGroup.id);
    }

    static handleColumnClick({ row, data, navigate }) {
        const selectedPermissionGroup = data?.data?.find((item) => row["id"].value === item.id);
        console.log(selectedPermissionGroup);
        navigate?.(selectedPermissionGroup.id);
    }
}

export default PermissionGroupTableUtils;
