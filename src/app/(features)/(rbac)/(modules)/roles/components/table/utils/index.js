import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import rolesTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

class RolesTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: rolesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "New Role",
                    onClick: () => setModalState("add"),
                },
                TableUtils.getExportButton({ url: "/roles" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Roles",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on roles data.
     */
    static getTableRows({ data = { records: [] }, styles }) {
        return data?.records?.map((roles) => {
            return {
                id: { key: "id", value: roles.id || "2", type: "hidden" },
                Name: {
                    key: "name",
                    value: (
                        <div class="whitespace-nowrap py-1">
                            <div class="text-sm font-normal text-gray-800">{GlobalUtils.capitalizeEachWord(roles.name)}</div>
                            <div class="text-xs text-gray-500 font-light">{roles.description}</div>
                        </div>
                    ),
                },
                Permissions: {
                    key: "permissionCount",
                    value: <div className={styles.assign_to_container}>{roles.privileges?.length || 0}</div>,
                },
                Users: {
                    key: "usersCount",
                    value: <div className={styles.assign_to_container}>{roles.user?.length || 0}</div>,
                },
                Status: {
                    key: "status",
                    value: (
                        <div
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                roles.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                            {roles.status}
                        </div>
                    ),
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedRoles }) {
        const handleAction = (row, actionType) => {
            console.log("row", row);
            const selectedRoles = data?.records?.find((item) => row["id"].value === item.id);
            setSelectedRoles(selectedRoles);
            setModalState(actionType, selectedRoles?.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedRoles }) {
        const selectedRoles = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedRoles(selectedRoles);
        setModalState("view", selectedRoles.id);
    }

    static handleColumnClick({ row, data, navigate }) {
        const selectedRoles = data?.records?.find((item) => row["id"].value === item.id);
        console.log(selectedRoles);
        navigate?.(selectedRoles.id);
    }
}

export default RolesTableUtils;
