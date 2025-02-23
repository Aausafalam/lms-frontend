import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import permissionTableConstants from "./constants";

class PermissionTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: permissionTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add New Permission",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/permission" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Permission ",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on permission data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.data?.map((permission) => {
            return {
                id: { key: "id", value: permission.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: permission.name,
                },
                Routes: {
                    key: "Routes",
                    value: (
                        <div className={styles.route_container}>
                            {permission.routes.map((route) => (
                                <span className={`${styles.route} ${styles[route.replace(" ", "_").toLowerCase()]}`} key={routes}>
                                    {route}
                                </span>
                            ))}
                        </div>
                    ),
                },
                "Created At": {
                    key: "createdAt",
                    value: permission.createdAt,
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedPermission }) {
        const handleAction = (row, actionType) => {
            const selectedPermission = data?.data?.find((item) => row["id"].value === item.id);
            setSelectedPermission(selectedPermission);
            setModalState(actionType, selectedPermission.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedPermission }) {
        const selectedPermission = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedPermission(selectedPermission);
        setModalState("view", selectedPermission.id);
    }
}

export default PermissionTableUtils;
