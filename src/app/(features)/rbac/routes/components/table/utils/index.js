import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import routesTableConstants from "./constants";

class RoutesTableUtils {
    static getTableHeader({ data, setModalState, navigate }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.records || [], ["name", "endPoint"]);

        return {
            title: "API Routes List",
            limit: routesTableConstants.LIMITS,
            actionButtons: [
                {
                    icon: TableIcon.PLUS,
                    label: "Add Route",
                    onClick: () => navigate("/rbac/routes/form/add"),
                },
                TableUtils.getExportButton({ url: "/rbac/routes" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 3,
                    placeholder: "Search routes...",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
                ...routesTableConstants.FILTERS.filterFields,
            ],
        };
    }

    static getTableActions({ data, setModalState, setSelectedRoute, navigate }) {
        const handleAction = (row, actionType) => {
            const selectedRoute = data?.records?.find((item) => row["id"] === item.id);
            if (actionType === "edit") {
                navigate(`/rbac/routes/form/${row["id"]}`);
            } else {
                setSelectedRoute(selectedRoute);
                setModalState(actionType, selectedRoute.id);
            }
        };

        return [
            { name: "Delete", functions: (row) => handleAction(row, "delete"), label: "Delete Route" },
            // { name: "View", functions: (row) => handleAction(row, "view"), label: "View Details" },
            { name: "Edit", functions: (row) => handleAction(row, "edit"), label: "Edit Route" },
        ];
    }

    static handleRowClick({ row, data, setModalState, setSelectedRoute }) {
        const selectedRoute = data?.records?.find((item) => row["id"].value === item.id);
        setSelectedRoute(selectedRoute);
        setModalState("view", selectedRoute.id);
    }
}

export default RoutesTableUtils;
