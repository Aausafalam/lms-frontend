import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import permissionGroupTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

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
    static getTableRows({ data = { records: [] }, styles }) {
        return data?.records?.map((permissionGroup) => {
            return {
                id: { key: "id", value: permissionGroup.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: (
                        <div class="whitespace-nowrap py-1">
                            <div class="text-sm font-normal text-gray-800">{GlobalUtils.capitalizeEachWord(permissionGroup.name)}</div>
                            <div class="text-xs text-gray-500 font-light">{permissionGroup.description}</div>
                        </div>
                    ),
                },
                Permissions: {
                    key: "permissions",
                    value: (
                        <div className={styles.assign_to_container}>
                            {permissionGroup?.privileges?.map((permission) => (
                                <span className={`${styles.assign_to} ${styles[permission.name.replace(" ", "_").toLowerCase()]}`} key={permission}>
                                    {permission.name}
                                </span>
                            ))}
                        </div>
                    ),
                },
                // "Created At": {
                //     key: "createdAt",
                //     value: permissionGroup.createdAt,
                // },
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
