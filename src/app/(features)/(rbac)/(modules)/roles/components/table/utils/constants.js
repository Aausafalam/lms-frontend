import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import PermissionICONS from "./icons";
import apiConstants from "@/services/utils/constants";

const permissionGroupTableConstants = {
    API_URL: apiConstants.roles.BASE_ROUTE,
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "Role ID", initialSortOrder: "asc" },
    FILTERS: {
        title: "Role List",
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

export default permissionGroupTableConstants;
