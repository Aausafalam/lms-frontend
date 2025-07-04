import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import privilegeGroupsTableConstants from "./constants";

class PrivilegeGroupsTableUtils {
    static getTableHeader({ data, setModalState, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.records || [], ["name"]);

        return {
            title: "Privilege Groups List",
            limit: privilegeGroupsTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add Privilege Group",
                    onClick: () => navigate("/rbac/privilege-groups/form/add"),
                },
                TableUtils.getExportButton({ url: "/rbac/privilege-groups" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search privilege groups...",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...privilegeGroupsTableConstants.FILTERS.filterFields,
            ],
        };
    }

    static getTableActions({ data, setModalState, setSelectedPrivilegeGroup, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedPrivilegeGroup = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/rbac/privilege-groups/form/${row["id"]}`);
            } else {
                setSelectedPrivilegeGroup(selectedPrivilegeGroup);
                setModalState(actionType, selectedPrivilegeGroup.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Privilege Group" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Privilege Group" },
        ];
    }

    static handleRowClick({ row, data, setModalState, setSelectedPrivilegeGroup }) {
        const selectedPrivilegeGroup = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedPrivilegeGroup(selectedPrivilegeGroup);
        setModalState("view", selectedPrivilegeGroup.id);
    }
}

export default PrivilegeGroupsTableUtils;
