import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import permissionTableConstants from "./constants";
import GlobalUtils from "@/lib/utils";

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
                    label: "New Permission",
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
        return data?.records?.map((permission) => {
            return {
                id: { key: "id", value: permission.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: (
                        <div class="whitespace-nowrap py-1">
                            <div class="text-sm font-normal text-gray-800">{GlobalUtils.capitalizeEachWord(permission.name)}</div>
                            <div class="text-xs text-gray-500 font-light">{permission.description}</div>
                        </div>
                    ),
                },
                Group: {
                    key: "permissionGroup",
                    value: (
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-normal bg-blue-100 text-blue-800">
                            {GlobalUtils.capitalizeEachWord(permission.privilegeGroup?.name)}
                        </span>
                    ),
                },
                "Routes Count": {
                    key: "Routes",
                    value: permission?.routes?.length,
                },
                Status: {
                    key: "Status",
                    value: <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[0.75rem] font-medium bg-green-100 text-green-800">Active</span>,
                },
                "Created At": {
                    key: "createdAt",
                    value: GlobalUtils.formatDate(permission.createdAt),
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedPermission }) {
        const handleAction = (row, actionType) => {
            const selectedPermission = data?.records?.find((item) => row["id"].value === item.id);
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
