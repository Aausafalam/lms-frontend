import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import privilegesTableConstants from "./constants";

class PrivilegesTableUtils {
    static getTableHeader({ data, setModalState, navigate, onPrivilegeGroupClick }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.records || [], ["name"]);

        return {
            title: "Privilege List",
            limit: privilegesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add Privilege",
                    onClick: () => navigate(`/rbac/privileges/form/add/?onPrivilegeGroupClick=${onPrivilegeGroupClick || ""}`),
                },
                TableUtils.getExportButton({ url: "/rbac/privileges" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search privileges...",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...privilegesTableConstants.FILTERS.filterFields,
            ],
        };
    }

    static getTableActions({ data, setModalState, setSelectedPrivilege, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedPrivilege = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/rbac/privileges/form/${row["id"]}`);
            } else {
                setSelectedPrivilege(selectedPrivilege);
                setModalState(actionType, selectedPrivilege.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Privilege" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Privilege" },
        ];
    }

    static handleRowClick({ row, data, setModalState, setSelectedPrivilege }) {
        const selectedPrivilege = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedPrivilege(selectedPrivilege);
        setModalState("view", selectedPrivilege.id);
    }
}

export default PrivilegesTableUtils;
