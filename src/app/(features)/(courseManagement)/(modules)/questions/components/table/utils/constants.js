import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import apiConstants from "@/services/utils/constants";

/**
 * Questions table configuration constants
 * @description Centralized configuration for table behavior and API endpoints
 */
const questionsTableConstants = {
    API_URL: "question",
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: {
        initialSort: "name",
        initialSortOrder: "asc",
    },
    FILTERS: {
        title: "Questions List",
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

export default questionsTableConstants;
