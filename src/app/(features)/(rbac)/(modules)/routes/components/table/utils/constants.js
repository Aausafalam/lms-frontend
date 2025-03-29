import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";

const routesTableConstants = {
    API_URL: "/route",
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "Routes ID", initialSortOrder: "asc" },
    FILTERS: {
        title: "Routes List",
        icon: false,
        filterFields: Object.entries(FILTER_OPTIONS).map(([key, filter]) => ({
            type: filter.type || "select",
            name: key,
            grid: filter.grid || 3,
            options: filter.options,
            placeholder: filter.placeholder || `Select ${key.replace(/([A-Z])/g, " $1").trim()}`,
        })),
    },
};

export default routesTableConstants;
