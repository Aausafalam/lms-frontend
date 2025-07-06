import globalConstants from "@/lib/utils/constants";
import FILTER_OPTIONS from "./filters";
import apiConstants from "@/services/utils/constants";

const coursesTableConstants = {
    API_URL: apiConstants.courses.BASE_ROUTE,
    LIMITS: globalConstants.TABLE_LIMITS,
    SORTING: { initialSort: "Courses ID", initialSortOrder: "asc" },
    FILTERS: {
        title: "Courses List",
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

export default coursesTableConstants;
