import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import PermissionICONS from "./icons";

const permissionGroupTableConstants = {
    API_URL: "/permission-group",
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "PermissionGroup ID", initialSortOrder: "asc" },
    FILTERS: {
        title: "Permission Group List",
        icon:false,
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
