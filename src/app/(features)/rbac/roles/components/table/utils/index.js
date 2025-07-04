import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import rolesTableConstants from "./constants";

class RolesTableUtils {
    static getTableHeader({ data, setModalState, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.records || [], ["name"]);

        return {
            title: "Role List",
            limit: rolesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add Role",
                    onClick: () => navigate("/rbac/roles/form/add"),
                },
                TableUtils.getExportButton({ url: "/rbac/roles" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search roles...",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...rolesTableConstants.FILTERS.filterFields,
            ],
        };
    }

    static getTableActions({ data, setModalState, setSelectedRole, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedRole = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/rbac/roles/form/${row["id"]}`);
            } else {
                setSelectedRole(selectedRole);
                setModalState(actionType, selectedRole.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Role" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Role" },
        ];
    }

    static handleRowClick({ row, data, setModalState, setSelectedRole }) {
        const selectedRole = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedRole(selectedRole);
        setModalState("view", selectedRole.id);
    }
}

export default RolesTableUtils;
