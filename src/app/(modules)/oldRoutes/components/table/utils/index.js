import TableUtils from "@/components/table/utils";
import TableIcon from "@/components/table/utils/icon";
import routesTableConstants from "./constants";

class RoutesTableUtils {
    /**
     * Generates table header configuration.
     */
    static getTableHeader({ data, setModalState, styles }) {
        const autoSuggestions = TableUtils.formatDataForAutoSuggestion(data?.data || [], ["name"]);

        return {
            limit: routesTableConstants.LIMITS,
            actionButtons: [
                // {
                //     icon: TableIcon.PLUS,
                //     label: "Add New Route",
                //     onClick: () => setModalState("add"),
                // },
                TableUtils.getExportButton({ url: "/routes" }),
            ],
            filters: [
                {
                    name: "searchText",
                    grid: 2,
                    placeholder: "Search Route",
                    autoSuggestion: {
                        initialData: autoSuggestions,
                        autoSuggestionUrl: "/api/suggestions",
                    },
                },
            ],
        };
    }

    /**
     * Generates table rows based on routes data.
     */
    static getTableRows({ data = { data: [] }, styles }) {
        return data?.records?.map((routes) => {
            const accessibility = routes.isPublic ? "Public" : "Private";
            return {
                id: { key: "id", value: routes.id, type: "hidden" },
                Name: {
                    key: "name",
                    value: routes.name,
                },
                method: { key: "method", value: <span className={styles[routes.method.toLowerCase()]}>{routes.method}</span> },
                path: { key: "path", value: routes.path },
                type: { key: "type", value: <span className={styles[routes.type?.toLowerCase()]}>{routes.type.toLowerCase()}</span> },
                Accessibility: { key: "isPublic", value: <span className={styles[accessibility.toLowerCase()]}>{accessibility}</span> },
                "Updated At": {
                    key: "updatedAt",
                    value: routes.updatedAt,
                },
            };
        });
    }

    /**
     * Returns available actions for each row.
     */
    static getTableActions({ data, setModalState, setSelectedRoutes }) {
        const handleAction = (row, actionType) => {
            const selectedRoutes = data?.data?.find((item) => row["id"].value === item.id);
            setSelectedRoutes(selectedRoutes);
            setModalState(actionType, selectedRoutes.id);
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
    static handleRowClick({ row, data, setModalState, setSelectedRoutes }) {
        const selectedRoutes = data?.data?.find((item) => row["id"].value === item.id);
        setSelectedRoutes(selectedRoutes);
        setModalState("view", selectedRoutes.id);
    }
}

export default RoutesTableUtils;
