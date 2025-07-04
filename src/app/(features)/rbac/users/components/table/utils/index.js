import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import usersTableConstants from "./constants";

class UsersTableUtils {
    static getTableHeader({ data, setModalState, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.records || [], ["name", "email"]);

        return {
            title: "Users List",
            limit: usersTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add User",
                    onClick: () => navigate("/rbac/users/form/add"),
                },
                TableUtils.getExportButton({ url: "/rbac/users" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search users...",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...usersTableConstants.FILTERS.filterFields,
            ],
        };
    }

    static getTableActions({ data, setModalState, setSelectedUser, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedUser = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/rbac/users/form/${row["id"]}`);
            } else {
                setSelectedUser(selectedUser);
                setModalState(actionType, selectedUser.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete User" },
            { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit User" },
        ];
    }

    static handleRowClick({ row, data, setModalState, setSelectedUser }) {
        const selectedUser = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedUser(selectedUser);
        setModalState("view", selectedUser.id);
    }
}

export default UsersTableUtils;
