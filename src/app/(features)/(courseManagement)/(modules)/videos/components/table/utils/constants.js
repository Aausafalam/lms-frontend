import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import apiConstants from "@/services/utils/constants";

/**
 * Videos table configuration constants
 * @description Centralized configuration for table behavior and API endpoints
 */
const videosTableConstants = {
    API_URL: "video",
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: {
        initialSort: "name",
        initialSortOrder: "asc",
    },
    FILTERS: {
        title: "Videos List",
        icon: false,
        filterFields: Object.entries(FILTER_OPTIONS).map(([key, filter]) => ({
            type: filter.type || "select",
            name: key,
            grid: filter.grid || 3,
            options: filter.options,
            placeholder: filter.placeholder || `Select ${key.replace(/([A-Z])/g, " $1").trim()}`,
            ...filter,
        })),
    },
};

export default videosTableConstants;
